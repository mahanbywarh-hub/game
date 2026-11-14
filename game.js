'use strict';

const CAMPAIGN_DATA = window.ASHEN_CAMPAIGN || { regions: [], acts: [], stageDefs: [], sideQuests: [], majorBosses: [] };
const legacyStageArt = [
  {file:'guardian-placeholder.png'}, {file:'bishop-placeholder.png'}, {file:'titan-placeholder.png'},
  {file:'spider-placeholder.png'}, {file:'void-emperor-placeholder.png'}
];
const stages = (CAMPAIGN_DATA.stageDefs || []).map((stage, i) => ({
  ...stage,
  file: legacyStageArt[i % legacyStageArt.length].file,
  color: stage.color || '#292331', accent: stage.accent || '#c87e9a', style: stage.style || 'void'
}));
const weapons = [
  {name:'شمشیر خاکستر', price:0, damage:1, rarity:'معمولی', icon:'⚔', color:'#d8d3df', spriteIndex:0, effect:'impact-spark', desc:'سلاح آغازین؛ متعادل و قابل اعتماد.'},
  {name:'لبه‌ی اخگر', price:100, damage:1.4, rarity:'غیرمعمول', icon:'🔥', color:'#ff974b', spriteIndex:1, effect:'fire-burst', desc:'تیغه‌ای گرم که رد آتش به جا می‌گذارد.'},
  {name:'داس خون', price:220, damage:1.8, rarity:'کمیاب', icon:'☽', color:'#ff4267', spriteIndex:2, effect:'red-slash', desc:'سلاحی نفرین‌شده با ضربه‌ی سنگین.'},
  {name:'تیغه‌ی صاعقه', price:400, damage:2.3, rarity:'حماسی', icon:'ϟ', color:'#79d9ff', spriteIndex:3, effect:'ice-wave', desc:'ضربه‌های سریع و نورانی.'},
  {name:'شکافنده‌ی هاله', price:650, damage:3, rarity:'افسانه‌ای', icon:'✦', color:'#d5a3ff', spriteIndex:4, effect:'void-bolt', desc:'شمشیر افسانه‌ای برای پایان دادن به چرخه.'},
  {name:'نامِ نخستین', price:1250, damage:4.1, rarity:'اسطوره‌ای', icon:'✧', color:'#f0d5ff', spriteIndex:4, effect:'void-bolt', desc:'تیغه‌ای که پیش از نخستین هاله ساخته شد؛ قدرتی عظیم و ضربه‌ای سنگین.'}
];
const chapterLore = [
  {
    title:'فصل اول — ریشه‌هایی که خون می‌گریند',
    opening:'سِرا در جنگل خاکستر بیدار می‌شود؛ هاله‌اش شکسته و نامش از دفتر آسمان پاک شده است. صدایی از میان ریشه‌ها می‌گوید: «تو برای نجات جهان سقوط نکردی؛ تو برای نجات کسانی سقوط کردی که جهان فراموششان کرد.»',
    companion:'اِیرِن، کاتب خاموش: «هر درخت این جنگل نام یک نفر را در خود نگه داشته. نگهبان، نام‌ها را نمی‌بلعد؛ از پاک‌شدن دوباره‌ی آن‌ها جلوگیری می‌کند.»',
    phase:'نگهبان پوسیده: «من به فرمان تو ریشه‌ها را بستم، سِرا. تو گفتی اگر دروازه باز شود، همه می‌میرند.»',
    victory:'با فروپاشی نگهبان، ریشه‌ها به‌جای خون نور کم‌رنگی جاری می‌کنند. نخستین مُهر، قفل نبود؛ آخرین خاطره‌ی قربانیان بود.',
    moments:[{x:560,text:'اِیرِن: آن ناقوس دوردست را می‌شنوی؟ هر بار که صدا می‌دهد، یک نام از آسمان پاک می‌شود.'},{x:1280,text:'سِرا: پس من باید نام‌ها را برگردانم؛ حتی اگر هر مُهر، بخشی از گذشته‌ی خودم را بگیرد.'}],
  },
  {
    title:'فصل دوم — کلیسای نام‌های دزدیده‌شده',
    opening:'در کلیسای سرخ، شمع‌ها با شعله‌ای وارونه می‌سوزند. هر پنجره تصویری از فرشته‌ای بی‌چهره نشان می‌دهد. اسقف لِثار زمانی تاریخ‌نگار بهشت بود؛ حالا نام‌هایی را نگهبانی می‌کند که فرمانروایان می‌خواستند برای همیشه حذف شوند.',
    companion:'اِیرِن: «این دیوارها فریاد نمی‌زنند؛ شهادت می‌دهند. به صدای ناقوس گوش کن و به سایه‌های پشت ستون‌ها اعتماد نکن.»',
    phase:'اسقف خونین: «من نام‌ها را پنهان کردم تا جهان از وحشت نلرزد. تو در را باز کردی و نامِ خودت را به بهای آزادی آن‌ها از دست دادی.»',
    victory:'ناگهان ناقوس‌ها خاموش می‌شوند. برای نخستین بار، سکوت از جنس آرامش است، نه تهدید. روی مُهر دوم نام سِرا حک نشده؛ هزاران نام دیگر حک شده است.',
    moments:[{x:560,text:'صدای ناقوس: یک نام دیگر پاک شد. این بار، نامی که شنیدی نام خودت بود.'},{x:1280,text:'اِیرِن: اسقف دروغ نمی‌گوید؛ فقط حقیقت را به شکلی می‌گوید که بتواند با آن زندگی کند.'}],
  },
  {
    title:'فصل سوم — قله‌ی خاطرات یخ‌زده',
    opening:'باد قله خاطره‌ها را به دانه‌های برف تبدیل می‌کند. تایتان یخ، آخرین نگهبانی است که دستورِ پاک‌سازی را به یاد دارد. با نزدیک‌شدن سِرا، صدای کودکی از درون یخ می‌گوید: «قول داده بودی برگردی.»',
    companion:'اِیرِن: «من برادر تو نبودم؛ من صدای آخرین خاطره‌ای هستم که از او باقی مانده. تو نامش را از هاله بیرون کشیدی و من شکل صدا گرفتم.»',
    phase:'تایتان یخ: «تو هاله را نشکستی چون خشمگین بودی. شکستی‌اش چون فهمیدی نورِ آن از خاطره‌های زندانی تغذیه می‌کند.»',
    victory:'یخ می‌شکند و خاطره‌ی آخر آشکار می‌شود: سِرا پیش از سقوط، دروازه را از درون بست تا کودکان پناه‌گرفته در پایین شهر زنده بمانند. او هیولا نبود؛ تنها کسی بود که فرمان را نپذیرفت.',
    moments:[{x:560,text:'سِرا: این صدا را می‌شناسم… اما نمی‌توانم صورتش را به یاد بیاورم.'},{x:1280,text:'اِیرِن: وقتی مُهر سوم بشکند، درد برمی‌گردد؛ اما این بار، حقیقت هم با آن می‌آید.'}],
  },
  {
    title:'فصل چهارم — کارخانه‌ی هاله‌سازان',
    opening:'در کارخانه‌ی نفرین، ماشین‌های آسمانی هنوز بال می‌سازند؛ نه برای پرواز، بلکه برای زنجیرکردن روح‌ها. عنکبوت‌ملکه، لِتیل، نخستین مهندسی بود که فهمید هاله‌ها از نور ساخته نشده‌اند. او پس از افشای راز، به قلب ماشین‌ها دوخته شد.',
    companion:'اِیرِن: «هر سلاحی در این کارخانه از یک خاطره نیرو می‌گیرد. به همین دلیل، شمشیر تو با هر مُهر سنگین‌تر می‌شود؛ تو فقط قوی‌تر نمی‌شوی، گذشته را هم حمل می‌کنی.»',
    phase:'عنکبوت‌ملکه: «من هیولا شدم تا نقشه‌ی دستگاه را زنده نگه دارم. اگر مرا بکشی، قفل را خواهی شکست؛ اگر مرا ببخشی، می‌توانم آخرین چرخ را متوقف کنم.»',
    victory:'دستگاه خاموش می‌شود. در میان چرخ‌دنده‌ها، طرحی دیده می‌شود: تخت خالی در مرکز هاله‌ای بزرگ‌تر از یک آسمان. همه‌ی مُهرها در واقع بخش‌هایی از همان قفل بوده‌اند.',
    moments:[{x:560,text:'اِیرِن: این‌ها سلاح نیستند؛ قفس‌هایی‌اند که شکل شمشیر گرفته‌اند.'},{x:1280,text:'سِرا: پس این بار به جای نابودکردن نگهبان، خودِ دستگاه را از کار می‌اندازم.'}],
  },
  {
    title:'فصل پنجم — تختی که هیچ‌کس بر آن ننشست',
    opening:'آن سوی دروازه، آسمان بی‌ستاره است. امپراتور خلأ تاج ندارد؛ تمام تاج‌ها از نام‌های حذف‌شده ساخته شده‌اند. او نخستین فرشته‌ی سقوط‌کرده است و آخرین کسی که هنوز به فرمان قدیمی ایمان دارد.',
    companion:'اِیرِن: «در پایان، پیروزی با شمشیر تعیین نمی‌شود. آن‌چه می‌شکنی یا بازمی‌سازی، آینده‌ی کسانی است که هنوز نامی ندارند.»',
    phase:'امپراتور خلأ: «اگر هاله را بشکنی، نورِ محافظ جهان از بین می‌رود. اگر آن را بازسازی کنی، قربانیان دوباره در آن زندانی می‌شوند. هیچ انتخابی بی‌هزینه نیست.»',
    victory:'تخت خالی برای نخستین بار صاحب می‌شود؛ نه صاحبِ تاج، بلکه صاحبِ تصمیم. صدای اِیرِن خاموش می‌شود و نام‌هایی که در طول سفر آزاد شده‌اند، در آسمان به ستاره تبدیل می‌شوند.',
    moments:[{x:560,text:'اِیرِن: این آخرین راه است. دیگر هیچ مُهری پشت سرمان نیست.'},{x:1280,text:'سِرا: من برای بازگشت نیامده‌ام. آمده‌ام تا هیچ‌کس دیگری مجبور به سقوط نشود.'}],
  }
];
const GEAR_ITEMS=[
  {id:'ash-mantle',name:'ردای خاکستر',slot:'armor',slotName:'زره',price:0,rarity:'معمولی',bonus:{defense:1},desc:'پوشش سبک برای شروع سفر.'},
  {id:'root-plate',name:'زره ریشه‌ی کهن',slot:'armor',slotName:'زره',price:240,rarity:'کمیاب',bonus:{defense:3,vitality:1},desc:'ریشه‌های جنگل ضربه را جذب می‌کنند.'},
  {id:'ember-guard',name:'زره نگهبان اخگر',slot:'armor',slotName:'زره',price:480,rarity:'حماسی',bonus:{defense:5,vitality:2},desc:'پوششی مقاوم در برابر گرمای کوره.'},
  {id:'silent-feather',name:'پر خاموش',slot:'accessory',slotName:'اکسسوری',price:180,rarity:'غیرمعمول',bonus:{agility:2},desc:'حرکت و تغییر جهت را سبک‌تر می‌کند.'},
  {id:'blood-signet',name:'مُهر سرخ',slot:'accessory',slotName:'اکسسوری',price:390,rarity:'حماسی',bonus:{crit:2,strength:1},desc:'قدرت ضربه‌های دقیق را افزایش می‌دهد.'},
  {id:'broken-shard',name:'ترکِ هاله',slot:'relic',slotName:'یادگار',price:350,rarity:'کمیاب',bonus:{energy:2},desc:'انرژی هاله را سریع‌تر به دست می‌آوری.'},
  {id:'first-light',name:'قطعه‌ی نور نخستین',slot:'relic',slotName:'یادگار',price:920,rarity:'اسطوره‌ای',bonus:{strength:2,defense:2,energy:3},desc:'یادگاری از نخستین سازنده‌ی هاله.'}
];
const $ = id => document.getElementById(id);
let heroName = sanitizeHeroName(readJSON('ashen-halo-hero-name', ''));
let draftHeroName = heroName;
const CANVAS_W = 960, CANVAS_H = 440, WORLD_W = 3000, GROUND_Y = 366, PLAYER_W = 68, PLAYER_H = 82, PLAYER_DRAW_SIZE = 132;
const ATTACK_DURATION = 17, ATTACK_IMPACT_PROGRESS = 0.60;
const HEAVY_ATTACK_DURATION = 27, HEAVY_ATTACK_IMPACT_PROGRESS = 0.65;

// Angelic ultimate timing. Its animation frames play during the ascent and wing opening.
const ULTIMATE_ASCENT_FRAMES = 42;
const ULTIMATE_WING_OPEN_END = 72;
const ULTIMATE_IMPACT_FRAME = 92;
const ULTIMATE_FLIGHT_DURATION = 138;
const ULTIMATE_FLIGHT_HEIGHT = 176;
const PHYSICS = Object.freeze({ gravity:0.58, heldJumpGravity:0.36, maxFallSpeed:14, groundAcceleration:1.02, airAcceleration:0.62, groundSpeed:5.2, airSpeed:4.75, groundFriction:0.78, airDrag:0.986, jumpSpeed:-11.8, airJumpSpeed:-10.4, dashSpeed:11.2 });
const SWORD_SPRITE_HEIGHT = 70, SWORD_HANDLE_OFFSET = 9, SWORD_HIT_RADIUS = 7;
const SWORD_REST_ANGLE = 2.42;
const LIGHT_COMBO_PROFILES = [
  { start: 2.34, end: 0.78, reach: 1.00, handY: 0, reverse: false },
  { start: 0.78, end: 2.42, reach: 1.05, handY: -2, reverse: true },
  { start: 2.50, end: 0.50, reach: 1.12, handY: 1, reverse: false }
];
const ASSET_CONFIG = window.ASHEN_ASSETS || {};
// Default sprite path. Place frame_00.png ... frame_15.png in this folder,
// or define player.animations.ultimate in window.ASHEN_ASSETS to override it.
const ULTIMATE_ANIMATION_CONFIG = ASSET_CONFIG.player?.animations?.ultimate || {
  folder: 'assets/characters/player/ultimate',
  count: 16,
  fps: 12
};
let coins = Number(readJSON('ashen-halo-coins', 350));
if (!Number.isFinite(coins) || coins < 0) coins = 350;
let owned = readJSON('ashen-halo-owned', [0]);
if (!Array.isArray(owned) || !owned.includes(0)) owned = [0];
let equipped = Number(readJSON('ashen-halo-equipped', 0)) || 0;
if (!weapons[equipped]) equipped = 0;
let currentStage = 0, paused = true, gameEnded = false, overlayMode = 'resume';
let campaignProgress = null, missionState = null, levelObjects = [], campaignMode = 'story', activeCheckpoint = 0, stageElapsedFrames = 0;
let lastInteractionToast = 0, bossRushQueue = [], survivalWaveTimer = 0;
let player = {}, boss = {}, mobs = [], keys = Object.create(null), cameraX = 0, frameClock = 0;
let playerAnimations = { idle: [], walk: [], run: [], jump: [], dash: [], dodge: [], attack: [], ultimate: [] };
let effectAnimations = Object.create(null);
let bossRosterImages = [];
let visualEffects = [], projectiles = [], hostileProjectiles = [], fallingStrikes = [], particles = [], damageNumbers = [], dashAfterimages = [];
let shakeTime = 0, shakeDuration = 0, shakeStrength = 0, shakeSeed = 0, hitStopFrames = 0, screenFlashFrames = 0, impactVignetteFrames = 0, impactRings = [], combatToast = null, storyCaption = null;
let combatSettings = { screenShake: true, hitFlashes: true, audio: true, volume: 0.32 };
let audioContext = null;
const combatSoundLastPlayed = Object.create(null);
// Gameplay video background. Put your MP4 at the default path below, or map
// individual zero-based stage indexes to their own looping videos in stageSources.
const GAMEPLAY_VIDEO_CONFIG = Object.freeze({
  defaultSource: 'assets/backgrounds/gameplay-loop.mp4',
  stageSources: {
    // Example: 0: 'assets/backgrounds/ash-forest-loop.mp4',
    // Example: 1: 'assets/backgrounds/red-cathedral-loop.mp4'
  },
  darkness: 0.22,
  parallax: 0.30
});
let gameplayBackgroundVideo = null;
let gameplayVideoPlayPending = false;
let gameplayVideoFailedSource = '';
let backgroundImages = Array(stages.length).fill(null);
let bossImages = Array(stages.length).fill(null);
let fallbackCharacterImage = new Image();

function readJSON(key, fallback) {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch (_) { return fallback; }
}

function defaultCampaignProgress() {
  return { version:1, unlockedStage:0, lastStage:0, completedStages:[], level:1, xp:0, xpNext:120, attributePoints:0, skillPoints:0,
    stats:{strength:0,agility:0,vitality:0,energy:0,crit:0,defense:0},
    skills:{sword:0,crimson:0,angel:0,shadow:0,guard:0},
    inventory:[], relics:[], loreFragments:[], secrets:[], sideQuestProgress:{}, activeSideQuest:null, npcConversations:{},
    gearOwned:['ash-mantle'], gearEquipped:{armor:'ash-mantle',accessory:null,relic:null},
    checkpointByStage:{}, ngPlus:0, endings:[], totalKills:0, totalBosses:0, playFrames:0 };
}
function normalizeCampaignProgress(saved) {
  const base=defaultCampaignProgress();
  if(!saved||typeof saved!=='object')return base;
  const merged={...base,...saved,stats:{...base.stats,...(saved.stats||{})},skills:{...base.skills,...(saved.skills||{})}};
  merged.version=1;
  merged.unlockedStage=Math.max(0,Math.min(stages.length-1,Number(merged.unlockedStage)||0));
  merged.lastStage=Math.max(0,Math.min(merged.unlockedStage,Number(merged.lastStage)||0));
  merged.completedStages=Array.isArray(merged.completedStages)?[...new Set(merged.completedStages.filter(n=>Number.isInteger(n)&&n>=0&&n<stages.length))]:[];
  for(const k of ['inventory','relics','loreFragments','secrets','endings','gearOwned'])merged[k]=Array.isArray(merged[k])?merged[k]:[];
  merged.sideQuestProgress=merged.sideQuestProgress&&typeof merged.sideQuestProgress==='object'&&!Array.isArray(merged.sideQuestProgress)?merged.sideQuestProgress:{};
  merged.npcConversations=merged.npcConversations&&typeof merged.npcConversations==='object'&&!Array.isArray(merged.npcConversations)?merged.npcConversations:{};
  merged.checkpointByStage=merged.checkpointByStage&&typeof merged.checkpointByStage==='object'&&!Array.isArray(merged.checkpointByStage)?merged.checkpointByStage:{};
  for(const [key,value] of Object.entries(merged.checkpointByStage)){const n=Number(key),x=Number(value);if(!Number.isInteger(n)||n<0||n>=stages.length||!Number.isFinite(x))delete merged.checkpointByStage[key];else merged.checkpointByStage[key]=Math.max(0,Math.min(WORLD_W-500,x));}
  merged.playFrames=Math.max(0,Number(merged.playFrames)||0);
  merged.gearEquipped={armor:'ash-mantle',accessory:null,relic:null,...(saved.gearEquipped||{})};
  for(const k of Object.keys(base.stats))merged.stats[k]=Math.max(0,Math.min(30,Number(merged.stats[k])||0));
  for(const k of Object.keys(base.skills))merged.skills[k]=Math.max(0,Math.min(5,Number(merged.skills[k])||0));
  merged.level=Math.max(1,Math.min(99,Number(merged.level)||1));
  merged.xp=Math.max(0,Number(merged.xp)||0); merged.xpNext=Math.max(120,Number(merged.xpNext)||120);
  merged.attributePoints=Math.max(0,Number(merged.attributePoints)||0);merged.skillPoints=Math.max(0,Number(merged.skillPoints)||0);
  merged.ngPlus=Math.max(0,Number(merged.ngPlus)||0);merged.totalKills=Math.max(0,Number(merged.totalKills)||0);merged.totalBosses=Math.max(0,Number(merged.totalBosses)||0);
  return merged;
}
campaignProgress=normalizeCampaignProgress(readJSON('ashen-halo-campaign-v1',null));
currentStage=campaignProgress.lastStage;
function saveCampaignProgress(){
  campaignProgress.lastStage=currentStage;
  try{localStorage.setItem('ashen-halo-campaign-v1',JSON.stringify(campaignProgress));}catch(error){console.warn('Campaign save unavailable:',error);}
}
function currentActLore(){
  const act=CAMPAIGN_DATA.acts[stages[currentStage]?.actIndex||0]||{};
  const moments=[
    {x:560,text:`اِیرِن: ${stages[currentStage]?.regionName||'این سرزمین'} هنوز چیزی را از ما پنهان کرده. نشانه‌ها را از دست نده.`},
    {x:1640,text:`${heroName}: ${act.reveal||'این بار حقیقت را از دل تاریکی بیرون می‌کشم.'}`}
  ];
  return {title:heroText(act.name||'ASHEN HALO'),opening:heroText(act.intro||''),companion:heroText(act.companion||''),phase:heroText(act.reveal||''),victory:heroText(act.ending||''),moments:moments.map(m=>({...m,text:heroText(m.text)}))};
}
function playerStat(stat){const base=Math.max(0,Number(campaignProgress?.stats?.[stat])||0);let bonus=0;for(const item of GEAR_ITEMS){if(Object.values(campaignProgress?.gearEquipped||{}).includes(item.id))bonus+=Number(item.bonus?.[stat]||0);}return base+bonus;}
function getPlayerDamageMultiplier(){return 1+playerStat('strength')*.035+(campaignProgress?.skills?.sword||0)*.06;}
function getPlayerMaxHp(){return 115+playerStat('vitality')*9+(campaignProgress?.skills?.guard||0)*8;}
function gainExperience(amount){
  let xp=Math.max(0,Math.floor(amount));campaignProgress.xp+=xp;let levels=0;
  while(campaignProgress.xp>=campaignProgress.xpNext&&campaignProgress.level<99){campaignProgress.xp-=campaignProgress.xpNext;campaignProgress.level++;campaignProgress.attributePoints+=2;campaignProgress.skillPoints+=1;campaignProgress.xpNext=Math.floor(campaignProgress.xpNext*1.18);levels++;}
  if(levels){setCombatToast(`سطح ${campaignProgress.level}! دو امتیاز ویژگی و یک امتیاز مهارت دریافت شد.`, '#ffe0a6',110);if(player){player.hp=Math.min(getPlayerMaxHp(),player.hp+25*levels);}}
  saveCampaignProgress();
}
function spendAttribute(stat){if(!Object.prototype.hasOwnProperty.call(campaignProgress.stats,stat)||campaignProgress.attributePoints<=0)return false;campaignProgress.stats[stat]++;campaignProgress.attributePoints--;if(stat==='vitality'&&player)player.hp=Math.min(getPlayerMaxHp(),player.hp+8);saveCampaignProgress();renderSanctuary();return true;}
function upgradeSkill(skill){if(!Object.prototype.hasOwnProperty.call(campaignProgress.skills,skill)||campaignProgress.skillPoints<=0||campaignProgress.skills[skill]>=5)return false;campaignProgress.skills[skill]++;campaignProgress.skillPoints--;saveCampaignProgress();renderSanctuary();return true;}
const savedCombatSettings = readJSON('ashen-halo-combat-settings', {});
const reducedMotionDefault = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
combatSettings = {
  screenShake: typeof savedCombatSettings.screenShake === 'boolean' ? savedCombatSettings.screenShake : !reducedMotionDefault,
  hitFlashes: typeof savedCombatSettings.hitFlashes === 'boolean' ? savedCombatSettings.hitFlashes : true,
  audio: typeof savedCombatSettings.audio === 'boolean' ? savedCombatSettings.audio : true,
  volume: Number.isFinite(Number(savedCombatSettings.volume)) ? Math.max(0, Math.min(1, Number(savedCombatSettings.volume))) : 0.32
};
function saveCombatSettings() {
  try { localStorage.setItem('ashen-halo-combat-settings', JSON.stringify(combatSettings)); } catch (_) {}
}

