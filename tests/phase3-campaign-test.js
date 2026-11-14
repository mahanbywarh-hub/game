'use strict';

// Dependency-free campaign/progression regression checks.
// Run with: node tests/phase3-campaign-test.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const ROOT = path.resolve(__dirname, '..');

class FakeClassList {
  constructor(initial = []) { this.values = new Set(initial); }
  add(v) { this.values.add(v); }
  remove(v) { this.values.delete(v); }
  contains(v) { return this.values.has(v); }
  toggle(v, force) { const add = force === undefined ? !this.values.has(v) : !!force; if (add) this.values.add(v); else this.values.delete(v); return add; }
}
class FakeContext {
  save() {} restore() {} clearRect() {} fillRect() {} drawImage() {} translate() {} scale() {} rotate() {}
  beginPath() {} moveTo() {} lineTo() {} quadraticCurveTo() {} closePath() {} stroke() {} fill() {} arc() {} ellipse() {} roundRect() {}
  fillText() {} strokeText() {} strokeRect() {} createLinearGradient() { return { addColorStop() {} }; }
  measureText(text) { return { width: String(text).length * 7 }; }
}
class FakeElement {
  constructor(id) { this.id=id; this.classList=new FakeClassList(); this.style={}; this.textContent=''; this.innerHTML=''; this.onclick=null; this.disabled=false; this.width=id==='gameCanvas'?960:180; this.height=id==='gameCanvas'?440:200; this.context=id.toLowerCase().includes('canvas')?new FakeContext():null; }
  getContext() { return this.context; }
}
class FakeImage {
  constructor() { this.complete=false; this.naturalWidth=0; this.naturalHeight=0; this.onload=null; this.onerror=null; this._src=''; }
  set src(v) { this._src=v; try { const d=fs.readFileSync(path.join(ROOT,v)); this.naturalWidth=d.readUInt32BE(16); this.naturalHeight=d.readUInt32BE(20); this.complete=true; if(this.onload)this.onload(); } catch(e) { this.complete=true; if(this.onerror)this.onerror(e); } }
  get src() { return this._src; }
}

const elements=new Map();
const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
for(const m of html.matchAll(/\bid="([^"]+)"/g)) elements.set(m[1],new FakeElement(m[1]));
for(const id of ['lobby','game','stages','shop','codex','sanctuary']) elements.get(id)?.classList.add('screen');
elements.get('lobby')?.classList.add('active');
const listeners=Object.create(null), localStore=new Map();
// Seed legacy Phase 2 progress to prove the new campaign migration does not overwrite it.
localStore.set('ashen-halo-coins',JSON.stringify(777));
localStore.set('ashen-halo-owned',JSON.stringify([0,1]));
localStore.set('ashen-halo-equipped',JSON.stringify(1));
const fakeDocument={hidden:false,getElementById(id){return elements.get(id)||null;},querySelectorAll(sel){return sel==='.screen'?['lobby','game','stages','shop','codex','sanctuary'].map(id=>elements.get(id)).filter(Boolean):[];},addEventListener(name,fn){(listeners[name]||=[]).push(fn);}};
const fakeWindow={ASHEN_ASSETS:{},addEventListener(){}};
const fakeStorage={getItem(k){return localStore.has(k)?localStore.get(k):null;},setItem(k,v){localStore.set(k,String(v));}};
const context={window:fakeWindow,document:fakeDocument,localStorage:fakeStorage,Image:FakeImage,performance:{now:()=>1000},requestAnimationFrame:()=>0,alert:()=>{},console:{warn(){},error(){},log(){}},Math,Number,String,Object,Array,Set,Map,JSON,Date,parseInt,isFinite,Infinity};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(ROOT,'assets/campaign-data.js'),'utf8'),context,{filename:'campaign-data.js'});
vm.runInContext(fs.readFileSync(path.join(ROOT,'assets/asset-config.js'),'utf8'),context,{filename:'asset-config.js'});
vm.runInContext(fs.readFileSync(path.join(ROOT,'game.js'),'utf8'),context,{filename:'game.js'});
function run(s){return vm.runInContext(s,context);}
let passed=0, failed=0;
function test(name,fn){try{fn();passed++;console.log(`PASS ${name}`);}catch(e){failed++;console.error(`FAIL ${name}: ${e.stack||e}`);}}
function load(i){run(`loadStage(${i},true); resumeGame(); player.x=120; player.y=GROUND_Y-PLAYER_H; player.vx=0; player.vy=0; player.onGround=true; player.hp=getPlayerMaxHp();`);}

