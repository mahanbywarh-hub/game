'use strict';

const stages = [
  {name:'جنگل خاکستر', sub:'مُهر ریشه', desc:'درختان مرده و ارواحی که نام خود را فراموش کرده‌اند.', boss:'نگهبان پوسیده', file:'guardian-placeholder.png', color:'#26382f', accent:'#a9c18c', style:'forest'},
  {name:'کلیسای سرخ', sub:'مُهر خون', desc:'معبد متروکی که ناقوس‌هایش فقط هنگام مرگ به صدا درمی‌آیند.', boss:'اسقف خونین', file:'bishop-placeholder.png', color:'#582537', accent:'#ff6278', style:'church'},
  {name:'قله‌ی یخ‌زده', sub:'مُهر سکوت', desc:'بادهای یخی خاطرات را از ذهن مسافران می‌دزدند.', boss:'تایتان یخ', file:'titan-placeholder.png', color:'#273e58', accent:'#a9e7ff', style:'ice'},
  {name:'کارخانه‌ی نفرین', sub:'مُهر آهن', desc:'ماشین‌های باستانی هنوز فرمان پادشاه مرده را اجرا می‌کنند.', boss:'عنکبوت مکانیکی', file:'spider-placeholder.png', color:'#51402c', accent:'#ffc06a', style:'factory'},
  {name:'تخت خالی آسمان', sub:'مُهر نهایی', desc:'پشت دروازه‌ی آخر، حقیقت هاله‌ی شکسته منتظر است.', boss:'امپراتور خلأ', file:'void-emperor-placeholder.png', color:'#302047', accent:'#d0a6ff', style:'void'}
];
const weapons = [
  {name:'شمشیر خاکستر', price:0, damage:1, icon:'⚔', color:'#d8d3df', spriteIndex:0, effect:'impact-spark', desc:'سلاح آغازین؛ متعادل و قابل اعتماد.'},
  {name:'لبه‌ی اخگر', price:100, damage:1.4, icon:'🔥', color:'#ff974b', spriteIndex:1, effect:'fire-burst', desc:'تیغه‌ای گرم که رد آتش به جا می‌گذارد.'},
  {name:'داس خون', price:220, damage:1.8, icon:'☽', color:'#ff4267', spriteIndex:2, effect:'red-slash', desc:'سلاحی نفرین‌شده با ضربه‌ی سنگین.'},
  {name:'تیغه‌ی صاعقه', price:400, damage:2.3, icon:'ϟ', color:'#79d9ff', spriteIndex:3, effect:'ice-wave', desc:'ضربه‌های سریع و نورانی.'},
  {name:'شکافنده‌ی هاله', price:650, damage:3, icon:'✦', color:'#d5a3ff', spriteIndex:4, effect:'void-bolt', desc:'شمشیر افسانه‌ای برای پایان دادن به چرخه.'}
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
const $ = id => document.getElementById(id);
const CANVAS_W = 960, CANVAS_H = 440, WORLD_W = 3000, GROUND_Y = 366, PLAYER_W = 68, PLAYER_H = 82, PLAYER_DRAW_SIZE = 132;
const ATTACK_DURATION = 22, ATTACK_IMPACT_PROGRESS = 0.68;
const HEAVY_ATTACK_DURATION = 32, HEAVY_ATTACK_IMPACT_PROGRESS = 0.72;
const SWORD_SPRITE_HEIGHT = 70, SWORD_HANDLE_OFFSET = 9, SWORD_HIT_RADIUS = 7;
const SWORD_REST_ANGLE = 2.42;
const LIGHT_COMBO_PROFILES = [
  { start: 2.34, end: 0.78, reach: 1.00, handY: 0, reverse: false },
  { start: 0.78, end: 2.42, reach: 1.05, handY: -2, reverse: true },
  { start: 2.50, end: 0.50, reach: 1.12, handY: 1, reverse: false }
];
const ASSET_CONFIG = window.ASHEN_ASSETS || {};
let coins = Number(readJSON('ashen-halo-coins', 350));
if (!Number.isFinite(coins) || coins < 0) coins = 350;
let owned = readJSON('ashen-halo-owned', [0]);
if (!Array.isArray(owned) || !owned.includes(0)) owned = [0];
let equipped = Number(readJSON('ashen-halo-equipped', 0)) || 0;
if (!weapons[equipped]) equipped = 0;
let currentStage = 0, paused = true, gameEnded = false, overlayMode = 'resume';
let player = {}, boss = {}, mobs = [], keys = Object.create(null), cameraX = 0, frameClock = 0;
let playerAnimations = { idle: [], walk: [], run: [], jump: [], dash: [], dodge: [], attack: [] };
let weaponImages = [];
let effectAnimations = Object.create(null);
let bossRosterImages = [];
let visualEffects = [], projectiles = [], hostileProjectiles = [], fallingStrikes = [], particles = [], damageNumbers = [], dashAfterimages = [];
let shakeTime = 0, shakeStrength = 0, hitStopFrames = 0, screenFlashFrames = 0, combatToast = null, storyCaption = null;
let combatSettings = { screenShake: true, hitFlashes: true, audio: true, volume: 0.32 };
let audioContext = null;
const combatSoundLastPlayed = Object.create(null);
let backgroundImages = Array(stages.length).fill(null);
let bossImages = Array(stages.length).fill(null);
let fallbackCharacterImage = new Image();

function readJSON(key, fallback) {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch (_) { return fallback; }
}
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
function preloadFileAssets() {
  fallbackCharacterImage = loadImage(ASSET_CONFIG.player?.fallback || 'assets/characters/player/idle/frame_00.png') || new Image();
  for (const state of ['idle', 'walk', 'run', 'jump', 'dash', 'dodge', 'attack']) {
    playerAnimations[state] = loadFrameSequence(ASSET_CONFIG.player?.animations?.[state]);
  }
  weaponImages = (ASSET_CONFIG.weaponSprites || []).map(loadImage);
  effectAnimations = Object.create(null);
  for (const [name, definition] of Object.entries(ASSET_CONFIG.effects || {})) effectAnimations[name] = loadFrameSequence(definition);
  bossRosterImages = (ASSET_CONFIG.bossRoster || []).map(loadImage);
  backgroundImages = stages.map((_, i) => loadImage((ASSET_CONFIG.backgrounds || [])[i]));
  bossImages = stages.map((_, i) => loadImage((ASSET_CONFIG.bosses || [])[i]));
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
  if (id === 'game') { paused = true; drawFrame(); }
  if (id === 'lobby') drawHeroPreview(performance.now());
}
function updateTop() {
  $('coins').textContent = coins;
  $('weaponName').textContent = weapons[equipped].name;
  try { localStorage.setItem('ashen-halo-coins', JSON.stringify(coins)); localStorage.setItem('ashen-halo-owned', JSON.stringify(owned)); localStorage.setItem('ashen-halo-equipped', JSON.stringify(equipped)); } catch (_) {}
}
function renderJourney() {
  $('journey').innerHTML = stages.map((s, i) => `<div class="journey-card"><span class="num">CHAPTER 0${i+1}</span><h3>${s.name}</h3><p>${s.sub} · ${s.boss}</p><p class="journey-lore">${chapterLore[i].title}</p></div>`).join('');
  renderStoryArchive();
}
function renderStoryArchive() {
  const host = $('storyArchive');
  if (!host) return;
  host.innerHTML = chapterLore.map((chapter,i) => `<article class="chapter-lore"><span class="eyebrow">CHAPTER 0${i+1} / ${stages[i].sub}</span><h3>${chapter.title}</h3><p>${chapter.opening}</p><blockquote>${chapter.phase}</blockquote><p class="muted">${chapter.victory}</p></article>`).join('');
}
function setStoryCaption(speaker, text, duration = 230) {
  storyCaption = {speaker, text, timer:duration, max:duration};
}
function updateStoryProgress() {
  const beats = chapterLore[currentStage]?.moments || [];
  while (player.storyBeat < beats.length && player.x >= beats[player.storyBeat].x) {
    setStoryCaption(player.storyBeat === 0 ? 'اِیرِن' : 'سِرا', beats[player.storyBeat].text, 250);
    player.storyBeat++;
  }
}
function spawnEnemyWave(baseX, count = 3) {
  for (let i=0;i<count;i++) {
    const x = Math.max(100, Math.min(WORLD_W-500, baseX+i*88));
    mobs.push({x,homeX:x,min:x-50,max:x+65,hp:2+Math.floor(currentStage/2),maxHp:2+Math.floor(currentStage/2),alive:true,dir:i%2?-1:1,attackCooldown:48+i*18,flash:0,seed:(i+1)*3.17,rosterIndex:(i*2+currentStage*3+4)%12,stun:0});
  }
  setCombatToast('ردّ پای نگهبانان نزدیک می‌شود…','#f7d9e1',65);
}

function renderStages() {
  const grid = $('stageGrid');
  if (!grid) return;
  grid.innerHTML = stages.map((stage, i) => {
    const bgSrc = (ASSET_CONFIG.backgrounds || [])[i] || '';
    const bossSrc = (ASSET_CONFIG.bosses || [])[i] || `assets/bosses/${stage.file}`;
    return `<article class="stage-card"><div class="stage-art" style="background:linear-gradient(135deg,${stage.color},#10111a)"><img class="stage-bg-thumb" src="${bgSrc}" alt=""><img class="stage-boss-thumb" src="${bossSrc}" alt="${stage.boss}"></div><span class="eyebrow">CHAPTER 0${i+1}</span><h3>${stage.name}</h3><p>${stage.desc}</p><p>باس: <b>${stage.boss}</b></p><button class="primary" onclick="loadStage(${i})">ورود به مرحله</button></article>`;
  }).join('');
}
function renderShop() {
  const grid = $('shopGrid');
  if (!grid) return;
  grid.innerHTML = weapons.map((w, i) => `<article class="shop-card"><div class="weapon-icon" style="color:${w.color}"><img class="weapon-preview" src="${(ASSET_CONFIG.weaponSprites || [])[w.spriteIndex] || ''}" alt="${w.name}"><span hidden>${w.icon}</span></div><h3>${w.name}</h3><p>${w.desc}<br>قدرت: ×${w.damage}</p><div class="price">${w.price === 0 ? 'رایگان' : `🪙 ${w.price}`}</div>${equipped === i ? '<button class="secondary" style="width:100%;margin-top:10px" disabled>مجهز شده</button>' : owned.includes(i) ? `<button class="primary" onclick="equip(${i})">استفاده از سلاح</button>` : `<button class="primary" onclick="buy(${i})">خرید سلاح</button>`}</article>`).join('');
}
function buy(i) {
  if (coins < weapons[i].price) { alert('سکه کافی نداری!'); return; }
  coins -= weapons[i].price; owned.push(i); equipped = i; updateTop(); renderShop();
}
function equip(i) { if (!owned.includes(i)) return; equipped = i; updateTop(); renderShop(); }

function createMobs() {
  const starts = [390, 720, 1080, 1430];
  const hp = 2 + Math.floor(currentStage/2);
  return starts.map((x, i) => ({x, homeX:x, min:x-60, max:x+80, hp, maxHp:hp, alive:true, dir:i%2 ? -1 : 1, attackCooldown:70+i*24, flash:0, seed:i*2.3, rosterIndex:(i*3+currentStage*2+1)%12, stun:0}));
}
function loadStage(i) {
  currentStage = Math.max(0, Math.min(stages.length - 1, Number(i) || 0));
  $('stageTitle').textContent = stages[currentStage].name;
  $('stageNumber').textContent = currentStage + 1;
  $('bossName').textContent = stages[currentStage].boss;
  resetGame(); showScreen('game');
}
function startGame() { loadStage(currentStage); }
function resetGame() {
  keys = Object.create(null);
  player = {x:95, y:GROUND_Y-PLAYER_H, vx:0, vy:0, hp:100, onGround:true, jumpsLeft:2, facing:1, attackTimer:0, attackDuration:ATTACK_DURATION, attackImpactProgress:ATTACK_IMPACT_PROGRESS, attackMode:'light', attackCooldown:0, heavyCooldown:0, attackHit:false, combo:0, comboWindow:0, energy:0, specialTimer:0, specialHit:false, specialCooldown:0, skillBurstTimer:0, burstHit:false, burstCooldown:0, crimsonCooldown:0, pendingCrimson:false, descentTimer:0, descentCooldown:0, descending:false, frostCooldown:0, voidBoltCooldown:0, voidBoltTimer:0, voidBoltHit:false, ultimateTimer:0, ultimateHit:false, dashTimer:0, dashCooldown:0, bloodRainCooldown:0, soulSnareCooldown:0, bloodRainTimer:0, soulSnareTimer:0, castTimer:0, castKind:'', wingBurstTimer:0, invuln:0, walkTime:0, hitFlash:0, storyBeat:0, waveOne:false, waveTwo:false};
  boss = {x:WORLD_W-270, hp:155+currentStage*36, maxHp:155+currentStage*36, facing:-1, windup:0, cooldown:90, rangedCooldown:140, chargeTimer:0, chargeDir:-1, chargeHit:false, attackType:'slam', attackCycle:0, targetX:WORLD_W-270, phase:1, flash:0, staggerTimer:0, knockbackVx:0, dead:false};
  mobs = createMobs(); visualEffects=[]; projectiles=[]; hostileProjectiles=[]; fallingStrikes=[]; particles=[]; damageNumbers=[]; dashAfterimages=[]; shakeTime=0; shakeStrength=0; hitStopFrames=0; screenFlashFrames=0; combatToast=null; storyCaption=null; cameraX = 0; paused = true; gameEnded = false; overlayMode = 'resume';
  $('playerHealth').style.width = '100%'; $('bossHealth').style.width = '100%';
  $('overlayTitle').textContent = 'آماده‌ی نبرد؟';
  $('overlayText').textContent = chapterLore[currentStage].opening + '  —  کنترل‌ها: A/D حرکت، Space پرش دوبل، J کمبوی شمشیر، H ضربه‌ی سنگین، Shift دش، E هاله‌ی شکسته، Q موج سرخ، K سایه‌شکاف، V فرود فرشته، R باران خون، F تله‌ی روح و L قدرت نهایی.';
  if ($('overlayAltButton')) { $('overlayAltButton').classList.add('hidden'); $('overlayAltButton').style.display='none'; }
  $('overlayButton').textContent = 'ورود به نبرد'; $('overlayButton').onclick = resumeGame;
  $('gameOverlay').classList.remove('hidden'); drawFrame();
}
function resumeGame() { if (gameEnded) return; releaseAllKeys(); paused = false; $('gameOverlay').classList.add('hidden'); if (!storyCaption) setStoryCaption('راوی', chapterLore[currentStage].companion, 245); }
function overlayAction() {
  if (overlayMode === 'next') {
    if (currentStage < stages.length - 1) loadStage(currentStage + 1);
    else showScreen('stages');
  } else if (overlayMode === 'retry') { resetGame(); resumeGame(); }
  else if (overlayMode === 'resume') resumeGame();
  else if (overlayMode === 'lobby') showScreen('stages');
}
function gameOver(win) {
  if (gameEnded) return;
  gameEnded = true; paused = true;
  if (win) setStoryCaption('راوی', chapterLore[currentStage].victory, 300);
  const finalChapter = currentStage === stages.length - 1;
  $('overlayTitle').textContent = win ? (finalChapter ? 'تخت خالی، انتخاب آخر' : `${stages[currentStage].boss} فروپاشید`) : 'بال‌های تو خاموش شدند';
  $('overlayText').textContent = win ? (finalChapter ? 'هاله در دستان توست. می‌توانی چرخه را بازسازی کنی و قربانیان را دوباره زندانی کنی، یا آن را بشکنی و جهان را با حقیقت تنها بگذاری.' : chapterLore[currentStage].victory + ' مُهر آزاد شد و ۷۵ سکه دریافت کردی.') : 'حمله‌های باس را بخوان؛ هنگام حلقه‌ی هشدار از محدوده خارج شو، برای ضربه‌ی سنگین جاخالی بده و با قدرت‌ها فاصله بساز.';
  overlayMode = win ? (finalChapter ? 'endingChoice' : 'next') : 'retry';
  $('overlayButton').textContent = win ? (finalChapter ? 'شکستن هاله' : 'رفتن به قلمرو بعدی') : 'تلاش دوباره';
  $('overlayButton').onclick = finalChapter && win ? (()=>chooseEnding('free')) : overlayAction;
  if ($('overlayAltButton')) {
    $('overlayAltButton').style.display = finalChapter && win ? 'inline-flex' : 'none';
    $('overlayAltButton').classList.toggle('hidden', !(finalChapter && win));
    $('overlayAltButton').textContent = 'بازسازی هاله';
    $('overlayAltButton').onclick = ()=>chooseEnding('restore');
  }
  $('gameOverlay').classList.remove('hidden');
  if (win) { coins += 75; updateTop(); }
}
function chooseEnding(choice) {
  if (overlayMode !== 'endingChoice') return;
  overlayMode = 'ending';
  if (choice === 'free') {
    $('overlayTitle').textContent = 'پایان اول — آسمانی بدون زنجیر';
    $('overlayText').textContent = 'سِرا هاله را می‌شکند. نور برای لحظه‌ای خاموش می‌شود؛ سپس هزاران نام آزادشده در آسمان می‌درخشند. دیگر هیچ فرشته‌ای برای محافظت مجبور به قربانی‌کردن دیگری نیست. اِیرِن به آخرین ستاره تبدیل می‌شود و برای نخستین بار، سکوت جهان آرام است.';
  } else {
    $('overlayTitle').textContent = 'پایان دوم — نورِ سنگین';
    $('overlayText').textContent = 'سِرا هاله را بازسازی می‌کند. جهان امن می‌ماند، اما نام‌های آزادشده دوباره در نور زندانی می‌شوند. او بر تخت خالی نمی‌نشیند؛ هاله را به دوردست می‌فرستد تا روزی کسی دیگر آن را بشکند. آرامش برگشته، ولی بهایش فراموشی است.';
  }
  $('overlayButton').textContent = 'بازگشت به لابی'; $('overlayButton').onclick = ()=>showScreen('lobby');
  if ($('overlayAltButton')) { $('overlayAltButton').style.display='none'; $('overlayAltButton').classList.add('hidden'); }
}
function setCombatToast(text, color = '#ffd4df', duration = 85) { combatToast = {text, color, timer:duration}; }
function screenShake(amount = 3, duration = 8) { if (!combatSettings.screenShake) return; shakeStrength = Math.max(shakeStrength, amount); shakeTime = Math.max(shakeTime, duration); }
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
  player.attackTimer = player.attackDuration; player.attackCooldown = 12; player.attackHit = false; player.comboWindow = 42;
  playCombatSound('light');
}
function triggerHeavyAttack() {
  if (paused || gameEnded || playerActionBusy()) return;
  if (player.heavyCooldown > 0) { setCombatToast(`ضربه‌ی سنگین آماده نیست • ${Math.ceil(player.heavyCooldown / 60)} ثانیه`, '#ffc1ce', 35); return; }
  player.attackFacing = player.facing || 1; player.attackMode = 'heavy'; player.combo = 3;
  player.attackDuration = HEAVY_ATTACK_DURATION; player.attackImpactProgress = HEAVY_ATTACK_IMPACT_PROGRESS;
  player.attackTimer = HEAVY_ATTACK_DURATION; player.heavyCooldown = 58; player.attackCooldown = 0; player.attackHit = false; player.comboWindow = 0;
  player.vx += player.attackFacing * 1.1;
  spawnEffect('red-slash', player.x + PLAYER_W / 2 + player.attackFacing * 36, player.y + 48, 1.05, player.attackFacing, 24);
  playCombatSound('heavy'); setCombatToast('ضربه‌ی سنگین — آماده‌سازی!', '#ffd7e2', 32);
}
function triggerDash() {
  if (paused || gameEnded || playerActionBusy() || player.dashCooldown > 0) return;
  player.dashTimer = 12; player.dashCooldown = 48; player.invuln = Math.max(player.invuln, 16);
  player.vx = player.facing * 9.5;
  // Dash afterimages carry the motion; skip the old red crescent that obscured the hero.
  spawnBurst(player.x+PLAYER_W/2,player.y+PLAYER_H*.8,weapons[equipped].color,7,2.1);
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
  if (paused || gameEnded || !player || player.jumpsLeft <= 0 || player.ultimateTimer > 0) return;
  const isAirJump = !player.onGround;
  player.jumpsLeft = Math.max(0, player.jumpsLeft - 1);
  player.vy = isAirJump ? -10.2 : -11.5;
  player.onGround = false;
  if (isAirJump) {
    player.wingBurstTimer = 16;
    spawnEffect('wing-flare', player.x + PLAYER_W / 2, player.y + 55, .72, player.facing, 16);
    spawnBurst(player.x + PLAYER_W / 2, player.y + PLAYER_H - 8, '#ff5878', 12, 2.6);
    screenShake(1.8, 4);
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
  player.energy = 0; player.ultimateTimer = 66; player.ultimateHit = false;
  screenShake(11,25); hitStopFrames = Math.max(hitStopFrames,6); screenFlashFrames = 12;
  spawnEffect('ultimate',player.x+PLAYER_W/2+player.facing*105,GROUND_Y-100,1.2,player.facing,64);
  spawnBurst(player.x+PLAYER_W/2,GROUND_Y-65,'#ff315e',34,7); setCombatToast('هاله‌ی شکسته — داوری نهایی!','#ffe4ee',100);
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
  ctx.strokeStyle = '#e5b86f'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(90, 42, 31, 13, -.25, Math.PI * 1.05, Math.PI * 1.94); ctx.stroke();
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
  if (combatSettings.screenShake && shakeTime>0 && shakeStrength>0) ctx.translate((Math.random()-.5)*shakeStrength*2,(Math.random()-.5)*shakeStrength*1.2);
  drawBackground(ctx,stage,c.width,c.height,t);
  drawGround(ctx,stage,c.width,c.height);
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
  if (combatToast && combatToast.timer>0) { ctx.save(); ctx.globalAlpha=Math.min(1,combatToast.timer/16); ctx.textAlign='center'; ctx.font='bold 17px Tahoma'; ctx.fillStyle='#08070c'; ctx.fillText(combatToast.text,c.width/2+1,76+1); ctx.fillStyle=combatToast.color; ctx.shadowColor=combatToast.color; ctx.shadowBlur=15; ctx.fillText(combatToast.text,c.width/2,76); ctx.restore(); }
  ctx.restore();
  if(player && typeof player.hp==='number') $('playerHealth').style.width=`${Math.max(0,player.hp)}%`;
  if(boss && typeof boss.hp==='number') $('bossHealth').style.width=`${Math.max(0,boss.hp/boss.maxHp*100)}%`;
  const energy=Math.max(0,Math.min(100,player.energy||0));
  const energyEl=$('playerEnergy'), energyTrack=$('energyTrack'), energyLabel=$('energyLabel');
  if(energyEl) energyEl.style.width=`${energy}%`;
  if(energyTrack) energyTrack.classList.toggle('ready',energy>=100);
  if(energyLabel) energyLabel.textContent=energy>=100?'هاله کامل • L برای داوری نهایی':`هاله ${Math.floor(energy)}٪ • E ۲۵ | Q ۳۰ | K ۳۵ | V ۲۰ | C ۳۰ | X ۳۵ | F ۴۰ | R ۴۵`;
  updateAbilityHud();
}
function drawBackground(ctx, stage, w, h, t) {
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
function drawMobs(ctx,t) {
  for(const m of mobs){if(!m.alive)continue;if(m.flash>0){};const x=m.x-cameraX,y=GROUND_Y-52+Math.sin(t/190+m.seed)*3;if(x<-80||x>CANVAS_W+80)continue;
    ctx.save();ctx.globalAlpha=.55;ctx.fillStyle='#8f234d55';ctx.beginPath();ctx.ellipse(x+25,GROUND_Y+1,26,6,0,0,Math.PI*2);ctx.fill();ctx.restore();
    const sprite=bossRosterImages[m.rosterIndex];
    if(sprite&&sprite.complete&&sprite.naturalWidth){
      ctx.save();
      const recoil = m.stun > 0 ? (m.hitDirection || m.dir) * -.06 : 0;
      ctx.translate(x+25,y+55); ctx.rotate(recoil); ctx.translate(-(x+25),-(y+55));
      if(m.flash>0 && combatSettings.hitFlashes){ctx.shadowColor='#fff2f4';ctx.shadowBlur=22;}else{ctx.shadowColor='#ff315c';ctx.shadowBlur=7;}
      if(m.dir<0){ctx.translate(x+58,0);ctx.scale(-1,1);ctx.drawImage(sprite,0,y-9,58,64);}
      else ctx.drawImage(sprite,x-4,y-9,58,64);
      if(m.flash>0 && combatSettings.hitFlashes){ctx.globalCompositeOperation='source-atop';ctx.globalAlpha=Math.min(.72,m.flash/16);ctx.fillStyle='#fff0f4';ctx.fillRect(m.dir<0?0:x-4,y-9,58,64);}
      ctx.restore();
    }else{
      ctx.save();ctx.translate(x+25,y+38);ctx.rotate(m.stun>0?(m.hitDirection||m.dir)*-.08:0);ctx.translate(-(x+25),-(y+38));
      ctx.fillStyle=m.flash>0 && combatSettings.hitFlashes?'#ffe2d8':'#292032';ctx.beginPath();ctx.moveTo(x+5,y+30);ctx.quadraticCurveTo(x-5,y+5,x+19,y-2);ctx.quadraticCurveTo(x+39,y+3,x+36,y+28);ctx.lineTo(x+30,y+43);ctx.lineTo(x+24,y+32);ctx.lineTo(x+17,y+44);ctx.lineTo(x+12,y+30);ctx.closePath();ctx.fill();ctx.fillStyle='#ff5a7c';ctx.shadowColor='#ff3a63';ctx.shadowBlur=9;ctx.fillRect(x+11,y+13,5,4);ctx.fillRect(x+25,y+13,5,4);ctx.restore();
    }
    ctx.fillStyle='#211421';ctx.fillRect(x+7,y-10,40,4);ctx.fillStyle='#ff6376';ctx.fillRect(x+7,y-10,40*Math.max(0,m.hp/(m.maxHp||2)),4);
  }
}
function drawBoss(ctx,t) {
  if(!boss || boss.dead)return;
  const x=boss.x-cameraX, y=GROUND_Y-126 + Math.sin(t/520)*2;
  if(x<-180||x>CANVAS_W+180)return;
  if(boss.phase>=2){ctx.save();ctx.globalAlpha=.12+.08*Math.sin(t/90);ctx.strokeStyle=boss.phase>=3?'#ff315e':'#ff9aaf';ctx.shadowColor=ctx.strokeStyle;ctx.shadowBlur=15;ctx.lineWidth=boss.phase>=3?3:2;ctx.beginPath();ctx.ellipse(x+60,y+60,70+Math.sin(t/100)*5,58,-.12,0,Math.PI*2);ctx.stroke();ctx.restore();}
  if(boss.windup>0){const warningX=(boss.attackType==='slam'&&Number.isFinite(boss.targetX)?boss.targetX-cameraX:x+55);ctx.save();ctx.globalAlpha=.22+.2*Math.sin(t/45);ctx.fillStyle=boss.attackType==='bolt'?'#c8a2ff':'#ff254e';ctx.beginPath();ctx.ellipse(warningX,GROUND_Y+3,(boss.attackType==='slam'?82:115)+Math.sin(t/50)*9,15,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle=boss.attackType==='bolt'?'#d8b5ff':'#ff4265';ctx.lineWidth=2;ctx.beginPath();ctx.arc(warningX,GROUND_Y-15,boss.attackType==='slam'?66:90,Math.PI*1.08,Math.PI*1.92);ctx.stroke();ctx.restore();}
  const custom=bossImages[currentStage];
  if(custom&&custom.complete&&custom.naturalWidth){
    ctx.save();ctx.shadowColor=stages[currentStage].accent;ctx.shadowBlur=boss.flash>0 && combatSettings.hitFlashes?25:12;
    if(boss.facing>0){ctx.translate(x+125,0);ctx.scale(-1,1);ctx.drawImage(custom,0,y,125,125);}
    else ctx.drawImage(custom,x,y,125,125);
    if(boss.flash>0 && combatSettings.hitFlashes){ctx.globalCompositeOperation='source-atop';ctx.globalAlpha=Math.min(.55,boss.flash/28);ctx.fillStyle='#fff1f5';ctx.fillRect(boss.facing>0?0:x,y,125,125);}
    ctx.restore();
  }else{
    const style=stages[currentStage].style;const body=style==='ice'?'#42677e':style==='factory'?'#5a4937':style==='void'?'#38244f':style==='church'?'#6f263e':'#315242';
    ctx.save();ctx.shadowColor=stages[currentStage].accent;ctx.shadowBlur=boss.flash>0?27:9;
    ctx.fillStyle=body;ctx.beginPath();ctx.moveTo(x+17,y+45);ctx.lineTo(x+5,y+4);ctx.lineTo(x+39,y+25);ctx.lineTo(x+50,y+2);ctx.lineTo(x+72,y+27);ctx.lineTo(x+103,y+5);ctx.lineTo(x+100,y+48);ctx.lineTo(x+113,y+92);ctx.lineTo(x+98,y+111);ctx.lineTo(x+25,y+111);ctx.lineTo(x+8,y+89);ctx.closePath();ctx.fill();
    ctx.fillStyle=style==='ice'?'#b5f1ff':'#ffdf99';ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=12;ctx.fillRect(x+32,y+43,10,6);ctx.fillRect(x+70,y+43,10,6);ctx.shadowBlur=0;
    ctx.fillStyle='#15111b';ctx.fillRect(x+40,y+59,32,27);ctx.fillStyle=stages[currentStage].accent;ctx.globalAlpha=.75;ctx.fillRect(x+47,y+66,18,4);ctx.globalAlpha=1;
    ctx.fillStyle='#21131d';ctx.fillRect(x+22,y+99,25,28);ctx.fillRect(x+76,y+99,25,28);
    if(style==='factory'){ctx.strokeStyle='#d99a46';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x+8,y+72);ctx.lineTo(x-14,y+111);ctx.stroke();}
    if(style==='void'){ctx.strokeStyle='#d8b5ff';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x+58,y+44,65,24,-.2,0,Math.PI*2);ctx.stroke();}
    ctx.restore();
  }
  ctx.fillStyle='#e9d9c7';ctx.font='bold 11px Tahoma';ctx.textAlign='center';ctx.fillText(stages[currentStage].boss,x+61,y-12);ctx.textAlign='start';
}
function drawPlayer(ctx,t) {
  const x=player.x-cameraX, y=player.y, center=x+PLAYER_W/2, bottom=player.y+PLAYER_H;
  ctx.fillStyle='#00000088';ctx.beginPath();ctx.ellipse(center,GROUND_Y+3,player.onGround?26:18,6,0,0,Math.PI*2);ctx.fill();
  if(player.invuln>0&&Math.floor(t/55)%2===0)ctx.globalAlpha=.42;
  let anim='idle';
  const attackProgress=player.attackTimer>0?getAttackProgress():0;
  // Use clean body-only locomotion frames during casts and sword swings. The old
  // showcase sheets baked a huge red slash into the character frame, so every
  // attack looked like a red ring around the hero. The weapon trail is now drawn
  // independently from the hand below, where it can be directional and timed.
  if(player.ultimateTimer>0) anim='idle';
  else if(player.dashTimer>0) anim='dash';
  else if(!player.onGround) anim='jump';
  else if(Math.abs(player.vx)>2.4) anim='run';
  else if(Math.abs(player.vx)>.35) anim='walk';
  const src=getFrameVisual(anim,t,null);
  const bob=player.onGround&&anim==='idle'?Math.sin(t/270)*1.4:player.onGround&&anim==='run'?Math.abs(Math.sin(t/68))*-1.5:0;
  const size=PLAYER_DRAW_SIZE+(player.ultimateTimer>0?Math.sin(t/38)*3:0);
  if (src && dashAfterimages.length) {
    for (const ghost of dashAfterimages) {
      const gx = ghost.x - cameraX + PLAYER_W/2, gy = ghost.y + PLAYER_H - size + 6;
      ctx.save(); ctx.globalAlpha = Math.max(0, ghost.life / 9) * .22; ctx.shadowColor = '#ff315e'; ctx.shadowBlur = 13;
      ctx.translate(gx, gy); if (ghost.facing < 0) ctx.scale(-1,1);
      ctx.drawImage(src.image, -size/2, 0, size, size); ctx.restore();
    }
  }
  const attackFacing=player.attackTimer>0?(player.attackFacing||player.facing||1):(player.facing||1);
  const lunge=player.attackTimer>0?Math.sin(attackProgress*Math.PI)*(player.attackMode==='heavy'?9:player.combo===3?7:4)*attackFacing:0;
  const recoilY=player.attackTimer>0?-Math.sin(attackProgress*Math.PI)*(player.attackMode==='heavy'?3.2:2):0;
  if(src){
    ctx.save();ctx.translate(center+lunge,bottom-size+6+bob+recoilY);
    if(player.attackTimer>0)ctx.rotate(Math.sin(attackProgress*Math.PI*2)*(player.attackMode==='heavy'?.032:.018)*attackFacing);
    if(player.ultimateTimer>0){ctx.shadowColor='#ff214d';ctx.shadowBlur=26;}
    else if(player.specialTimer>0){ctx.shadowColor=weapons[equipped].color;ctx.shadowBlur=18;}
    if(player.specialTimer>0)ctx.globalAlpha*=.88+.12*Math.sin(t/34);
    if(player.skillBurstTimer>0){ctx.shadowColor='#ff315e';ctx.shadowBlur=Math.max(ctx.shadowBlur||0,20);}
    if(attackFacing<0)ctx.scale(-1,1);
    ctx.drawImage(src.image,-size/2,0,size,size);ctx.restore();
  } else if(!drawFrameImage(ctx,center-PLAYER_W/2,y,PLAYER_W,PLAYER_H,'idle',t,player.facing<0)) drawFallbackHero(ctx,x,y);
  ctx.globalAlpha=1;
  if(player.attackTimer>0)drawSwordSlash(ctx,center,y,t);
  // A small cyan hand-rune sells Q's cast without drawing an orbit over the head.
  // Blood Rain already has its own ground telegraphs and falling strikes; it needs
  // no extra red ring on the player.
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
  if(player.wingBurstTimer>0){ctx.save();ctx.globalAlpha=Math.min(.72,player.wingBurstTimer/13);ctx.translate(center,bottom-64);ctx.scale(player.facing,1);ctx.strokeStyle='#ff476d';ctx.shadowColor='#ff214d';ctx.shadowBlur=18;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-9,0);ctx.quadraticCurveTo(-31,-10,-51,-36);ctx.moveTo(-8,7);ctx.quadraticCurveTo(-32,8,-45,-12);ctx.moveTo(9,0);ctx.quadraticCurveTo(31,-10,51,-36);ctx.moveTo(8,7);ctx.quadraticCurveTo(32,8,45,-12);ctx.stroke();ctx.restore();}
  if(player.ultimateTimer>0){ctx.save();ctx.globalAlpha=.6+.3*Math.sin(t/35);ctx.strokeStyle='#ff315e';ctx.shadowColor='#ff315e';ctx.shadowBlur=24;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(center,bottom-80,42+Math.sin(t/24)*8,58,-.2,0,Math.PI*2);ctx.stroke();ctx.restore();}
  if(player.hitFlash>0){ctx.save();ctx.globalAlpha=.45;ctx.fillStyle='#fff';ctx.fillRect(center-PLAYER_DRAW_SIZE/2,bottom-PLAYER_DRAW_SIZE,PLAYER_DRAW_SIZE,PLAYER_DRAW_SIZE);ctx.restore();}
}
function drawFallbackHero(ctx,x,y){ctx.save();ctx.fillStyle='#e7b69b';ctx.fillRect(x+24,y+7,19,22);ctx.fillStyle='#e9e6df';ctx.fillRect(x+21,y+2,25,9);ctx.fillStyle='#b22245';ctx.fillRect(x+15,y+29,37,34);ctx.fillStyle='#811c3c';ctx.beginPath();ctx.moveTo(x+18,y+32);ctx.lineTo(x-4,y+51);ctx.lineTo(x+17,y+68);ctx.fill();ctx.beginPath();ctx.moveTo(x+49,y+32);ctx.lineTo(x+70,y+49);ctx.lineTo(x+51,y+69);ctx.fill();ctx.fillStyle='#181723';ctx.fillRect(x+19,y+62,12,17);ctx.fillRect(x+38,y+62,12,17);ctx.restore();}
function getAttackProgress() {
  const duration = Math.max(1, player.attackDuration || ATTACK_DURATION);
  return Math.max(0, Math.min(1, 1 - (player.attackTimer || 0) / duration));
}
function getSwordPose(progress = getAttackProgress(), facing = player.attackFacing || player.facing || 1, mode = player.attackMode) {
  const p = Math.max(0, Math.min(1, progress));
  const heavy = mode === 'heavy';
  const profile = heavy ? { start: 2.38, end: 0.75, reach: 1.2, handY: 0 } : (LIGHT_COMBO_PROFILES[Math.max(0, Math.min(2, (player.combo || 1) - 1))] || LIGHT_COMBO_PROFILES[0]);
  const anticipationEnd = heavy ? .23 : .18;
  const sweepEnd = heavy ? .84 : .76;
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
function drawSwordSlash(ctx, center, y, t) {
  const pose = getSwordPose();
  const weapon = weapons[equipped];
  const sprite = weaponImages[weapon.spriteIndex];
  const handX = pose.handX - cameraX, handY = pose.handY;
  const spriteHeight = SWORD_SPRITE_HEIGHT;
  const spriteWidth = sprite && sprite.naturalHeight > 0 ? spriteHeight * sprite.naturalWidth / sprite.naturalHeight : 27;

  // The hilt is the top end of these source sprites. The grip point is aligned
  // directly over the character's hand; only the blade is rotated around it.
  ctx.save();
  ctx.translate(handX, handY);
  ctx.scale(pose.facing, 1);
  ctx.rotate(pose.angle);
  ctx.scale(1, -1);
  ctx.globalAlpha = 1;
  ctx.shadowColor = pose.heavy ? '#ff7897' : weapon.color;
  ctx.shadowBlur = pose.heavy ? 16 : 8;
  if (sprite && sprite.complete && sprite.naturalWidth && sprite.naturalHeight) {
    ctx.drawImage(sprite, -spriteWidth / 2, -SWORD_HANDLE_OFFSET, spriteWidth, spriteHeight);
  } else {
    ctx.strokeStyle = weapon.color; ctx.lineWidth = 5; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -(spriteHeight - SWORD_HANDLE_OFFSET)); ctx.stroke();
  }
  ctx.restore();

  const progress = pose.progress;
  const sweepEnd = pose.heavy ? .84 : .76;
  if (progress <= (pose.heavy ? .23 : .18) || progress >= sweepEnd) return;
  const previous = getSwordPose(Math.max(0, progress - (pose.heavy ? .24 : .22)), pose.facing, pose.heavy ? 'heavy' : 'light');
  const localAngle = a => Math.atan2(a.tipY - a.handY, (a.tipX - a.handX) * pose.facing);
  const startAngle = localAngle(previous), endAngle = localAngle(pose);
  const fadeIn = Math.min(1, (progress - .16) / .2);
  const fadeOut = Math.min(1, (1 - progress) / .18);
  const trailAlpha = Math.max(0, fadeIn * fadeOut) * (pose.heavy ? .82 : .62);
  if (trailAlpha <= .01) return;
  ctx.save(); ctx.translate(handX, handY); ctx.scale(pose.facing, 1);
  ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = trailAlpha; ctx.lineCap = 'round';
  ctx.strokeStyle = pose.heavy ? '#ff8aa7' : weapon.color;
  ctx.shadowColor = pose.heavy ? '#ff315e' : weapon.color; ctx.shadowBlur = pose.heavy ? 18 : 11;
  ctx.lineWidth = pose.heavy ? 6 : player.combo === 3 ? 4.5 : 3.2;
  ctx.beginPath(); ctx.arc(0, 0, pose.bladeLength * .84, startAngle, endAngle, !pose.reverse); ctx.stroke();
  ctx.globalAlpha *= .78; ctx.strokeStyle = '#fff5f8'; ctx.shadowColor = '#fff'; ctx.shadowBlur = 7;
  ctx.lineWidth = pose.heavy ? 1.8 : 1.15;
  ctx.beginPath(); ctx.arc(0, 0, pose.bladeLength * .80, startAngle, endAngle, !pose.reverse); ctx.stroke();
  ctx.restore();
}

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
  for(const fx of visualEffects){const frames=readyFrames(effectAnimations[fx.key]);const x=fx.x-cameraX,y=fx.y;const prog=Math.max(0,Math.min(1,fx.age/fx.duration));
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
  mob.hitDirection = hitDirection;
  const mx = mob.x + 24;
  spawnEffect('impact-spark', mx, GROUND_Y - 52, knockback > 16 ? 1.15 : .86, direction, 20);
  spawnBurst(mx, GROUND_Y - 50, color, knockback > 16 ? 22 : 13, knockback > 16 ? 5.2 : 3.8);
  spawnDamageNumber(mx, GROUND_Y - 96, label || `-${Math.round(damage)}`, color, knockback > 16);
  player.energy = Math.min(100, player.energy + (knockback > 16 ? 7 : 5));
  if (mob.hp <= 0) {
    mob.alive = false; coins += 4; spawnEffect('fire-burst', mx, GROUND_Y - 48, .9, direction, 24);
    spawnBurst(mx, GROUND_Y - 46, '#ff7898', 20, 4.5); playCombatSound('death'); updateTop();
  } else playCombatSound('impact');
  return true;
}
function applyBossHit(damage, direction, knockback = 1.2, stagger = 4, color = '#ff6386', label = null) {
  if (!boss || boss.hp <= 0) return false;
  boss.hp = Math.max(0, boss.hp - damage); boss.flash = Math.max(boss.flash || 0, 16);
  boss.knockbackVx = Math.max(-4.8, Math.min(4.8, (boss.knockbackVx || 0) + direction * knockback));
  boss.staggerTimer = Math.max(boss.staggerTimer || 0, stagger);
  const bx = boss.x + 58;
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
    player.vx=player.facing*9.5; player.dashTimer--;
  } else if(moveDir!==0){
    if (player.attackTimer <= 0) player.facing=moveDir;
    if (player.attackTimer > 0 && moveDir !== (player.attackFacing || player.facing)) {
      player.vx *= .55;
    } else if(player.vx*moveDir < -.15) player.vx=moveDir*1.8;
    else player.vx=Math.max(-4.45,Math.min(4.45,player.vx+moveDir*.88));
  } else player.vx*=.78;
  if (player.attackTimer > 0) player.facing = player.attackFacing || player.facing || 1;
  if(Math.abs(player.vx)<.18)player.vx=0;
  player.x=Math.max(12,Math.min(WORLD_W-PLAYER_W-12,player.x+player.vx));
  if (player.dashTimer > 0) dashAfterimages.push({x:player.x,y:player.y,facing:player.facing,life:9});
  if (dashAfterimages.length > 12) dashAfterimages.splice(0,dashAfterimages.length-12);
  for (let i=dashAfterimages.length-1;i>=0;i--) { dashAfterimages[i].life--; if(dashAfterimages[i].life<=0) dashAfterimages.splice(i,1); }
  player.vy+=.55;player.y+=player.vy;
  if(player.y>=GROUND_Y-PLAYER_H){
    const landed = !wasOnGround && player.vy>3;
    player.y=GROUND_Y-PLAYER_H;player.vy=0;player.onGround=true;player.jumpsLeft=2;
    if(landed){spawnBurst(player.x+PLAYER_W/2,GROUND_Y-2,'#d5b7c3',9,1.9);screenShake(1.2,3);if(player.descending){player.descending=false;player.descentTimer=0;resolveAngelicDescent();}}
  }else player.onGround=false;

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
  if(player.ultimateTimer>0){player.ultimateTimer--;if(player.ultimateTimer===38&&!player.ultimateHit)resolveUltimateHit();}
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
  updateStoryProgress();
  if(!player.waveOne&&player.x>840){player.waveOne=true;spawnEnemyWave(player.x+200,3);setStoryCaption('اِیرِن','این منطقه مسیر کاروان‌های تبعیدی است. نگهبانان فقط وقتی می‌آیند که مُهرها تو را به رسمیت بشناسند.',220);}
  if(!player.waveTwo&&player.x>1720){player.waveTwo=true;spawnEnemyWave(player.x+210,4);setStoryCaption('سِرا','این بار نمی‌گذارم کسی میان من و حقیقت بایستد.',190);}
  if(keys.attack && player.attackTimer===0 && player.attackCooldown===0)triggerAttack();
  if(player.comboWindow>0)player.comboWindow--;else player.combo=0;
  if(player.dashCooldown>0)player.dashCooldown--;
  if(player.invuln>0)player.invuln--;
  if(player.hitFlash>0)player.hitFlash--;
  if(screenFlashFrames>0)screenFlashFrames--;
  if(combatToast&&combatToast.timer>0)combatToast.timer--;else combatToast=null;
  if(shakeTime>0){shakeTime--;shakeStrength*=.88;if(shakeTime===0)shakeStrength=0;}
  updateMobs();updateBoss();updateProjectiles();updateHostileProjectiles();updateFallingStrikes();updateEffects();
  cameraX=Math.max(0,Math.min(WORLD_W-CANVAS_W,player.x-CANVAS_W*.38));
  if(player.hp<=0)gameOver(false);if(boss.hp<=0)gameOver(true);
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
  player.ultimateHit=true;const range=600, px=player.x+PLAYER_W/2,weapon=weapons[equipped];let hits=0;
  for(const m of mobs){if(!m.alive||Math.abs((m.x+25)-px)>range)continue;applyMobHit(m,9999,Math.sign((m.x+25)-px)||player.facing,22,24,weapon.color,'JUDGEMENT');hits++;}
  if(boss.hp>0&&Math.abs((boss.x+58)-px)<range){applyBossHit(56*weapon.damage,player.facing,4.2,18,'#fff0f5','JUDGEMENT');hits++;}
  playCombatSound('heavy');
  screenShake(hits?13:7,24);screenFlashFrames=Math.max(screenFlashFrames,combatSettings.hitFlashes?10:0);hitStopFrames=Math.max(hitStopFrames,7);spawnBurst(px+player.facing*110,GROUND_Y-78,'#ff315e',36,8);setCombatToast(hits?'داوری نهایی برخورد کرد!':'نیروی هاله آزاد شد!','#ffe8ef',72);updateTop();
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
      const rect={x:m.x-5,y:GROUND_Y-63,w:60,h:66};
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
    if(Math.abs(p.x-(player.x+PLAYER_W/2))<23&&Math.abs(p.y-(player.y+PLAYER_H*.52))<38&&player.invuln<=0){player.hp=Math.max(0,player.hp-p.damage);player.invuln=42;player.hitFlash=9;player.vx+=Math.sign(player.x-p.x)*2.4;spawnBurst(player.x+PLAYER_W/2,player.y+42,p.color,13,3.2);spawnEffect('impact-spark',p.x,p.y,.75,-1,18);screenShake(3.4,7);p.life=0;}
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
  const damage = Math.max(1, Math.round(weapon.damage * multiplier));
  let hits = 0;

  for (const mob of mobs) {
    if (!mob.alive) continue;
    const rect = {x:mob.x-5, y:GROUND_Y-63, w:60, h:66};
    if (!segmentIntersectsRect(x1,y1,x2,y2,rect,heavy?10:SWORD_HIT_RADIUS)) continue;
    const knockback = heavy ? 25 : combo===3 ? 16 : 9;
    applyMobHit(mob, damage, player.attackFacing || player.facing, knockback, heavy ? 22 : combo===3 ? 13 : 8, heavy ? '#ff8ba7' : weapon.color, heavy ? 'HEAVY' : combo===3 ? `FINISH -${damage}` : `-${damage}`);
    hits++;
  }

  if (boss.hp > 0) {
    const rect = {x:boss.x, y:GROUND_Y-126, w:125, h:125};
    if (segmentIntersectsRect(x1,y1,x2,y2,rect,heavy?12:SWORD_HIT_RADIUS)) {
      applyBossHit((heavy ? 29 : combo===3 ? 22 : 14) * weapon.damage, player.attackFacing || player.facing, heavy ? 3.2 : combo===3 ? 2.1 : 1.05, heavy ? 13 : combo===3 ? 8 : 4, heavy ? '#ff8ba7' : weapon.color, heavy ? 'HEAVY' : combo===3 ? 'FINISH' : null);
      hits++;
    }
  }

  if (hits > 0) {
    screenShake(heavy ? 7.4 : combo===3 ? 5.2 : 2.6, heavy ? 14 : combo===3 ? 10 : 5);
    hitStopFrames = Math.max(hitStopFrames, heavy ? 6 : combo===3 ? 4 : 2);
    if (heavy || combo === 3) screenFlashFrames = Math.max(screenFlashFrames, combatSettings.hitFlashes ? (heavy ? 5 : 3) : 0);
    playCombatSound(heavy ? 'heavy' : 'impact');
    if (heavy) setCombatToast('ضربه‌ی سنگین فرود آمد!', '#ffe0e8', 42);
    else if (combo === 3) setCombatToast('پایان کمبو — برش نهایی!', '#ffe0e8', 38);
  } else {
    spawnEffect(weapon.effect, x2, y2, .55, player.attackFacing || player.facing, 14);
  }
  updateTop();
}