/* --- Packaged lobby soundtrack: only music/playlist.js entries are selectable. --- */
const LOBBY_MUSIC_TRACKS = (Array.isArray(window.ASHEN_LOBBY_TRACKS) ? window.ASHEN_LOBBY_TRACKS : [])
  .filter(track => {
    if (!track || typeof track !== 'object') return false;
    const src = String(track.src || '').replace(/\\/g, '/');
    return /^music\/(?!.*(?:^|\/)\.\.(?:\/|$))[^?#]+\.(?:mp3|ogg|wav|m4a|aac|flac)$/i.test(src)
      && String(track.id || '').trim().length > 0;
  });
let lobbyMusicEnabled = readJSON('ashen-halo-lobby-music-enabled', false) === true;
let lobbyMusicVolume = Math.max(0, Math.min(1, Number(readJSON('ashen-halo-lobby-music-volume', 0.35)) || 0));
let selectedLobbyMusicId = String(readJSON('ashen-halo-lobby-music-track', '') || '');
function lobbyMusicElements() {
  return { audio:$('lobbyMusicAudio'), select:$('lobbyMusicSelect'), status:$('lobbyMusicStatus'), toggle:$('lobbyMusicToggle'), volume:$('lobbyMusicVolume') };
}
function setLobbyMusicStatus(message) {
  const el = $('lobbyMusicStatus');
  if (el) el.textContent = message;
}
function getLobbyMusicTrack(id = selectedLobbyMusicId) {
  return LOBBY_MUSIC_TRACKS.find(track => track.id === id) || null;
}
function updateLobbyMusicButton() {
  const ui = lobbyMusicElements();
  if (!ui.toggle) return;
  ui.toggle.textContent = ui.audio && !ui.audio.paused ? 'PAUSE' : 'PLAY';
  ui.toggle.disabled = !getLobbyMusicTrack();
}
function setLobbyMusicTrack(id, options = {}) {
  const ui = lobbyMusicElements();
  const track = getLobbyMusicTrack(id);
  if (!ui.audio || !track) {
    setLobbyMusicStatus(LOBBY_MUSIC_TRACKS.length
      ? 'Select a track from the packaged music library.'
      : 'No tracks are configured. Add music files to /music and register them in music/playlist.js.');
    updateLobbyMusicButton();
    return false;
  }

  const wasPlaying = !ui.audio.paused && lobbyMusicEnabled;
  const sameTrack = selectedLobbyMusicId === track.id && ui.audio.getAttribute('src') === track.src;
  selectedLobbyMusicId = track.id;
  if (ui.select) ui.select.value = track.id;
  try { localStorage.setItem('ashen-halo-lobby-music-track', JSON.stringify(track.id)); } catch (_) {}

  if (!sameTrack) {
    ui.audio.pause();
    ui.audio.src = track.src;
    ui.audio.loop = true;
    ui.audio.volume = lobbyMusicVolume;
    ui.audio.load();
  }
  setLobbyMusicStatus(`Selected: ${track.name || track.id}. The track repeats until you change it.`);
  updateLobbyMusicButton();

  if (options.autoplay || wasPlaying) {
    lobbyMusicEnabled = true;
    try { localStorage.setItem('ashen-halo-lobby-music-enabled', 'true'); } catch (_) {}
    ui.audio.play().then(() => {
      setLobbyMusicStatus(`Now playing: ${track.name || track.id}. This track will repeat until changed.`);
      updateLobbyMusicButton();
    }).catch(() => {
      setLobbyMusicStatus('Press PLAY to allow the browser to start the soundtrack.');
      updateLobbyMusicButton();
    });
  }
  return true;
}
function initLobbyMusic() {
  const ui = lobbyMusicElements();
  if (!ui.audio || !ui.select) return;
  ui.audio.loop = true;
  ui.audio.preload = 'none';
  ui.audio.volume = lobbyMusicVolume;

  ui.select.replaceChildren();
  if (!LOBBY_MUSIC_TRACKS.length) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'No music tracks configured';
    ui.select.appendChild(option);
    ui.select.disabled = true;
    setLobbyMusicStatus('Add audio files to the /music folder and list them in music/playlist.js. Players cannot upload tracks.');
  } else {
    for (const track of LOBBY_MUSIC_TRACKS) {
      const option = document.createElement('option');
      option.value = track.id;
      option.textContent = track.name || track.id;
      ui.select.appendChild(option);
    }
    ui.select.disabled = false;
    const initial = getLobbyMusicTrack(selectedLobbyMusicId) || LOBBY_MUSIC_TRACKS[0];
    setLobbyMusicTrack(initial.id);
    ui.select.addEventListener('change', () => setLobbyMusicTrack(ui.select.value, { autoplay: lobbyMusicEnabled && $('lobby')?.classList.contains('active') }));
  }

  if (ui.volume) {
    ui.volume.value = String(Math.round(lobbyMusicVolume * 100));
    ui.volume.addEventListener('input', () => {
      lobbyMusicVolume = Math.max(0, Math.min(1, Number(ui.volume.value) / 100));
      ui.audio.volume = lobbyMusicVolume;
      try { localStorage.setItem('ashen-halo-lobby-music-volume', JSON.stringify(lobbyMusicVolume)); } catch (_) {}
    });
  }
  ui.audio.addEventListener('play', updateLobbyMusicButton);
  ui.audio.addEventListener('pause', updateLobbyMusicButton);
  ui.audio.addEventListener('ended', () => {
    // loop is the primary repeat mechanism; this fallback covers browsers that
    // report ended before applying the loop flag after a source change.
    if (lobbyMusicEnabled && ui.audio.src) { ui.audio.currentTime = 0; ui.audio.play().catch(() => {}); }
  });
  ui.audio.addEventListener('error', () => setLobbyMusicStatus('This soundtrack file could not be played. Check its filename and format in music/playlist.js.'));
  updateLobbyMusicButton();
  if (lobbyMusicEnabled) resumeLobbyMusicInLobby();
}
async function toggleLobbyMusic() {
  const ui = lobbyMusicElements();
  if (!ui.audio || !getLobbyMusicTrack()) {
    setLobbyMusicStatus('No playable track is available. Add tracks to the packaged /music library.');
    return;
  }
  if (!ui.audio.paused) {
    lobbyMusicEnabled = false;
    try { localStorage.setItem('ashen-halo-lobby-music-enabled', 'false'); } catch (_) {}
    ui.audio.pause();
    setLobbyMusicStatus('Lobby music paused.');
    updateLobbyMusicButton();
    return;
  }
  lobbyMusicEnabled = true;
  try { localStorage.setItem('ashen-halo-lobby-music-enabled', 'true'); } catch (_) {}
  ui.audio.loop = true;
  ui.audio.volume = lobbyMusicVolume;
  try {
    await ui.audio.play();
    const track = getLobbyMusicTrack();
    setLobbyMusicStatus(`Now playing: ${track?.name || 'Lobby soundtrack'}. It will repeat until changed.`);
  } catch (_) {
    lobbyMusicEnabled = false;
    try { localStorage.setItem('ashen-halo-lobby-music-enabled', 'false'); } catch (_) {}
    setLobbyMusicStatus('Playback was blocked. Press PLAY again to start the soundtrack.');
  }
  updateLobbyMusicButton();
}
function pauseLobbyMusicForGame() {
  const audio = $('lobbyMusicAudio');
  if (audio && !audio.paused) audio.pause();
}
function resumeLobbyMusicInLobby() {
  const audio = $('lobbyMusicAudio');
  if (!lobbyMusicEnabled || !audio || !audio.src || !audio.paused || !$('lobby')?.classList.contains('active')) return;
  audio.loop = true;
  audio.volume = lobbyMusicVolume;
  audio.play().catch(() => setLobbyMusicStatus('Press PLAY once to let the browser start your soundtrack.'));
}