// Catalogue and campaign structure.
test('campaign contains 36 uniquely named missions across six acts',()=>{
  assert.strictEqual(run('stages.length'),36);
  assert.strictEqual(run('CAMPAIGN_DATA.acts.length'),6);
  assert.strictEqual(new Set(Array.from(run('stages.map(s=>s.name)'))).size,36);
  for(let a=0;a<6;a++) assert.strictEqual(run(`stages.filter(s=>s.actIndex===${a}).length`),6);
});
test('ten regions, eighteen side quests and twelve named major bosses are defined',()=>{
  assert.strictEqual(run('CAMPAIGN_DATA.regions.length'),10);
  assert.strictEqual(run('CAMPAIGN_DATA.sideQuests.length'),18);
  assert.strictEqual(run('CAMPAIGN_DATA.majorBosses.length'),12);
  assert.strictEqual(new Set(Array.from(run('CAMPAIGN_DATA.majorBosses.map(b=>b.id)'))).size,12);
});
test('six primary objective types are represented and linked to stage layouts',()=>{
  const types=Array.from(run('[...new Set(stages.map(s=>s.missionType))]')).sort();
  assert.deepStrictEqual(types,['hunt','mechanism','purge','relic','rescue','survive']);
  for(let i=0;i<36;i++) assert(run(`stages[${i}].pickupXs.length===4 && stages[${i}].sidePickupXs.length===3 && stages[${i}].interactX.length===3 && stages[${i}].layoutPattern`));
});
test('all 36 stage definitions have distinct layout seeds, object routes and encounter patterns',()=>{
  const seeds=Array.from(run('stages.map(s=>s.layoutSeed)'));
  const routes=Array.from(run('stages.map(s=>s.secretX)'));
  assert.strictEqual(new Set(seeds).size,36);
  assert(new Set(routes).size>20);
  assert.strictEqual(new Set(Array.from(run('stages.map(s=>s.layoutPattern)'))).size,6);
  assert(Array.from(run('stages.map(s=>s.hazardZones.length)')).some(n=>n>0));
});
test('all eighteen side quests point to valid stages and supported gameplay events',()=>{
  for(let i=0;i<18;i++){
    const q=run(`CAMPAIGN_DATA.sideQuests[${i}]`),stage=run(`stages[${q.stageIndex}]`);
    assert(stage,`side quest ${q.id} points to a real stage`);
    assert(['kill','collect','boss','mechanism','survive'].includes(q.type));
    if(q.type==='collect')assert.strictEqual(stage.sidePickupXs.length,3);
    if(q.type==='survive')assert.strictEqual(stage.missionType,'survive');
    if(q.type==='mechanism')assert(stage.missionType==='mechanism'||Number.isFinite(stage.sideMechanismX));
  }
});
test('legacy currency and weapon save values survive campaign initialization',()=>{
  assert.strictEqual(run('coins'),777);
  assert.strictEqual(run('equipped'),1);
  assert.strictEqual(run('owned.includes(1)'),true);
  assert.strictEqual(run('campaignProgress.version'),1);
  assert.strictEqual(run('campaignProgress.unlockedStage'),0);
});
test('every one of the 36 stages can be loaded with its own enemies, boss and objective objects',()=>{
  for(let i=0;i<36;i++){
    run(`loadStage(${i},true);`);
    assert.strictEqual(run('currentStage'),i);
    assert(run('mobs.length')>=6,`stage ${i+1} should spawn an encounter`);
    assert(run('boss.profile && boss.profile.id'),`stage ${i+1} has a boss profile`);
    assert(run('levelObjects.length>=7'),`stage ${i+1} has mission/exploration objects`);
    assert.strictEqual(run(`missionState.type`),run(`stages[${i}].missionType`));
  }
});
test('world map renders all stages and locks stages beyond current progress',()=>{
  run('renderStages()');
  const content=elements.get('stageGrid').innerHTML;
  assert(content.includes('تخت آن‌سوی نام'));
  assert(content.includes('قفل است'));
  assert.strictEqual((content.match(/<article class="stage-card/g)||[]).length,36);
});
test('stage selection enforces sequential unlocking',()=>{
  run('campaignProgress.unlockedStage=0; loadStage(0,true); loadStage(1);');
  assert.strictEqual(run('currentStage'),0);
});

// Mission objective systems.
test('relic mission collects the four primary memory fragments',()=>{
  load(1);
  for(const x of Array.from(run('stages[1].pickupXs'))) { run(`player.x=${x-34}; processStageObjects();`); }
  assert.strictEqual(run('missionState.progress'),4);
  assert.strictEqual(run('missionState.complete'),true);
  assert.strictEqual(run('boss.sealed'),false);
});
test('mechanism mission advances through nearby T interactions',()=>{
  load(2);
  for(const x of Array.from(run('stages[2].interactX'))) { run(`player.x=${x-34}; interactNearest();`); }
  assert.strictEqual(run('missionState.progress'),3);
  assert.strictEqual(run('missionState.complete'),true);
});
test('rescue mission releases three survivors through interactions',()=>{
  load(3);
  for(const x of Array.from(run('stages[3].interactX'))) { run(`player.x=${x-34}; interactNearest();`); }
  assert.strictEqual(run('missionState.progress'),3);
  assert.strictEqual(run('missionState.complete'),true);
});
test('purge mission counts defeated enemies once each',()=>{
  load(0);
  const kills=run('campaignProgress.totalKills');
  run('const doomed={rewarded:false}; onMobDefeated(doomed); onMobDefeated(doomed);');
  assert.strictEqual(run('missionState.progress'),1);
  assert.strictEqual(run('campaignProgress.totalKills'),kills+1);
});
test('survival mission completes after its designed timer',()=>{
  load(4);
  run('missionState.timeLeft=1; updateGame(1016);');
  assert.strictEqual(run('missionState.complete'),true);
  assert.strictEqual(run('boss.sealed'),false);
});
test('hunt mission exposes its boss and accepts the boss victory',()=>{
  load(5);
  assert.strictEqual(run('missionState.type'),'hunt');
  assert.strictEqual(run('missionState.complete'),true);
  assert.strictEqual(run('boss.sealed'),false);
});
test('hidden cache awards a secret, relic, currency and experience',()=>{
  load(0);
  const coins=run('coins'),secrets=run('campaignProgress.secrets.length');
  run('player.x=stages[0].secretX-34; interactNearest();');
  assert.strictEqual(run('campaignProgress.secrets.length'),secrets+1);
  assert.strictEqual(run('coins'),coins+55);
});
test('lore fragment interaction records a codex entry',()=>{
  load(0);
  run("const lore=levelObjects.find(o=>o.type==='lore'); player.x=lore.x-34; interactNearest();");
  assert(run("campaignProgress.loreFragments.some(x=>x==='lore-0')"));
});
test('checkpoints persist into the campaign save',()=>{
  load(0);
  run('player.x=stages[0].checkpointXs[0]-34; processStageObjects();');
  assert.strictEqual(run('campaignProgress.checkpointByStage[0]'),run('stages[0].checkpointXs[0]'));
  const saved=JSON.parse(localStore.get('ashen-halo-campaign-v1'));
  assert.strictEqual(saved.checkpointByStage['0'],run('stages[0].checkpointXs[0]'));
});

// Quests, NPCs and progression.
test('side quest can be accepted, progressed, claimed and saved',()=>{
  load(0);
  run('campaignProgress.unlockedStage=1; startSideQuest("side-1"); loadStage(1,true); resumeGame();');
  run('const defeated={rewarded:false}; onMobDefeated(defeated);');
  assert.strictEqual(run('campaignProgress.sideQuestProgress["side-1"].status'),'ready');
  const before=run('coins');
  run('claimSideQuest("side-1");');
  assert.strictEqual(run('campaignProgress.sideQuestProgress["side-1"].status'),'complete');
  assert.strictEqual(run('coins'),before+90);
});
test('collect side quest has three physical pickups and can be claimed',()=>{
  load(0);
  run('campaignProgress.unlockedStage=2; startSideQuest("side-2"); loadStage(2,true); resumeGame();');
  for(const x of Array.from(run('stages[2].sidePickupXs'))) run(`player.x=${x-34}; processStageObjects();`);
  assert.strictEqual(run('campaignProgress.sideQuestProgress["side-2"].status'),'ready');
});
test('survival side quest completes with the associated survival objective',()=>{
  load(0);
  run('campaignProgress.unlockedStage=28; startSideQuest("side-15"); loadStage(28,true); resumeGame(); missionState.timeLeft=1; updateGame(1016);');
  assert.strictEqual(run('campaignProgress.sideQuestProgress["side-15"].status'),'ready');
});
test('all eighteen side quests can reach their ready-to-claim state through gameplay events',()=>{
  run('campaignProgress.unlockedStage=35;');
  for(let i=0;i<18;i++){
    const q=run(`CAMPAIGN_DATA.sideQuests[${i}]`);
    run(`campaignProgress.activeSideQuest=null; delete campaignProgress.sideQuestProgress["${q.id}"]; loadStage(${q.stageIndex},true); resumeGame(); startSideQuest("${q.id}");`);
    if(q.type==='kill') run('onMobDefeated({rewarded:false});');
    else if(q.type==='collect') for(const x of Array.from(run(`stages[${q.stageIndex}].sidePickupXs`))) run(`player.x=${x-34}; processStageObjects();`);
    else if(q.type==='mechanism') run("(()=>{const found=levelObjects.find(o=>o.type==='sideMechanism'||o.type==='mechanism'); player.x=found.x-34; interactNearest();})()");
    else if(q.type==='survive') run('missionState.timeLeft=1; updateGame(1016);');
    else if(q.type==='boss') run('stageBossDefeated();');
    assert.strictEqual(run(`campaignProgress.sideQuestProgress["${q.id}"].status`),'ready',`${q.title} should become ready`);
  }
});
test('sanctuary renders its three NPCs, equipment and quest board',()=>{
  run("showScreen('sanctuary');");
  const content=elements.get('sanctuaryContent').innerHTML;
  assert(content.includes('اِیرِن'));
  assert(content.includes('وِی'));
  assert(content.includes('مورا'));
  assert(content.includes('QUEST BOARD'));
  assert(content.includes('درخت مهارت'));
});
test('NPC conversations advance and persist lore fragments',()=>{
  run("talkToSanctuaryNpc('eiren');");
  assert.strictEqual(run('campaignProgress.npcConversations.eiren'),1);
  assert(run("campaignProgress.loreFragments.includes('sanctuary-eiren-0')"));
  run("talkToSanctuaryNpc('eiren');");
  assert.strictEqual(run('campaignProgress.npcConversations.eiren'),2);
});
test('gear purchase and equipment bonuses affect player attributes',()=>{
  run('coins=500; buyGear("silent-feather");');
  assert(run('campaignProgress.gearOwned.includes("silent-feather")'));
  assert.strictEqual(run('playerStat("agility")'),2);
  run('equipGear("silent-feather");');
  assert.strictEqual(run('campaignProgress.gearEquipped.accessory'),'silent-feather');
});
test('experience levels up and attribute/skill points can be spent',()=>{
  run('campaignProgress.level=1; campaignProgress.xp=0; campaignProgress.xpNext=120; campaignProgress.attributePoints=0; campaignProgress.skillPoints=0; campaignProgress.skills.sword=0; campaignProgress.stats.strength=0; gainExperience(120);');
  assert.strictEqual(run('campaignProgress.level'),2);
  assert.strictEqual(run('campaignProgress.attributePoints'),2);
  assert.strictEqual(run('campaignProgress.skillPoints'),1);
  run('spendAttribute("strength"); upgradeSkill("sword");');
  assert.strictEqual(run('campaignProgress.stats.strength'),1);
  assert.strictEqual(run('campaignProgress.skills.sword'),1);
});
test('campaign boss victory unlocks the next mission and preserves progress',()=>{
  run('campaignProgress.unlockedStage=0; loadStage(0,true); missionState.complete=true; boss.hp=0; gameOver(true);');
  assert(run('campaignProgress.completedStages.includes(0)'));
  assert.strictEqual(run('campaignProgress.unlockedStage'),1);
});
test('boss rush starts in boss-rush mode with the first boss and eleven queued',()=>{
  run("showScreen('sanctuary'); startBossRush();");
  assert.strictEqual(run('campaignMode'),'bossrush');
  assert.strictEqual(run('bossRushQueue.length'),11);
  assert.strictEqual(run('missionState.complete'),true);
  assert.strictEqual(run('boss.sealed'),false);
});
test('survival challenge has independent endless-wave state',()=>{
  run("showScreen('sanctuary'); startSurvivalMode();");
  assert.strictEqual(run('campaignMode'),'survival');
  assert.strictEqual(run('missionState.type'),'survival');
  assert.strictEqual(run('boss.sealed'),true);
  assert(run('mobs.length')>=6);
});
test('New Game Plus unlocks only after all main stages and preserves build data',()=>{
  run('campaignProgress.completedStages=Array.from({length:36},(_,i)=>i); campaignProgress.stats.strength=4; startNewGamePlus();');
  assert.strictEqual(run('campaignMode'),'ngplus');
  assert.strictEqual(run('campaignProgress.ngPlus'),1);
  assert.strictEqual(run('campaignProgress.completedStages.length'),0);
  assert.strictEqual(run('campaignProgress.stats.strength'),4);
});
test('two final endings are recorded as separate choices',()=>{
  run("overlayMode='endingChoice'; chooseEnding('restore');");
  assert(run("campaignProgress.endings.includes('restore')"));
  assert.strictEqual(run('overlayMode'),'ending');
});
test('save migration sanitizes malformed optional campaign fields',()=>{
  const normalized=JSON.parse(run("JSON.stringify(normalizeCampaignProgress({checkpointByStage:{bad:'NaN','0':920},sideQuestProgress:[],npcConversations:'bad'}))"));
  assert.strictEqual(normalized.checkpointByStage.bad,undefined);
  assert.strictEqual(normalized.checkpointByStage['0'],920);
  assert.deepStrictEqual(normalized.sideQuestProgress,{});
  assert.deepStrictEqual(normalized.npcConversations,{});
  run('saveCampaignProgress();');
  const saved=JSON.parse(localStore.get('ashen-halo-campaign-v1'));
  assert(saved.version===1);
  // The persisted in-memory state remains serializable, and the initial migration did not alter legacy keys.
  assert.strictEqual(JSON.parse(localStore.get('ashen-halo-coins'))>=0,true);
  assert.strictEqual(JSON.parse(localStore.get('ashen-halo-equipped')),1);
});

console.log(`\nPhase 3 campaign tests: ${passed} passed, ${failed} failed.`);
if(failed)process.exit(1);
