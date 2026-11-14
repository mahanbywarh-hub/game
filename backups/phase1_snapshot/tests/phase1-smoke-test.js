'use strict';

// Dependency-free Phase 1 regression checks for the browser game.
// Run from the project folder with: node tests/phase1-smoke-test.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');
const ROOT = path.resolve(__dirname, '..');

class FakeClassList {
  constructor(initial = []) { this.values = new Set(initial); }
  add(value) { this.values.add(value); }
  remove(value) { this.values.delete(value); }
  contains(value) { return this.values.has(value); }
  toggle(value, force) {
    const shouldAdd = force === undefined ? !this.values.has(value) : !!force;
    if (shouldAdd) this.values.add(value); else this.values.delete(value);
    return shouldAdd;
  }
}

class FakeContext {
  constructor() { this.operations = []; this.imageSmoothingEnabled = false; }
  _record(name, args) { this.operations.push({name, args: Array.from(args)}); }
  save() { this._record('save', arguments); }
  restore() { this._record('restore', arguments); }
  clearRect() { this._record('clearRect', arguments); }
  fillRect() { this._record('fillRect', arguments); }
  drawImage() { this._record('drawImage', arguments); }
  translate() { this._record('translate', arguments); }
  scale() { this._record('scale', arguments); }
  rotate() { this._record('rotate', arguments); }
  beginPath() { this._record('beginPath', arguments); }
  moveTo() { this._record('moveTo', arguments); }
  lineTo() { this._record('lineTo', arguments); }
  quadraticCurveTo() { this._record('quadraticCurveTo', arguments); }
  closePath() { this._record('closePath', arguments); }
  stroke() { this._record('stroke', arguments); }
  fill() { this._record('fill', arguments); }
  arc() { this._record('arc', arguments); }
  ellipse() { this._record('ellipse', arguments); }
  roundRect() { this._record('roundRect', arguments); }
  fillText() { this._record('fillText', arguments); }
  strokeText() { this._record('strokeText', arguments); }
  createLinearGradient() { return { addColorStop() {} }; }
  measureText(text) { return { width: String(text).length * 7 }; }
}

class FakeElement {
  constructor(id, classes = []) {
    this.id = id;
    this.classList = new FakeClassList(classes);
    this.style = {};
    this.textContent = '';
    this.innerHTML = '';
    this.onclick = null;
    this.width = id === 'gameCanvas' ? 960 : 180;
    this.height = id === 'gameCanvas' ? 440 : 200;
    this.context = (id.toLowerCase().includes('canvas')) ? new FakeContext() : null;
  }
  getContext() { return this.context; }
}

class FakeImage {
  constructor() { this.complete = false; this.naturalWidth = 0; this.naturalHeight = 0; this.onload = null; this.onerror = null; this._src = ''; }
  set src(value) {
    this._src = value;
    const full = path.join(ROOT, value);
    try {
      const data = fs.readFileSync(full);
      this.naturalWidth = data.readUInt32BE(16);
      this.naturalHeight = data.readUInt32BE(20);
      this.complete = true;
      if (typeof this.onload === 'function') this.onload();
    } catch (error) {
      this.complete = true;
      if (typeof this.onerror === 'function') this.onerror(error);
    }
  }
  get src() { return this._src; }
}