function bindCombatSettings() {
  const shake = $('shakeToggle'), flashes = $('flashToggle'), audio = $('audioToggle'), volume = $('audioVolume');
  if (shake) shake.checked = combatSettings.screenShake;
  if (flashes) flashes.checked = combatSettings.hitFlashes;
  if (audio) audio.checked = combatSettings.audio;
  if (volume) volume.value = String(Math.round(combatSettings.volume * 100));
  if (shake?.addEventListener) shake.addEventListener('change', () => { combatSettings.screenShake = !!shake.checked; saveCombatSettings(); });
  if (flashes?.addEventListener) flashes.addEventListener('change', () => { combatSettings.hitFlashes = !!flashes.checked; saveCombatSettings(); });
  if (audio?.addEventListener) audio.addEventListener('change', () => { combatSettings.audio = !!audio.checked; saveCombatSettings(); if (combatSettings.audio) playCombatSound('ready'); });
  if (volume?.addEventListener) volume.addEventListener('input', () => { combatSettings.volume = Math.max(0, Math.min(1, Number(volume.value) / 100)); saveCombatSettings(); });
}
function playCombatSound(kind) {
  if (!combatSettings.audio || combatSettings.volume <= 0) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    if (!audioContext) audioContext = new AudioContextClass();
    if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
    const profiles = {
      ready: { f: 520, end: 680, d: .08, type: 'sine', gain: .12 },
      light: { f: 310, end: 150, d: .105, type: 'triangle', gain: .22 },
      heavy: { f: 145, end: 58, d: .22, type: 'sawtooth', gain: .30 },
      impact: { f: 190, end: 72, d: .12, type: 'triangle', gain: .25 },
      wave: { f: 240, end: 920, d: .24, type: 'sawtooth', gain: .24 },
      waveHit: { f: 540, end: 115, d: .17, type: 'sine', gain: .26 },
      ability: { f: 280, end: 760, d: .19, type: 'triangle', gain: .23 },
      descent: { f: 110, end: 42, d: .30, type: 'sawtooth', gain: .30 },
      death: { f: 210, end: 48, d: .25, type: 'sine', gain: .19 }
    };
    const profile = profiles[kind] || profiles.impact;
    const now = audioContext.currentTime;
    const throttle = kind === 'impact' ? 0.065 : 0.035;
    if (now - (combatSoundLastPlayed[kind] || -Infinity) < throttle) return;
    combatSoundLastPlayed[kind] = now;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.type = profile.type;
    oscillator.frequency.setValueAtTime(profile.f, now);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, profile.end), now + profile.d);
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(profile.gain * combatSettings.volume, now + .012);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + profile.d);
    oscillator.connect(gainNode); gainNode.connect(audioContext.destination);
    oscillator.start(now); oscillator.stop(now + profile.d + .015);
  } catch (error) { /* Audio is optional; combat must continue if the browser blocks sound. */ }
}
function loadImage(src) {
  if (!src) return null;
  const image = new Image();
  image.onload = () => { if ($('game')?.classList.contains('active')) drawFrame(); if ($('lobby')?.classList.contains('active')) drawHeroPreview(performance.now()); };
  image.onerror = () => console.warn('Asset not found or could not be loaded:', src);
  image.src = src;
  return image;
}
function loadFrameSequence(definition) {
  if (!definition || !definition.folder || !definition.count) return [];
  const frames = [];
  for (let i = 0; i < definition.count; i++) {
    const file = `${definition.folder}/frame_${String(i).padStart(2, '0')}.png`;
    frames.push(loadImage(file));
  }
  return frames;
}
function requestGameplayBackgroundPlayback() {
  const video = gameplayBackgroundVideo;
  if (!video || document.hidden || gameplayVideoPlayPending || !video.paused) return;
  gameplayVideoPlayPending = true;
  let playResult;
  try { playResult = video.play(); }
  catch (_) { gameplayVideoPlayPending = false; return; }
  Promise.resolve(playResult).catch(() => {
    // Muted autoplay is normally allowed. If the browser blocks it, a later
    // user gesture (opening/resuming the game) will retry without breaking play.
  }).finally(() => { gameplayVideoPlayPending = false; });
}
function setGameplayBackgroundForStage(stageIndex = currentStage) {
  const video = gameplayBackgroundVideo || $('gameBackgroundVideo');
  if (!video) return false;
  gameplayBackgroundVideo = video;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  const source = GAMEPLAY_VIDEO_CONFIG.stageSources[stageIndex] || GAMEPLAY_VIDEO_CONFIG.defaultSource;
  if (!source) return false;
  if (video.dataset.ashenSource !== source) {
    video.pause();
    video.dataset.ashenSource = source;
    gameplayVideoFailedSource = '';
    video.removeAttribute('src');
    video.src = source;
    video.load();
  }
  if (!video.dataset.ashenErrorListener) {
    video.addEventListener('error', () => {
      gameplayVideoFailedSource = video.dataset.ashenSource || '';
      console.warn(`[ASHEN HALO] Gameplay video could not be loaded: ${gameplayVideoFailedSource}. Falling back to the image background.`);
    });
    video.dataset.ashenErrorListener = '1';
  }
  requestGameplayBackgroundPlayback();
  return true;
}
function drawGameplayVideoBackground(ctx, video, w, h) {
  if (!video || video.readyState < 2 || !video.videoWidth || !video.videoHeight) return false;
  const sourceRatio = video.videoWidth / video.videoHeight;
  const targetRatio = w / h;
  let sx = 0, sy = 0, sw = video.videoWidth, sh = video.videoHeight;
  if (sourceRatio > targetRatio) {
    sw = video.videoHeight * targetRatio;
    const maxX = Math.max(0, video.videoWidth - sw);
    const progress = Math.max(0, Math.min(1, cameraX / Math.max(1, WORLD_W - CANVAS_W)));
    const pan = Math.max(0, Math.min(1, 0.18 + progress * GAMEPLAY_VIDEO_CONFIG.parallax * 0.64));
    sx = maxX * pan;
  } else {
    sh = video.videoWidth / targetRatio;
    sy = Math.max(0, (video.videoHeight - sh) * 0.5);
  }
  try {
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, w, h);
    return true;
  } catch (_) {
    return false;
  }
}
function preloadFileAssets() {
  fallbackCharacterImage = loadImage(ASSET_CONFIG.player?.fallback || 'assets/characters/player/idle/frame_00.png') || new Image();
  for (const state of ['idle', 'walk', 'run', 'jump', 'dash', 'dodge', 'attack']) {
    playerAnimations[state] = loadFrameSequence(ASSET_CONFIG.player?.animations?.[state]);
  }
  playerAnimations.ultimate = loadFrameSequence(ULTIMATE_ANIMATION_CONFIG);
  effectAnimations = Object.create(null);
  for (const [name, definition] of Object.entries(ASSET_CONFIG.effects || {})) effectAnimations[name] = loadFrameSequence(definition);
  bossRosterImages = (ASSET_CONFIG.bossRoster || []).map(loadImage);
  backgroundImages = stages.map(stage => loadImage((ASSET_CONFIG.backgrounds || [])[stage.backgroundIndex % Math.max(1,(ASSET_CONFIG.backgrounds||[]).length)]));
  bossImages = stages.map((stage,i) => loadImage((ASSET_CONFIG.bosses || [])[stage.bossMajor ? (stage.index%5) : (stage.regionIndex%5)]));
}
function readyFrames(frames) {
  return (frames || []).filter(image => image && image.complete && image.naturalWidth > 0);
}
function showScreen(id) {
  if (id !== 'game' && typeof releaseAllKeys === 'function') releaseAllKeys();
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  const screen = $(id);
  if (!screen) return;
  screen.classList.add('active');
  if (id !== 'lobby') pauseLobbyMusicForGame();
  if (id === 'game') { setGameplayBackgroundForStage(currentStage); paused = true; drawFrame(); }
  if (id === 'lobby') { syncHeroNameInput(); drawHeroPreview(performance.now()); resumeLobbyMusicInLobby(); }
  if (id === 'sanctuary') renderSanctuary();
  if (id === 'stages') renderStages();
}
function sanitizeHeroName(value) {
  return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, '').replace(/[^\p{L}\p{N} _\-\u200c]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 18);
}
function heroText(value) {
  const name=heroName || 'فرشته';
  return String(value ?? '').replace(/سِرا|سرا/g, name);
}
function updateHeroNameMentions() {
  try { document.querySelectorAll('[data-hero-name]').forEach(node=>{node.textContent=heroName;}); } catch (_) {}
}
function previewHeroName(value) {
  draftHeroName=sanitizeHeroName(value);
  const preview=$('heroNamePreview');
  if(preview) preview.textContent=draftHeroName || 'نام انتخاب نشده';
  const status=$('heroNameStatus');
  if(status) status.textContent=draftHeroName ? 'همین نام در سراسر داستان و نشانگرهای بازی می‌آید.' : 'قبل از شروع، نامی برای فرشته انتخاب کن.';
}
function syncHeroNameInput(force=false) {
  const input=$('heroNameInput');
  if(input && heroName && (force || !String(input.value || '').trim())) input.value=heroName;
  previewHeroName(input?.value || heroName);
  const label=$('playerNameLabel');
  if(label) label.textContent=`جان ${heroName||'فرشته'}`;
  updateHeroNameMentions();
}
function commitHeroName() {
  const input=$('heroNameInput');
  const candidate=input && typeof input.value==='string' ? input.value : (heroName||'سِرا');
  const clean=sanitizeHeroName(candidate);
  if(!clean){
    const status=$('heroNameStatus');
    if(status) status.textContent='برای شروع، اول نام فرشته را بنویس.';
    if(input && typeof input.focus==='function') input.focus();
    return false;
  }
  heroName=clean;draftHeroName=clean;
  try{localStorage.setItem('ashen-halo-hero-name',JSON.stringify(heroName));}catch(_){/* Local storage is optional. */}
  syncHeroNameInput();updateHeroNameMentions();
  return true;
}
function updatePlayerHealthHud() {
  const bar=$('playerHealth');
  if(bar && player && Number.isFinite(player.hp)) bar.style.width=`${Math.max(0,Math.min(100,player.hp/getPlayerMaxHp()*100))}%`;
  const label=$('playerNameLabel');
  if(label) label.textContent=`جان ${heroName||'فرشته'}`;
}
function updateTop() {
  $('coins').textContent = coins;
  $('weaponName').textContent = weapons[equipped].name;
  try { localStorage.setItem('ashen-halo-coins', JSON.stringify(coins)); localStorage.setItem('ashen-halo-owned', JSON.stringify(owned)); localStorage.setItem('ashen-halo-equipped', JSON.stringify(equipped)); } catch (_) {}
  if ($('profileModal')?.classList.contains('open')) updateHeroProfile();
  if ($('topProfileLevel')) $('topProfileLevel').textContent = `LV. ${campaignProgress?.level || 1}`;
}
function updateHeroProfile() {
  const progress = campaignProgress || {};
  const stage = stages[currentStage] || {};
  const act = CAMPAIGN_DATA.acts?.[stage.actIndex || 0] || {};
  const level = Math.max(1, Number(progress.level) || 1);
  const xp = Math.max(0, Number(progress.xp) || 0);
  const xpNext = Math.max(1, Number(progress.xpNext) || 120);
  const completed = Array.isArray(progress.completedStages) ? progress.completedStages.length : 0;
  const totalKills = Math.max(0, Number(progress.totalKills) || 0);
  const totalBosses = Math.max(0, Number(progress.totalBosses) || 0);
  const totalFrames = Math.max(0, Number(progress.playFrames) || 0);
  const totalMinutes = Math.floor(totalFrames / 60 / 60);
  const playTime = `${Math.floor(totalMinutes / 60)}h ${String(totalMinutes % 60).padStart(2, '0')}m`;
  const setText = (id, value) => { const node = $(id); if (node) node.textContent = String(value); };

  setText('topProfileLevel', `LV. ${level}`);
  setText('profileHeroName', heroName || 'The Fallen Angel');
  setText('profileLevel', String(level).padStart(2, '0'));
  setText('profileXpText', `${xp.toLocaleString('en-US')} / ${xpNext.toLocaleString('en-US')} XP`);
  const xpBar = $('profileXpBar');
  if (xpBar) xpBar.style.width = `${Math.max(0, Math.min(100, xp / xpNext * 100))}%`;
  setText('profileCoins', coins.toLocaleString('en-US'));
  setText('profileStages', `${completed} / ${stages.length || 36}`);
  setText('profileKills', totalKills.toLocaleString('en-US'));
  setText('profileBosses', totalBosses.toLocaleString('en-US'));
  setText('profileCurrentStage', stage.name || 'Unknown Realm');
  setText('profileAct', act.subtitle || act.name || 'ASHEN HALO CAMPAIGN');
  setText('profileWeapon', weapons[equipped]?.name || 'Unknown Weapon');
  setText('profileWeaponOwned', `${owned.length} / ${weapons.length} weapons owned`);
  setText('profilePlaytime', playTime);
}
function openHeroProfile() {
  const modal = $('profileModal');
  if (!modal) return;
  updateHeroProfile();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('profile-open');
  const close = modal.querySelector('.profile-close');
  if (close) close.focus({ preventScroll: true });
}
function closeHeroProfile() {
  const modal = $('profileModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('profile-open');
  const trigger = document.querySelector('.profile-trigger');
  if (trigger) trigger.focus({ preventScroll: true });
}
function renderJourney() {
  const host=$('journey');if(!host)return;
  const unlockedAct=Math.min(5,Math.floor(campaignProgress.unlockedStage/6));
  host.innerHTML=CAMPAIGN_DATA.acts.map((act,i)=>{
    const total=stages.filter(s=>s.actIndex===i).length,done=campaignProgress.completedStages.filter(n=>stages[n]?.actIndex===i).length,locked=i>unlockedAct;
    return `<div class="journey-card ${locked?'locked':''}"><span class="num">ACT 0${i+1} · ${done}/${total}</span><h3>${act.name}</h3><p>${act.subtitle}</p><p class="journey-lore">${locked?'برای رسیدن به این بخش، باید مُهرهای قبلی را بشکنی.':heroText(act.intro)}</p><div class="progress-mini"><i style="width:${Math.round(done/total*100)}%"></i></div></div>`;
  }).join('');
  renderStoryArchive();
}
function renderStoryArchive() {
  const host = $('storyArchive');if(!host)return;
  const unlockedAct=Math.min(5,Math.floor(campaignProgress.unlockedStage/6));
  host.innerHTML=CAMPAIGN_DATA.acts.map((act,i)=>{
    const regionNames=[...new Set(stages.filter(s=>s.actIndex===i).map(s=>s.regionName))].join(' · ');
    if(i>unlockedAct)return `<article class="chapter-lore locked"><span class="eyebrow">ACT 0${i+1} / SEALED</span><h3>${act.name}</h3><p>این پرونده هنوز مُهر شده است. با پیشروی در کمپین، روایت آن باز می‌شود.</p></article>`;
    return `<article class="chapter-lore"><span class="eyebrow">ACT 0${i+1} / ${regionNames}</span><h3>${act.name}</h3><p>${heroText(act.intro)}</p><blockquote>${heroText(act.reveal)}</blockquote><p class="muted">${heroText(act.ending)}</p></article>`;
  }).join('');
}
function setStoryCaption(speaker, text, duration = 230) {
  storyCaption = {speaker:heroText(speaker || 'راوی'), text:heroText(text || ''), timer:duration, max:duration};
}
function updateStoryProgress() {
  const beats = currentActLore().moments || [];
  while (player.storyBeat < beats.length && player.x >= beats[player.storyBeat].x) {
    setStoryCaption(player.storyBeat === 0 ? 'اِیرِن' : 'سِرا', beats[player.storyBeat].text, 250);
    player.storyBeat++;
  }
}
function enemyDifficultyScale(){return 1+Math.min(1.5,currentStage/28)*.34+Math.max(0,campaignProgress?.ngPlus||0)*.18;}
function createEnemy(x,index,kindOverride=null){
  const stage=stages[currentStage],act=stage.actIndex||0;
  const kinds=['ranged','jumper','duelist','brute','caster','stalker'];
  const role=(index+stage.encounterPattern+stage.regionIndex*2+act)%kinds.length;
  const kind=kindOverride||kinds[role];
  const baseHp=8.5+act*2.15+(currentStage%6)*.9+(campaignProgress.ngPlus||0)*2.2;
  const hpScale={ranged:1.08,jumper:1.22,duelist:1.42,brute:1.88,caster:1.16,stalker:1.25}[kind]||1.2;
  const moveSpeed={ranged:.76,jumper:1.12,duelist:1.22,brute:.67,caster:.72,stalker:.94}[kind]||.85;
  const attackDamage={ranged:8,jumper:12,duelist:12,brute:17,caster:9,stalker:10}[kind]||9;
  const range={ranged:320,jumper:310,duelist:255,brute:195,caster:350,stalker:275}[kind]||240;
  const hp=Math.round(baseHp*hpScale*enemyDifficultyScale());
  return {
    x,homeX:x,min:Math.max(28,x-range),max:Math.min(WORLD_W-72,x+range),hp,maxHp:hp,alive:true,
    dir:index%2?-1:1,attackCooldown:68+(index%4)*17,flash:0,seed:(index+1)*3.17+currentStage*.31,
    rosterIndex:(index*3+currentStage*2+stage.regionIndex)%12,stun:0,hitLift:0,hitLiftV:0,
    kind,moveSpeed,attackDamage:Math.round(attackDamage*(1+act*.11)*enemyDifficultyScale()),
    airY:0,jumpVY:0,jumpVX:0,windup:0,aiAction:'',lockedDir:1,lungeTimer:0,lungeVx:0,
    attackResolved:false,landingSlam:false,jumpCooldown:95+(index%3)*24,evadeCooldown:35,
    targetX:x,retreatBias:0,contactCooldown:0
  };
}
function spawnEnemyWave(baseX, count = 3) {
  for (let i=0;i<count;i++) {
    const x=Math.max(100,Math.min(WORLD_W-500,baseX+i*92));
    const mob=createEnemy(x,i+mobs.length);
    mob.attackCooldown=Math.max(35,mob.attackCooldown-12);
    mobs.push(mob);
  }
  setCombatToast('صدای قدم‌ها نزدیک‌تر شده. این نگهبان‌ها ساده از میدان کنار نمی‌روند.','#f7d9e1',72);
}

function renderStages() {
  const grid=$('stageGrid');if(!grid)return;
  grid.innerHTML=CAMPAIGN_DATA.acts.map((act,actIndex)=>{
    const cards=stages.filter(s=>s.actIndex===actIndex).map(stage=>{
      const i=stage.index,unlocked=i<=campaignProgress.unlockedStage,done=campaignProgress.completedStages.includes(i);
      const bg=(ASSET_CONFIG.backgrounds||[])[stage.backgroundIndex]||'';
      const major=stage.bossMajor?'<span class="stage-tag boss-tag">BOSS ENCOUNTER</span>':'<span class="stage-tag">STORY MISSION</span>';
      return `<article class="stage-card ${unlocked?'':'locked'} ${done?'completed':''}"><div class="stage-art" style="background:linear-gradient(135deg,${stage.color},#10111a)"><img class="stage-bg-thumb" src="${bg}" alt=""><div class="stage-art-mark">${done?'✓':unlocked?'✦':'⌑'}</div></div><div class="stage-card-meta"><span class="eyebrow">${String(i+1).padStart(2,'0')} / 36</span>${major}</div><h3>${stage.name}</h3><p>${unlocked?`${stage.regionName} · ${heroText(stage.desc)}`:'این منطقه هنوز در نقشه آشکار نشده است.'}</p><p class="stage-objective"><b>هدف:</b> ${unlocked?stage.objective:'ناشناخته'}</p><p>نگهبان: <b>${unlocked?heroText(stage.boss):'ناشناخته'}</b></p><button class="${done?'secondary':'primary'}" ${unlocked?'':'disabled'} onclick="loadStage(${i})">${done?'تکرار مأموریت':unlocked?'شروع مأموریت':'قفل است'}</button></article>`;
    }).join('');
    const completed=campaignProgress.completedStages.filter(n=>stages[n]?.actIndex===actIndex).length;
    return `<section class="act-section"><div class="act-heading"><span class="eyebrow">${act.subtitle}</span><h3>${act.name}</h3><p>${act.intro}</p><small>${completed} از ۶ مأموریت تکمیل شده</small></div><div class="stage-grid act-stage-grid">${cards}</div></section>`;
  }).join('');
}
function renderShop() {
  const grid = $('shopGrid');
  if (!grid) return;
  grid.innerHTML = weapons.map((w, i) => `<article class="shop-card"><div class="weapon-icon" style="color:${w.color}"><img class="weapon-preview" src="${(ASSET_CONFIG.weaponSprites || [])[w.spriteIndex] || ''}" alt="${w.name}"><span hidden>${w.icon}</span></div><h3>${w.name}</h3><p><b class="rarity-label">${w.rarity||'معمولی'}</b><br>${w.desc}<br>قدرت: ×${w.damage}</p><div class="price">${w.price === 0 ? 'رایگان' : `🪙 ${w.price}`}</div>${equipped === i ? '<button class="secondary" style="width:100%;margin-top:10px" disabled>مجهز شده</button>' : owned.includes(i) ? `<button class="primary" onclick="equip(${i})">استفاده از سلاح</button>` : `<button class="primary" onclick="buy(${i})">خرید سلاح</button>`}</article>`).join('');
}
function buy(i) {
  if (coins < weapons[i].price) { alert('سکه کافی نداری!'); return; }
  coins -= weapons[i].price; owned.push(i); equipped = i; updateTop(); renderShop();
}
function equip(i) { if (!owned.includes(i)) return; equipped = i; updateTop(); renderShop(); }
function buyGear(id){const item=GEAR_ITEMS.find(g=>g.id===id);if(!item)return;if(campaignProgress.gearOwned.includes(id)){equipGear(id);return;}if(coins<item.price){setCombatToast('سکه‌ی کافی برای این تجهیزات نداری.','#ffc0ca',55);return;}coins-=item.price;campaignProgress.gearOwned.push(id);campaignProgress.gearEquipped[item.slot]=id;updateTop();saveCampaignProgress();renderSanctuary();}
function equipGear(id){const item=GEAR_ITEMS.find(g=>g.id===id);if(!item||!campaignProgress.gearOwned.includes(id))return;campaignProgress.gearEquipped[item.slot]=id;saveCampaignProgress();renderSanctuary();setCombatToast(`${item.name} مجهز شد.`,'#d5e6ff',50);}


function startSideQuest(id){
  const quest=CAMPAIGN_DATA.sideQuests.find(q=>q.id===id);if(!quest)return;
  if(quest.stageIndex>campaignProgress.unlockedStage){setCombatToast('این مأموریت هنوز در دسترس نیست.','#ffc0ca',55);return;}
  if(campaignProgress.sideQuestProgress[id]?.status==='complete'){setCombatToast('این مأموریت قبلاً کامل شده است.','#bde5c2',55);return;}
  if(campaignProgress.activeSideQuest&&campaignProgress.activeSideQuest!==id&&campaignProgress.sideQuestProgress[campaignProgress.activeSideQuest]?.status==='active'){
    setCombatToast('ابتدا مأموریت فعال را به پایان برسان.','#ffc0ca',70);return;
  }
  campaignProgress.activeSideQuest=id;campaignProgress.sideQuestProgress[id]={status:'active',progress:0};saveCampaignProgress();renderSanctuary();
  setCombatToast(`مأموریت پذیرفته شد: ${quest.title}`,'#e8c7ff',80);
}
function updateSideQuestProgress(eventType,amount=1){
  const id=campaignProgress.activeSideQuest;if(!id)return;
  const q=CAMPAIGN_DATA.sideQuests.find(item=>item.id===id);const state=campaignProgress.sideQuestProgress[id];
  if(!q||!state||state.status!=='active'||q.stageIndex!==currentStage)return;
  if(q.type!==eventType)return;
  state.progress=Math.min(q.target,(state.progress||0)+amount);
  if(state.progress>=q.target){state.status='ready';setCombatToast(`مأموریت آماده‌ی تحویل است: ${q.title}`,'#ffe2a9',100);}
  saveCampaignProgress();
}
function claimSideQuest(id){
  const q=CAMPAIGN_DATA.sideQuests.find(item=>item.id===id);const state=campaignProgress.sideQuestProgress[id];
  if(!q||!state||state.status!=='ready')return;
  state.status='complete';campaignProgress.activeSideQuest=null;coins+=q.rewardCoins;gainExperience(q.rewardXp);
  if(q.rewardItem==='relic'){const relic=`نشان ${q.title}`;if(!campaignProgress.relics.includes(relic))campaignProgress.relics.push(relic);}
  updateTop();saveCampaignProgress();renderSanctuary();setCombatToast('پاداش مأموریت دریافت شد!','#ffe3a8',90);
}

function talkToSanctuaryNpc(id){
  const npcLines={
    eiren:[
      'اِیرِن: «من نقشه‌ی راهت نیستم؛ یادآور انتخاب‌هایی هستم که هنوز می‌توانی انجام بدهی. هر مُهر، نامی را برمی‌گرداند.»',
      'اِیرِن: «وقتی هاله ساخته شد، هیچ‌کس نپرسید نام‌های خاموش چه می‌خواهند. این بار تو می‌توانی بپرسی.»',
      'اِیرِن: «در خلأ، صدای من را دنبال نکن. صدای کسانی را دنبال کن که پیش از من از یاد رفتند.»'
    ],
    vey:[
      'وِی: «هر تیغه یک خاطره دارد. شمشیرِ خوب فقط تیز نیست؛ می‌داند کجا باید متوقف شود.»',
      'وِی: «فلز آسمانی را با خاکستر زمینی آمیختم. اگر سلاحی خواستی که نامی نداشته باشد، باید نخست بهایش را بدانی.»',
      'وِی: «مادرآهن زمانی شاگرد من بود. زنجیرهایش را برای بستن هیولاها ساخت، نه فرشته‌ها.»'
    ],
    mora:[
      'مورا: «من چیزی را رایگان نمی‌دهم؛ اما گاهی سرنخ از سکه ارزشمندتر است. صندوق‌ها را پشت دیوارهای خاموش جست‌وجو کن.»',
      'مورا: «سه راه برای زنده‌ماندن هست: پیش از دیدن دشمن حرکت کن، هنگام هشدار گوش بده، و هرگز همه‌ی انرژی‌ات را یک‌جا خرج نکن.»',
      'مورا: «اگر دنبال حقیقتی، سراغ کسی نرو که از آن سود می‌برد. اسناد قدیمی از زیر آب شروع می‌شوند.»'
    ]
  };
  const lines=npcLines[id];if(!lines)return;
  const count=Number(campaignProgress.npcConversations[id]||0),line=lines[Math.min(count,lines.length-1)];
  campaignProgress.npcConversations[id]=Math.min(lines.length,count+1);
  const key=`sanctuary-${id}-${count}`;if(!campaignProgress.loreFragments.includes(key))campaignProgress.loreFragments.push(key);
  saveCampaignProgress();setStoryCaption(id==='eiren'?'اِیرِن':id==='vey'?'وِی · آهنگر':'مورا · بازرگان',line,360);setCombatToast('گفت‌وگو در بایگانی ثبت شد.','#e2cbff',65);renderSanctuary();
}

function renderSanctuary(){
  const host=$('sanctuaryContent');if(!host)return;
  const activeId=campaignProgress.activeSideQuest,active=activeId?CAMPAIGN_DATA.sideQuests.find(q=>q.id===activeId):null,activeState=active?campaignProgress.sideQuestProgress[activeId]:null;
  const xpPct=Math.min(100,campaignProgress.xp/campaignProgress.xpNext*100);
  const stats=[['strength','قدرت'],['agility','چابکی'],['vitality','جان'],['energy','انرژی'],['crit','ضربه‌ی بحرانی'],['defense','دفاع']];
  const skills=[['sword','استادی شمشیر'],['crimson','انرژی سرخ'],['angel','قدرت فرشته'],['shadow','فن سایه'],['guard','دفاع هاله']];
  const quests=CAMPAIGN_DATA.sideQuests.map(q=>{
    const state=campaignProgress.sideQuestProgress[q.id]||{status:'locked',progress:0};const unlocked=q.stageIndex<=campaignProgress.unlockedStage;
    const label=state.status==='complete'?'تکمیل‌شده':state.status==='ready'?'آماده‌ی تحویل':state.status==='active'?'در حال انجام':unlocked?'دریافت مأموریت':'قفل است';
    const action=state.status==='ready'?`<button class="primary" onclick="claimSideQuest('${q.id}')">دریافت پاداش</button>`:state.status==='active'?'<span class="quest-state active">فعال</span>':state.status==='complete'?'<span class="quest-state done">انجام شد</span>':`<button class="secondary" ${unlocked?'':'disabled'} onclick="startSideQuest('${q.id}')">${label}</button>`;
    return `<article class="quest-card"><div><b>${q.title}</b><p>${q.description}</p><small>${heroText(q.lore)}</small><div class="quest-progress">${state.progress||0} / ${q.target} · ${label}</div></div>${action}</article>`;
  }).join('');
  host.innerHTML=`<div class="sanctuary-hero"><div><span class="eyebrow">THE SANCTUARY OF ASH</span><h3>پناهگاه خاکستر</h3><p>پناهگاهی که با هر مُهر آزادشده زنده‌تر می‌شود. از اینجا می‌توانی مسیر، تجهیزات، مهارت‌ها و سرنوشت همراهانت را مدیریت کنی.</p></div><div class="level-medallion"><b>${campaignProgress.level}</b><small>سطح سِرا</small></div></div>
    <section class="sanctuary-panel npc-panel"><div class="section-heading compact"><div><span class="eyebrow">THE PEOPLE WHO REMAIN</span><h3>بازماندگان پناهگاه</h3></div></div><div class="npc-grid"><article class="npc-card"><span class="npc-portrait eiren-portrait">✧</span><div><b>اِیرِن · کاتب خاموش</b><p>همراهی که تکه‌های حافظه‌ی سِرا را به هم پیوند می‌دهد.</p><button class="secondary" onclick="talkToSanctuaryNpc('eiren')">گفت‌وگو</button></div></article><article class="npc-card"><span class="npc-portrait vey-portrait">⚒</span><div><b>وِی · آهنگر تبعیدی</b><p>سازنده‌ی تیغه‌ها؛ از راز آهن آسمانی خبر دارد.</p><button class="secondary" onclick="talkToSanctuaryNpc('vey')">گفت‌وگو</button></div></article><article class="npc-card"><span class="npc-portrait mora-portrait">◈</span><div><b>مورا · بازرگان سرگردان</b><p>خبرها و مسیرهای پنهان را با بهایی منصفانه معامله می‌کند.</p><button class="secondary" onclick="talkToSanctuaryNpc('mora')">گفت‌وگو</button></div></article></div></section><div class="sanctuary-stats"><div><small>تجربه</small><b>${campaignProgress.xp} / ${campaignProgress.xpNext}</b><div class="xp-bar"><i style="width:${xpPct}%"></i></div></div><div><small>امتیاز ویژگی</small><b>${campaignProgress.attributePoints}</b></div><div><small>امتیاز مهارت</small><b>${campaignProgress.skillPoints}</b></div><div><small>سکه</small><b>🪙 ${coins}</b></div><div><small>مأموریت‌ها</small><b>${campaignProgress.completedStages.length} / 36</b></div></div>
    <div class="sanctuary-facilities"><button class="feature-card" onclick="showScreen('shop')"><span class="feature-icon">⚒</span><b>آهنگر</b><small>خرید و تجهیز شش تیغه‌ی اصلی</small></button><button class="feature-card" onclick="showScreen('stages')"><span class="feature-icon">✥</span><b>نقشه‌ی جهان</b><small>۳۶ مأموریت در ۶ پرده</small></button><button class="feature-card" onclick="showScreen('codex')"><span class="feature-icon">📜</span><b>بایگانی خاطرات</b><small>${campaignProgress.loreFragments.length} قطعه‌ی خاطره آزاد شده</small></button></div>
    <section class="sanctuary-panel equipment-panel"><div class="section-heading compact"><div><span class="eyebrow">ARMOR · ACCESSORIES · RELICS</span><h3>تجهیزات ${heroName||'فرشته'}</h3></div></div><div class="gear-grid">${GEAR_ITEMS.map(item=>{const ownedItem=campaignProgress.gearOwned.includes(item.id),equippedItem=campaignProgress.gearEquipped[item.slot]===item.id;return `<article class="gear-card"><span class="gear-rarity">${item.rarity} · ${item.slotName}</span><b>${item.name}</b><p>${item.desc}</p><small>افزایش: ${Object.entries(item.bonus).map(([k,v])=>`${({strength:'قدرت',agility:'چابکی',vitality:'جان',energy:'انرژی',crit:'بحرانی',defense:'دفاع'})[k]} +${v}`).join(' · ')}</small>${equippedItem?'<span class="quest-state done">مجهز است</span>':ownedItem?`<button class="secondary" onclick="equipGear('${item.id}')">تجهیز</button>`:`<button class="primary" onclick="buyGear('${item.id}')">خرید · ${item.price} سکه</button>`}</article>`;}).join('')}</div></section>
    <div class="sanctuary-columns"><section class="sanctuary-panel"><div class="section-heading compact"><div><span class="eyebrow">CHARACTER ATTRIBUTES</span><h3>ویژگی‌های ${heroName||'فرشته'}</h3></div></div><p class="muted">هر بار ارتقای سطح، دو امتیاز ویژگی دریافت می‌کنی.</p><div class="attribute-grid">${stats.map(([key,label])=>`<div class="attribute-row"><span>${label}</span><b>${playerStat(key)}</b><button onclick="spendAttribute('${key}')" ${campaignProgress.attributePoints>0?'':'disabled'}>+</button></div>`).join('')}</div><div class="section-heading compact"><div><span class="eyebrow">FIVE PATHS</span><h3>درخت مهارت</h3></div></div><div class="skill-grid">${skills.map(([key,label])=>`<div class="skill-row"><div><b>${label}</b><small>رتبه ${campaignProgress.skills[key]} / ۵</small></div><button onclick="upgradeSkill('${key}')" ${campaignProgress.skillPoints>0&&campaignProgress.skills[key]<5?'':'disabled'}>ارتقا</button></div>`).join('')}</div></section>
    <section class="sanctuary-panel"><div class="section-heading compact"><div><span class="eyebrow">QUEST BOARD</span><h3>تابلوی مأموریت‌ها</h3></div></div>${active?`<div class="active-quest"><b>مأموریت فعال: ${active.title}</b><p>${active.description}</p><span>${activeState.progress||0} / ${active.target}</span></div>`:'<p class="muted">هنوز مأموریت جانبی فعالی انتخاب نشده است.</p>'}<div class="quest-list">${quests}</div></section></div>
    <section class="sanctuary-panel collection-panel"><div class="section-heading compact"><div><span class="eyebrow">RELIC ARCHIVE</span><h3>یادگارها و رازها</h3></div></div><p>یادگارهای به‌دست‌آمده: ${campaignProgress.relics.length} · اسرار کشف‌شده: ${campaignProgress.secrets.length} · دشمنان شکست‌خورده: ${campaignProgress.totalKills}</p><div class="collection-tags">${campaignProgress.relics.length?campaignProgress.relics.map(r=>`<span>${r}</span>`).join(''):'<span>هنوز یادگاری پیدا نشده است.</span>'}</div></section>
    <section class="sanctuary-panel mode-panel"><div class="section-heading compact"><div><span class="eyebrow">BEYOND THE JOURNEY</span><h3>چالش‌های پس از کمپین</h3></div></div><p class="muted">حالت‌های چالشی از پیشرفت کمپین اصلی جدا هستند.</p><div class="mode-actions"><button class="secondary" onclick="startBossRush()">نبرد پیاپی باس‌ها</button><button class="secondary" onclick="startSurvivalMode()">میدان بقا</button><button class="primary" onclick="startNewGamePlus()" ${campaignProgress.completedStages.length>=36?'':'disabled'}>آغاز بازی نو +</button></div><small>بازی نو + پس از پایان هر ۳۶ مرحله فعال می‌شود.</small></section>`;
}
function startNewGamePlus(){
  if(!commitHeroName())return;
  if(campaignProgress.completedStages.length<36){setCombatToast('ابتدا کمپین اصلی را کامل کن.','#ffc0ca',70);return;}
  campaignProgress.ngPlus++;campaignProgress.unlockedStage=0;campaignProgress.lastStage=0;campaignProgress.completedStages=[];campaignProgress.checkpointByStage={};campaignMode='ngplus';saveCampaignProgress();loadStage(0,true,true);setCombatToast(`بازی نو + ${campaignProgress.ngPlus} آغاز شد؛ دشمنان نیرومندترند.`,'#e8c7ff',100);
}
function startBossRush(){
  if(!commitHeroName())return;
  campaignMode='bossrush';bossRushQueue=CAMPAIGN_DATA.majorBosses.map(b=>stages.findIndex(s=>s.bossProfile.id===b.id)).filter(i=>i>=0);if(!bossRushQueue.length){setCombatToast('حالت نبرد باس در دسترس نیست.');return;}loadStage(bossRushQueue.shift(),true,true);setCombatToast('نبرد پیاپی باس‌ها آغاز شد.','#ffd9e1',80);
}
function startSurvivalMode(){if(!commitHeroName())return;campaignMode='survival';survivalWaveTimer=0;loadStage(Math.min(campaignProgress.unlockedStage,5),true,true);mobs=[];spawnEnemyWave(450,6);boss.sealed=true;missionState={type:'survival',progress:0,target:999999,complete:false,timeLeft:0,kills:0};updateMissionHud();setCombatToast('میدان بقا — موج‌ها بی‌پایان هستند.','#ffd9e1',80);}

function createMobs() {
  const stage=stages[currentStage],count=stage.enemyCount||7;
  const mobsOut=[],step=(WORLD_W-920)/Math.max(1,count-1),offset=stage.formationOffset||0;
  for(let i=0;i<count;i++){
    let x=320+i*step;
    switch(stage.layoutPattern){
      case 'pincer': x=i%2===0?330+Math.floor(i/2)*step*.78:WORLD_W-470-Math.floor(i/2)*step*.78;break;
      case 'staggered': x+=((i%2)*122)+(Math.floor(i/2)%2)*-34;break;
      case 'ambush': x=370+Math.floor(i/3)*510+(i%3)*92;break;
      case 'relay': x=285+i*step*.94+(i%3)*42;break;
      case 'gauntlet': x=420+i*step*.82+(i%2)*75;break;
      case 'boss-approach': x=430+i*step*.9+offset*.35;break;
    }
    x=Math.max(250,Math.min(WORLD_W-480,x+((stage.regionIndex%3)-1)*23));
    mobsOut.push(createEnemy(x,i));
  }
  return mobsOut;
}
function createStageObjects(){
  const stage=stages[currentStage],objects=[];
  if(stage.missionType==='relic')stage.pickupXs.forEach((x,i)=>objects.push({id:`memory-${i}`,type:'relic',x,y:GROUND_Y-26,done:false,color:'#d9a8ff'}));
  if(stage.missionType==='mechanism'||stage.missionType==='rescue')stage.interactX.forEach((x,i)=>objects.push({id:`objective-${i}`,type:stage.missionType,x,y:GROUND_Y-28,done:false,color:stage.missionType==='rescue'?'#9fe2c3':'#f2c37b'}));
  (stage.sidePickupXs||[780,1480,2280]).forEach((x,i)=>objects.push({id:`side-memory-${i}`,type:'sideCollect',x,y:GROUND_Y-26,done:false,color:'#9ee7e2'}));
  if(stage.missionType!=='mechanism')objects.push({id:'side-mechanism',type:'sideMechanism',x:stage.sideMechanismX||1580,y:GROUND_Y-28,done:false,color:'#ecc78c'});
  objects.push({id:'hidden-cache',type:'secret',x:stage.secretX||2500,y:GROUND_Y-26,done:false,color:'#ffdc91'});
  objects.push({id:'lore-fragment',type:'lore',x:stage.loreX||1250,y:GROUND_Y-30,done:false,color:'#d7bdff'});
  objects.push({id:'checkpoint-1',type:'checkpoint',x:stage.checkpointXs[0],y:GROUND_Y-32,done:false,color:'#e9a0be'});
  objects.push({id:'checkpoint-2',type:'checkpoint',x:stage.checkpointXs[1],y:GROUND_Y-32,done:false,color:'#e9a0be'});
  return objects;
}

function updateMissionHud(){
  const stage=stages[currentStage];if(!stage||!missionState)return;
  const label=$('missionObjective'),progress=$('missionProgress');
  if(label)label.textContent=campaignMode==='survival'?'تا می‌توانی زنده بمان؛ موج‌ها پایان ندارند':missionState.complete?'هدف تکمیل شد — نگهبان آزاد است':stage.objective;
  if(progress){
    if(campaignMode==='survival')progress.textContent=`موج ${1+Math.floor(survivalWaveTimer/420)}`;
    else if(missionState.type==='survive')progress.textContent=`${Math.max(0,Math.ceil(missionState.timeLeft/60))} ثانیه باقی‌مانده`;
    else if(missionState.type==='hunt')progress.textContent='شکست باس نهایی';
    else progress.textContent=`${Math.min(missionState.progress,missionState.target)} / ${missionState.target}`;
  }
}
function completeMissionObjective(){
  if(!missionState||missionState.complete)return;
  missionState.complete=true;boss.sealed=false;$('bossName').textContent=stages[currentStage].boss;
  if(missionState.type==='survive')updateSideQuestProgress('survive');
  setCombatToast('مُهر مأموریت شکست — نگهبان آشکار شد!','#ffe3a8',115);spawnBurst(boss.x+58,GROUND_Y-85,stages[currentStage].accent,26,5.2);screenShake(4.5,9);updateMissionHud();
}
function updateMissionProgress(type,amount=1){
  if(!missionState||missionState.complete||missionState.type!==type)return;
  missionState.progress=Math.min(missionState.target,missionState.progress+amount);
  if(missionState.progress>=missionState.target)completeMissionObjective();
  updateMissionHud();
}
function processStageObjects(){
  if(!player||!levelObjects.length)return;
  const px=player.x+PLAYER_W/2;
  if(player.hazardCooldown>0)player.hazardCooldown--;
  const danger=(stages[currentStage].hazardZones||[]).find(z=>px>=z.x&&px<=z.x+z.w);
  if(danger&&player.onGround&&player.hazardCooldown<=0&&player.invuln<=0){const dmg=Math.max(2,5+stages[currentStage].actIndex-playerStat('defense')*.25);player.hp=Math.max(0,player.hp-dmg);player.hazardCooldown=58;player.hitFlash=8;player.invuln=18;spawnBurst(px,GROUND_Y-9,stages[currentStage].accent,10,2.8);setCombatToast(`خطر محیطی: ${stages[currentStage].hazard}!`,'#ffb2a6',42);}
  for(const obj of levelObjects){
    if(obj.done)continue;
    if(obj.type==='checkpoint'&&px>=obj.x){obj.done=true;activeCheckpoint=obj.x;campaignProgress.checkpointByStage[currentStage]=obj.x;saveCampaignProgress();setCombatToast('نقطه‌ی بازگشت فعال شد.','#c9e8ff',45);continue;}
    if((obj.type==='relic'||obj.type==='sideCollect')&&Math.abs(px-obj.x)<42){obj.done=true;campaignProgress.relics.push(`خاطره‌ی ${stages[currentStage].regionName} ${campaignProgress.relics.length+1}`);if(obj.type==='relic')updateMissionProgress('relic');updateSideQuestProgress('collect');gainExperience(24);spawnBurst(obj.x,GROUND_Y-20,obj.color||'#d8a5ff',14,2.8);setCombatToast('تکه‌ی خاطره بازیابی شد.','#e9d4ff',50);saveCampaignProgress();}
  }
}
function interactNearest(){
  if(paused||gameEnded||!player)return;
  const px=player.x+PLAYER_W/2;
  const candidate=levelObjects.filter(o=>!o.done&&['mechanism','sideMechanism','rescue','secret','lore'].includes(o.type)).sort((a,b)=>Math.abs(px-a.x)-Math.abs(px-b.x))[0];
  if(!candidate||Math.abs(px-candidate.x)>84){setCombatToast('چیزی برای تعامل در نزدیکی نیست.','#c9c0cb',36);return;}
  candidate.done=true;
  if(candidate.type==='mechanism'||candidate.type==='sideMechanism'){if(candidate.type==='mechanism')updateMissionProgress('mechanism');updateSideQuestProgress('mechanism');spawnEffect('impact-spark',candidate.x,GROUND_Y-38,1.1,player.facing,26);setCombatToast('سازوکار باستانی فعال شد.','#ffe0a4',65);}
  else if(candidate.type==='rescue'){updateMissionProgress('rescue');setCombatToast('بازمانده آزاد شد؛ مسیر امن‌تر شد.','#b7e6ce',65);gainExperience(30);}
  else if(candidate.type==='secret'){
    const id=`${stages[currentStage].id}-cache`;campaignProgress.secrets.push(id);coins+=55;campaignProgress.relics.push(`صندوق پنهان ${stages[currentStage].regionName}`);gainExperience(55);updateTop();spawnBurst(candidate.x,GROUND_Y-30,'#ffda8a',24,4.2);setCombatToast('صندوق پنهان پیدا شد! +۵۵ سکه و یادگار نادر','#ffe1a5',90);saveCampaignProgress();
  }else if(candidate.type==='lore'){
    const id=`lore-${currentStage}`;if(!campaignProgress.loreFragments.includes(id))campaignProgress.loreFragments.push(id);gainExperience(35);setStoryCaption('خاطره‌ی بازیافته',`«${stages[currentStage].regionName}، ${CAMPAIGN_DATA.acts[stages[currentStage].actIndex].reveal}»`,280);setCombatToast('قطعه‌ای از حقیقت به بایگانی افزوده شد.','#dfc7ff',80);saveCampaignProgress();
  }
  updateMissionHud();
}
function onMobDefeated(mob){
  if(mob.rewarded)return;mob.rewarded=true;campaignProgress.totalKills++;gainExperience(16+stages[currentStage].actIndex*4);updateMissionProgress('purge');updateSideQuestProgress('kill');
}
function stageBossDefeated(){
  const stage=stages[currentStage];
  if(missionState?.type==='hunt')completeMissionObjective();
  if(!campaignProgress.completedStages.includes(currentStage)){
    campaignProgress.completedStages.push(currentStage);campaignProgress.unlockedStage=Math.max(campaignProgress.unlockedStage,Math.min(stages.length-1,currentStage+1));
    campaignProgress.totalBosses++;coins+=stage.rewardCoins;gainExperience(stage.rewardXp);campaignProgress.checkpointByStage[currentStage]=0;
    if(stage.bossMajor){const dropIndex=Math.min(5,1+stage.actIndex);if(!owned.includes(dropIndex)){owned.push(dropIndex);campaignProgress.inventory.push(`${weapons[dropIndex]?.name||'تیغه‌ی تازه'} · غنیمت باس`);setCombatToast(`غنیمت افسانه‌ای: ${weapons[dropIndex]?.name||'سلاح تازه'}!`,'#ffe4a8',115);}}
    if(currentStage%6===5){const fragment=`act-${stage.actIndex}-seal`;if(!campaignProgress.loreFragments.includes(fragment))campaignProgress.loreFragments.push(fragment);}
    updateSideQuestProgress('boss');
  }else{coins+=Math.floor(stage.rewardCoins*.2);gainExperience(Math.floor(stage.rewardXp*.25));}
  saveCampaignProgress();updateTop();renderStages();renderJourney();
}
function loadStage(i,force=false,keepMode=false) {
  if(!commitHeroName()){showScreen('lobby');return false;}
  if(!keepMode)campaignMode='story';
  const next=Math.max(0,Math.min(stages.length-1,Number(i)||0));
  if(!force&&next>campaignProgress.unlockedStage){setCombatToast('این مأموریت هنوز قفل است. ابتدا مرحله‌های قبلی را کامل کن.','#ffc0ca',70);return;}
  currentStage=next;setGameplayBackgroundForStage(currentStage);campaignProgress.lastStage=currentStage;saveCampaignProgress();
  $('stageTitle').textContent=stages[currentStage].name;$('stageNumber').textContent=String(currentStage+1).padStart(2,'0');$('bossName').textContent=stages[currentStage].boss;
  resetGame();showScreen('game');return true;
}
function startGame(){if(!commitHeroName())return false;campaignMode='story';return loadStage(Math.min(campaignProgress.lastStage,campaignProgress.unlockedStage),true);}
function resetGame() {
  keys=Object.create(null);activeCheckpoint=Math.max(0,Math.min(WORLD_W-500,Number(campaignProgress.checkpointByStage[currentStage])||0));stageElapsedFrames=0;
  player={x:Math.max(95,activeCheckpoint+48),y:GROUND_Y-PLAYER_H,vx:0,vy:0,hp:getPlayerMaxHp(),onGround:true,jumpsLeft:2,facing:1,coyoteTimer:6,jumpBufferTimer:0,jumpHoldTimer:0,attackTimer:0,attackDuration:ATTACK_DURATION,attackImpactProgress:ATTACK_IMPACT_PROGRESS,attackMode:'light',attackCooldown:0,heavyCooldown:0,attackHit:false,combo:0,comboWindow:0,parryTimer:0,parryCooldown:0,perfectDodgeCooldown:0,aerialComboHits:0,energy:Math.min(100,(campaignProgress.skills.energy||0)*4),specialTimer:0,specialHit:false,specialCooldown:0,skillBurstTimer:0,burstHit:false,burstCooldown:0,crimsonCooldown:0,pendingCrimson:false,descentTimer:0,descentCooldown:0,descending:false,frostCooldown:0,voidBoltCooldown:0,voidBoltTimer:0,voidBoltHit:false,ultimateTimer:0,ultimateHit:false,ultimateElapsed:0,ultimateBaseX:0,ultimateBaseY:GROUND_Y-PLAYER_H,ultimateBaseVy:0,ultimateBaseOnGround:true,ultimateFacing:1,dashTimer:0,dashCooldown:0,bloodRainCooldown:0,soulSnareCooldown:0,bloodRainTimer:0,soulSnareTimer:0,castTimer:0,castKind:'',wingBurstTimer:0,invuln:0,hazardCooldown:0,walkTime:0,hitFlash:0,storyBeat:0,waveOne:false,waveTwo:false};
  const stage=stages[currentStage],profile=stage.bossProfile||{};
  const actScale=1+(stage.actIndex||0)*.22,ngScale=1+campaignProgress.ngPlus*.28;
  const maxHp=Math.round((205+(stage.actIndex||0)*64+(currentStage%6)*12)*(profile.hp||1)*ngScale*1.12);
  missionState={type:stage.missionType,progress:0,target:stage.objectiveTarget,complete:stage.missionType==='hunt',timeLeft:stage.missionType==='survive'?stage.objectiveTarget*60:0,kills:0};
  levelObjects=createStageObjects();
  boss={x:WORLD_W-270,hp:maxHp,maxHp,facing:-1,windup:0,cooldown:90,rangedCooldown:140,chargeTimer:0,chargeDir:-1,chargeHit:false,attackType:'slam',attackCycle:0,targetX:WORLD_W-270,phase:1,flash:0,staggerTimer:0,knockbackVx:0,dead:false,sealed:stage.missionType!=='hunt',profile,arenaPulse:0,hitLift:0,hitLiftV:0};
  mobs=createMobs();visualEffects=[];projectiles=[];hostileProjectiles=[];fallingStrikes=[];particles=[];damageNumbers=[];dashAfterimages=[];impactRings=[];shakeTime=0;shakeDuration=0;shakeStrength=0;shakeSeed=0;hitStopFrames=0;screenFlashFrames=0;impactVignetteFrames=0;combatToast=null;storyCaption=null;cameraX=0;paused=true;gameEnded=false;overlayMode='resume';
  if(campaignMode==='bossrush'){missionState.complete=true;boss.sealed=false;mobs=[];}
  else if(campaignMode==='survival'){missionState={type:'survival',progress:0,target:999999,complete:false,timeLeft:0,kills:0};boss.sealed=true;mobs=[];survivalWaveTimer=0;spawnEnemyWave(450,6);}
  $('playerHealth').style.width='100%';$('bossHealth').style.width='100%';if($('playerNameLabel'))$('playerNameLabel').textContent=`جان ${heroName||'فرشته'}`;$('bossName').textContent=boss.sealed?`${stage.boss} · مُهرشده`:stage.boss;
  $('overlayTitle').textContent=campaignProgress.completedStages.includes(currentStage)?'ردّ این مسیر هنوز پاک نشده':'پشت این دروازه، گذشته منتظر توست';
  const lore=currentActLore();
  $('overlayText').textContent=`${lore.opening}  ${stage.regionName} پیش روی توست. ${heroName||'فرشته'}، ${stage.objective.toLowerCase()}. بقیه‌ی راه را خودت پیدا می‌کنی.`;
  if($('overlayAltButton')){$('overlayAltButton').classList.add('hidden');$('overlayAltButton').style.display='none';}
  $('overlayButton').textContent='عبور از دروازه';$('overlayButton').onclick=resumeGame;
  $('gameOverlay').classList.remove('hidden');updateMissionHud();drawFrame();
}
function resumeGame() { if (gameEnded) return; requestGameplayBackgroundPlayback(); releaseAllKeys(); paused = false; $('gameOverlay').classList.add('hidden'); if (!storyCaption) setStoryCaption('اِیرِن', currentActLore().companion, 245); }
function overlayAction() {
  if(overlayMode==='next'){
    if(currentStage<stages.length-1)loadStage(currentStage+1,true);else showScreen('stages');
  }else if(overlayMode==='bossrushNext'){
    if(bossRushQueue.length){const next=bossRushQueue.shift();loadStage(next,true,true);missionState.complete=true;boss.sealed=false;mobs=[];updateMissionHud();}
    else{$('overlayTitle').textContent='نبرد پیاپی کامل شد';$('overlayText').textContent='تمام نگهبانان بزرگ شکست خوردند. پناهگاه خاکستر دوباره در دسترس است.';$('overlayButton').textContent='بازگشت به پناهگاه';$('overlayButton').onclick=()=>showScreen('sanctuary');overlayMode='ending';}
  }else if(overlayMode==='retry'){resetGame();resumeGame();}
  else if(overlayMode==='resume')resumeGame();
  else if(overlayMode==='lobby')showScreen('stages');
}
function gameOver(win) {
  if(gameEnded)return;
  if(win&&missionState?.type==='hunt'&&!missionState.complete)completeMissionObjective();
  if(win&&missionState&&!missionState.complete){setCombatToast('ابتدا هدف مأموریت را کامل کن.','#ffc0ca',70);return;}
  gameEnded=true;paused=true;
  const stage=stages[currentStage],finalCampaign=currentStage===stages.length-1;
  if(win){
    setStoryCaption('راوی',currentActLore().victory,300);
    if(campaignMode==='bossrush'){
      $('overlayTitle').textContent=`${stage.boss} شکست خورد`;
      $('overlayText').textContent=bossRushQueue.length?`نگهبان بعدی در صف انتظار است. ${bossRushQueue.length} نبرد دیگر باقی مانده.`:'تمام دوازده نگهبان بزرگ شکست خوردند. این پیروزی در ذخیره‌ی کمپین اصلی تغییری ایجاد نمی‌کند.';
      overlayMode='bossrushNext';$('overlayButton').textContent=bossRushQueue.length?'نبرد بعدی':'پایان چالش';$('overlayButton').onclick=overlayAction;
      $('gameOverlay').classList.remove('hidden');return;
    }
    stageBossDefeated();
    $('overlayTitle').textContent=finalCampaign?'تخت خالی، انتخاب آخر':`${stage.boss} فروپاشید`;
    $('overlayText').textContent=finalCampaign?'حقیقت سرچشمه‌ی خلأ آشکار شده است. انتخاب سِرا آینده‌ی جهان را تعیین می‌کند. دو سرنوشت ممکن است؛ هرکدام هزینه‌ای دارند.':`${currentActLore().victory} پاداش مأموریت: ${stage.rewardCoins} سکه و ${stage.rewardXp} تجربه. مرحله‌ی بعد باز شد.`;
    overlayMode=finalCampaign?'endingChoice':'next';$('overlayButton').textContent=finalCampaign?'آسمان بدون زنجیر':'رفتن به مأموریت بعدی';$('overlayButton').onclick=finalCampaign?(()=>chooseEnding('free')):overlayAction;
    if($('overlayAltButton')){$('overlayAltButton').style.display=finalCampaign?'inline-flex':'none';$('overlayAltButton').classList.toggle('hidden',!finalCampaign);$('overlayAltButton').textContent='بازسازی هاله';$('overlayAltButton').onclick=()=>chooseEnding('restore');}
    if(finalCampaign){$('overlayAltButton').style.display='inline-flex';$('overlayAltButton').classList.remove('hidden');}
  }else{
    $('overlayTitle').textContent='بال‌های تو خاموش شدند';
    $('overlayText').textContent=`در ${stage.name} شکست خوردی. نقطه‌ی بازگشت فعال‌شده حفظ می‌شود. دشمنان را جداگانه بکش و هنگام هشدار حمله‌های باس جاخالی بده.`;
    overlayMode='retry';$('overlayButton').textContent='تلاش دوباره';$('overlayButton').onclick=overlayAction;
    if($('overlayAltButton')){$('overlayAltButton').style.display='none';$('overlayAltButton').classList.add('hidden');}
  }
  $('gameOverlay').classList.remove('hidden');
}
function chooseEnding(choice) {
  if(overlayMode!=='endingChoice')return;
  overlayMode='ending';
  let title,text;
  if(choice==='free'){
    title='پایان اول — آسمانی بدون زنجیر';
    text='سِرا هاله را می‌شکند. نام‌های آزادشده در آسمان می‌درخشند و جهان برای نخستین بار بدون نورِ قرضی نفس می‌کشد. اِیرِن آخرین نام خود را به ستاره‌ای کوچک می‌سپارد و سکوت، دیگر تهدید نیست.';
  }else{
    title='پایان دوم — نورِ سنگین';
    text='سِرا هاله را بازسازی می‌کند و جهان امن می‌ماند؛ اما نام‌ها دوباره در نور زندانی می‌شوند. او تاج را نمی‌پذیرد و هاله را به دوردست می‌فرستد تا روزی انتخاب دیگری ممکن شود.';
  }
  campaignProgress.endings.push(choice);saveCampaignProgress();
  $('overlayTitle').textContent=heroText(title);$('overlayText').textContent=heroText(text);$('overlayButton').textContent='بازگشت به پناهگاه';$('overlayButton').onclick=()=>showScreen('sanctuary');
  if($('overlayAltButton')){$('overlayAltButton').style.display='none';$('overlayAltButton').classList.add('hidden');}
}
function setCombatToast(text, color = '#ffd4df', duration = 85) { combatToast = {text, color, timer:duration}; }
function screenShake(amount = 3, duration = 8) {
  if (!combatSettings.screenShake) return;
  if (amount >= shakeStrength || shakeTime <= 0) { shakeStrength = Math.max(shakeStrength, amount); shakeSeed += 1.618; }
  shakeTime = Math.max(shakeTime, duration); shakeDuration = Math.max(shakeDuration, duration);
  impactVignetteFrames = Math.max(impactVignetteFrames, Math.min(13, Math.round(duration * .62)));
}
function spawnImpactRing(x, y, color = '#ff6d91', heavy = false) {
  impactRings.push({x,y,color,age:0,duration:heavy?22:15,maxRadius:heavy?104:68,thickness:heavy?4.2:2.5});
  if (impactRings.length > 22) impactRings.splice(0, impactRings.length - 22);
}
function spawnEffect(key, x, y, scale = 1, facing = 1, duration = 24) {
  visualEffects.push({key, x, y, scale, facing, age:0, duration, spin:(Math.random()-.5)*.16});
  if (visualEffects.length > 70) visualEffects.splice(0, visualEffects.length-70);
}
function spawnBurst(x, y, color = '#ff3d62', count = 15, power = 4) {
  for (let i=0;i<count;i++) { const a=Math.random()*Math.PI*2, v=(.35+Math.random())*power; particles.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1,life:16+Math.random()*20,max:36,size:1+Math.random()*3,color}); }
  if (particles.length>260) particles.splice(0,particles.length-260);
}
function spawnDamageNumber(x,y,text,color='#fff0f3',big=false) { damageNumbers.push({x,y,text,color,life:42,big}); }
function playerActionBusy() {
  return !!(player.attackTimer > 0 || player.dashTimer > 0 || player.specialTimer > 0 || player.ultimateTimer > 0 || player.castTimer > 0 || player.bloodRainTimer > 0 || player.soulSnareTimer > 0 || player.skillBurstTimer > 0 || player.descending || player.voidBoltTimer > 0);
}
function triggerAttack() {
  if (paused || gameEnded || playerActionBusy() || player.attackCooldown > 0) return;
  if (player.comboWindow > 0) player.combo = player.combo % 3 + 1; else player.combo = 1;
  player.attackFacing = player.facing || 1;
  player.attackMode = 'light'; player.attackDuration = ATTACK_DURATION; player.attackImpactProgress = ATTACK_IMPACT_PROGRESS;
  player.attackTimer = player.attackDuration; player.attackCooldown = 8; player.attackHit = false; player.comboWindow = 48;
  player.vx = Math.max(-6.1,Math.min(6.1,player.vx + player.attackFacing * (player.combo===3?1.45:.92)));
  playCombatSound('light');
}
function triggerHeavyAttack() {
  if (paused || gameEnded || playerActionBusy()) return;
  if (player.heavyCooldown > 0) { setCombatToast(`ضربه‌ی سنگین آماده نیست • ${Math.ceil(player.heavyCooldown / 60)} ثانیه`, '#ffc1ce', 35); return; }
  player.attackFacing = player.facing || 1; player.attackMode = 'heavy'; player.combo = 3;
  player.attackDuration = HEAVY_ATTACK_DURATION; player.attackImpactProgress = HEAVY_ATTACK_IMPACT_PROGRESS;
  player.attackTimer = HEAVY_ATTACK_DURATION; player.heavyCooldown = 52; player.attackCooldown = 0; player.attackHit = false; player.comboWindow = 0;
  player.vx = Math.max(-6.6,Math.min(6.6,player.vx + player.attackFacing * 1.75));
  // The heavy slash is part of the attack PNG sequence; do not draw a second procedural crescent.
  playCombatSound('heavy'); setCombatToast('ضربه‌ی سنگین — آماده‌سازی!', '#ffd7e2', 32);
}
function triggerDash() {
  if (paused || gameEnded || playerActionBusy() || player.dashCooldown > 0) return;
  player.dashTimer = 11; player.dashCooldown = 44; player.invuln = Math.max(player.invuln, 15);
  player.vx = player.facing * PHYSICS.dashSpeed;
  // Dash afterimages carry the motion; skip the old red crescent that obscured the hero.
  spawnBurst(player.x+PLAYER_W/2,player.y+PLAYER_H*.8,weapons[equipped].color,7,2.1);
}
function triggerParry() {
  if (paused || gameEnded || playerActionBusy() || player.parryCooldown > 0) return;
  player.parryTimer = 9;
  player.parryCooldown = 68;
  player.vx *= .28;
  player.parryFacing = player.facing || 1;
  playCombatSound('ability');
  setCombatToast('آماده‌ی دفع — درست در لحظه‌ی برخورد!', '#e8d5ff', 34);
}
function resolveDefensiveTiming(attackerX, source, rawDamage = 0, color = '#ff8aa4') {
  const playerCenter = player.x + PLAYER_W / 2;
  const towardAttacker = Math.sign(attackerX - playerCenter) || player.facing || 1;
  if (player.parryTimer > 0) {
    player.parryTimer = 0;
    player.invuln = Math.max(player.invuln, 22);
    player.energy = Math.min(100, player.energy + 16);
    player.comboWindow = Math.max(player.comboWindow, 54);
    player.facing = towardAttacker;
    if (source && source !== boss) {
      source.stun = Math.max(source.stun || 0, 72);
      source.attackCooldown = Math.max(source.attackCooldown || 0, 95);
      source.windup = 0; source.aiAction = '';
    } else if (source === boss) {
      boss.staggerTimer = Math.max(boss.staggerTimer || 0, 66);
      boss.cooldown = Math.max(boss.cooldown || 0, 48);
      applyBossHit(Math.max(8, weapons[equipped].damage * .9), -towardAttacker, 1.4, 8, '#e6c9ff', 'PARRY');
    }
    spawnImpactRing(playerCenter + towardAttacker * 24, player.y + 40, '#e6c9ff', true);
    spawnBurst(playerCenter + towardAttacker * 24, player.y + 40, '#e6c9ff', 18, 3.7);
    screenShake(4.2, 8); hitStopFrames = Math.max(hitStopFrames, 7);
    playCombatSound('impact'); setCombatToast('دفع کامل! ضدحمله آماده است.', '#ead9ff', 62);
    return 'parry';
  }
  if (player.dashTimer > 0 && player.perfectDodgeCooldown <= 0) {
    player.perfectDodgeCooldown = 42;
    player.energy = Math.min(100, player.energy + 5);
    player.comboWindow = Math.max(player.comboWindow, 42);
    player.invuln = Math.max(player.invuln, 20);
    hitStopFrames = Math.max(hitStopFrames, 3);
    setCombatToast('جاخالی بی‌نقص', '#bfe9ff', 40);
    return 'dodge';
  }
  return false;
}
function triggerSpecial() {
  if (paused || gameEnded || playerActionBusy()) return;
  if (player.specialCooldown > 0) { setCombatToast(`سایه‌شکاف آماده نیست • ${Math.ceil(player.specialCooldown / 60)} ثانیه`, '#d7b5ff', 35); return; }
  if (player.energy < 35) { setCombatToast('برای سایه‌شکاف، ۳۵٪ هاله لازم است', '#d7b5ff', 48); return; }
  player.energy = Math.max(0, player.energy - 35); player.specialTimer = 27; player.specialHit = false; player.specialCooldown = 108;
  player.attackFacing = player.facing || 1;
  spawnEffect('red-slash', player.x + PLAYER_W / 2 + player.attackFacing * 72, player.y + 48, 1.28, player.attackFacing, 25);
  spawnBurst(player.x + PLAYER_W / 2 + player.attackFacing * 24, player.y + 48, '#9e75d8', 12, 2.4);
  playCombatSound('ability'); screenShake(2.2, 5); setCombatToast('سایه‌شکاف — برش نفوذی!', '#d7b5ff', 48);
}
function jumpPlayer() {
  if (paused || gameEnded || !player || player.ultimateTimer > 0) return;
  const canGroundJump = player.onGround || (player.coyoteTimer || 0) > 0;
  if (!canGroundJump && player.jumpsLeft <= 0) { player.jumpBufferTimer = 9; return; }
  const isAirJump = !canGroundJump;
  player.jumpsLeft = Math.max(0, player.jumpsLeft - 1);
  player.vy = isAirJump ? PHYSICS.airJumpSpeed : PHYSICS.jumpSpeed;
  player.onGround = false; player.coyoteTimer = 0; player.jumpBufferTimer = 0; player.jumpHoldTimer = 11;
  if (isAirJump) {
    // Double-jump feedback is kept clean: no red procedural wing flare or particles.
    player.wingBurstTimer = 0;
  } else {
    spawnBurst(player.x + PLAYER_W / 2, GROUND_Y - 2, '#c3a8b7', 7, 1.3);
  }
}
function triggerBurst() {
  if (paused || gameEnded || playerActionBusy()) return;
  if (player.burstCooldown > 0) { setCombatToast(`هاله‌ی شکسته آماده نیست • ${Math.ceil(player.burstCooldown / 60)} ثانیه`, '#ffb6c5', 35); return; }
  if (player.energy < 25) { setCombatToast('برای هاله‌ی شکسته، ۲۵٪ هاله لازم است', '#ffb6c5', 48); return; }
  player.energy -= 25; player.skillBurstTimer = 20; player.burstHit = false; player.burstCooldown = 132;
  const px = player.x + PLAYER_W / 2, py = player.y + PLAYER_H * .58, weapon = weapons[equipped];
  spawnEffect('broken-halo', px, py, 1, player.facing, 28);
  spawnBurst(px, py, '#8e1a40', 18, 3.7); spawnBurst(px, py, '#ff8aa9', 13, 4.8);
  playCombatSound('ability'); screenShake(4.5, 9); setCombatToast('هاله‌ی شکسته — انفجار شعاعی!', '#ffe0ea', 55);
}
function resolveBrokenHalo() {
  if (player.burstHit) return; player.burstHit = true;
  const px = player.x + PLAYER_W / 2, py = player.y + PLAYER_H * .56, radius = 150, weapon = weapons[equipped];
  let hits = 0;
  for (const m of mobs) {
    if (!m.alive || Math.hypot((m.x + 24) - px, (GROUND_Y - 28) - py) > radius) continue;
    const dir = Math.sign((m.x + 24) - px) || player.facing;
    applyMobHit(m, Math.round(15 * weapon.damage), dir, 18, 15, weapon.color, 'HALO'); hits++;
  }
  if (boss.hp > 0 && Math.hypot((boss.x + 58) - px, (GROUND_Y - 62) - py) <= radius + 18) {
    applyBossHit(23 * weapon.damage, player.facing, 2.1, 8, weapon.color, 'BROKEN HALO'); hits++;
  }
  spawnEffect('broken-halo', px, py, 1.55, player.facing, 25);
  spawnBurst(px, py, '#ff315e', 30, 5.8); spawnBurst(px, py, '#ffe4ed', 12, 3.3);
  screenShake(hits ? 5.4 : 3.2, hits ? 11 : 7); hitStopFrames = Math.max(hitStopFrames, 3);
  if (hits) player.energy = Math.min(100, player.energy + Math.min(12, hits * 3));
  playCombatSound('impact'); setCombatToast(hits ? `هاله‌ی شکسته — ${hits} برخورد` : 'انفجار هاله — بدون برخورد', '#ffe0ea', 42); updateTop();
}
function triggerWave() {
  if (paused || gameEnded || playerActionBusy()) return;
  if (player.crimsonCooldown > 0) { setCombatToast(`موج سرخ آماده نیست • ${Math.ceil(player.crimsonCooldown / 60)} ثانیه`, '#ffb2c6', 35); return; }
  if (player.energy < 30) { setCombatToast('برای موج سرخ، ۳۰٪ هاله لازم است', '#ffb2c6', 48); return; }
  player.energy -= 30; player.crimsonCooldown = 78; player.castTimer = 12; player.castKind = 'crimson'; player.pendingCrimson = true;
  const dir = player.facing || 1, pose = getSwordPose(.72, dir, 'light');
  const x = pose.tipX + dir * 5, y = pose.tipY;
  projectiles.push({ type:'crimson', x, y, vx:dir * 11.2, vy:0, dir, age:0, life:68, maxRange:760, maxTargets:3, startX:x, radius:32, damage:29 * weapons[equipped].damage, color:'#ff4c75', effectKey:'crimson-wave', impactKey:'red-slash', pierce:true, hitMobs:new Set(), hitBoss:false, trail:[] });
  if (projectiles.length > 12) projectiles.splice(0, projectiles.length - 12);
  spawnBurst(x, y, '#ff6a91', 15, 2.6); spawnBurst(x, y, '#ffe6ee', 7, 1.8);
  playCombatSound('wave'); screenShake(1.8, 4); setCombatToast('موج سرخ — تیغه‌ی انرژی رها شد!', '#ffd7e2', 48);
}
function triggerFrostWave() {
  if (paused || gameEnded || playerActionBusy()) return;
  if (player.frostCooldown > 0) { setCombatToast(`موج یخی آماده نیست • ${Math.ceil(player.frostCooldown / 60)} ثانیه`, '#b9edff', 35); return; }
  if (player.energy < 30) { setCombatToast('برای موج یخی، ۳۰٪ هاله لازم است', '#b9edff', 45); return; }
  player.energy -= 30; player.frostCooldown = 90; player.castTimer = 13; player.castKind = 'frost';
  const dir = player.facing || 1, pose = getSwordPose(.72, dir, 'light');
  const x = pose.tipX + dir * 4, y = pose.tipY + 12;
  projectiles.push({ type:'frost', x, y, vx:dir*10.8, vy:0, dir, age:0, life:82, maxRange:790, maxTargets:5, startX:x, radius:28, damage:23*weapons[equipped].damage, color:'#8fe9ff', effectKey:'ice-wave', impactKey:'ice-wave', pierce:true, hitMobs:new Set(), hitBoss:false, trail:[] });
  if (projectiles.length > 12) projectiles.splice(0, projectiles.length-12);
  spawnBurst(x,y,'#8fe9ff',12,2.4); playCombatSound('wave'); screenShake(1.5,4);
  setCombatToast('موج یخی — تیغه‌ی فراست رها شد!','#d9f8ff',45);
}
function triggerVoidBolt() {
  if (paused || gameEnded || playerActionBusy()) return;
  if (player.voidBoltCooldown > 0) { setCombatToast(`نیزه‌ی خلأ آماده نیست • ${Math.ceil(player.voidBoltCooldown / 60)} ثانیه`, '#d7b5ff', 35); return; }
  if (player.energy < 35) { setCombatToast('برای نیزه‌ی خلأ، ۳۵٪ هاله لازم است', '#d7b5ff', 45); return; }
  player.energy -= 35; player.voidBoltCooldown = 108; player.voidBoltTimer = 27; player.voidBoltHit = false; player.attackFacing = player.facing || 1;
  playCombatSound('ability'); setCombatToast('نیزه‌ی خلأ — انرژی در حال تمرکز است!', '#d7b5ff', 45);
}
function launchVoidBolt() {
  if (player.voidBoltHit) return;
  player.voidBoltHit = true;
  const dir = player.attackFacing || player.facing || 1, x = player.x + PLAYER_W/2 + dir*36, y = player.y+39;
  const weapon = weapons[equipped];
  projectiles.push({type:'void',x,y,vx:dir*8.5,vy:0,dir,age:0,life:92,maxRange:720,startX:x,radius:16,damage:25*weapon.damage,color:weapon.color,effectKey:'void-bolt',impactKey:weapon.effect,pierce:false,hitMobs:new Set(),hitBoss:false});
  spawnEffect(weapon.effect,x+dir*20,y,.72,dir,20); spawnBurst(x,y,weapon.color,12,3.1); screenShake(3.2,7); hitStopFrames=Math.max(hitStopFrames,2);
}