function updateMobs(){
  for(const m of mobs){
    if(!m.alive)continue;
    if(m.flash>0)m.flash--;
    if(Math.abs(m.knockbackVx||0)>.12){
      m.x+=m.knockbackVx; m.knockbackVx*=.76;
      m.x=Math.max(18,Math.min(WORLD_W-62,m.x));
      if(m.x<=18||m.x>=WORLD_W-62)m.knockbackVx=0;
    } else m.knockbackVx=0;
    if(m.stun>0){m.stun--;continue;}
    const playerCenter=player.x+PLAYER_W/2, mobCenter=m.x+24;
    if(Math.abs(mobCenter-playerCenter)>58){m.x+=m.dir*.72;if(m.x<m.min||m.x>m.max)m.dir*=-1;}
    else if(m.attackCooldown<=0){if(player.invuln<=0){player.hp=Math.max(0,player.hp-(5+Math.floor(currentStage/2)));player.invuln=38;player.hitFlash=8;player.vx+=(player.x<m.x?-1:1)*2.3;spawnEffect('red-strike',player.x+PLAYER_W/2,GROUND_Y-63,.72,player.facing,20);spawnBurst(player.x+PLAYER_W/2,GROUND_Y-46,'#ff315e',9,3);screenShake(2.7,6);playCombatSound('impact');}m.attackCooldown=85;}
    else m.attackCooldown--;
  }
}