const elements = new Map();
const idPattern = /\bid="([^"]+)"/g;
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
let match;
while ((match = idPattern.exec(html))) elements.set(match[1], new FakeElement(match[1]));
for (const id of ['lobby', 'game', 'stages', 'shop', 'codex']) {
  const el = elements.get(id);
  if (el) el.classList.add('screen');
}
elements.get('lobby')?.classList.add('active');
const listeners = Object.create(null);
const localStore = new Map();
const fakeDocument = {
  hidden: false,
  getElementById(id) { return elements.get(id) || null; },
  querySelectorAll(selector) { return selector === '.screen' ? ['lobby', 'game', 'stages', 'shop', 'codex'].map(id => elements.get(id)).filter(Boolean) : []; },
  addEventListener(name, handler) { (listeners[name] ||= []).push(handler); }
};
const fakeWindow = { ASHEN_ASSETS: {}, addEventListener() {} };
const fakeLocalStorage = {
  getItem(key) { return localStore.has(key) ? localStore.get(key) : null; },
  setItem(key, value) { localStore.set(key, String(value)); }
};
const context = {
  window: fakeWindow,
  document: fakeDocument,
  localStorage: fakeLocalStorage,
  Image: FakeImage,
  performance: { now: () => 1000 },
  requestAnimationFrame: () => 0,
  alert: () => {},
  console: { warn: () => {}, error: () => {}, log: () => {} },
  Math,
  Number,
  String,
  Object,
  Array,
  Set,
  Map,
  JSON,
  Date,
  parseInt,
  isFinite,
  Infinity
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'assets/asset-config.js'), 'utf8'), context, { filename: 'asset-config.js' });
vm.runInContext(fs.readFileSync(path.join(ROOT, 'game.js'), 'utf8'), context, { filename: 'game.js' });

function run(source) { return vm.runInContext(source, context); }
function test(name, fn) {
  try { fn(); console.log(`PASS ${name}`); }
  catch (error) { console.error(`FAIL ${name}: ${error.stack || error}`); process.exitCode = 1; }
}
function resetCombat() {
  run(`loadStage(0); resumeGame();
    player.x=500; player.y=GROUND_Y-PLAYER_H; player.vx=0; player.vy=0;
    player.onGround=true; player.facing=1; player.attackFacing=1;
    player.attackTimer=0; player.attackCooldown=0; player.attackHit=false;
    player.combo=1; player.comboWindow=0; player.energy=0;
    mobs=[]; boss={x:2500,hp:155,maxHp:155,dead:false,flash:0};`);
}

// Validate every runtime-loaded asset path and animation frame before gameplay checks.
test('configured runtime assets exist and all PNGs decode', () => {
  const cfg = run('ASSET_CONFIG');
  const paths = [cfg.player.fallback, ...cfg.weaponSprites, ...cfg.bossRoster, ...cfg.backgrounds, ...cfg.bosses];
  for (const definition of Object.values(cfg.player.animations)) {
    for (let i = 0; i < definition.count; i++) paths.push(`${definition.folder}/frame_${String(i).padStart(2, '0')}.png`);
  }
  for (const definition of Object.values(cfg.effects)) {
    for (let i = 0; i < definition.count; i++) paths.push(`${definition.folder}/frame_${String(i).padStart(2, '0')}.png`);
  }
  for (const asset of paths) assert(fs.existsSync(path.join(ROOT, asset)), `Missing asset: ${asset}`);
  const pngs = [];
  function walk(dir) { for (const item of fs.readdirSync(dir, { withFileTypes: true })) { const p = path.join(dir, item.name); if (item.isDirectory()) walk(p); else if (p.toLowerCase().endsWith('.png')) pngs.push(p); } }
  walk(path.join(ROOT, 'assets'));
  for (const png of pngs) {
    const data = fs.readFileSync(png);
    assert(data.length > 24 && data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])), `Invalid PNG: ${png}`);
    assert(data.readUInt32BE(16) > 0 && data.readUInt32BE(20) > 0, `Invalid PNG dimensions: ${png}`);
  }
});

test('project boots and initializes its original screens and save data', () => {
  assert.strictEqual(run("$('lobby').classList.contains('active')"), true);
  assert.strictEqual(run("$('journey').innerHTML.includes('CHAPTER 05')"), true);
  assert.strictEqual(run('coins'), 350);
  assert.strictEqual(run('weapons.length'), 5);
  assert.strictEqual(run('stages.length'), 5);
});