function triggerAngelicDescent() {
  if (paused || gameEnded || playerActionBusy()) return;
  if (player.descentCooldown > 0) { setCombatToast(`فرود فرشته آماده نیست • ${Math.ceil(player.descentCooldown / 60)} ثانیه`, '#ffc3d0', 35); return; }
  if (player.onGround) { setCombatToast('برای فرود فرشته ابتدا بپر!', '#ffc3d0', 42); return; }
  if (player.energy < 20) { setCombatToast('برای فرود فرشته، ۲۰٪ هاله لازم است', '#ffc3d0', 42); return; }
  player.energy -= 20; player.descending = true; player.descentTimer = 40; player.descentCooldown = 150;
  player.vy = Math.max(player.vy, 10.5); player.vx *= .35; player.invuln = Math.max(player.invuln, 8);
  spawnEffect('wing-flare', player.x + PLAYER_W / 2, player.y + 54, 1.1, player.facing, 26);
  spawnBurst(player.x + PLAYER_W / 2, player.y + 65, '#ff779b', 16, 3.0);
  playCombatSound('descent'); setCombatToast('فرود فرشته — شیرجه‌ی هاله‌ای!', '#ffd8e4', 48);
}
function resolveAngelicDescent() {
  const px = player.x + PLAYER_W / 2, py = GROUND_Y - 8, radius = 138, weapon = weapons[equipped];
  let hits = 0;
  for (const m of mobs) {
    if (!m.alive || Math.abs((m.x + 24) - px) > radius) continue;
    const dir = Math.sign((m.x + 24) - px) || player.facing;
    applyMobHit(m, Math.round(23 * weapon.damage), dir, 23, 20, '#ff6a91', 'DESCENT'); hits++;
  }
  if (boss.hp > 0 && Math.abs((boss.x + 58) - px) <= radius + 20) {
    applyBossHit(29 * weapon.damage, player.facing, 2.8, 12, '#ff6a91', 'DESCENT'); hits++;
  }
  spawnEffect('descent-impact', px, py, 1.2, player.facing, 28);
  spawnBurst(px, py, '#ff315e', 34, 6.2); spawnBurst(px, py, '#fff0f5', 15, 4.2);
  screenShake(hits ? 7 : 4.5, hits ? 15 : 9); screenFlashFrames = Math.max(screenFlashFrames, combatSettings.hitFlashes ? 3 : 0); hitStopFrames = Math.max(hitStopFrames, 4);
  playCombatSound('impact'); setCombatToast(hits ? `فرود فرشته — ${hits} برخورد سنگین` : 'فرود فرشته!', '#ffe0ea', 48); updateTop();
}

function triggerBloodRain() {
  if (paused || gameEnded || playerActionBusy() || player.bloodRainCooldown>0) return;
  if (player.energy<45) { setCombatToast('برای باران خون، ۴۵٪ هاله لازم است','#ff9eaf',50); return; }
  player.energy-=45; player.bloodRainCooldown=150; player.bloodRainTimer=24; player.castTimer=18; player.castKind='blood'; playCombatSound('ability');
  const px=player.x+PLAYER_W/2, weapon=weapons[equipped], targets=[];
  for (const m of mobs) if(m.alive && Math.abs((m.x+24)-px)<650) targets.push({type:'mob',target:m,x:m.x+24,y:GROUND_Y-40});
  if(boss.hp>0&&Math.abs((boss.x+58)-px)<700) targets.push({type:'boss',target:boss,x:boss.x+58,y:GROUND_Y-65});
  if(!targets.length) for(let i=0;i<3;i++) targets.push({type:'ground',target:null,x:px+player.facing*(150+i*100),y:GROUND_Y-35});
  targets.slice(0,7).forEach((t,i)=>fallingStrikes.push({...t,timer:i*4,age:0,hit:false,color:i%2?'#ff476c':'#ffc0d0',damage:t.type==='boss'?24*weapon.damage:2+Math.floor(currentStage/2)}));
  setCombatToast('باران خون — آسمان شکافته شد','#ffd7e2',70); screenShake(4.2,8); spawnBurst(px,player.y+35,'#ff315e',18,4.2);
}
function triggerSoulSnare() {
  if(paused||gameEnded||playerActionBusy()||player.soulSnareCooldown>0)return;
  if(player.energy<40){setCombatToast('برای تله‌ی روح، ۴۰٪ هاله لازم است','#d7b5ff',48);return;}
  player.energy-=40;player.soulSnareCooldown=180;player.soulSnareTimer=28;playCombatSound('ability');
  const px=player.x+PLAYER_W/2,weapon=weapons[equipped];
  spawnEffect('void-bolt',px,player.y+35,1.2,player.facing,34);spawnBurst(px,player.y+40,'#b78aff',30,4.6);screenShake(5,10);screenFlashFrames=Math.max(screenFlashFrames,4);hitStopFrames=Math.max(hitStopFrames,3);
  let hit=0;
  for(const m of mobs){if(!m.alive||Math.abs((m.x+24)-px)>470)continue;const dir=Math.sign((m.x+24)-px)||player.facing;applyMobHit(m,1,dir,2,95,'#d7b5ff','SOUL');hit++;}
  if(boss.hp>0&&Math.abs((boss.x+58)-px)<500){applyBossHit(27*weapon.damage,player.facing,.6,55,'#d7b5ff','SOUL');hit++;}
  player.invuln=Math.max(player.invuln,8);setCombatToast(hit?'تله‌ی روح — دشمنان متوقف شدند':'تله‌ی روح فعال شد','#e5d4ff',60);updateTop();
}