function updateBoss(){
  if(boss.flash>0)boss.flash--;
  if(boss.staggerTimer>0)boss.staggerTimer--;
  if(Math.abs(boss.knockbackVx||0)>.08){boss.x+=boss.knockbackVx;boss.knockbackVx*=.72;}else boss.knockbackVx=0;
  if(boss.hp<=0){boss.dead=true;return;}
  const ratio=boss.hp/boss.maxHp;
  if(ratio<=.62&&boss.phase<2){boss.phase=2;boss.cooldown=Math.min(boss.cooldown,35);setStoryCaption(stages[currentStage].boss,chapterLore[currentStage].phase,270);setCombatToast('فاز دوم — زره باس شکسته شد','#ffd5df',80);screenShake(7,12);screenFlashFrames=7;spawnBurst(boss.x+58,GROUND_Y-90,'#ff496c',32,6.2);}
  if(ratio<=.28&&boss.phase<3){boss.phase=3;boss.cooldown=22;boss.rangedCooldown=65;setStoryCaption('اِیرِن','مراقب باش! نگهبان آخرین قدرتش را مصرف می‌کند؛ حلقه‌های هشدار را دنبال کن.',235);setCombatToast('خشم نهایی — سرعت باس افزایش یافت!','#ff7189',90);screenShake(9,16);screenFlashFrames=8;}
  const pc=player.x+PLAYER_W/2,bc=boss.x+58,dist=pc-bc;boss.facing=dist<0?-1:1;
  if(boss.chargeTimer>0){
    boss.x+=boss.chargeDir*(boss.phase>=3?7.4:6.2);boss.chargeTimer--;
    if(!boss.chargeHit&&Math.abs((boss.x+58)-pc)<66&&player.invuln<=0){boss.chargeHit=true;player.hp=Math.max(0,player.hp-(10+currentStage));player.invuln=50;player.hitFlash=11;player.vx=boss.chargeDir*4.2;spawnEffect('impact-spark',pc,GROUND_Y-56,1.05,-boss.chargeDir,22);spawnBurst(pc,GROUND_Y-48,'#ff4e70',17,4.8);screenShake(7,12);screenFlashFrames=6;setCombatToast('برخورد یورش باس!','#ff9eaf',42);}
    if(boss.x<85||boss.x>WORLD_W-160)boss.chargeTimer=0;
    if(boss.chargeTimer===0)boss.cooldown=boss.phase>=3?38:65;
    return;
  }
  if(boss.windup>0){boss.windup--;if(boss.windup===1){screenShake(2,3);}if(boss.windup===0){
      if(boss.attackType==='bolt'){
        const dir=dist<0?-1:1;hostileProjectiles.push({x:boss.x+58,y:GROUND_Y-43,vx:dir*(boss.phase>=3?5.1:4.2),vy:0,life:150,age:0,damage:9+currentStage,color:stages[currentStage].accent||'#ff4567'});
        spawnBurst(boss.x+58,GROUND_Y-85,stages[currentStage].accent,12,3.2);boss.rangedCooldown=boss.phase>=3?72:118;boss.cooldown=boss.phase>=3?28:48;
      }else if(boss.attackType==='charge'){
        boss.chargeTimer=boss.phase>=3?25:19;boss.chargeDir=dist<0?-1:1;boss.chargeHit=false;
        spawnEffect('red-strike',boss.x+58,GROUND_Y-55,1.0,boss.chargeDir,24);spawnBurst(boss.x+58,GROUND_Y-30,'#ff315e',18,4.7);
      }else{
        const targetX=Number.isFinite(boss.targetX)?boss.targetX:player.x+PLAYER_W/2;spawnEffect('red-strike',targetX,GROUND_Y-68,1.15,player.facing,23);spawnBurst(targetX,GROUND_Y-43,'#ff315e',16,4.3);
        if(Math.abs((player.x+PLAYER_W/2)-targetX)<92&&player.invuln<=0){player.hp=Math.max(0,player.hp-(14+currentStage*2));player.invuln=54;player.hitFlash=12;player.vx+=(dist<0?-1:1)*3.4;screenShake(6.2,12);screenFlashFrames=7;setCombatToast('ضربه‌ی سنگین باس! جاخالی بده','#ff9eaf',40);}
        boss.cooldown=boss.phase>=3?40:boss.phase>=2?58:76;
      }
    }}
  else if(boss.staggerTimer>0){/* The soul-snare briefly interrupts the boss without pausing the world. */}
  else{
    const chase=boss.phase>=3?1.62:boss.phase>=2?1.3:1.08;
    if(Math.abs(dist)>142)boss.x+=Math.sign(dist)*chase;
    if(boss.rangedCooldown>0)boss.rangedCooldown--;
    if(boss.cooldown>0)boss.cooldown--;
    if(Math.abs(dist)>190&&Math.abs(dist)<560&&boss.rangedCooldown<=0){boss.attackType='bolt';boss.targetX=pc;boss.windup=boss.phase>=3?24:34;setCombatToast('حمله‌ی دوربرد باس — آماده شو','#ffd9e1',35);}
    else if(Math.abs(dist)<250&&boss.cooldown<=0){
      const patterns=boss.phase>=3?['charge','slam','bolt']:boss.phase>=2?['slam','charge','bolt']:['slam','bolt','slam'];
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
    KeyJ:'attack', KeyH:'heavyAttack', KeyK:'special', KeyL:'ultimate', KeyE:'burst', KeyQ:'wave', KeyV:'descent', KeyR:'bloodRain', KeyF:'soulSnare', KeyC:'frostWave', KeyX:'voidBolt',
    ShiftLeft:'dash', ShiftRight:'dash'
  };
  return map[code] || null;
}
function releaseAllKeys() { for (const key of Object.keys(keys)) keys[key]=false; }
function touchKey(key, down) {
  const action = ({ArrowLeft:'left',ArrowRight:'right',' ':'jump',ArrowUp:'jump'})[key] || key;
  if(action==='left'&&down)player.facing=-1;else if(action==='right'&&down)player.facing=1;
  if (action === 'jump' && down && !keys.jump && !paused) jumpPlayer();
  keys[action] = !!down;
}
function touchAttack() { if (!paused) triggerAttack(); }
function touchHeavyAttack() { if (!paused) triggerHeavyAttack(); }
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
  const action = inputActionFromCode(e.code) || ({'ArrowLeft':'left','ArrowRight':'right','ArrowUp':'jump',' ':'jump','a':'left','A':'left','d':'right','D':'right','w':'jump','W':'jump','j':'attack','J':'attack','h':'heavyAttack','H':'heavyAttack','k':'special','K':'special','l':'ultimate','L':'ultimate','e':'burst','E':'burst','q':'wave','Q':'wave','v':'descent','V':'descent','r':'bloodRain','R':'bloodRain','f':'soulSnare','F':'soulSnare','c':'frostWave','C':'frostWave','x':'voidBolt','X':'voidBolt','Shift':'dash'})[e.key];
  if (!action || !$('game').classList.contains('active')) return;
  e.preventDefault();
  const wasDown = !!keys[action]; keys[action]=true;
  if(action==='left'&&player)player.facing=-1; else if(action==='right'&&player)player.facing=1;
  if (action==='jump' && !wasDown && !e.repeat && !paused) jumpPlayer();
  else if (action==='attack' && !wasDown && !paused) triggerAttack();
  else if (action==='heavyAttack' && !wasDown && !paused) triggerHeavyAttack();
  else if (action==='descent' && !wasDown && !paused) triggerAngelicDescent();
  else if (action==='special' && !wasDown && !paused) triggerSpecial();
  else if (action==='burst' && !wasDown && !paused) triggerBurst();
  else if (action==='wave' && !wasDown && !paused) triggerWave();
  else if (action==='ultimate' && !wasDown && !paused) triggerUltimate();
  else if (action==='bloodRain' && !wasDown && !paused) triggerBloodRain();
  else if (action==='soulSnare' && !wasDown && !paused) triggerSoulSnare();
  else if (action==='dash' && !wasDown && !paused) triggerDash();
});
document.addEventListener('keyup',e=>{
  const action = inputActionFromCode(e.code) || ({'ArrowLeft':'left','ArrowRight':'right','ArrowUp':'jump',' ':'jump','a':'left','A':'left','d':'right','D':'right','w':'jump','W':'jump','j':'attack','J':'attack','h':'heavyAttack','H':'heavyAttack','k':'special','K':'special','l':'ultimate','L':'ultimate','e':'burst','E':'burst','q':'wave','Q':'wave','v':'descent','V':'descent','r':'bloodRain','R':'bloodRain','f':'soulSnare','F':'soulSnare','c':'frostWave','C':'frostWave','x':'voidBolt','X':'voidBolt','Shift':'dash'})[e.key];
  if (action) keys[action]=false;
});
window.addEventListener?.('blur', releaseAllKeys);
document.addEventListener('visibilitychange',()=>{ if(document.hidden) releaseAllKeys(); });

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&$('game').classList.contains('active')&&!gameEnded){
    if(!paused){releaseAllKeys();paused=true;overlayMode='resume';$('overlayTitle').textContent='بازی متوقف شد';$('overlayText').textContent='هر وقت آماده بودی ادامه بده.';$('overlayButton').textContent='ادامه‌ی بازی';$('overlayButton').onclick=resumeGame;$('gameOverlay').classList.remove('hidden');}
    else if(overlayMode==='resume')resumeGame();
  }
});

preloadFileAssets();renderJourney();renderStages();renderShop();updateTop();bindCombatSettings();resetGame();requestAnimationFrame(gameLoop);