test('sword PNG is flipped from the hand pivot and the canvas is cleared every frame', () => {
  resetCombat();
  run('player.attackTimer=ATTACK_DURATION; player.attackFacing=1; drawFrame(1000);');
  const operations = elements.get('gameCanvas').context.operations;
  assert.strictEqual(operations[0].name, 'clearRect', 'frame must clear previous pixels first');
  const imageIndex = operations.findIndex(op => op.name === 'drawImage' && op.args[0] && String(op.args[0].src || '').includes('sword_00.png'));
  assert(imageIndex > 0, 'equipped sword sprite must be drawn');
  const recent = operations.slice(Math.max(0, imageIndex - 5), imageIndex);
  assert(recent.some(op => op.name === 'scale' && op.args[0] === 1 && op.args[1] === -1), 'sword image must be vertically flipped around the grip');
  const swordDraw = operations[imageIndex];
  assert(swordDraw.args[3] > 0 && swordDraw.args[4] > 0, 'sword keeps positive dimensions');
  assert(swordDraw.args[2] < 0, 'source hilt is offset below the hand pivot');
});

test('forward-facing sword segment damages only a target intersected by its blade', () => {
  resetCombat();
  run(`mobs=[{x:550,hp:3,maxHp:3,alive:true,flash:0,dir:1}];
    player.attackTimer=8; player.attackFacing=1; player.attackHit=false; resolvePlayerHit();`);
  assert.strictEqual(run('mobs[0].hp'), 2);
  assert.strictEqual(run('player.attackHit'), true);
  run('resolvePlayerHit();');
  assert.strictEqual(run('mobs[0].hp'), 2, 'one swing can only register one hit');
});

test('targets behind the player and outside blade reach do not take sword damage', () => {
  resetCombat();
  run(`mobs=[{x:470,hp:3,maxHp:3,alive:true,flash:0,dir:1},{x:760,hp:3,maxHp:3,alive:true,flash:0,dir:1}];
    player.attackTimer=8; player.attackFacing=1; player.attackHit=false; resolvePlayerHit();`);
  assert.strictEqual(run('mobs[0].hp'), 3);
  assert.strictEqual(run('mobs[1].hp'), 3);
});

test('sword hitbox and facing remain correct when attacking left', () => {
  resetCombat();
  run(`player.facing=-1; player.attackFacing=-1;
    mobs=[{x:450,hp:3,maxHp:3,alive:true,flash:0,dir:-1}];
    player.attackTimer=8; player.attackHit=false; resolvePlayerHit();`);
  assert.strictEqual(run('mobs[0].hp'), 2);
});

test('boss damage uses the same sword segment and applies once', () => {
  resetCombat();
  run(`boss={x:550,hp:100,maxHp:100,dead:false,flash:0};
    player.attackTimer=8; player.attackFacing=1; player.attackHit=false; resolvePlayerHit();`);
  assert(run('boss.hp') < 100, 'boss should be hit when its body intersects the blade');
  const hp = run('boss.hp');
  run('resolvePlayerHit();');
  assert.strictEqual(run('boss.hp'), hp, 'the same attack must not damage twice');
});

test('attack timer cannot be restarted and abilities cannot overlap attack recovery', () => {
  resetCombat();
  run('triggerAttack();');
  assert.strictEqual(run('player.attackTimer'), run('ATTACK_DURATION'));
  run('player.attackTimer=9; triggerAttack();');
  assert.strictEqual(run('player.attackTimer'), 9);
  run('player.energy=100; triggerDash(); triggerSpecial(); triggerBurst(); triggerWave(); triggerBloodRain(); triggerSoulSnare(); triggerUltimate();');
  assert.strictEqual(run('player.dashTimer'), 0);
  assert.strictEqual(run('player.specialTimer'), 0);
  assert.strictEqual(run('player.skillBurstTimer'), 0);
  assert.strictEqual(run('player.ultimateTimer'), 0);
});