function triggerUltimate() {
  if (paused || gameEnded || playerActionBusy() || player.energy < 100) {
    if (!paused && player.energy < 100) setCombatToast('نوار هاله هنوز کامل نشده','#ffb6c5',55);
    return;
  }

  // Save the exact position, then lock movement while the angel ascends.
  player.energy = 0;
  player.ultimateTimer = ULTIMATE_FLIGHT_DURATION;
  player.ultimateElapsed = 0;
  player.ultimateHit = false;
  player.ultimateBaseX = player.x;
  player.ultimateBaseY = player.y;
  player.ultimateBaseVy = player.vy || 0;
  player.ultimateBaseOnGround = !!player.onGround;
  player.ultimateFacing = player.facing || 1;
  player.vx = 0;
  player.vy = 0;
  player.invuln = Math.max(player.invuln || 0, ULTIMATE_FLIGHT_DURATION + 8);

  screenShake(5,9);
  hitStopFrames = Math.max(hitStopFrames,3);
  screenFlashFrames = Math.max(screenFlashFrames,4);
  spawnEffect('wing-flare',player.x+PLAYER_W/2,player.y+38,1.35,player.ultimateFacing,34);
  spawnBurst(player.x+PLAYER_W/2,player.y+PLAYER_H-8,'#ff315e',22,4.6);
  spawnBurst(player.x+PLAYER_W/2,player.y+PLAYER_H-8,'#ffe8f0',10,2.8);
  setCombatToast('داوری آسمانی — فرشته به آسمان صعود می‌کند!','#ffe4ee',100);
}

/* --- File-based pixel animation pipeline: edit the PNG files in /assets --- */
function getFrameVisual(state, timeMs, explicitFrame = null) {
  const definitions = ASSET_CONFIG.player?.animations || {};
  let frames = readyFrames(playerAnimations[state]);
  if (!frames.length && state !== 'idle') frames = readyFrames(playerAnimations.idle);
  if (frames.length) {
    const fps = Math.max(1, Number(definitions[state]?.fps) || 8);
    let index = explicitFrame;
    if (index === null || index === undefined) index = Math.floor(timeMs / 1000 * fps) % frames.length;
    index = Math.max(0, Math.min(frames.length - 1, index));
    const image = frames[index];
    return { image, sx: 0, sy: 0, sw: image.naturalWidth, sh: image.naturalHeight };
  }
  const img = fallbackCharacterImage;
  if (img && img.complete && img.naturalWidth && img.naturalHeight) {
    return { image: img, sx: 0, sy: 0, sw: img.naturalWidth, sh: img.naturalHeight };
  }
  return null;
}
function getUltimateFrameIndex() {
  const frames = readyFrames(playerAnimations.ultimate);
  if (frames.length <= 1) return 0;
  const count = frames.length;
  const elapsed = Math.max(0, player.ultimateElapsed || 0);
  // The first ten poses carry the angel upward. The final six progressively
  // unfold the wings. Hold the final authored pose until the impact pulse.
  if (elapsed <= ULTIMATE_ASCENT_FRAMES) {
    return Math.min(9, Math.floor(elapsed / ULTIMATE_ASCENT_FRAMES * 10));
  }
  if (elapsed <= ULTIMATE_WING_OPEN_END) {
    const wingProgress = (elapsed - ULTIMATE_ASCENT_FRAMES) /
      Math.max(1, ULTIMATE_WING_OPEN_END - ULTIMATE_ASCENT_FRAMES);
    return Math.min(count - 1, 10 + Math.floor(wingProgress * 6));
  }
  return count - 1;
}
function drawFrameImage(ctx, x, y, w, h, state, timeMs, flip = false, explicitFrame = null) {
  const src = getFrameVisual(state, timeMs, explicitFrame);
  if (!src || src.sw <= 0 || src.sh <= 0) return false;
  ctx.save();
  if (flip) { ctx.translate(x + w, 0); ctx.scale(-1, 1); x = 0; }
  ctx.drawImage(src.image, src.sx, src.sy, src.sw, src.sh, x, y, w, h);
  ctx.restore();
  return true;
}
function drawHeroPreview(t = 0) {
  const c = $('heroCharacterCanvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.imageSmoothingEnabled = false;
  const halo = ctx.createLinearGradient(0, 0, c.width, c.height);
  halo.addColorStop(0, '#171320'); halo.addColorStop(1, '#0b0c13');
  ctx.fillStyle = halo; ctx.fillRect(0, 0, c.width, c.height);
  // The former gold arc crossed the top of the character sprite; the CSS halo
  // behind the preview now supplies the lobby's ambient framing instead.
  const frame = getFrameVisual('idle', t);
  if (frame) {
    const scale = Math.min(132 / frame.sw, 158 / frame.sh);
    const dw = frame.sw * scale, dh = frame.sh * scale;
    ctx.drawImage(frame.image, frame.sx, frame.sy, frame.sw, frame.sh, (c.width - dw) / 2, 28 + (158 - dh) / 2, dw, dh);
  }
}

/* --- Canvas game: parallax environments, animated player, mobs and a telegraphed boss --- */
function canvas() { return $('gameCanvas'); }
function drawFrame(t = performance.now()) {
  const c=canvas(); if (!c) return;
  const ctx=c.getContext('2d'); ctx.imageSmoothingEnabled=false;
  const stage=stages[currentStage];
  // Clear first so transparent backgrounds and transient weapon strokes cannot leave stale pixels.
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.save();
  if (combatSettings.screenShake && shakeTime>0 && shakeStrength>0) {
    const envelope = Math.pow(Math.max(0, shakeTime / Math.max(1, shakeDuration)), 1.25);
    const power = shakeStrength * envelope;
    const sx = (Math.sin(t * .092 + shakeSeed) + Math.sin(t * .171 + shakeSeed * 1.7) * .22) * power;
    const sy = (Math.cos(t * .107 + shakeSeed * 1.31) + Math.sin(t * .153 + shakeSeed * 2.1) * .18) * power * .58;
    ctx.translate(sx, sy);
  }
  drawBackground(ctx,stage,c.width,c.height,t);
  drawGround(ctx,stage,c.width,c.height);
  drawStageObjects(ctx,t);
  drawMobs(ctx,t);
  drawBoss(ctx,t);
  drawFallingStrikes(ctx);
  drawProjectiles(ctx,t);
  drawHostileProjectiles(ctx);
  drawPlayer(ctx,t);
  drawCombatEffects(ctx,t);
  drawAtmosphere(ctx,stage,t);
  drawStoryCaption(ctx);
  if (combatSettings.hitFlashes && screenFlashFrames>0) { ctx.save();ctx.globalAlpha=Math.min(.18,screenFlashFrames*.016);ctx.fillStyle=screenFlashFrames>7?'#fff2f5':'#ff214c';ctx.fillRect(0,0,c.width,c.height);ctx.restore(); }
  if (combatSettings.hitFlashes && impactVignetteFrames > 0) {
    ctx.save(); ctx.globalAlpha = Math.min(.2, impactVignetteFrames * .016); ctx.fillStyle = '#ff315e';
    ctx.fillRect(0,0,c.width,12); ctx.fillRect(0,c.height-12,c.width,12);
    ctx.fillRect(0,0,12,c.height); ctx.fillRect(c.width-12,0,12,c.height); ctx.restore();
  }
  if (combatToast && combatToast.timer>0) { ctx.save(); ctx.globalAlpha=Math.min(1,combatToast.timer/16); ctx.textAlign='center'; ctx.font='bold 17px Tahoma'; ctx.fillStyle='#08070c'; ctx.fillText(combatToast.text,c.width/2+1,76+1); ctx.fillStyle=combatToast.color; ctx.shadowColor=combatToast.color; ctx.shadowBlur=15; ctx.fillText(combatToast.text,c.width/2,76); ctx.restore(); }
  ctx.restore();
  if(player && typeof player.hp==='number') $('playerHealth').style.width=`${Math.max(0,Math.min(100,player.hp/getPlayerMaxHp()*100))}%`;
  if($('playerNameLabel'))$('playerNameLabel').textContent=`جان ${heroName||'فرشته'}`;
  if(boss && typeof boss.hp==='number') $('bossHealth').style.width=`${Math.max(0,boss.hp/boss.maxHp*100)}%`;
  const energy=Math.max(0,Math.min(100,player.energy||0));
  const energyEl=$('playerEnergy'), energyTrack=$('energyTrack'), energyLabel=$('energyLabel');
  if(energyEl) energyEl.style.width=`${energy}%`;
  if(energyTrack) energyTrack.classList.toggle('ready',energy>=100);
  if(energyLabel) energyLabel.textContent=energy>=100?'هاله کامل • L برای داوری نهایی':`هاله ${Math.floor(energy)}٪ • E ۲۵ | Q ۳۰ | K ۳۵ | V ۲۰ | C ۳۰ | X ۳۵ | F ۴۰ | R ۴۵`;
  updateAbilityHud();
}
function drawBackground(ctx, stage, w, h, t) {
  const video = gameplayBackgroundVideo;
  if (video && gameplayVideoFailedSource !== (video.dataset.ashenSource || '') && drawGameplayVideoBackground(ctx, video, w, h)) {
    const darkness = Math.max(0, Math.min(0.75, Number(GAMEPLAY_VIDEO_CONFIG.darkness ?? 0.22)));
    if (darkness > 0) { ctx.fillStyle = `rgba(7,8,15,${darkness})`; ctx.fillRect(0, 0, w, h); }
    ctx.fillStyle = `${stage.accent}0b`;
    ctx.fillRect(0, 0, w, h);
    return;
  }
  const image = backgroundImages[currentStage];
  if (image && image.complete && image.naturalWidth) {
    const scale = Math.max(w / image.naturalWidth, h / image.naturalHeight);
    const dw = image.naturalWidth * scale, dh = image.naturalHeight * scale;
    const parallax = Math.max(0, Math.min(1, Number(ASSET_CONFIG.background?.parallax ?? 0.18)));
    const offset = -((cameraX * parallax) % dw);
    for (let x = offset - dw; x < w + dw; x += dw) {
      ctx.drawImage(image, x, (h - dh) / 2, dw, dh);
    }
    const darkness = Math.max(0, Math.min(0.75, Number(ASSET_CONFIG.background?.darkness ?? 0.12)));
    if (darkness > 0) { ctx.fillStyle = `rgba(7,8,15,${darkness})`; ctx.fillRect(0, 0, w, h); }
    ctx.fillStyle = `${stage.accent}0b`; ctx.fillRect(0, 0, w, h);
    return;
  }
  const grad=ctx.createLinearGradient(0,0,0,h);grad.addColorStop(0,stage.color);grad.addColorStop(.58,'#151423');grad.addColorStop(1,'#090a11');ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
  const cam=cameraX;
  const moonX=stage.style==='void'?730:790, moonY=100+(currentStage%2)*24;
  ctx.save();ctx.globalAlpha=.76;ctx.shadowColor=stage.accent;ctx.shadowBlur=28;ctx.fillStyle=stage.accent;ctx.beginPath();ctx.arc(moonX-cam*.08,moonY,stage.style==='ice'?29:24,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.globalAlpha=.8;ctx.fillStyle='#171322';ctx.beginPath();ctx.arc(moonX+9-cam*.08,moonY-7,stage.style==='ice'?27:23,0,Math.PI*2);ctx.fill();ctx.restore();
  ctx.strokeStyle=`${stage.accent}66`;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(moonX-cam*.08,moonY,48,19,-.24,Math.PI*1.12,Math.PI*1.93);ctx.stroke();
  for(let i=0;i<72;i++){const wx=(i*173+31)%(WORLD_W+80),sx=wx-cam*.12,sy=(i*67+21)%250;if(sx<-5||sx>w+5)continue;const twinkle=.3+.45*(.5+.5*Math.sin(t/480+i));ctx.globalAlpha=twinkle;ctx.fillStyle=stage.accent;ctx.fillRect(sx,sy,(i%7===0)?3:1,(i%7===0)?3:1);}ctx.globalAlpha=1;
  drawRidge(ctx,w,292,42,'#11121c',.16,cam,stage.style);drawRidge(ctx,w,325,28,'#0d0e17',.31,cam,stage.style);drawEnvironmentFeatures(ctx,stage,w,cam,t);
  for(let i=0;i<4;i++){ctx.fillStyle=`rgba(${stage.style==='ice'?'108,178,207':'151,94,118'},${.025+i*.012})`;ctx.fillRect(0,260+i*19,w,14);}
}
function drawRidge(ctx,w,baseY,amp,color,parallax,cam,style) {
  const shift=cam*parallax;ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(0,baseY+80);
  for(let x=-120;x<w+150;x+=90){const wx=x+shift;const peak=baseY-amp*(.4+((Math.abs(Math.floor(wx/90)*7)%9)/10));ctx.lineTo(x,peak);ctx.lineTo(x+45,peak+amp*.75);}
  ctx.lineTo(w,baseY+90);ctx.closePath();ctx.fill();
  if(style==='ice') {ctx.strokeStyle='#b9edff55';ctx.lineWidth=2;ctx.beginPath();for(let x=-100;x<w+100;x+=180){const peak=baseY-amp*(.4+((Math.abs(Math.floor((x+shift)/90)*7)%9)/10));ctx.moveTo(x,peak);ctx.lineTo(x+45,peak+amp*.75);}ctx.stroke();}
}
function drawEnvironmentFeatures(ctx,stage,w,cam,t) {
  const style=stage.style;
  if(style==='forest'){
    for(let wx=70;wx<WORLD_W;wx+=142){const x=wx-cam*.45; if(x<-100||x>w+100)continue;const ht=115+(Math.floor(wx/14)%4)*27;ctx.fillStyle='#101811';ctx.fillRect(x-7,GROUND_Y-ht,13,ht);ctx.fillStyle='#0e1714';for(let k=0;k<4;k++){ctx.beginPath();ctx.moveTo(x,GROUND_Y-ht-35+k*27);ctx.lineTo(x-30+k*4,GROUND_Y-ht+14+k*27);ctx.lineTo(x+34-k*3,GROUND_Y-ht+14+k*27);ctx.closePath();ctx.fill();}ctx.strokeStyle='#8e4a5c22';ctx.beginPath();ctx.moveTo(x,GROUND_Y-ht+20);ctx.lineTo(x-10,GROUND_Y-30);ctx.stroke();}
  } else if(style==='church'){
    for(let wx=120;wx<WORLD_W;wx+=270){const x=wx-cam*.36; if(x<-140||x>w+140)continue;ctx.fillStyle='#1a101b';ctx.fillRect(x,180,88,165);ctx.fillRect(x+18,140,52,42);ctx.beginPath();ctx.moveTo(x-5,182);ctx.lineTo(x+44,105);ctx.lineTo(x+93,182);ctx.fill();ctx.beginPath();ctx.moveTo(x+25,142);ctx.lineTo(x+44,85);ctx.lineTo(x+63,142);ctx.fill();ctx.fillStyle='#ff596b77';ctx.fillRect(x+38,218,13,29);ctx.fillRect(x+13,225,10,17);ctx.fillRect(x+65,225,10,17);}
  } else if(style==='ice'){
    for(let wx=80;wx<WORLD_W;wx+=230){const x=wx-cam*.32;if(x<-100||x>w+100)continue;ctx.fillStyle='#132535';ctx.beginPath();ctx.moveTo(x-80,350);ctx.lineTo(x+5,145+(Math.floor(wx)%70));ctx.lineTo(x+35,220);ctx.lineTo(x+70,170);ctx.lineTo(x+125,350);ctx.fill();ctx.fillStyle='#b4e9ff55';ctx.beginPath();ctx.moveTo(x+5,145+(Math.floor(wx)%70));ctx.lineTo(x+35,220);ctx.lineTo(x+15,211);ctx.closePath();ctx.fill();}
    for(let i=0;i<23;i++){const x=(i*139+44-cam*.2)%(w+30);ctx.fillStyle='#c9f4ff77';ctx.fillRect(x,(i*59+t*.013)%310,2,2);}
  } else if(style==='factory'){
    for(let wx=90;wx<WORLD_W;wx+=250){const x=wx-cam*.4;if(x<-110||x>w+110)continue;ctx.fillStyle='#1c1a1a';ctx.fillRect(x,230,140,120);ctx.fillRect(x+20,167,24,75);ctx.fillRect(x+85,188,19,54);ctx.fillStyle='#ffad5355';for(let q=0;q<4;q++)ctx.fillRect(x+16+q*29,270,13,18);ctx.strokeStyle='#6b5747';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x-4,250);ctx.lineTo(x+146,250);ctx.stroke();}
  } else {
    for(let wx=100;wx<WORLD_W;wx+=185){const x=wx-cam*.25;if(x<-80||x>w+80)continue;const yy=150+(Math.floor(wx/9)%5)*25;ctx.fillStyle='#181324';ctx.fillRect(x,yy,75,8);ctx.fillRect(x+10,yy-14,8,14);ctx.fillRect(x+52,yy-22,8,22);ctx.strokeStyle='#9e76db55';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x+37,yy-23,45,8,-.1,Math.PI,Math.PI*2);ctx.stroke();}
  }
}
function drawGround(ctx,stage,w,h) {
  ctx.fillStyle=stage.style==='ice'?'#111b29':'#0b0a11';ctx.fillRect(0,GROUND_Y,w,h-GROUND_Y);
  ctx.fillStyle=stage.style==='ice'?'#6591a0':'#49303d';ctx.fillRect(0,GROUND_Y,w,3);
  ctx.fillStyle=`${stage.accent}22`;ctx.fillRect(0,GROUND_Y+4,w,2);
  for(let x=-(cameraX%46);x<w;x+=46){ctx.fillStyle=stage.style==='ice'?'#8fbdc722':'#ffffff0b';ctx.fillRect(x,GROUND_Y+20,30,2);ctx.fillRect(x+12,GROUND_Y+36,3,2);ctx.fillStyle='#05060b';ctx.fillRect(x+3,GROUND_Y+48,40,5);if((Math.floor((x+cameraX)/46)%3)===0){ctx.fillStyle=`${stage.accent}33`;ctx.fillRect(x+24,GROUND_Y+1,7,2);}}
}
function stageAccent(){return stages[currentStage]?.accent||'#bd7a99';}
function drawStageObjects(ctx,t){
  const stage=stages[currentStage];
  for(const zone of (stage.hazardZones||[])){const hx=zone.x-cameraX;if(hx+zone.w<0||hx>CANVAS_W)continue;ctx.save();ctx.globalAlpha=.22;ctx.fillStyle=stage.hazard==='lava'?'#ff5b35':stage.hazard==='frost'?'#78d9ff':stage.accent;ctx.fillRect(hx,GROUND_Y-5,zone.w,20);ctx.globalAlpha=.65;ctx.strokeStyle=stage.accent;ctx.lineWidth=2;for(let k=0;k<Math.floor(zone.w/18);k++){const xx=hx+k*18;ctx.beginPath();ctx.moveTo(xx,GROUND_Y-5);ctx.lineTo(xx+7,GROUND_Y-15-(k%2)*4);ctx.lineTo(xx+14,GROUND_Y-5);ctx.stroke();}ctx.restore();}
  for(const obj of levelObjects){if(obj.done)continue;const x=obj.x-cameraX;if(x<-40||x>CANVAS_W+40)continue;
    ctx.save();const pulse=.7+.22*Math.sin(t/170+(obj.x%17));ctx.globalAlpha=pulse;ctx.shadowColor=obj.color;ctx.shadowBlur=obj.type==='secret'?18:10;ctx.strokeStyle=obj.color;ctx.fillStyle=obj.color;ctx.lineWidth=2;
    if(obj.type==='checkpoint'){ctx.beginPath();ctx.moveTo(x,GROUND_Y-7);ctx.lineTo(x,GROUND_Y-37);ctx.stroke();ctx.beginPath();ctx.moveTo(x,GROUND_Y-35);ctx.lineTo(x+16,GROUND_Y-29);ctx.lineTo(x,GROUND_Y-23);ctx.closePath();ctx.fill();}
    else if(obj.type==='relic'||obj.type==='lore'||obj.type==='sideCollect'){ ctx.translate(x,GROUND_Y-26+Math.sin(t/220+obj.x)*3);ctx.rotate(t/650);ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(9,0);ctx.lineTo(0,12);ctx.lineTo(-9,0);ctx.closePath();ctx.fill();ctx.strokeStyle='#fff4ff';ctx.stroke();}
    else if(obj.type==='mechanism'||obj.type==='sideMechanism'){ ctx.beginPath();ctx.arc(x,GROUND_Y-28,13,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(x,GROUND_Y-28,6,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(x,GROUND_Y-46);ctx.lineTo(x,GROUND_Y-40);ctx.stroke();}
    else if(obj.type==='rescue'){ctx.beginPath();ctx.arc(x,GROUND_Y-43,7,0,Math.PI*2);ctx.fill();ctx.fillRect(x-6,GROUND_Y-35,12,19);ctx.strokeStyle='#e3ffe8';ctx.beginPath();ctx.moveTo(x-10,GROUND_Y-29);ctx.lineTo(x+10,GROUND_Y-29);ctx.stroke();}
    else if(obj.type==='secret'){ctx.fillRect(x-11,GROUND_Y-42,22,18);ctx.strokeRect(x-11,GROUND_Y-42,22,18);ctx.beginPath();ctx.arc(x,GROUND_Y-42,6,Math.PI,0);ctx.stroke();ctx.fillStyle='#fff0b9';ctx.fillRect(x-2,GROUND_Y-35,4,6);}
    ctx.restore();
  }
}
function drawMobs(ctx,t) {
  for(const m of mobs){
    if(!m.alive)continue;
    const airY=Number(m.airY)||0;
    const x=m.x-cameraX,y=GROUND_Y-52-Math.max(0,m.hitLift||0)+airY+Math.sin(t/190+m.seed)*2.2;
    if(x<-90||x>CANVAS_W+90)continue;
    const enemyLift=Math.max(0,m.hitLift||0),kindColor=({ranged:'#9ac9ff',jumper:'#ff9a72',duelist:'#ff6f91',brute:'#e2b47b',caster:'#c7a0ff',stalker:'#c5a1b4'})[m.kind]||'#ff7895';
    ctx.save();ctx.globalAlpha=.5*(1-Math.min(.62,enemyLift/120));ctx.fillStyle='#8f234d55';ctx.beginPath();ctx.ellipse(x+25,GROUND_Y+1,Math.max(12,26-enemyLift*.08-Math.abs(airY)*.11),Math.max(3,6-enemyLift*.025-Math.abs(airY)*.025),0,0,Math.PI*2);ctx.fill();ctx.restore();
    if(m.windup>0){
      const target=(Number.isFinite(m.targetX)?m.targetX:m.x+24)-cameraX;
      const warnColor=m.aiAction==='cast'?'#c7a0ff':m.aiAction==='leap'?'#ffb37b':m.aiAction==='slam'?'#ff657d':'#ffd28c';
      const pulse=.26+.22*Math.sin(t/42+(m.seed||0));
      ctx.save();ctx.globalAlpha=pulse;ctx.strokeStyle=warnColor;ctx.fillStyle=warnColor;ctx.shadowColor=warnColor;ctx.shadowBlur=13;ctx.lineWidth=2;
      if(m.aiAction==='slam'){ctx.beginPath();ctx.ellipse(target,GROUND_Y+2,96,12,0,0,Math.PI*2);ctx.fill();ctx.stroke();}
      else{ctx.beginPath();ctx.arc(x+25,y+37,29,Math.PI*1.08,Math.PI*1.92);ctx.stroke();ctx.beginPath();ctx.moveTo(x+25,y+63);ctx.lineTo(x+25,y+52);ctx.stroke();}
      ctx.restore();
    }
    const sprite=bossRosterImages[m.rosterIndex];
    const drawW=m.kind==='brute'?64:58,drawH=m.kind==='brute'?70:64;
    if(sprite&&sprite.complete&&sprite.naturalWidth){
      ctx.save();const recoil=m.stun>0?(m.hitDirection||m.dir)*-.06:0;
      ctx.translate(x+25,y+55);ctx.rotate(recoil);ctx.translate(-(x+25),-(y+55));
      if(m.flash>0&&combatSettings.hitFlashes){ctx.shadowColor='#fff2f4';ctx.shadowBlur=22;}else{ctx.shadowColor=kindColor;ctx.shadowBlur=m.windup>0?14:6;}
      if(m.dir<0){ctx.translate(x+drawW,0);ctx.scale(-1,1);ctx.drawImage(sprite,0,y-9,drawW,drawH);}
      else ctx.drawImage(sprite,x-4,y-9,drawW,drawH);
      if(m.flash>0&&combatSettings.hitFlashes){ctx.globalCompositeOperation='source-atop';ctx.globalAlpha=Math.min(.72,m.flash/16);ctx.fillStyle='#fff0f4';ctx.fillRect(m.dir<0?0:x-4,y-9,drawW,drawH);}
      ctx.restore();
    }else{
      ctx.save();ctx.translate(x+25,y+38);ctx.rotate(m.stun>0?(m.hitDirection||m.dir)*-.08:0);ctx.translate(-(x+25),-(y+38));
      ctx.fillStyle=m.flash>0&&combatSettings.hitFlashes?'#ffe2d8':'#292032';ctx.beginPath();ctx.moveTo(x+5,y+30);ctx.quadraticCurveTo(x-5,y+5,x+19,y-2);ctx.quadraticCurveTo(x+39,y+3,x+36,y+28);ctx.lineTo(x+30,y+43);ctx.lineTo(x+24,y+32);ctx.lineTo(x+17,y+44);ctx.lineTo(x+12,y+30);ctx.closePath();ctx.fill();ctx.fillStyle=kindColor;ctx.shadowColor=kindColor;ctx.shadowBlur=9;ctx.fillRect(x+11,y+13,5,4);ctx.fillRect(x+25,y+13,5,4);ctx.restore();
    }
    const barW=m.kind==='brute'?48:42,barX=x+29-barW/2;
    ctx.fillStyle='#211421';ctx.fillRect(barX,y-12,barW,4);ctx.fillStyle=m.windup>0?kindColor:'#ff6376';ctx.fillRect(barX,y-12,barW*Math.max(0,m.hp/(m.maxHp||1)),4);
  }
}
function drawBoss(ctx,t) {
  if(!boss || boss.dead)return;
  const x=boss.x-cameraX, y=GROUND_Y-126-Math.max(0,boss.hitLift||0) + Math.sin(t/520)*2;
  if(x<-180||x>CANVAS_W+180)return;
  if(boss.phase>=2){ctx.save();ctx.globalAlpha=.12+.08*Math.sin(t/90);ctx.strokeStyle=boss.phase>=3?'#ff315e':'#ff9aaf';ctx.shadowColor=ctx.strokeStyle;ctx.shadowBlur=15;ctx.lineWidth=boss.phase>=3?3:2;ctx.beginPath();ctx.ellipse(x+60,y+60,70+Math.sin(t/100)*5,58,-.12,0,Math.PI*2);ctx.stroke();ctx.restore();}
  if(boss.windup>0){const warningX=(boss.attackType==='slam'&&Number.isFinite(boss.targetX)?boss.targetX-cameraX:x+55);ctx.save();ctx.globalAlpha=.22+.2*Math.sin(t/45);ctx.fillStyle=boss.attackType==='bolt'?'#c8a2ff':boss.attackType==='pulse'?'#ffb35b':'#ff254e';ctx.beginPath();ctx.ellipse(warningX,GROUND_Y+3,(boss.attackType==='slam'?82:115)+Math.sin(t/50)*9,15,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle=boss.attackType==='bolt'?'#d8b5ff':boss.attackType==='pulse'?'#ffcc83':'#ff4265';ctx.lineWidth=2;ctx.beginPath();ctx.arc(warningX,GROUND_Y-15,boss.attackType==='slam'?66:90,Math.PI*1.08,Math.PI*1.92);ctx.stroke();ctx.restore();}
  const custom=bossImages[currentStage];
  if(boss.sealed){ctx.save();ctx.globalAlpha=.65+.12*Math.sin(t/150);ctx.strokeStyle=stageAccent();ctx.lineWidth=4;ctx.shadowColor=stageAccent();ctx.shadowBlur=18;ctx.beginPath();ctx.ellipse(x+62,y+64,76,68,0,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#110d19a8';ctx.beginPath();ctx.arc(x+62,y+64,56,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f6d9a4';ctx.font='bold 12px Tahoma';ctx.textAlign='center';ctx.fillText('مُهر فعال',x+62,y+68);ctx.restore();}
  if(custom&&custom.complete&&custom.naturalWidth){
    ctx.save();ctx.shadowColor=boss.profile?.color||stages[currentStage].accent;ctx.shadowBlur=boss.flash>0 && combatSettings.hitFlashes?25:12;
    if(boss.facing>0){ctx.translate(x+125,0);ctx.scale(-1,1);ctx.drawImage(custom,0,y,125,125);}
    else ctx.drawImage(custom,x,y,125,125);
    if(boss.flash>0 && combatSettings.hitFlashes){ctx.globalCompositeOperation='source-atop';ctx.globalAlpha=Math.min(.55,boss.flash/28);ctx.fillStyle='#fff1f5';ctx.fillRect(boss.facing>0?0:x,y,125,125);}
    ctx.restore();
  }else{
    const style=stages[currentStage].style,profile=boss.profile||{};const body=profile.color|| (style==='ice'?'#42677e':style==='factory'?'#5a4937':style==='void'?'#38244f':style==='church'?'#6f263e':'#315242');
    ctx.save();ctx.shadowColor=stages[currentStage].accent;ctx.shadowBlur=boss.flash>0?27:9;
    ctx.fillStyle=body;ctx.beginPath();ctx.moveTo(x+17,y+45);ctx.lineTo(x+5,y+4);ctx.lineTo(x+39,y+25);ctx.lineTo(x+50,y+2);ctx.lineTo(x+72,y+27);ctx.lineTo(x+103,y+5);ctx.lineTo(x+100,y+48);ctx.lineTo(x+113,y+92);ctx.lineTo(x+98,y+111);ctx.lineTo(x+25,y+111);ctx.lineTo(x+8,y+89);ctx.closePath();ctx.fill();
    ctx.fillStyle=style==='ice'?'#b5f1ff':'#ffdf99';ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=12;ctx.fillRect(x+32,y+43,10,6);ctx.fillRect(x+70,y+43,10,6);ctx.shadowBlur=0;
    ctx.fillStyle='#15111b';ctx.fillRect(x+40,y+59,32,27);ctx.fillStyle=stages[currentStage].accent;ctx.globalAlpha=.75;ctx.fillRect(x+47,y+66,18,4);ctx.globalAlpha=1;
    ctx.fillStyle='#21131d';ctx.fillRect(x+22,y+99,25,28);ctx.fillRect(x+76,y+99,25,28);
    if(style==='factory'){ctx.strokeStyle='#d99a46';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x+8,y+72);ctx.lineTo(x-14,y+111);ctx.stroke();}
    if(style==='void'||profile.style==='god'||profile.style==='void'){ctx.strokeStyle=profile.color||'#d8b5ff';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x+58,y+44,65,24,-.2,0,Math.PI*2);ctx.stroke();}
    if(profile.style==='bishop'||profile.style==='bell'){ctx.fillStyle=profile.color||'#ed9aad';ctx.beginPath();ctx.moveTo(x+43,y+3);ctx.lineTo(x+58,y-23);ctx.lineTo(x+73,y+3);ctx.closePath();ctx.fill();}
    if(profile.style==='beast'||profile.style==='titan'||profile.style==='flame'){ctx.strokeStyle=profile.color||'#ff7180';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x+18,y+20);ctx.lineTo(x-2,y-8);ctx.moveTo(x+91,y+20);ctx.lineTo(x+119,y-8);ctx.stroke();}
    ctx.restore();
  }
  ctx.fillStyle='#e9d9c7';ctx.font='bold 11px Tahoma';ctx.textAlign='center';ctx.fillText(stages[currentStage].boss,x+61,y-12);if(boss.sealed){ctx.fillStyle='#f0cc9d';ctx.fillText('SEALED',x+61,y-26);}ctx.textAlign='start';
}
function drawPlayer(ctx,t) {
  const x=player.x-cameraX, y=player.y, center=x+PLAYER_W/2, bottom=player.y+PLAYER_H;
  const airHeight=Math.max(0,GROUND_Y-(player.y+PLAYER_H));
  const shadowScale=Math.max(.34,1-airHeight/220);
  ctx.fillStyle='#00000088';ctx.beginPath();ctx.ellipse(center,GROUND_Y+3,26*shadowScale,6*shadowScale,0,0,Math.PI*2);ctx.fill();
  if(player.invuln>0&&Math.floor(t/55)%2===0)ctx.globalAlpha=.42;

  const attacking=player.attackTimer>0;
  let anim='idle';
  if(attacking) anim='attack';
  else if(player.ultimateTimer>0) anim='idle';
  else if(player.dashTimer>0) anim='dash';
  else if(!player.onGround) anim='jump';
  else if(Math.abs(player.vx)>2.4) anim='run';
  else if(Math.abs(player.vx)>.35) anim='walk';

  // Melee attacks are rendered exclusively from authored PNG frames. The frame
  // contains the arm, body lean, wings, sword and its slash trail together, so
  // the weapon stays visually attached to the hand without Canvas-drawn arcs.
  const attackFrame=attacking?getAttackFrameIndex():null;
  const ultimateActive = player.ultimateTimer > 0;
  if (ultimateActive) anim = 'ultimate';
  const explicitFrame = ultimateActive ? getUltimateFrameIndex() : attackFrame;
  const src=getFrameVisual(anim,t,explicitFrame);
  const bob=!attacking&&!ultimateActive&&player.onGround&&anim==='idle'?Math.sin(t/270)*1.4:!attacking&&!ultimateActive&&player.onGround&&anim==='run'?Math.abs(Math.sin(t/68))*-1.5:0;
  const size=PLAYER_DRAW_SIZE+(ultimateActive?Math.sin(t/38)*3:0);

  if (src && dashAfterimages.length && !attacking) {
    for (const ghost of dashAfterimages) {
      const gx = ghost.x - cameraX + PLAYER_W/2, gy = ghost.y + PLAYER_H - size + 6;
      ctx.save(); ctx.globalAlpha = Math.max(0, ghost.life / 9) * .22; ctx.shadowColor = '#ff315e'; ctx.shadowBlur = 13;
      ctx.translate(gx, gy); if (ghost.facing < 0) ctx.scale(-1,1);
      ctx.drawImage(src.image, -size/2, 0, size, size); ctx.restore();
    }
  }

  if(src){
    ctx.save();
    const drawHeight=(attacking||ultimateActive)?PLAYER_DRAW_SIZE:size;
    const sourceWidth=src.image.naturalWidth||size;
    const sourceHeight=src.image.naturalHeight||size;
    const drawWidth=(attacking||ultimateActive)?drawHeight*(sourceWidth/Math.max(1,sourceHeight)):size;
    ctx.translate(center,bottom-drawHeight+6+bob);
    if(ultimateActive){ctx.shadowColor='#ff214d';ctx.shadowBlur=30;}
    else if(!attacking&&player.specialTimer>0){ctx.shadowColor=weapons[equipped].color;ctx.shadowBlur=18;ctx.globalAlpha*=.88+.12*Math.sin(t/34);}
    if(!attacking&&player.skillBurstTimer>0){ctx.shadowColor='#ff315e';ctx.shadowBlur=Math.max(ctx.shadowBlur||0,20);}
    if((attacking?(player.attackFacing||player.facing||1):(ultimateActive?(player.ultimateFacing||player.facing||1):(player.facing||1)))<0)ctx.scale(-1,1);
    ctx.drawImage(src.image,-drawWidth/2,0,drawWidth,drawHeight);
    ctx.restore();
  } else if(!drawFrameImage(ctx,center-PLAYER_W/2,y,PLAYER_W,PLAYER_H,'idle',t,player.facing<0)) drawFallbackHero(ctx,x,y);

  ctx.globalAlpha=1;
  // Other abilities keep using their own PNG sequences/effects; only melee sword
  // trails were removed from code-based drawing.
  if(player.castTimer>0 && (player.castKind==='crimson' || player.castKind==='frost')){
    ctx.save();const cx=center+player.facing*27,cy=y+48,fade=player.castTimer/12,pulse=.78+.22*Math.sin(t/25);
    const castColor=player.castKind==='frost'?'#8fe9ff':'#ff527e';
    ctx.translate(cx,cy);ctx.scale(player.facing,1);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Math.min(.82,fade)*pulse;
    ctx.strokeStyle=castColor;ctx.shadowColor=castColor;ctx.shadowBlur=14;ctx.lineWidth=2.2;
    ctx.beginPath();ctx.moveTo(-3,5);ctx.quadraticCurveTo(7,-15,23,-7);ctx.stroke();
    ctx.strokeStyle=player.castKind==='frost'?'#e3fbff':'#ffeaf0';ctx.lineWidth=1.25;ctx.beginPath();ctx.moveTo(0,2);ctx.quadraticCurveTo(10,-7,19,-4);ctx.stroke();
    for(let i=0;i<3;i++){const k=(t/38+i*2.1)%8;ctx.fillStyle=i===0?'#fff':'#ff668b';ctx.beginPath();ctx.moveTo(5+i*5,-3-k);ctx.lineTo(11+i*5,-7-k);ctx.lineTo(9+i*5,1-k);ctx.closePath();ctx.fill();}
    ctx.restore();
  }
  if(player.specialTimer>0){ctx.save();ctx.globalAlpha=.6;ctx.strokeStyle=weapons[equipped].color;ctx.shadowColor=weapons[equipped].color;ctx.shadowBlur=22;ctx.lineWidth=3;ctx.beginPath();ctx.arc(center,bottom-52,42+(27-player.specialTimer)*2.6,-Math.PI*.85,Math.PI*.8);ctx.stroke();ctx.restore();}
  if(player.ultimateTimer>0){
    ctx.save();ctx.globalCompositeOperation='lighter';
    ctx.globalAlpha=.22+.12*Math.sin(t/110);
    ctx.strokeStyle='#ff668b';ctx.shadowColor='#ff315e';ctx.shadowBlur=16;ctx.lineWidth=1.5;
    ctx.beginPath();ctx.ellipse(center,bottom-72,30+Math.sin(t/95)*3,48,-.12,0,Math.PI*2);ctx.stroke();
    ctx.restore();
  }
  if(player.hitFlash>0){ctx.save();ctx.globalAlpha=.45;ctx.fillStyle='#fff';ctx.fillRect(center-PLAYER_DRAW_SIZE/2,bottom-PLAYER_DRAW_SIZE,PLAYER_DRAW_SIZE,PLAYER_DRAW_SIZE);ctx.restore();}
}
function drawFallbackHero(ctx,x,y){ctx.save();ctx.fillStyle='#e7b69b';ctx.fillRect(x+24,y+7,19,22);ctx.fillStyle='#e9e6df';ctx.fillRect(x+21,y+2,25,9);ctx.fillStyle='#b22245';ctx.fillRect(x+15,y+29,37,34);ctx.fillStyle='#811c3c';ctx.beginPath();ctx.moveTo(x+18,y+32);ctx.lineTo(x-4,y+51);ctx.lineTo(x+17,y+68);ctx.fill();ctx.beginPath();ctx.moveTo(x+49,y+32);ctx.lineTo(x+70,y+49);ctx.lineTo(x+51,y+69);ctx.fill();ctx.fillStyle='#181723';ctx.fillRect(x+19,y+62,12,17);ctx.fillRect(x+38,y+62,12,17);ctx.restore();}
function getAttackProgress() {
  const duration = Math.max(1, player.attackDuration || ATTACK_DURATION);
  return Math.max(0, Math.min(1, 1 - (player.attackTimer || 0) / duration));
}
function getAttackFrameIndex(progress = getAttackProgress()) {
  const frames = readyFrames(playerAnimations.attack);
  if (frames.length <= 1) return 0;
  const p = Math.max(0, Math.min(1, progress));
  // Frame-by-frame animation is synchronized to the attack's own duration:
  // light combos play quickly, while heavy swings hold each authored pose longer.
  return Math.max(0, Math.min(frames.length - 1, Math.round(p * (frames.length - 1))));
}
function getSwordPose(progress = getAttackProgress(), facing = player.attackFacing || player.facing || 1, mode = player.attackMode) {
  const p = Math.max(0, Math.min(1, progress));
  const heavy = mode === 'heavy';
  const profile = heavy ? { start: 2.38, end: 0.75, reach: 1.2, handY: 0 } : (LIGHT_COMBO_PROFILES[Math.max(0, Math.min(2, (player.combo || 1) - 1))] || LIGHT_COMBO_PROFILES[0]);
  const anticipationEnd = heavy ? .18 : .12;
  const sweepEnd = heavy ? .82 : .70;
  const smooth = q => { const v = Math.max(0, Math.min(1, q)); return v * v * (3 - 2 * v); };
  let angle;
  if (p < anticipationEnd) {
    const q = smooth(p / anticipationEnd);
    angle = SWORD_REST_ANGLE + (profile.start - SWORD_REST_ANGLE) * q;
  } else if (p <= sweepEnd) {
    const q = smooth((p - anticipationEnd) / (sweepEnd - anticipationEnd));
    angle = profile.start + (profile.end - profile.start) * q;
  } else {
    const q = smooth((p - sweepEnd) / (1 - sweepEnd));
    angle = profile.end + (SWORD_REST_ANGLE - profile.end) * q;
  }
  // Calibrated to the hand visible in the 132px character render, not the sprite's bounding box.
  const handX = player.x + PLAYER_W / 2 + facing * 28;
  const handY = player.y + 36 + profile.handY;
  const bladeLength = (SWORD_SPRITE_HEIGHT - SWORD_HANDLE_OFFSET) * profile.reach;
  return {
    facing, angle, handX, handY,
    tipX: handX + facing * Math.sin(angle) * bladeLength,
    tipY: handY - Math.cos(angle) * bladeLength,
    bladeLength, progress: p, heavy, reverse: !!profile.reverse
  };
}

function segmentIntersectsRect(x1, y1, x2, y2, rect, padding = 0) {
  const left = rect.x - padding, right = rect.x + rect.w + padding;
  const top = rect.y - padding, bottom = rect.y + rect.h + padding;
  const dx = x2 - x1, dy = y2 - y1;
  let tMin = 0, tMax = 1;
  for (const [origin, delta, min, max] of [[x1, dx, left, right], [y1, dy, top, bottom]]) {
    if (Math.abs(delta) < 1e-8) {
      if (origin < min || origin > max) return false;
      continue;
    }
    let a = (min - origin) / delta, b = (max - origin) / delta;
    if (a > b) [a, b] = [b, a];
    tMin = Math.max(tMin, a); tMax = Math.min(tMax, b);
    if (tMin > tMax) return false;
  }
  return true;
}
function pointSegmentDistance(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  const lengthSquared = dx * dx + dy * dy;
  if (!lengthSquared) return Math.hypot(px - x1, py - y1);
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lengthSquared));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}
/* Sword hit detection uses getSwordPose(); its visuals are baked into attack PNG frames. */

function drawProjectiles(ctx,t){
  for(const p of projectiles){
    const x=p.x-cameraX,y=p.y;
    if (p.type === 'crimson') {
      ctx.save(); ctx.translate(x,y); ctx.scale(p.dir,1); ctx.globalCompositeOperation='lighter';
      const pulse=.88+.12*Math.sin(p.age*.42);
      for(let i=0;i<(p.trail||[]).length;i++){
        const back=p.trail[i], alpha=(i+1)/(p.trail.length+1)*.22;
        ctx.globalAlpha=alpha; ctx.strokeStyle='#ff315e'; ctx.shadowColor='#ff315e'; ctx.shadowBlur=11;
        ctx.lineWidth=7-i*.55; ctx.beginPath(); ctx.moveTo(-back,-8); ctx.quadraticCurveTo(-back+12,-26,-back+27,-4); ctx.stroke();
      }
      ctx.globalAlpha=.72; ctx.fillStyle='#6e102e'; ctx.shadowColor='#ff315e'; ctx.shadowBlur=23;
      ctx.beginPath(); ctx.moveTo(30*pulse,0); ctx.quadraticCurveTo(7,-29,-22,-19); ctx.quadraticCurveTo(-9,-3,-27,4); ctx.quadraticCurveTo(5,16,30*pulse,0); ctx.fill();
      ctx.globalAlpha=.98; ctx.strokeStyle='#ff527e'; ctx.lineWidth=4; ctx.shadowBlur=18;
      ctx.beginPath(); ctx.moveTo(-24,8); ctx.quadraticCurveTo(-3,-27,27,-4); ctx.quadraticCurveTo(11,5,-24,8); ctx.stroke();
      ctx.globalAlpha=.92; ctx.strokeStyle='#ffeef3'; ctx.lineWidth=1.8; ctx.shadowColor='#fff'; ctx.shadowBlur=9;
      ctx.beginPath(); ctx.moveTo(-13,2); ctx.quadraticCurveTo(5,-13,24,-3); ctx.stroke();
      for(let i=0;i<4;i++){
        const phase=(p.age*2.1+i*13)%32, sy=Math.sin(p.age*.28+i*1.8)*10;
        ctx.globalAlpha=.2+.38*((i+1)/4); ctx.fillStyle=i%2?'#ffe5ed':'#ff416c';
        ctx.beginPath(); ctx.moveTo(-phase,sy); ctx.lineTo(-phase-6,sy-4); ctx.lineTo(-phase-4,sy+4); ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    } else if(p.effectKey==='ice-wave'){
      const frames=readyFrames(effectAnimations[p.effectKey]);
      ctx.save();ctx.translate(x,y);ctx.scale(p.dir,1);ctx.globalCompositeOperation='lighter';
      const pulse=.88+.12*Math.sin(p.age*.7), travel=(p.age%6)/6;
      for(let i=4;i>=1;i--){ctx.globalAlpha=.12+i*.035;ctx.strokeStyle=i%2?'#76dfff':'#d4f9ff';ctx.lineWidth=2+i*.55;ctx.shadowColor='#43cfff';ctx.shadowBlur=9;ctx.beginPath();ctx.moveTo(-i*13,-1+Math.sin(p.age*.55+i)*4);ctx.quadraticCurveTo(-i*10-9,-15+i*2,-i*19,-23+i*3);ctx.stroke();}
      if(frames.length){const im=frames[Math.floor(p.age/3)%frames.length];ctx.globalAlpha=.72;ctx.shadowColor='#79e9ff';ctx.shadowBlur=15;ctx.drawImage(im,-58,-34,116,68);}
      ctx.globalAlpha=.95;ctx.shadowColor='#7de7ff';ctx.shadowBlur=18;ctx.fillStyle='#e4fbff';ctx.beginPath();ctx.moveTo(18*pulse,0);ctx.lineTo(-1,-10-travel*3);ctx.lineTo(-16,-2);ctx.lineTo(-2,8+travel*2);ctx.closePath();ctx.fill();
      ctx.restore();
    } else {
      const frames=readyFrames(effectAnimations[p.effectKey]||effectAnimations['void-bolt']);
      ctx.save();ctx.globalAlpha=.9;ctx.shadowColor=p.color;ctx.shadowBlur=16;
      if(frames.length){const im=frames[Math.floor((p.age||0)/3)%frames.length];ctx.translate(x,y);ctx.scale(p.dir,1);ctx.drawImage(im,-31,-22,62,44);}else{ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(x,y,9,0,Math.PI*2);ctx.fill();}
      ctx.restore();
    }
  }
}

function drawHostileProjectiles(ctx){
  for(const p of hostileProjectiles){const x=p.x-cameraX,y=p.y;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.95;ctx.shadowColor=p.color;ctx.shadowBlur=18;ctx.strokeStyle=p.color;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-p.vx*3,y-p.vy*3);ctx.lineTo(x,y);ctx.stroke();ctx.fillStyle='#fff0f4';ctx.beginPath();ctx.arc(x,y,5.5,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#ff5276';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,11+Math.sin(p.age*.5)*2,0,Math.PI*2);ctx.stroke();ctx.restore();}
}
function drawFallingStrikes(ctx){
  for(const s of fallingStrikes){const x=s.x-cameraX;if(x<-90||x>CANVAS_W+90)continue;ctx.save();ctx.globalCompositeOperation='lighter';
    if(s.timer>0){ctx.globalAlpha=.28+.24*Math.sin(frameClock*.03+s.x);ctx.strokeStyle=s.color;ctx.shadowColor=s.color;ctx.shadowBlur=10;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x,GROUND_Y-3,27+Math.sin(frameClock*.04)*3,7,0,0,Math.PI*2);ctx.stroke();}
    else{const p=Math.min(1,s.age/14),top=-25+p*(GROUND_Y+13);ctx.globalAlpha=.22;ctx.fillStyle=s.color;ctx.fillRect(x-7,0,14,GROUND_Y);ctx.globalAlpha=.72;ctx.strokeStyle=s.color;ctx.shadowColor=s.color;ctx.shadowBlur=18;ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x,top-55);ctx.lineTo(x,top+14);ctx.stroke();ctx.fillStyle='#fff0f5';ctx.beginPath();ctx.moveTo(x,Math.min(GROUND_Y-8,top+19));ctx.lineTo(x-7,Math.min(GROUND_Y-13,top+4));ctx.lineTo(x+7,Math.min(GROUND_Y-13,top+4));ctx.closePath();ctx.fill();}
    ctx.restore();}
}

function drawCombatEffects(ctx,t){
  for(const ring of impactRings){
    const p = Math.max(0, Math.min(1, ring.age / ring.duration));
    const r = 8 + p * ring.maxRadius, x = ring.x - cameraX;
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = (1-p) * .82;
    ctx.strokeStyle = ring.color; ctx.shadowColor = ring.color; ctx.shadowBlur = 15 * (1-p) + 3; ctx.lineWidth = ring.thickness * (1-p*.55);
    ctx.beginPath(); ctx.ellipse(x, ring.y, r, r*.32, 0, 0, Math.PI*2); ctx.stroke();
    ctx.globalAlpha *= .58; ctx.lineWidth = Math.max(1, ring.thickness*.42);
    ctx.beginPath(); ctx.ellipse(x, ring.y-2, r*.76, r*.2, 0, 0, Math.PI*2); ctx.stroke(); ctx.restore();
  }
  for(const fx of visualEffects){
    if(fx.key==='ultimate') continue; // L is animated on the actual angel sprite, never as a foreground card.
    const frames=readyFrames(effectAnimations[fx.key]);const x=fx.x-cameraX,y=fx.y;const prog=Math.max(0,Math.min(1,fx.age/fx.duration));
    if(frames.length){const idx=Math.min(frames.length-1,Math.floor(prog*frames.length));const im=frames[idx];let w=112,h=82;
      if(fx.key==='ultimate'){w=320;h=236;}else if(fx.key==='fire-burst'){w=128;h=112;}else if(fx.key==='red-strike'){w=70;h=126;}else if(fx.key==='impact-spark'){w=74;h=74;}else if(fx.key==='ice-wave'){w=145;h=95;}else if(fx.key==='void-bolt'){w=125;h=88;}
      w*=fx.scale;h*=fx.scale;ctx.save();ctx.globalAlpha=Math.max(0,1-prog*.8);ctx.translate(x,y);if(fx.facing<0)ctx.scale(-1,1);const glow={ 'ice-wave':'#62ddff','void-bolt':'#bd91ff','fire-burst':'#ffad52','impact-spark':'#ffe6ef','red-strike':'#ff315e','red-slash':'#ff315e','ultimate':'#ff315e' }[fx.key]||'#d8d3df';ctx.shadowColor=glow;ctx.shadowBlur=fx.key==='ultimate'?26:fx.key==='impact-spark'?6:10;ctx.drawImage(im,-w/2,-h/2,w,h);ctx.restore();
    } else {
      const color=fx.key==='ice-wave'?'#77e7ff':fx.key==='void-bolt'?'#bd91ff':fx.key==='fire-burst'?'#ffad52':fx.key==='impact-spark'?'#ffe6ef':fx.key==='wing-flare'?'#ff7b9b':fx.key==='broken-halo'?'#ff527e':fx.key==='descent-impact'?'#ff6b91':'#ff315e';
      ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=1-prog;ctx.strokeStyle=color;ctx.shadowColor=color;ctx.shadowBlur=fx.key==='ice-wave'?16:fx.key==='broken-halo'||fx.key==='descent-impact'?18:10;ctx.lineWidth=fx.key==='broken-halo'||fx.key==='descent-impact'?3.4:fx.key==='ice-wave'?3:2.5;
      if(fx.key==='ice-wave'){ctx.beginPath();ctx.moveTo(x-fx.facing*8,y+12);ctx.quadraticCurveTo(x+fx.facing*(20+prog*50),y-28,x+fx.facing*(35+prog*65),y+2);ctx.stroke();}
      else if(fx.key==='wing-flare'){ctx.translate(x,y);ctx.scale(fx.facing,1);for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(0,5);ctx.quadraticCurveTo(-14-i*3,-9-i*2,-22-i*4,-30-i*2);ctx.stroke();}}
      else if(fx.key==='broken-halo'){const r=16+prog*122;ctx.beginPath();ctx.ellipse(x,y,r,r*.62,-.12,0,Math.PI*2);ctx.stroke();ctx.globalAlpha*=.65;ctx.lineWidth=1.4;ctx.beginPath();ctx.ellipse(x,y,r*.78,r*.5,.12,0,Math.PI*2);ctx.stroke();}
      else if(fx.key==='descent-impact'){const r=14+prog*108;ctx.beginPath();ctx.ellipse(x,y,r,r*.18,0,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(x-r*.5,y-4);ctx.lineTo(x-r*.22,y-15);ctx.moveTo(x+r*.5,y-4);ctx.lineTo(x+r*.22,y-15);ctx.stroke();}
      else{ctx.beginPath();ctx.arc(x,y,10+prog*(fx.key==='ultimate'?95:52),0,Math.PI*2);ctx.stroke();}
      ctx.restore();
    }
  }
  for(const p of particles){const x=p.x-cameraX;ctx.save();ctx.globalAlpha=Math.min(1,p.life/12);ctx.fillStyle=p.color;ctx.shadowColor=p.color;ctx.shadowBlur=8;ctx.fillRect(x,p.y,p.size,p.size);ctx.restore();}
  for(const d of damageNumbers){const x=d.x-cameraX;ctx.save();ctx.globalAlpha=Math.min(1,d.life/14);ctx.textAlign='center';ctx.font=`${d.big?'bold 20':'bold 13'}px Tahoma`;ctx.lineWidth=3;ctx.strokeStyle='#09070d';ctx.strokeText(d.text,x,d.y);ctx.fillStyle=d.color;ctx.shadowColor=d.color;ctx.shadowBlur=9;ctx.fillText(d.text,x,d.y);ctx.restore();}
}