test('attack facing is locked during the swing while forward movement remains available', () => {
  resetCombat();
  run('triggerAttack(); keys.right=true; updateGame(1016);');
  assert.strictEqual(run('player.facing'), 1);
  assert(run('player.x') > 500, 'the player should still be able to move while attacking');
  run('keys.left=true; updateGame(1032);');
  assert.strictEqual(run('player.facing'), 1, 'opposite input must not flip the weapon mid-swing');
});

test('all existing combat abilities still activate when their own conditions are met', () => {
  resetCombat();
  run('triggerDash();');
  assert.strictEqual(run('player.dashTimer'), 12);

  resetCombat(); run('player.energy=35; triggerSpecial();');
  assert.strictEqual(run('player.specialTimer'), 27);
  assert.strictEqual(run('player.energy'), 0);

  resetCombat(); run('player.energy=25; triggerBurst();');
  assert.strictEqual(run('player.skillBurstTimer'), 20);
  assert.strictEqual(run('player.energy'), 0);

  resetCombat(); run('player.energy=30; triggerWave();');
  assert.strictEqual(run('projectiles.length'), 1);
  assert.strictEqual(run('player.energy'), 0);

  resetCombat(); run('player.energy=45; triggerBloodRain();');
  assert.strictEqual(run('fallingStrikes.length'), 3);
  assert.strictEqual(run('player.energy'), 0);

  resetCombat(); run('player.energy=40; triggerSoulSnare();');
  assert.strictEqual(run('player.soulSnareTimer'), 28);
  assert.strictEqual(run('player.energy'), 0);

  resetCombat(); run('player.energy=100; triggerUltimate();');
  assert.strictEqual(run('player.ultimateTimer'), 66);
  assert.strictEqual(run('player.energy'), 0);
});

test('physical keyboard mapping remains independent of keyboard language', () => {
  assert.strictEqual(run("inputActionFromCode('KeyA')"), 'left');
  assert.strictEqual(run("inputActionFromCode('KeyD')"), 'right');
  assert.strictEqual(run("inputActionFromCode('KeyJ')"), 'attack');
  assert.strictEqual(run("inputActionFromCode('Space')"), 'jump');
  assert.strictEqual(run("inputActionFromCode('ShiftRight')"), 'dash');
});

test('boss slam windup resolves its marked impact and resets cooldown', () => {
  resetCombat();
  run(`player.hp=100; player.invuln=0;
    boss={x:500,hp:155,maxHp:155,facing:1,windup:1,cooldown:90,rangedCooldown:100,chargeTimer:0,chargeDir:1,chargeHit:false,attackType:'slam',attackCycle:1,targetX:534,phase:1,flash:0,staggerTimer:0,dead:false};
    updateBoss();`);
  assert.strictEqual(run('boss.windup'), 0);
  assert(run('player.hp') < 100, 'slam should damage a player standing in the marked impact zone');
  assert(run('boss.cooldown') > 0, 'slam should restart its cooldown');
});

test('boss charge windup transitions into its movement phase', () => {
  resetCombat();
  run(`boss={x:700,hp:155,maxHp:155,facing:-1,windup:1,cooldown:90,rangedCooldown:100,chargeTimer:0,chargeDir:-1,chargeHit:false,attackType:'charge',attackCycle:1,targetX:534,phase:1,flash:0,staggerTimer:0,dead:false};
    updateBoss();`);
  assert.strictEqual(run('boss.chargeTimer'), 19, 'charge attack should enter its charge movement');
  assert.strictEqual(run('boss.chargeDir'), -1);
});

test('save values remain persisted after weapon purchase and stage reset', () => {
  resetCombat();
  run('coins=500; buy(1); loadStage(2);');
  assert.strictEqual(run('equipped'), 1);
  assert.strictEqual(run("JSON.parse(localStorage.getItem('ashen-halo-equipped'))"), 1);
  assert.strictEqual(run("JSON.parse(localStorage.getItem('ashen-halo-coins'))"), 400);
  assert.strictEqual(run('currentStage'), 2);
});

if (process.exitCode) process.exit(process.exitCode);
console.log('Phase 1 smoke tests completed.');