function drawStoryCaption(ctx){
  if(!storyCaption||storyCaption.timer<=0)return;
  const alpha=Math.min(1,storyCaption.timer/28,storyCaption.max/28);const x=30,y=CANVAS_H-68,w=CANVAS_W-60,h=50;
  ctx.save();ctx.globalAlpha=Math.max(.75,alpha);ctx.fillStyle='#070811d9';ctx.strokeStyle='#ff668533';ctx.lineWidth=1;ctx.beginPath();ctx.roundRect(x,y,w,h,9);ctx.fill();ctx.stroke();
  ctx.direction='rtl';ctx.textAlign='right';ctx.font='bold 11px Tahoma';ctx.fillStyle='#ff9aaf';ctx.fillText(storyCaption.speaker||'راوی',x+w-14,y+15);
  ctx.font='12px Tahoma';ctx.fillStyle='#f4e8ef';let text=storyCaption.text||'', words=text.split(/\s+/), lines=[], line='';
  for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width>w-28&&line){lines.push(line);line=word;}else line=test;}if(line)lines.push(line);
  lines.slice(0,2).forEach((ln,i)=>ctx.fillText(ln,x+w-14,y+30+i*14));ctx.restore();
}
function drawAtmosphere(ctx,stage,t){
  // subtle ember/snow motes in the foreground for extra depth
  for(let i=0;i<16;i++){
    const worldX=(i*131+50+(t*.012*(i%3+1)))%(WORLD_W);const x=worldX-cameraX; if(x<-3||x>CANVAS_W+3)continue;
    const y=80+(i*71+t*.02*(i%4+1))%280;ctx.globalAlpha=.15+.2*(.5+.5*Math.sin(t/300+i));ctx.fillStyle=stage.accent;ctx.fillRect(x,y,i%4===0?3:1,i%4===0?3:1);
  }ctx.globalAlpha=1;
}

function circleIntersectsRect(cx, cy, radius, rect) {
  const nearestX = Math.max(rect.x, Math.min(cx, rect.x + rect.w));
  const nearestY = Math.max(rect.y, Math.min(cy, rect.y + rect.h));
  const dx = cx - nearestX, dy = cy - nearestY;
  return dx * dx + dy * dy <= radius * radius;
}
function applyMobHit(mob, damage, direction, knockback = 8, stun = 8, color = '#ff597d', label = null) {
  if (!mob || !mob.alive) return false;
  const hitDirection = Math.sign(direction) || player.facing || 1;
  mob.hp -= damage; mob.flash = Math.max(mob.flash || 0, 12); mob.stun = Math.max(mob.stun || 0, stun);
  mob.knockbackVx = Math.max(-26, Math.min(26, (mob.knockbackVx || 0) + hitDirection * knockback));
  mob.hitDirection = hitDirection; mob.hitLiftV = Math.max(mob.hitLiftV || 0, knockback > 16 ? 7.2 : 4.1);
  const mx = mob.x + 24, my = GROUND_Y - 48 + (mob.airY||0) - (mob.hitLift||0);
  spawnImpactRing(mx, my, color, knockback > 16);
  screenShake(knockback > 16 ? 6.2 : 3.2, knockback > 16 ? 11 : 6);
  hitStopFrames = Math.max(hitStopFrames, knockback > 16 ? 4 : 2);
  spawnEffect('impact-spark', mx, my-4, knockback > 16 ? 1.15 : .86, direction, 20);
  spawnBurst(mx, my-2, color, knockback > 16 ? 22 : 13, knockback > 16 ? 5.2 : 3.8);
  spawnDamageNumber(mx, my-48, label || `-${Math.round(damage)}`, color, knockback > 16);
  player.energy = Math.min(100, player.energy + (knockback > 16 ? 7 : 5));
  if (mob.hp <= 0) {
    mob.alive = false; coins += 4; onMobDefeated(mob); spawnEffect('fire-burst', mx, GROUND_Y - 48, .9, direction, 24);
    spawnBurst(mx, GROUND_Y - 46, '#ff7898', 20, 4.5); playCombatSound('death'); updateTop();
  } else playCombatSound('impact');
  return true;
}
function applyBossHit(damage, direction, knockback = 1.2, stagger = 4, color = '#ff6386', label = null) {
  if (!boss || boss.hp <= 0 || boss.sealed) return false;
  boss.hp = Math.max(0, boss.hp - damage); boss.flash = Math.max(boss.flash || 0, 16);
  boss.knockbackVx = Math.max(-4.8, Math.min(4.8, (boss.knockbackVx || 0) + direction * knockback));
  boss.hitLiftV = Math.max(boss.hitLiftV || 0, knockback > 2 ? 4.4 : 2.6);
  boss.staggerTimer = Math.max(boss.staggerTimer || 0, stagger);
  const bx = boss.x + 58;
  spawnImpactRing(bx, GROUND_Y - 68, color, knockback > 2);
  screenShake(knockback > 2 ? 8.2 : 4.6, knockback > 2 ? 14 : 8);
  hitStopFrames = Math.max(hitStopFrames, knockback > 2 ? 5 : 3);
  spawnEffect('impact-spark', bx, GROUND_Y - 78, knockback > 2 ? 1.3 : .98, direction, 25);
  spawnBurst(bx, GROUND_Y - 70, color, knockback > 2 ? 30 : 19, knockback > 2 ? 6.2 : 4.6);
  spawnDamageNumber(bx, GROUND_Y - 128, label || `-${Math.round(damage)}`, color, knockback > 2);
  player.energy = Math.min(100, player.energy + 8);
  playCombatSound('impact');
  return true;
}
function updateAbilityHud() {
  if (!player) return;
  const data = [
    ['heavyStatus', player.heavyCooldown, 'H'], ['waveStatus', player.crimsonCooldown, 'Q'],
    ['shadowStatus', player.specialCooldown, 'K'], ['descentStatus', player.descentCooldown, 'V'],
    ['haloStatus', player.burstCooldown, 'E'], ['frostStatus', player.frostCooldown, 'C'], ['voidStatus', player.voidBoltCooldown, 'X']
  ];
  for (const [id, cooldown] of data) {
    const el = $(id); if (!el) continue;
    el.textContent = cooldown > 0 ? `${Math.ceil(cooldown / 60)}s` : 'آماده';
    el.classList?.toggle('cooldown', cooldown > 0);
  }
}

function updateGame(t) {
  if(paused||gameEnded)return;
  const movingRight=!!keys.right, movingLeft=!!keys.left;
  const moveDir = movingRight === movingLeft ? 0 : (movingRight ? 1 : -1);
  const wasOnGround = player.onGround;
  if(player.dashTimer>0){
    player.vx=player.facing*PHYSICS.dashSpeed; player.dashTimer--;
  } else if(moveDir!==0){
    if (player.attackTimer <= 0) player.facing=moveDir;
    const attacking = player.attackTimer > 0;
    const accel = (player.onGround ? PHYSICS.groundAcceleration : PHYSICS.airAcceleration) * (attacking ? .68 : 1);
    const speedCap = (player.onGround ? PHYSICS.groundSpeed : PHYSICS.airSpeed) * (attacking ? .82 : 1);
    const targetSpeed = moveDir * speedCap;
    player.vx += Math.max(-accel, Math.min(accel, targetSpeed - player.vx));
  } else {
    player.vx *= player.onGround ? PHYSICS.groundFriction : PHYSICS.airDrag;
  }
  if (player.attackTimer > 0) player.facing = player.attackFacing || player.facing || 1;
  if(Math.abs(player.vx)<((player.onGround ? .12 : .055)))player.vx=0;
  const proposedX = player.x + player.vx;
  player.x = Math.max(12,Math.min(WORLD_W-PLAYER_W-12,proposedX));
  if ((player.x <= 12 && player.vx < 0) || (player.x >= WORLD_W-PLAYER_W-12 && player.vx > 0)) player.vx = 0;
  if (player.dashTimer > 0) dashAfterimages.push({x:player.x,y:player.y,facing:player.facing,life:9});
  if (dashAfterimages.length > 12) dashAfterimages.splice(0,dashAfterimages.length-12);
  for (let i=dashAfterimages.length-1;i>=0;i--) { dashAfterimages[i].life--; if(dashAfterimages[i].life<=0) dashAfterimages.splice(i,1); }
  const holdingJump = !!keys.jump && player.jumpHoldTimer > 0 && player.vy < 0;
  player.vy += holdingJump ? PHYSICS.heldJumpGravity : PHYSICS.gravity;
  if (holdingJump) player.jumpHoldTimer--; else player.jumpHoldTimer = 0;
  player.vy = Math.min(PHYSICS.maxFallSpeed, player.vy);
  player.y += player.vy;
  if(player.y>=GROUND_Y-PLAYER_H){
    const impactSpeed = player.vy;
    const landed = !wasOnGround && impactSpeed>3;
    player.y=GROUND_Y-PLAYER_H;player.vy=0;player.onGround=true;player.jumpsLeft=2;player.coyoteTimer=6;
    if(landed){
      spawnBurst(player.x+PLAYER_W/2,GROUND_Y-2,'#d5b7c3',impactSpeed>9?16:9,impactSpeed>9?3.1:1.9);
      if(impactSpeed>7){spawnImpactRing(player.x+PLAYER_W/2,GROUND_Y-2,'#d6b9c7',impactSpeed>10);screenShake(Math.min(4.2,impactSpeed*.32),6);}
      if(player.descending){player.descending=false;player.descentTimer=0;resolveAngelicDescent();}
    }
  }else{
    player.onGround=false;
    if(wasOnGround && player.vy>=0) player.coyoteTimer=6;
    else player.coyoteTimer=Math.max(0,(player.coyoteTimer||0)-1);
  }
  if(player.jumpBufferTimer>0){player.jumpBufferTimer--;if(player.onGround&&player.jumpsLeft>0)jumpPlayer();}
  if(player.onGround && Math.abs(player.vx)>2.8 && stageElapsedFrames%7===0){
    const dustX=player.x+PLAYER_W/2-Math.sign(player.vx)*19;
    particles.push({x:dustX,y:GROUND_Y-5,vx:-Math.sign(player.vx)*(.35+Math.random()*.45),vy:-.35-Math.random()*.5,life:10+Math.random()*7,max:18,size:1+Math.random()*1.8,color:'#a99aa8'});
    if(particles.length>260)particles.shift();
  }

  // Cinematic flight: rise, hold the fully-open wings, release the global strike,
  // then descend smoothly to the position where the ability was activated.
  if(player.ultimateTimer>0){
    const elapsed = Math.min(ULTIMATE_FLIGHT_DURATION, (player.ultimateElapsed||0) + 1);
    player.ultimateElapsed = elapsed;
    player.x = player.ultimateBaseX;
    player.vx = 0;
    player.vy = 0;
    player.facing = player.ultimateFacing || player.facing || 1;
    player.onGround = false;

    const smooth = v => { const q=Math.max(0,Math.min(1,v)); return q*q*(3-2*q); };
    let lift = ULTIMATE_FLIGHT_HEIGHT;
    if(elapsed <= ULTIMATE_ASCENT_FRAMES){
      lift = ULTIMATE_FLIGHT_HEIGHT * smooth(elapsed / ULTIMATE_ASCENT_FRAMES);
    }else if(elapsed > ULTIMATE_IMPACT_FRAME){
      const descentProgress = (elapsed - ULTIMATE_IMPACT_FRAME) /
        Math.max(1, ULTIMATE_FLIGHT_DURATION - ULTIMATE_IMPACT_FRAME);
      lift = ULTIMATE_FLIGHT_HEIGHT * (1 - smooth(descentProgress));
    }else{
      // A subtle hover gives the wing-opening pose room to read clearly.
      lift += Math.sin((elapsed - ULTIMATE_ASCENT_FRAMES) / 7) * 2.5;
    }
    player.y = Math.max(18, player.ultimateBaseY - lift);
  }

  if(player.attackTimer>0){
    player.attackTimer--;
    const attackProgress = 1 - player.attackTimer / Math.max(1, player.attackDuration || ATTACK_DURATION);
    if(!player.attackHit && attackProgress >= (player.attackImpactProgress || ATTACK_IMPACT_PROGRESS)) resolvePlayerHit();
    if (player.attackTimer === 0) {
      player.attackMode = 'light';
      player.attackDuration = ATTACK_DURATION;
      player.attackImpactProgress = ATTACK_IMPACT_PROGRESS;
    }
  }
  if(player.specialTimer>0){player.specialTimer--;if(player.specialTimer===13&&!player.specialHit)resolveShadowSlash();}
  if(player.voidBoltTimer>0){player.voidBoltTimer--;if(player.voidBoltTimer===13&&!player.voidBoltHit)launchVoidBolt();}
  if(player.skillBurstTimer>0){player.skillBurstTimer--;if(player.skillBurstTimer===10&&!player.burstHit)resolveBrokenHalo();}
  if(player.descending && player.descentTimer>0){player.descentTimer--;player.vy=Math.max(player.vy,10.5);if(player.descentTimer===0&&!player.onGround){player.descending=false;player.vy=Math.max(player.vy,7.5);}}
  if(player.castTimer>0)player.castTimer--;
  if(player.ultimateTimer>0){
    player.ultimateTimer--;
    if(player.ultimateTimer===ULTIMATE_FLIGHT_DURATION-ULTIMATE_IMPACT_FRAME && !player.ultimateHit) resolveUltimateHit();
    if(player.ultimateTimer===0){
      player.x = player.ultimateBaseX;
      player.y = player.ultimateBaseY;
      player.vx = 0;
      player.vy = player.ultimateBaseOnGround ? 0 : Math.max(0,player.ultimateBaseVy||0);
      player.onGround = !!player.ultimateBaseOnGround;
      player.ultimateElapsed = 0;
      spawnBurst(player.x+PLAYER_W/2,player.y+PLAYER_H-4,'#ffdce8',12,2.3);
    }
  }
  if(player.bloodRainTimer>0)player.bloodRainTimer--;
  if(player.soulSnareTimer>0)player.soulSnareTimer--;
  if(player.attackCooldown>0)player.attackCooldown--;
  if(player.heavyCooldown>0)player.heavyCooldown--;
  if(player.specialCooldown>0)player.specialCooldown--;
  if(player.frostCooldown>0)player.frostCooldown--;
  if(player.voidBoltCooldown>0)player.voidBoltCooldown--;
  if(player.burstCooldown>0)player.burstCooldown--;
  if(player.crimsonCooldown>0)player.crimsonCooldown--;
  if(player.descentCooldown>0)player.descentCooldown--;
  if(player.wingBurstTimer>0)player.wingBurstTimer--;
  if(player.bloodRainCooldown>0)player.bloodRainCooldown--;
  if(player.soulSnareCooldown>0)player.soulSnareCooldown--;
  if(storyCaption&&storyCaption.timer>0)storyCaption.timer--;
  stageElapsedFrames++;campaignProgress.playFrames++;
  processStageObjects();
  if(campaignMode==='survival'){survivalWaveTimer++;if(survivalWaveTimer%420===0){spawnEnemyWave(Math.max(180,Math.min(WORLD_W-700,player.x+430)),3+Math.floor(survivalWaveTimer/2400));setCombatToast('موج تازه‌ای از پرتگاه رسید!','#ffb6ca',55);}}
  else if(missionState?.type==='survive'&&!missionState.complete){missionState.timeLeft--;missionState.progress=Math.max(0,missionState.target-Math.ceil(missionState.timeLeft/60));if(missionState.timeLeft<=0)completeMissionObjective();if(stageElapsedFrames%30===0)updateMissionHud();}
  updateStoryProgress();
  if(!player.waveOne&&player.x>840){player.waveOne=true;spawnEnemyWave(player.x+200,3);setStoryCaption('اِیرِن','این منطقه مسیر کاروان‌های تبعیدی است. نگهبانان فقط وقتی می‌آیند که مُهرها تو را به رسمیت بشناسند.',220);}
  if(!player.waveTwo&&player.x>1720){player.waveTwo=true;spawnEnemyWave(player.x+210,4);setStoryCaption('سِرا','این بار نمی‌گذارم کسی میان من و حقیقت بایستد.',190);}
  if(keys.attack && player.attackTimer===0 && player.attackCooldown===0)triggerAttack();
  if(player.comboWindow>0)player.comboWindow--;else player.combo=0;
  if(player.dashCooldown>0)player.dashCooldown--;
  if(player.parryTimer>0)player.parryTimer--;
  if(player.parryCooldown>0)player.parryCooldown--;
  if(player.perfectDodgeCooldown>0)player.perfectDodgeCooldown--;
  if(player.invuln>0)player.invuln--;
  if(player.hitFlash>0)player.hitFlash--;
  if(screenFlashFrames>0)screenFlashFrames--;
  if(impactVignetteFrames>0)impactVignetteFrames--;
  if(combatToast&&combatToast.timer>0)combatToast.timer--;else combatToast=null;
  if(shakeTime>0){shakeTime--;shakeStrength*=.9;if(shakeTime===0){shakeStrength=0;shakeDuration=0;}}
  updateMobs();updateBoss();updateProjectiles();updateHostileProjectiles();updateFallingStrikes();updateEffects();
  if(stageElapsedFrames%300===0)saveCampaignProgress();
  const cameraTarget=Math.max(0,Math.min(WORLD_W-CANVAS_W,player.x-CANVAS_W*.38));
  cameraX += (cameraTarget-cameraX)*.16;
  if(Math.abs(cameraTarget-cameraX)<.18)cameraX=cameraTarget;
  updatePlayerHealthHud();if(player.hp<=0)gameOver(false);if(boss.hp<=0)gameOver(true);
}
function resolveShadowSlash() {
  if (player.specialHit) return; player.specialHit = true;
  const dir = player.attackFacing || player.facing || 1, weapon = weapons[equipped];
  const x1 = player.x + PLAYER_W / 2 + dir * 15, y1 = player.y + 54;
  const x2 = player.x + PLAYER_W / 2 + dir * 138, y2 = player.y + 19;
  let hits = 0;
  for (const m of mobs) {
    if (!m.alive) continue;
    const rect = { x:m.x-5, y:GROUND_Y-63, w:60, h:66 };
    if (!segmentIntersectsRect(x1,y1,x2,y2,rect,15)) continue;
    applyMobHit(m, Math.round(24 * weapon.damage), dir, 19, 18, '#c48aff', 'SHADOW'); hits++;
  }
  if (boss.hp > 0) {
    const rect = {x:boss.x,y:GROUND_Y-126,w:125,h:125};
    if (segmentIntersectsRect(x1,y1,x2,y2,rect,18)) { applyBossHit(26 * weapon.damage, dir, 2.4, 10, '#c48aff', 'SHADOW'); hits++; }
  }
  spawnEffect('red-slash', x1 + dir * 75, y1 - 13, 1.32, dir, 25);
  spawnBurst(x1 + dir * 82, y1 - 18, '#b988f4', 20, 4.6);
  screenShake(hits ? 5 : 2.8, hits ? 10 : 6); hitStopFrames = Math.max(hitStopFrames, hits ? 4 : 2);
  setCombatToast(hits ? `سایه‌شکاف — ${hits} برخورد` : 'سایه‌شکاف!', '#e4d1ff', 44); updateTop();
}

function resolveUltimateHit(){
  if(player.ultimateHit)return;
  player.ultimateHit=true;
  const px=player.x+PLAYER_W/2,weapon=weapons[equipped];
  let hits=0;

  // The angel remains the visual focus. Damage is applied to every living
  // regular enemy; the final pulse travels outward along the ground.
  for(const m of mobs){
    if(!m.alive)continue;
    const dir=Math.sign((m.x+25)-px)||player.ultimateFacing||player.facing;
    applyMobHit(m,9999,dir,22,24,weapon.color,'JUDGEMENT');
    hits++;
  }
  if(boss.hp>0&&!boss.sealed){
    applyBossHit(72*weapon.damage,player.ultimateFacing||player.facing,4.8,24,'#fff0f5','JUDGEMENT');
    hits++;
  }

  // Three expanding floor shockwaves replace the large image that previously
  // appeared in front of the character and covered the gameplay.
  impactRings.push(
    {x:px,y:GROUND_Y-4,color:'#ffb2c8',age:0,duration:34,maxRadius:310,thickness:5.2},
    {x:px,y:GROUND_Y-4,color:'#ff5278',age:7,duration:42,maxRadius:470,thickness:3.8},
    {x:px,y:GROUND_Y-4,color:'#ffe5ed',age:14,duration:50,maxRadius:640,thickness:2.4}
  );
  spawnBurst(px,GROUND_Y-18,'#ff315e',54,7.2);
  spawnBurst(px,GROUND_Y-18,'#ffeaf1',26,4.8);
  playCombatSound('heavy');
  screenShake(hits?11:6,18);
  screenFlashFrames=Math.max(screenFlashFrames,combatSettings.hitFlashes?5:0);
  hitStopFrames=Math.max(hitStopFrames,6);
  setCombatToast(hits?'FINAL JUDGEMENT — THE HALO WAVE HAS STRUCK!':'FINAL JUDGEMENT — THE HALO IS RELEASED!','#ffe8ef',90);
  updateTop();
}
function updateProjectiles(){
  for(let i=projectiles.length-1;i>=0;i--){
    const p=projectiles[i];
    p.x+=p.vx||0; p.y+=p.vy||0; p.life--; p.age=(p.age||0)+1;
    if(p.type==='crimson'){
      p.trail ||= []; p.trail.push(8);
      if(p.trail.length>6)p.trail.shift();
      for(let j=0;j<p.trail.length;j++)p.trail[j]=(p.trail.length-j)*8;
    }
    let removeProjectile=false;
    for(const m of mobs){
      if(!m.alive || (p.hitMobs && p.hitMobs.has(m)))continue;
      const rect={x:m.x-5,y:GROUND_Y-63+(m.airY||0)-(m.hitLift||0),w:60,h:66};
      const intersects=p.type==='crimson' ? circleIntersectsRect(p.x,p.y,p.radius||24,rect) : circleIntersectsRect(p.x,p.y,p.radius||12,rect);
      if(!intersects)continue;
      const damage=p.damage || (p.pierce?2:1);
      applyMobHit(m, damage, p.dir, p.type==='crimson'?18:(p.pierce?12:22), p.type==='crimson'?14:10, p.color, p.type==='crimson'?'CRIMSON':p.type==='frost'?'FROST':p.type==='void'?'VOID':'POWER');
      if(p.hitMobs)p.hitMobs.add(m);
      spawnEffect(p.impactKey,m.x+22,GROUND_Y-54,p.type==='crimson'?1.25:p.pierce?1.08:.94,p.dir,p.type==='crimson'?30:24);
      if(!p.pierce || (p.pierce && p.hitMobs && p.hitMobs.size >= (p.maxTargets || 3))){removeProjectile=true;break;}
    }
    if(!removeProjectile && boss.hp>0 && !p.hitBoss){
      const bossRect={x:boss.x,y:GROUND_Y-126,w:125,h:125};
      if(circleIntersectsRect(p.x,p.y,p.radius||12,bossRect)){
        const damage=p.damage||25*weapons[equipped].damage;
        applyBossHit(damage,p.dir,p.type==='crimson'?2.4:1.6,p.type==='crimson'?9:6,p.color,p.type==='crimson'?'CRIMSON':null);
        p.hitBoss=true;
        spawnEffect(p.impactKey,boss.x+58,GROUND_Y-80,p.type==='crimson'?1.5:1.2,p.dir,30);
        removeProjectile = true;
        screenShake(p.type==='crimson'?7:5,p.type==='crimson'?13:10);
        hitStopFrames=Math.max(hitStopFrames,p.type==='crimson'?5:4);
        player.energy=Math.min(100,player.energy+7);
        if(!p.pierce)removeProjectile=true;
      }
    }
    const travelled=Math.abs(p.x-(p.startX ?? p.x));
    if(removeProjectile || p.life<=0 || travelled>(p.maxRange||WORLD_W) || p.x<0 || p.x>WORLD_W){
      if(p.type==='crimson' && (removeProjectile || p.life<=0 || travelled>(p.maxRange||WORLD_W))){spawnBurst(p.x,p.y,'#ff6389',8,2.1);playCombatSound('waveHit');}
      projectiles.splice(i,1);
    }
  }
}

function updateHostileProjectiles(){
  for(let i=hostileProjectiles.length-1;i>=0;i--){const p=hostileProjectiles[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.015;p.age++;p.life--;
    if(Math.abs(p.x-(player.x+PLAYER_W/2))<23&&Math.abs(p.y-(player.y+PLAYER_H*.52))<38){
      const defenseResult=resolveDefensiveTiming(p.x,null,p.damage,p.color);
      if(defenseResult){p.life=0;continue;}
      if(player.invuln>0){continue;}
      const defense=Math.min(.42,playerStat('defense')*.022),damage=Math.max(3,Math.round(p.damage*(1-defense)));
      player.hp=Math.max(0,player.hp-damage);player.invuln=44;player.hitFlash=9;player.vx+=Math.sign(player.x-p.x)*2.6;
      spawnBurst(player.x+PLAYER_W/2,player.y+42,p.color,13,3.2);spawnEffect('impact-spark',p.x,p.y,.75,-1,18);screenShake(3.4,7);updatePlayerHealthHud();p.life=0;
    }
    if(p.life<=0||p.x<cameraX-180||p.x>WORLD_W+180||p.y>GROUND_Y+40)hostileProjectiles.splice(i,1);
  }
}
function updateFallingStrikes(){
  for(let i=fallingStrikes.length-1;i>=0;i--){const s=fallingStrikes[i];if(s.type==='mob'&&s.target&&s.target.alive)s.x=s.target.x+24;else if(s.type==='boss'&&boss.hp>0)s.x=boss.x+58;if(s.timer>0){s.timer--;continue;}s.age++;
    if(s.age===14&&!s.hit){s.hit=true;const weapon=weapons[equipped];
      if(s.type==='mob'&&s.target&&s.target.alive){applyMobHit(s.target,s.damage,Math.sign((s.target.x+24)-(player.x+PLAYER_W/2))||player.facing,12,12,s.color,'BLOOD RAIN');}
      else if(s.type==='boss'&&boss.hp>0){applyBossHit(s.damage,player.facing,1.8,18,s.color,'BLOOD RAIN');}
      spawnEffect('red-strike',s.x,GROUND_Y-50,1.05,player.facing,24);spawnBurst(s.x,GROUND_Y-12,s.color,19,5);screenShake(s.type==='boss'?5.5:2.5,s.type==='boss'?11:5);screenFlashFrames=Math.max(screenFlashFrames,s.type==='boss'?5:2);updateTop();
    }
    if(s.age>24)fallingStrikes.splice(i,1);
  }
}
function updateEffects(){
  for(let i=visualEffects.length-1;i>=0;i--){visualEffects[i].age++;if(visualEffects[i].age>=visualEffects[i].duration)visualEffects.splice(i,1);}
  for(let i=impactRings.length-1;i>=0;i--){impactRings[i].age++;if(impactRings[i].age>=impactRings[i].duration)impactRings.splice(i,1);}
  for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.14;p.vx*=.985;p.life--;if(p.life<=0)particles.splice(i,1);}
  for(let i=damageNumbers.length-1;i>=0;i--){const d=damageNumbers[i];d.y-=.72;d.life--;if(d.life<=0)damageNumbers.splice(i,1);}
}
function resolvePlayerHit() {
  if (player.attackHit) return;
  player.attackHit = true;
  const weapon = weapons[equipped], combo = player.combo || 1;
  const pose = getSwordPose(player.attackImpactProgress || ATTACK_IMPACT_PROGRESS, player.attackFacing || player.facing || 1);
  const x1 = pose.handX, y1 = pose.handY, x2 = pose.tipX, y2 = pose.tipY;
  const heavy = player.attackMode === 'heavy';
  const multiplier = heavy ? 2.35 : ([1, 1.18, 1.62][Math.max(0, Math.min(2, combo - 1))] || 1);
  const critical=Math.random()<Math.min(.45,playerStat('crit')*.015)?1.75:1;
  const aerialMultiplier = player.onGround ? 1 : 1.18;
  const damage = Math.max(1, Math.round(weapon.damage * multiplier * getPlayerDamageMultiplier() * critical * aerialMultiplier));
  if (!player.onGround) player.aerialComboHits = (player.aerialComboHits || 0) + 1; else player.aerialComboHits = 0;
  let hits = 0;

  for (const mob of mobs) {
    if (!mob.alive) continue;
    const rect = {x:mob.x-5, y:GROUND_Y-63+(mob.airY||0)-(mob.hitLift||0), w:60, h:66};
    if (!segmentIntersectsRect(x1,y1,x2,y2,rect,heavy?10:SWORD_HIT_RADIUS)) continue;
    const knockback = heavy ? 25 : combo===3 ? 16 : 9;
    applyMobHit(mob, damage, player.attackFacing || player.facing, knockback, heavy ? 22 : combo===3 ? 13 : 8, heavy ? '#ff8ba7' : weapon.color, heavy ? 'HEAVY' : combo===3 ? `FINISH -${damage}` : `-${damage}`);
    hits++;
  }

  if (boss.hp > 0) {
    const rect = {x:boss.x, y:GROUND_Y-126, w:125, h:125};
    if (segmentIntersectsRect(x1,y1,x2,y2,rect,heavy?12:SWORD_HIT_RADIUS)) {
      applyBossHit((heavy ? 29 : combo===3 ? 22 : 14) * weapon.damage * getPlayerDamageMultiplier(), player.attackFacing || player.facing, heavy ? 3.2 : combo===3 ? 2.1 : 1.05, heavy ? 13 : combo===3 ? 8 : 4, heavy ? '#ff8ba7' : weapon.color, heavy ? 'HEAVY' : combo===3 ? 'FINISH' : null);
      hits++;
    }
  }

  if (hits > 0) {
    screenShake(heavy ? 10.5 : combo===3 ? 7.4 : 4.1, heavy ? 18 : combo===3 ? 13 : 7);
    hitStopFrames = Math.max(hitStopFrames, heavy ? 7 : combo===3 ? 5 : 3);
    screenFlashFrames = Math.max(screenFlashFrames, combatSettings.hitFlashes ? (heavy ? 8 : combo === 3 ? 5 : 2) : 0);
    playCombatSound(heavy ? 'heavy' : 'impact');
    if (heavy) setCombatToast('ضربه‌ی سنگین فرود آمد!', '#ffe0e8', 42);
    else if (combo === 3) setCombatToast('پایان کمبو — برش نهایی!', '#ffe0e8', 38);
  } else {
    spawnEffect(weapon.effect, x2, y2, .55, player.attackFacing || player.facing, 14);
  }
  updateTop();
}

function damagePlayerFromEnemy(m,rawDamage,knockback=2.8,color='#ff5575',label='ضربه‌ی دشمن'){
  if(!player)return false;
  const defenseResult=resolveDefensiveTiming(m.x+24,m,rawDamage,color);
  if(defenseResult)return false;
  if(player.invuln>0)return false;
  const defense=Math.min(.42,playerStat('defense')*.022);
  const damage=Math.max(3,Math.round(rawDamage*(1-defense)));
  player.hp=Math.max(0,player.hp-damage);player.invuln=46;player.hitFlash=10;
  const direction=Math.sign((player.x+PLAYER_W/2)-(m.x+24))||-m.dir;
  player.vx+=direction*knockback;
  if(m.kind==='brute'&&player.onGround)player.vy=-2.4;
  spawnBurst(player.x+PLAYER_W/2,player.y+42,color,14,3.5);
  spawnEffect('impact-spark',player.x+PLAYER_W/2,player.y+42,.88,direction,20);
  spawnDamageNumber(player.x+PLAYER_W/2,player.y+14,`-${damage}`, '#ff91a6',true);
  screenShake(m.kind==='brute'?5.8:3.6,m.kind==='brute'?11:7);
  screenFlashFrames=Math.max(screenFlashFrames,combatSettings.hitFlashes?3:0);
  playCombatSound('impact');updatePlayerHealthHud();
  setCombatToast(label,'#ffb5c4',34);
  return true;
}
function mobDistance(m){return Math.abs((m.x+24)-(player.x+PLAYER_W/2));}
function beginMobWindup(m,action,duration,targetX=player.x+PLAYER_W/2){
  m.aiAction=action;m.windup=duration;m.targetX=targetX;m.lockedDir=(targetX-(m.x+24))<0?-1:1;m.dir=m.lockedDir;m.attackResolved=false;
}
function fireMobVolley(m,count=1,spread=.12){
  const sx=m.x+24,sy=GROUND_Y-45+(m.airY||0),tx=player.x+PLAYER_W/2,ty=player.y+PLAYER_H*.48;
  const angle=Math.atan2(ty-sy,tx-sx),speed=m.kind==='caster'?4.65:4.15;
  for(let i=0;i<count;i++){
    const a=angle+(i-(count-1)/2)*spread;
    hostileProjectiles.push({x:sx,y:sy,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,life:155,age:0,damage:m.attackDamage,color:m.kind==='caster'?'#bd9cff':stages[currentStage].accent,owner:'mob'});
  }
  spawnBurst(sx,sy,m.kind==='caster'?'#bd9cff':stages[currentStage].accent,7,2.2);
}
function resolveMobSlam(m){
  const distance=Math.abs((m.targetX||m.x+24)-(player.x+PLAYER_W/2));
  if(distance<112&&player.onGround)damagePlayerFromEnemy(m,m.attackDamage*1.28,3.8,'#ff687e','موج ضربه‌ی نگهبان! از زمین فاصله بگیر.');
  spawnImpactRing(m.targetX||m.x+24,GROUND_Y-2,'#ff687e',true);spawnBurst(m.targetX||m.x+24,GROUND_Y-9,'#ff6a83',18,4.2);screenShake(4.2,8);
}
function executeMobAction(m){
  const dir=m.lockedDir||m.dir||1;
  if(m.aiAction==='lunge'){m.lungeTimer=14;m.lungeVx=dir*(m.kind==='duelist'?8.2:6.7);m.attackResolved=false;return;}
  if(m.aiAction==='leap'){
    m.jumpVY=-11.4;m.jumpVX=dir*(m.kind==='jumper'?4.2:3.5);m.landingSlam=true;m.attackCooldown=m.kind==='jumper'?126:148;return;
  }
  if(m.aiAction==='slam'){resolveMobSlam(m);m.attackCooldown=m.kind==='brute'?142:105;return;}
  if(m.aiAction==='cast'){
    fireMobVolley(m,m.kind==='caster'?3:1,m.kind==='caster'?.19:.06);m.attackCooldown=m.kind==='caster'?142:118;return;
  }
  if(m.aiAction==='melee'){
    const inRange=mobDistance(m)<76&&Math.abs(player.y-(GROUND_Y-PLAYER_H))<42;
    if(inRange)damagePlayerFromEnemy(m,m.attackDamage,2.8,stages[currentStage].accent,'ضربه‌ی نزدیک نگهبان!');
    m.attackCooldown=104;
  }
  m.aiAction='';
}
function updateMobs(){
  const playerCenter=player.x+PLAYER_W/2;
  for(const m of mobs){
    if(!m.alive)continue;
    if(m.flash>0)m.flash--;
    if(m.contactCooldown>0)m.contactCooldown--;
    if(m.evadeCooldown>0)m.evadeCooldown--;
    if(m.jumpCooldown>0)m.jumpCooldown--;
    if(m.attackCooldown>0)m.attackCooldown--;
    // Airborne enemies use their own vertical arc and can be hit at their actual height.
    if(m.jumpVY!==0||m.airY<0){
      m.airY=(m.airY||0)+m.jumpVY;m.jumpVY+=.54;m.x+=m.jumpVX||0;m.jumpVX=(m.jumpVX||0)*.985;
      if(m.airY>=0){m.airY=0;m.jumpVY=0;m.jumpVX=0;if(m.landingSlam){m.landingSlam=false;resolveMobSlam(m);m.attackCooldown=Math.max(m.attackCooldown,118);}}
    }
    m.hitLift=Number(m.hitLift)||0;m.hitLiftV=Number(m.hitLiftV)||0;
    if(m.hitLift>0||m.hitLiftV<0){m.hitLift+=m.hitLiftV;m.hitLiftV-=.62;if(m.hitLift<=0){m.hitLift=0;m.hitLiftV=0;}}
    if(Math.abs(m.knockbackVx||0)>.12){m.x+=m.knockbackVx;m.knockbackVx*=.76;m.x=Math.max(18,Math.min(WORLD_W-62,m.x));if(m.x<=18||m.x>=WORLD_W-62)m.knockbackVx=0;}else m.knockbackVx=0;
    if(m.stun>0){m.stun--;continue;}
    const mobCenter=m.x+24,delta=playerCenter-mobCenter,dist=Math.abs(delta),dir=delta<0?-1:1;m.dir=dir;
    // Agile enemies read the player's swing and occasionally leave the blade's line.
    if((m.kind==='duelist'||m.kind==='jumper')&&m.evadeCooldown<=0&&m.airY===0&&player.attackTimer>0&&dist<118&&Math.random()<.34){
      m.jumpVY=-8.6;m.jumpVX=-dir*2.6;m.evadeCooldown=105;m.attackCooldown=Math.max(m.attackCooldown,42);m.aiAction='';m.windup=0;continue;
    }
    if(m.lungeTimer>0){
      m.x+=m.lungeVx;m.lungeTimer--;
      if(!m.attackResolved&&Math.abs((m.x+24)-playerCenter)<46&&Math.abs(player.y-(GROUND_Y-PLAYER_H))<46){m.attackResolved=true;damagePlayerFromEnemy(m,m.attackDamage*1.08,3.5,'#ff7794','یورش شمشیرزن!');}
      if(m.lungeTimer===0){m.attackCooldown=Math.max(m.attackCooldown,112);m.aiAction='';m.x=Math.max(m.min,Math.min(m.max,m.x));}
      continue;
    }
    if(m.windup>0){m.windup--;if(m.windup===0)executeMobAction(m);continue;}
    if(dist>720){m.x+=(m.homeX-m.x)*.012;continue;}
    if(m.kind==='ranged'||m.kind==='caster'){
      if(dist>370)m.x+=dir*m.moveSpeed;
      else if(dist<205)m.x-=dir*m.moveSpeed*1.25;
      if(dist<590&&dist>120&&m.attackCooldown<=0)beginMobWindup(m,'cast',m.kind==='caster'?27:21,playerCenter);
      m.x=Math.max(m.min,Math.min(m.max,m.x));continue;
    }
    if(m.kind==='jumper'){
      if(dist>80)m.x+=dir*m.moveSpeed*(dist>260?1.12:.88);
      if(dist>105&&dist<410&&m.jumpCooldown<=0&&m.attackCooldown<=0){beginMobWindup(m,'leap',15,playerCenter);m.jumpCooldown=178;}
      else if(dist<74&&m.attackCooldown<=0)beginMobWindup(m,'melee',13,playerCenter);
      m.x=Math.max(m.min,Math.min(m.max,m.x));continue;
    }
    if(m.kind==='duelist'){
      if(dist>112)m.x+=dir*m.moveSpeed;
      else if(dist<66)m.x-=dir*m.moveSpeed*.7;
      if(dist>78&&dist<260&&m.attackCooldown<=0)beginMobWindup(m,'lunge',25,playerCenter);
      else if(dist<=78&&m.attackCooldown<=0)beginMobWindup(m,'melee',17,playerCenter);
      m.x=Math.max(m.min,Math.min(m.max,m.x));continue;
    }
    if(m.kind==='brute'){
      if(dist>102)m.x+=dir*m.moveSpeed;
      if(dist<185&&m.attackCooldown<=0)beginMobWindup(m,'slam',35,playerCenter);
      m.x=Math.max(m.min,Math.min(m.max,m.x));continue;
    }
    // Stalkers do not patrol in a tiny box: they pressure the player, then commit to a readable strike.
    if(dist>62)m.x+=dir*m.moveSpeed;
    else if(m.attackCooldown<=0)beginMobWindup(m,'melee',14,playerCenter);
    m.x=Math.max(m.min,Math.min(m.max,m.x));
    // Airborne jumps can pass over the player; landing attacks only punish staying grounded.
    if(m.contactCooldown<=0&&Math.abs((m.x+24)-playerCenter)<35&&Math.abs((GROUND_Y+(m.airY||0))-(player.y+PLAYER_H))<38&&m.jumpVY>0){
      if(damagePlayerFromEnemy(m,m.attackDamage*.8,2.5,'#ff987f','برخورد در هوا!'))m.contactCooldown=40;
    }
  }
}
function updateBoss(){
  if(boss.flash>0)boss.flash--;
  boss.hitLift = Number(boss.hitLift) || 0; boss.hitLiftV = Number(boss.hitLiftV) || 0;
  if(boss.hitLift > 0 || boss.hitLiftV < 0){boss.hitLift += boss.hitLiftV; boss.hitLiftV -= .48; if(boss.hitLift <= 0){boss.hitLift=0;boss.hitLiftV=0;}}
  if(boss.sealed)return;
  if(boss.staggerTimer>0)boss.staggerTimer--;
  if(Math.abs(boss.knockbackVx||0)>.08){boss.x+=boss.knockbackVx;boss.knockbackVx*=.72;}else boss.knockbackVx=0;
  if(boss.hp<=0){boss.dead=true;return;}
  const ratio=boss.hp/boss.maxHp;
  if(ratio<=.62&&boss.phase<2){boss.phase=2;boss.cooldown=Math.min(boss.cooldown,35);setStoryCaption(stages[currentStage].boss,currentActLore().phase,270);setCombatToast('فاز دوم — زره باس شکسته شد','#ffd5df',80);screenShake(7,12);screenFlashFrames=7;spawnBurst(boss.x+58,GROUND_Y-90,'#ff496c',32,6.2);}
  if(ratio<=.28&&boss.phase<3){boss.phase=3;boss.cooldown=22;boss.rangedCooldown=65;setStoryCaption('اِیرِن','مراقب باش! نگهبان آخرین قدرتش را مصرف می‌کند؛ حلقه‌های هشدار را دنبال کن.',235);setCombatToast('خشم نهایی — سرعت باس افزایش یافت!','#ff7189',90);screenShake(9,16);screenFlashFrames=8;}
  const pc=player.x+PLAYER_W/2,bc=boss.x+58,dist=pc-bc;boss.facing=dist<0?-1:1;
  if(boss.chargeTimer>0){
    boss.x+=boss.chargeDir*((boss.phase>=3?7.4:6.2)*(boss.profile?.speed||1));boss.chargeTimer--;
    if(!boss.chargeHit&&Math.abs((boss.x+58)-pc)<66){const defenseResult=resolveDefensiveTiming(boss.x+58,boss,0,boss.profile?.color);if(defenseResult){boss.chargeHit=true;boss.chargeTimer=0;boss.cooldown=70;}else if(player.invuln<=0){boss.chargeHit=true;player.hp=Math.max(0,player.hp-(10+stages[currentStage].actIndex*2)*(boss.profile?.damage||1)*(1-playerStat('defense')*.025));player.invuln=50;player.hitFlash=11;player.vx=boss.chargeDir*4.2;spawnEffect('impact-spark',pc,GROUND_Y-56,1.05,-boss.chargeDir,22);spawnBurst(pc,GROUND_Y-48,'#ff4e70',17,4.8);screenShake(7,12);screenFlashFrames=6;setCombatToast('برخورد یورش باس!','#ff9eaf',42);}}
    if(boss.x<85||boss.x>WORLD_W-160)boss.chargeTimer=0;
    if(boss.chargeTimer===0)boss.cooldown=boss.phase>=3?38:65;
    return;
  }
  if(boss.windup>0){boss.windup--;if(boss.windup===1){screenShake(2,3);}if(boss.windup===0){
      if(boss.attackType==='bolt'){
        const dir=dist<0?-1:1,profile=boss.profile||{},count=['bishop','bell','queen'].includes(profile.style)?2:1;
        for(let n=0;n<count;n++)hostileProjectiles.push({x:boss.x+58,y:GROUND_Y-43+n*13,vx:dir*(boss.phase>=3?5.1:4.2),vy:n?-.12:0,life:150,age:0,damage:(9+stages[currentStage].actIndex*2)*(profile.damage||1),color:profile.color||stages[currentStage].accent||'#ff4567'});
        spawnBurst(boss.x+58,GROUND_Y-85,profile.color||stages[currentStage].accent,12,3.2);boss.rangedCooldown=boss.phase>=3?72:118;boss.cooldown=boss.phase>=3?28:48;
      }else if(boss.attackType==='pulse'){
        const dir=dist<0?-1:1,profile=boss.profile||{};
        for(let n=-1;n<=1;n++)hostileProjectiles.push({x:boss.x+58,y:GROUND_Y-30+n*10,vx:dir*(4.4+Math.abs(n)*.55),vy:n*.18,life:135,age:0,damage:(8+stages[currentStage].actIndex*2)*(profile.damage||1),color:profile.color||stageAccent()});
        spawnBurst(boss.x+58,GROUND_Y-75,profile.color||stageAccent(),22,4.4);screenShake(4.2,8);boss.cooldown=boss.phase>=3?42:66;boss.rangedCooldown=80;
      }else if(boss.attackType==='charge'){
        boss.chargeTimer=boss.phase>=3?25:19;boss.chargeDir=dist<0?-1:1;boss.chargeHit=false;
        spawnEffect('red-strike',boss.x+58,GROUND_Y-55,1.0,boss.chargeDir,24);spawnBurst(boss.x+58,GROUND_Y-30,'#ff315e',18,4.7);
      }else{
        const targetX=Number.isFinite(boss.targetX)?boss.targetX:player.x+PLAYER_W/2;spawnEffect('red-strike',targetX,GROUND_Y-68,1.15,player.facing,23);spawnBurst(targetX,GROUND_Y-43,'#ff315e',16,4.3);
        if(Math.abs((player.x+PLAYER_W/2)-targetX)<92){const defenseResult=resolveDefensiveTiming(boss.x+58,boss,0,boss.profile?.color);if(!defenseResult&&player.invuln<=0){player.hp=Math.max(0,player.hp-(14+stages[currentStage].actIndex*3)*(boss.profile?.damage||1)*(1-playerStat('defense')*.025));player.invuln=54;player.hitFlash=12;player.vx+=(dist<0?-1:1)*3.4;screenShake(6.2,12);screenFlashFrames=7;setCombatToast('ضربه‌ی سنگین باس! جاخالی بده','#ff9eaf',40);}}
        boss.cooldown=boss.phase>=3?40:boss.phase>=2?58:76;
      }
    }}
  else if(boss.staggerTimer>0){/* The soul-snare briefly interrupts the boss without pausing the world. */}
  else{
    const chase=(boss.phase>=3?1.62:boss.phase>=2?1.3:1.08)*(boss.profile?.speed||1);
    if(Math.abs(dist)>142)boss.x+=Math.sign(dist)*chase;
    if(boss.rangedCooldown>0)boss.rangedCooldown--;
    if(boss.cooldown>0)boss.cooldown--;
    if(Math.abs(dist)>190&&Math.abs(dist)<560&&boss.rangedCooldown<=0){boss.attackType='bolt';boss.targetX=pc;boss.windup=boss.phase>=3?24:34;setCombatToast('حمله‌ی دوربرد باس — آماده شو','#ffd9e1',35);}
    else if(Math.abs(dist)<250&&boss.cooldown<=0){
      const profilePatterns=boss.profile?.attacks;
      const patterns=Array.isArray(profilePatterns)&&profilePatterns.length?profilePatterns:(boss.phase>=3?['charge','slam','bolt']:boss.phase>=2?['slam','charge','bolt']:['slam','bolt','slam']);
      boss.attackType=patterns[boss.attackCycle%patterns.length];boss.attackCycle++;boss.targetX=player.x+PLAYER_W/2;
      boss.windup=boss.attackType==='charge'?(boss.phase>=3?25:33):boss.attackType==='bolt'?30:(boss.phase>=3?29:42);
      if(boss.attackType==='slam')setCombatToast('حلقه‌ی سرخ! از محدوده بیرون برو','#ff8ba0',38);
      else if(boss.attackType==='charge')setCombatToast('باس در حال یورش است! از مسیرش کنار برو','#ff8ba0',38);
      boss.rangedCooldown=Math.max(boss.rangedCooldown,75);
    }
  }
  boss.x=Math.max(80,Math.min(WORLD_W-145,boss.x));
}
function gameLoop(t){
  frameClock=t;
  if($('game').classList.contains('active')&&!paused&&!gameEnded){if(hitStopFrames>0)hitStopFrames--;else updateGame(t);drawFrame(t);}
  if($('lobby').classList.contains('active'))drawHeroPreview(t);
  requestAnimationFrame(gameLoop);
}

/* Keyboard controls: use physical KeyboardEvent.code, so controls still work with Persian keyboard layout. */
function inputActionFromCode(code) {
  const map = {
    ArrowLeft:'left', KeyA:'left', ArrowRight:'right', KeyD:'right',
    ArrowUp:'jump', KeyW:'jump', Space:'jump',
    KeyJ:'attack', KeyH:'heavyAttack', KeyP:'parry', KeyK:'special', KeyL:'ultimate', KeyE:'burst', KeyQ:'wave', KeyV:'descent', KeyR:'bloodRain', KeyF:'soulSnare', KeyC:'frostWave', KeyX:'voidBolt',
    KeyT:'interact', ShiftLeft:'dash', ShiftRight:'dash'
  };
  return map[code] || null;
}
function releaseJump() { if(player && player.vy < -4 && player.jumpHoldTimer > 0) player.vy *= .62; if(player) player.jumpHoldTimer=0; }
function releaseAllKeys() { if(keys.jump) releaseJump(); for (const key of Object.keys(keys)) keys[key]=false; }
function touchKey(key, down) {
  const action = ({ArrowLeft:'left',ArrowRight:'right',' ':'jump',ArrowUp:'jump'})[key] || key;
  if(action==='left'&&down)player.facing=-1;else if(action==='right'&&down)player.facing=1;
  if (action === 'jump' && down && !keys.jump && !paused) jumpPlayer();
  if (action === 'jump' && !down && keys.jump) releaseJump();
  keys[action] = !!down;
}
function touchInteract() { if (!paused) interactNearest(); }
function touchAttack() { if (!paused) triggerAttack(); }
function touchHeavyAttack() { if (!paused) triggerHeavyAttack(); }
function touchParry() { if (!paused) triggerParry(); }
function touchDescent() { if (!paused) triggerAngelicDescent(); }
function touchFrostWave() { if (!paused) triggerFrostWave(); }
function touchVoidBolt() { if (!paused) triggerVoidBolt(); }
function touchSpecial() { if (!paused) triggerSpecial(); }
function touchBurst() { if (!paused) triggerBurst(); }
function touchWave() { if (!paused) triggerWave(); }
function touchUltimate() { if (!paused) triggerUltimate(); }
function touchBloodRain() { if (!paused) triggerBloodRain(); }
function touchSoulSnare() { if (!paused) triggerSoulSnare(); }
document.addEventListener('keydown',e=>{
  if (e.key==='Escape') return;
  const action = inputActionFromCode(e.code) || ({'ArrowLeft':'left','ArrowRight':'right','ArrowUp':'jump',' ':'jump','a':'left','A':'left','d':'right','D':'right','w':'jump','W':'jump','j':'attack','J':'attack','h':'heavyAttack','H':'heavyAttack','p':'parry','P':'parry','k':'special','K':'special','l':'ultimate','L':'ultimate','e':'burst','E':'burst','q':'wave','Q':'wave','v':'descent','V':'descent','r':'bloodRain','R':'bloodRain','f':'soulSnare','F':'soulSnare','c':'frostWave','C':'frostWave','x':'voidBolt','X':'voidBolt','t':'interact','T':'interact','Shift':'dash'})[e.key];
  if (!action || !$('game').classList.contains('active')) return;
  e.preventDefault();
  const wasDown = !!keys[action]; keys[action]=true;
  if(action==='left'&&player)player.facing=-1; else if(action==='right'&&player)player.facing=1;
  if (action==='jump' && !wasDown && !e.repeat && !paused) jumpPlayer();
  else if (action==='attack' && !wasDown && !paused) triggerAttack();
  else if (action==='heavyAttack' && !wasDown && !paused) triggerHeavyAttack();
  else if (action==='parry' && !wasDown && !paused) triggerParry();
  else if (action==='descent' && !wasDown && !paused) triggerAngelicDescent();
  else if (action==='special' && !wasDown && !paused) triggerSpecial();
  else if (action==='burst' && !wasDown && !paused) triggerBurst();
  else if (action==='wave' && !wasDown && !paused) triggerWave();
  else if (action==='ultimate' && !wasDown && !paused) triggerUltimate();
  else if (action==='bloodRain' && !wasDown && !paused) triggerBloodRain();
  else if (action==='soulSnare' && !wasDown && !paused) triggerSoulSnare();
  else if (action==='dash' && !wasDown && !paused) triggerDash();
  else if (action==='interact' && !wasDown && !paused) interactNearest();
});
document.addEventListener('keyup',e=>{
  const action = inputActionFromCode(e.code) || ({'ArrowLeft':'left','ArrowRight':'right','ArrowUp':'jump',' ':'jump','a':'left','A':'left','d':'right','D':'right','w':'jump','W':'jump','j':'attack','J':'attack','h':'heavyAttack','H':'heavyAttack','p':'parry','P':'parry','k':'special','K':'special','l':'ultimate','L':'ultimate','e':'burst','E':'burst','q':'wave','Q':'wave','v':'descent','V':'descent','r':'bloodRain','R':'bloodRain','f':'soulSnare','F':'soulSnare','c':'frostWave','C':'frostWave','x':'voidBolt','X':'voidBolt','t':'interact','T':'interact','Shift':'dash'})[e.key];
  if (action==='jump' && keys.jump) releaseJump();
  if (action) keys[action]=false;
});
window.addEventListener?.('blur', releaseAllKeys);
document.addEventListener('visibilitychange',()=>{
  if (document.hidden) releaseAllKeys();
  else if ($('game')?.classList.contains('active')) requestGameplayBackgroundPlayback();
});
document.addEventListener('pointerdown',()=>{
  if ($('game')?.classList.contains('active')) requestGameplayBackgroundPlayback();
},{passive:true});
document.addEventListener('keydown',()=>{
  if ($('game')?.classList.contains('active')) requestGameplayBackgroundPlayback();
},{passive:true});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape' && $('profileModal')?.classList.contains('open')){closeHeroProfile();return;}
  if(e.key==='Escape'&&$('game').classList.contains('active')&&!gameEnded){
    if(!paused){releaseAllKeys();paused=true;overlayMode='resume';$('overlayTitle').textContent='بازی متوقف شد';$('overlayText').textContent='هر وقت آماده بودی ادامه بده.';$('overlayButton').textContent='ادامه‌ی بازی';$('overlayButton').onclick=resumeGame;$('gameOverlay').classList.remove('hidden');}
    else if(overlayMode==='resume')resumeGame();
  }
});

gameplayBackgroundVideo=$('gameBackgroundVideo');setGameplayBackgroundForStage(currentStage);preloadFileAssets();syncHeroNameInput(true);renderJourney();renderStages();renderShop();updateTop();bindCombatSettings();initLobbyMusic();resetGame();requestAnimationFrame(gameLoop);
