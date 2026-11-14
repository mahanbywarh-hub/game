/* ASHEN HALO — English UI, campaign naming and hero profile extension. */
(() => {
  'use strict';
  const phrases = {
    'سِرا':'Sera','سرا':'Sera','فرشته':'Angel','جان فرشته':'ANGEL VITALITY','آماده':'READY','آماده است':'READY',
    'مأموریت':'Mission','مأموریت اصلی':'Main Mission','هدف':'Objective','هدف مأموریت':'Mission Objective','نگهبان':'Guardian','باس':'Boss',
    'قفل است':'LOCKED','قفل':'LOCKED','تکرار مأموریت':'REPLAY MISSION','شروع مأموریت':'START MISSION','ناشناخته':'Unknown','تکمیل‌شده':'Completed','در حال انجام':'In Progress','آماده‌ی تحویل':'Ready to Claim','دریافت مأموریت':'Accept Quest',
    'رایگان':'FREE','مجهز شده':'EQUIPPED','استفاده از سلاح':'EQUIP WEAPON','خرید سلاح':'BUY WEAPON','خرید':'BUY','تجهیز':'EQUIP','سکه':'Coins','سکه کافی نداری!':'Not enough coins!','سکه‌ی کافی برای این تجهیزات نداری.':'Not enough coins for this gear.',
    'قدرت':'Strength','چابکی':'Agility','جان':'Vitality','انرژی':'Energy','ضربه‌ی بحرانی':'Critical','دفاع':'Defense','استادی شمشیر':'Sword Mastery','انرژی سرخ':'Crimson Energy','قدرت فرشته':'Angel Power','فن سایه':'Shadow Arts','دفاع هاله':'Halo Guard','ویژگی‌ها':'Attributes','درخت مهارت':'Skill Tree','ارتقا':'UPGRADE','رتبه':'Rank','امتیاز':'Points',
    'پاداش مأموریت دریافت شد!':'Quest reward received!','این مأموریت هنوز در دسترس نیست.':'This quest is not available yet.','این مأموریت قبلاً کامل شده است.':'This quest is already complete.','ابتدا مأموریت فعال را به پایان برسان.':'Complete your active quest first.','مأموریت پذیرفته شد:':'Quest accepted:','مأموریت آماده‌ی تحویل است:':'Quest ready to claim:','گفت‌وگو در بایگانی ثبت شد.':'Conversation recorded in the archive.',
    'داوری آسمانی — موج هاله به همه‌ی دشمنان رسید!':'DIVINE JUDGEMENT — The halo wave struck every enemy!','داوری آسمانی — نیروی هاله آزاد شد!':'DIVINE JUDGEMENT — Halo power unleashed!',
    'این مأموریت هنوز قفل است. ابتدا مرحله‌های قبلی را کامل کن.':'This mission is locked. Complete the previous stages first.',
    'هاله‌ی شکسته — داوری نهایی!':'BROKEN HALO — FINAL JUDGEMENT!','نوار هاله هنوز کامل نشده':'The halo meter is not full yet.',
    'صدا':'VOLUME','راوی':'Narrator','فاز دوم — زره باس شکسته شد':'PHASE TWO — THE BOSS ARMOR IS BROKEN','مُهر فعال':'SEAL ACTIVE','مُهرشده':'SEALED','مُهر':'SEAL','غنیمت باس':'BOSS LOOT','سلاح تازه':'NEW WEAPON','سلاح':'Weapon','جان فرشته':'ANGEL VITALITY'
  };
  const regionNames = ['Fallen Kingdom','Crimson Forest','Ashen Cathedral','Frozen Wastes','Volcanic Depths','Sunken Kingdom','Shadow Kingdom','Heaven’s Ruins','Forgotten Abyss','The Void'];
  const stageNames = ['The Black Gate','Village of the Last Ember','Garden of Crimson Threads','Roots of Names','Raven Monastery','Fall of the Broken Crown','Ashen March','The Tongueless Bell Tower','The Choirless Nave','Pilgrim’s Teeth','Crimson Trial','Heart of the Ashen Cathedral','White Road','Shatterwind Monastery','Ice Archive','Bone Glacier','The Last Winter Hunt','Crown of Silence','Furnace Road','Golden Chain Workshop','Ember Reservoir','Gear Cathedral','Lava Rift','Iron Heart','Sunken Passage','The Underwater Court','Salt Cathedral','Black Pearl','Tidal Mirror','Buried Crown','Shadowless Market','Hall of the Black Mirror','Seraph Ship','Ruins of Heaven','Forgotten Abyss','The Throne Beyond Names'];
  const bossNames = ['Hollow Knight','Crimson Beast','Corrupted Archbishop','Bell Warden','Frozen Titan','Pale Huntress','Flame Devourer','Iron Matriarch','Abyssal Queen','Drowned King','Forgotten God','Void Emperor'];
  const bossTitles = ['Nameless Gatekeeper','The Beating Heart of the Forest','Keeper of Stolen Names','Voice of the Last Hymn','The Last Promise of Winter','Tracker of Lost Memories','Heart of the Forbidden Forge','Architect of Heaven’s Chains','Ruler of the Sunken Hall','Crowned King of the Silent City','The One Before Names','The King Without a Name'];
  const actNames = ['Roots That Weep Blood','The Cathedral of Stolen Names','The Winter That Swallowed Names','Iron Heart, Silent Fire','Mirrors Beneath the Sea','The Last Name in the Void'];
  const actIntros = [
    'Sera awakens beside a gate untouched for years. The ground remembers a battle no one will describe. A voice inside her fractured halo whispers: “Before you break anything this time, look closely.”',
    'The bells of the Ashen Cathedral ring without warning. The priests blame the wind, yet every chime erases another name from the walls.',
    'The snow does not bury footprints here; it buries memories. The ice titans still guard a promise Sera made to a child.',
    'Deep in the volcanic forge, a machine still turns memories into weapons. Even the angels’ wings are part of its design.',
    'The Sunken Kingdom preserves two versions of the same memory. Every mirror shows Sera differently, and none will surrender its reflection.',
    'Every trail leads to the Ruins of Heaven. The Void is made from all the memories sacrificed to keep the world illuminated.'
  ];
  const actReveals = [
    'The guardian admits that the gate was sealed by Sera’s own command. A second order was hidden inside it: get the children out alive, even if my name is erased.',
    'The bishop once served the Celestial Council. He knew the halo was powered by stolen memories, but hid the records to prevent the cities from collapsing into chaos.',
    'Sera’s promise was simple: save the children trapped behind the gate. To open the way, she shattered her halo and left part of herself behind.',
    'The engineers tried to stop the memory cycle. The Council feared the halo would collapse, so it bound them to the machine and buried the truth beneath iron and fire.',
    'Sera was not the throne’s guardian. She was the first maker of the halo. When she learned its true cost, she began searching for a way to end the cycle.',
    'The Void Emperor was the first nameless angel. He saved the world from ruin, but never accepted that safety bought with other people’s choices was not salvation.'
  ];
  const actEndings = [
    'When the first seal opens, the forest falls silent. Then a voice beneath the roots remembers Sera’s name.',
    'The bells fall silent. For the first time, silence feels like peace rather than a warning.',
    'The ice cracks from within. The child’s name returns to the archive, but Eiren’s voice grows faint.',
    'The furnace dies. Behind its final gear lies a map to a city lost beneath the sea.',
    'The last mirror breaks, revealing the road to Heaven’s ruins. No one can define Sera’s past for her again.',
    'Sera faces the source. This time, the halo will not be shaped by the Council; those who reclaimed their names will choose the future.'
  ];
  const actSubtitles = ['ACT I · THE FALLEN CROWN','ACT II · THE SILENT CHOIR','ACT III · THE WHITE SILENCE','ACT IV · THE EMBER COVENANT','ACT V · THE DROWNED MIRROR','ACT VI · BEYOND THE HALO'];
  const regionDescriptions = [
    'Fallen castles, silent villages and soldiers still obeying a dead oath.','Ancient trees and creatures grown from the memories of the sacrificed.','Gothic corridors, silent bells and priests who hide the names.','Buried monasteries, frozen valleys and hunters who steal memories.','Lava veins and forges that turn angel wings into chains.','Underwater palaces where time flows backward.','Dark markets, deceitful mirrors and corridors that change their paths.','Celestial structures and the remains of a civilization that turned light into a cage.','Ruins from before creation, guarded by beings who never had names.','A dimension beyond time, where the truth of the halo is finally revealed.'
  ];
  const weaponNames = ['Ashen Sword','Ember Edge','Blood Scythe','Stormblade','Halo Splitter','The First Name'];
  const weaponDescs = ['The starting weapon. Balanced and dependable.','A heated blade that leaves a trail of fire.','A cursed weapon with devastating strikes.','Fast, radiant attacks crackle along this blade.','A legendary sword forged to end the cycle.','A blade older than the first halo, carrying immense power.'];
  const missionNames = {'پاک‌سازی مسیر':'Purge the Path','بازیابی خاطره':'Recover the Memory','فعال‌سازی مُهر':'Activate the Seal','نجات بازماندگان':'Rescue the Survivors','پایداری در طوفان':'Weather the Storm','شکار نگهبان':'Hunt the Guardian'};
  const objectives = {'نگهبانان منطقه را شکست بده':'Defeat the realm guardians','تکه‌های خاطره‌ی پراکنده را جمع‌آوری کن':'Collect the scattered memory shards','سه سازوکار باستانی را فعال کن':'Activate three ancient mechanisms','بازماندگان گمشده را پیدا و آزاد کن':'Find and free the missing survivors','در برابر موج‌های دشمن دوام بیاور':'Survive the enemy waves','ردّ نگهبان اصلی را دنبال کن و شکستش بده':'Track down and defeat the main guardian'};
  const wardenNames = ['Armored Captain','Root-Eater Wolf','Faceless Deacon','Frostbound Guardian','Chainbound Machine','Pearl Hunter','Twin Shadow','Wingless Angel','Stone Warden','Void Courier'];
  function replaceText(s){
    if(typeof s!=='string')return s;
    if(phrases[s])return phrases[s];
    let out=s;
    for(const [fa,en] of Object.entries(phrases)) if(out.includes(fa)) out=out.split(fa).join(en);
    if(/[\u0600-\u06FF]/.test(out)) return 'The shattered Halo stirs. Forgotten names echo across the realm. Keep moving, break the seals, and uncover the truth.';
    return out;
  }
  // Translate the campaign data before any menu is rendered.
  try {
    const data=window.ASHEN_CAMPAIGN;
    if(data){
      data.regions.forEach((r,i)=>{r.name=regionNames[i]||r.name;r.description=regionDescriptions[i]||r.description;r.ambient=['Wind and ash','Whispers of roots','Distant bells','Blizzard and ice','Roaring furnace','Call of the deep','Whispers in the mirrors','Broken hymn','Stone resonance','Endless silence'][i];});
      data.acts.forEach((a,i)=>{a.name=actNames[i]||a.name;a.subtitle=actSubtitles[i]||a.subtitle;a.intro=actIntros[i]||a.intro;a.reveal=actReveals[i]||a.reveal;a.ending=actEndings[i]||a.ending;a.companion='Eiren: “The past is not a command. It is a choice you can finally understand.”';});
      data.majorBosses.forEach((b,i)=>{b.name=bossNames[i]||b.name;b.subtitle=bossTitles[i]||b.subtitle;});
      data.stageDefs.forEach((st,i)=>{st.name=stageNames[i]||st.name;st.sub=`MARK ${String(i+1).padStart(2,'0')}`;st.regionName=regionNames[st.regionIndex]||st.regionName;st.boss=st.bossMajor?(bossNames[data.majorBosses.findIndex(b=>b.id===st.bossProfile?.id)]||replaceText(st.boss)):wardenNames[st.regionIndex]||replaceText(st.boss);st.bossTitle=replaceText(st.bossTitle);st.objective=objectives[st.objective]||replaceText(st.objective);st.missionName=missionNames[st.missionName]||replaceText(st.missionName);st.desc=`${st.regionName} — ${st.missionName}. ${data.regions[st.regionIndex]?.description||''}`;});
      const questTitles=['The Lost Soldier’s Song','The Village’s Last Bread','The Nameless Root','Vials of Confession','The Fifth Bell','The Bishop’s Confession','A Promise Beneath the Ice','The Hunter’s Trail','The Smokeless Flame','The Smith’s Heart','Mother of Chains','The Water Script','The Pearl Crown','A Name in the Mirror','The Silent Corridor','Broken Wing','The Book Before Creation','The Last Scribe']; const questDescs=['Find the missing soldier in the Black Passage.','Recover three supply markers.','Defeat the Root-Eater Guardian.','Collect three name vials.','Activate the bell mechanism.','Defeat the Bishop Guardian.','Collect the scattered memory shards.','Defeat the Pale Huntress.','Relight the extinguished braziers.','Activate three memorial gears.','Defeat the Iron Matriarch.','Read three submerged tablets.','Defeat the Abyssal Queen.','Collect the mirror fragments.','Survive the waves of shadow.','Defeat the Fallen Angel.','Find the records of the Abyss.','Defeat the Void Emperor.']; data.sideQuests.forEach((q,i)=>{q.title=questTitles[i]||replaceText(q.title);q.description=questDescs[i]||replaceText(q.description);q.lore='A forgotten record tied to the history of the Halo. Recover it to reveal another fragment of the truth.';});
    }
  } catch(e){console.warn('Campaign localization fallback:',e);}
  // Translate game-facing weapon and gear records.
  try { weapons.forEach((w,i)=>{w.name=weaponNames[i]||replaceText(w.name);w.desc=weaponDescs[i]||replaceText(w.desc);w.rarity=({ 'معمولی':'COMMON','غیرمعمول':'UNCOMMON','کمیاب':'RARE','حماسی':'EPIC','افسانه‌ای':'LEGENDARY','اسطوره‌ای':'MYTHIC'})[w.rarity]||w.rarity;}); GEAR_ITEMS.forEach(g=>{g.name=replaceText(g.name);g.desc=replaceText(g.desc);g.slotName=({ 'زره':'Armor','اکسسوری':'Accessory','یادگار':'Relic'})[g.slotName]||g.slotName;g.rarity=replaceText(g.rarity);}); stages.forEach((st,i)=>{st.name=stageNames[i]||st.name;st.regionName=regionNames[st.regionIndex]||st.regionName;st.boss=replaceText(st.boss);st.objective=replaceText(st.objective);st.missionName=replaceText(st.missionName);}); } catch(e){console.warn('Weapon localization fallback:',e);}
  // Profile reads the live campaign state; no duplicate save data is created.
  window.openHeroProfile = function(){
    const modal=document.getElementById('profileModal'); if(!modal)return;
    const level=Math.max(1,Number(campaignProgress.level)||1),xp=Math.max(0,Number(campaignProgress.xp)||0),next=Math.max(1,Number(campaignProgress.xpNext)||120);
    const done=campaignProgress.completedStages.length,unlocked=campaignProgress.unlockedStage+1,stage=stages[Math.min(currentStage,stages.length-1)]||stages[0];
    const act=CAMPAIGN_DATA.acts[stage?.actIndex||0];
    const minutes=Math.floor((campaignProgress.playFrames||0)/60/60),seconds=Math.floor(((campaignProgress.playFrames||0)/60)%60);
    const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=String(value);};
    set('topProfileLevel',`LV. ${level}`);set('profileLevel',String(level).padStart(2,'0'));set('profileHeroName',heroName||'The Fallen Angel');
    set('profileXpText',`${xp.toLocaleString('en-US')} / ${next.toLocaleString('en-US')} XP`);
    const bar=document.getElementById('profileXpBar');if(bar)bar.style.width=`${Math.max(0,Math.min(100,xp/next*100))}%`;
    set('profileCoins',coins.toLocaleString('en-US'));set('profileStages',`${done} / ${stages.length}`);set('profileKills',(campaignProgress.totalKills||0).toLocaleString('en-US'));set('profileBosses',(campaignProgress.totalBosses||0).toLocaleString('en-US'));
    set('profileCurrentStage',stage?.name||'Unknown');set('profileAct',act?.subtitle||'CAMPAIGN');set('profileWeapon',weapons[equipped]?.name||'Unknown');set('profileWeaponOwned',`${owned.length} / ${weapons.length} weapons owned`);set('profilePlaytime',`${minutes}h ${String(seconds).padStart(2,'0')}m`);
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  };
  window.closeHeroProfile=function(){const modal=document.getElementById('profileModal');if(!modal)return;modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
  document.addEventListener('keydown',e=>{if(e.key==='Escape')window.closeHeroProfile();});
  // Translate exact text fragments in static and dynamically rendered HTML.
  const domMap={
    'بازگشت به لابی':'BACK TO LOBBY','کنترل‌ها':'CONTROLS','حرکت':'MOVE','پرش دوبل':'DOUBLE JUMP','تعامل':'INTERACT','کمبو':'COMBO','ضربه‌ی سنگین':'HEAVY ATTACK','دفع ضربه':'PARRY','جاخالی سریع':'DASH','مهارت‌ها':'ABILITIES','شروع نبرد':'START BATTLE','عبور از دروازه':'ENTER THE GATE','ردّ این مسیر هنوز پاک نشده':'THIS PATH IS NOT FORGOTTEN','پشت این دروازه، گذشته منتظر توست':'BEYOND THIS GATE, THE PAST AWAITS','جان فرشته':'ANGEL VITALITY','هدف:':'OBJECTIVE:','نگهبان:':'GUARDIAN:','از ۶ مأموریت تکمیل شده':'OF 6 MISSIONS CLEARED','مأموریت تکمیل شده':'MISSIONS CLEARED','ویژگی‌های':'ATTRIBUTES:','هر بار ارتقای سطح، دو امتیاز ویژگی دریافت می‌کنی.':'Gain two attribute points every time you level up.','تابلوی مأموریت‌ها':'QUEST BOARD','یادگارها و رازها':'RELICS & SECRETS','چالش‌های پس از کمپین':'POST-CAMPAIGN CHALLENGES','نبرد پیاپی باس‌ها':'BOSS RUSH','میدان بقا':'SURVIVAL ARENA','آغاز بازی نو +':'START NEW GAME +','بازی نو + پس از پایان هر ۳۶ مرحله فعال می‌شود.':'New Game+ unlocks after all 36 stages are cleared.','بازگشت به پناهگاه':'RETURN TO SANCTUARY','هنوز مأموریت جانبی فعالی انتخاب نشده است.':'No active side quest.','پاداش مأموریت دریافت شد!':'Quest reward received!','رایگان':'FREE','مجهز شده':'EQUIPPED','سکه':'COINS','تجهیزات':'GEAR','زره':'ARMOR','اکسسوری':'ACCESSORY','یادگار':'RELIC','قدرت:':'POWER:','قیمت':'PRICE','پیشرفت':'PROGRESS','ذخیره':'SAVE','گفت‌وگو':'DIALOGUE','سه ضربه':'3 HITS','سنگین':'HEAVY','موج سرخ':'CRIMSON WAVE','سایه‌شکاف':'SHADOW RIFT','فرود':'DESCENT','هاله':'HALO','موج یخی':'FROST WAVE','نیزه‌ی خلأ':'VOID LANCE','آماده':'READY','آماده‌ی تحویل':'READY TO CLAIM','هر بار ارتقای سطح، دو امتیاز ویژگی دریافت می‌کنی.':'Gain two attribute points every time you level up.','قدرت':'STRENGTH','چابکی':'AGILITY','جان':'VITALITY','انرژی':'ENERGY','ضربه‌ی بحرانی':'CRITICAL','دفاع':'DEFENSE','استادی شمشیر':'SWORD MASTERY','انرژی سرخ':'CRIMSON ENERGY','قدرت فرشته':'ANGEL POWER','فن سایه':'SHADOW ARTS','دفاع هاله':'HALO GUARD','ویژگی‌های':'ATTRIBUTES','درخت مهارت':'SKILL TREE','مأموریت‌های جانبی':'SIDE QUESTS','مأموریت فعال':'ACTIVE QUEST','پاداش':'REWARD','تکمیل‌شده':'COMPLETED','در حال انجام':'IN PROGRESS','قفل است':'LOCKED','خرید تجهیزات':'BUY GEAR','تجهیزات':'GEAR','زره':'ARMOR','اکسسوری':'ACCESSORY','یادگار':'RELIC','پناهگاه':'SANCTUARY','بازگشت به لابی':'BACK TO LOBBY','گفت‌وگو':'DIALOGUE','شروع سفر':'BEGIN JOURNEY','انتخاب منطقه':'SELECT REALM','نامی که فرشته با آن شناخته می‌شود':'CHOOSE YOUR ANGEL’S NAME','پناهگاه خاکستر':'ASHEN SANCTUARY','آهنگری خاکستر':'ASH FORGE','نقشه‌ی جهان':'WORLD MAP','دفتر افسانه':'LORE CODEX','ویژگی‌ها، مهارت‌ها و مأموریت‌های جانبی':'Attributes, skills & side quests','شمشیرها و ارتقاها':'Swords & upgrades','۳۶ مأموریت در ۶ پرده':'36 missions across 6 acts','روایت‌ها، نام‌ها و خاطرات':'Stories, names & memories','بازگشت':'BACK','شش پرده‌ی خاطرات':'SIX ACTS OF MEMORY','دروازه‌ی قلمروها':'REALM GATES','پناهگاه مرکزی با پیشرفت داستان گسترش می‌یابد؛ اینجا تجهیزات، مهارت‌ها و مأموریت‌های جانبی را مدیریت کن.':'Your sanctuary grows with the story. Manage gear, skills and side quests here.','سلاح‌ها قدرت و رنگ افکت حمله را تغییر می‌دهند.':'Weapons change your damage and attack effects.','هنوز مأموریت جانبی فعالی انتخاب نشده است.':'No active side quest.','ذخیره':'SAVE','شش پرده‌ی داستانی':'6 STORY ACTS','مأموریت‌های اصلی':'MAIN MISSIONS','دوازده باس افسانه‌ای':'12 LEGENDARY BOSSES'
  };
  function translateNode(node){
    if(node.nodeType===Node.TEXT_NODE){let v=node.nodeValue;for(const [fa,en] of Object.entries(domMap))if(v.includes(fa))v=v.split(fa).join(en);if(/[\u0600-\u06FF]/.test(v))v='The shattered Halo echoes with forgotten memories.';if(v!==node.nodeValue)node.nodeValue=v;}
    else if(node.nodeType===Node.ELEMENT_NODE){for(const attr of ['placeholder','aria-label','title']){const v=node.getAttribute(attr);if(v){let n=v;for(const [fa,en] of Object.entries(domMap))if(n.includes(fa))n=n.split(fa).join(en);if(/[\u0600-\u06FF]/.test(n))n='The shattered Halo echoes with forgotten memories.';if(n!==v)node.setAttribute(attr,n);}}}
  }
  function translateTree(root){const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);let n=root;translateNode(root);while((n=walker.nextNode()))translateNode(n);}
  document.addEventListener('DOMContentLoaded',()=>{
    document.documentElement.lang='en';document.documentElement.dir='ltr';
    try{renderJourney();renderStages();renderShop();updateTop();}catch(e){console.warn('English UI refresh fallback:',e);}
    translateTree(document.body);
    const observer=new MutationObserver(records=>{for(const r of records){if(r.type==='characterData')translateNode(r.target);for(const n of r.addedNodes||[])if(n.nodeType===1||n.nodeType===3)translateTree(n);}});
    observer.observe(document.body,{subtree:true,childList:true,characterData:true});
    const originalToast=window.setCombatToast;if(typeof originalToast==='function')window.setCombatToast=function(text,color,duration){return originalToast(replaceText(text),color,duration);};
    const originalCaption=window.setStoryCaption;if(typeof originalCaption==='function')window.setStoryCaption=function(speaker,text,duration){return originalCaption(replaceText(speaker),replaceText(text),duration);};
    const oldUpdate=window.updateTop;if(typeof oldUpdate==='function')window.updateTop=function(){const r=oldUpdate.apply(this,arguments);const el=document.getElementById('topProfileLevel');if(el)el.textContent=`LV. ${campaignProgress.level||1}`;return r;};
    document.querySelectorAll('.top-stats span').forEach((el,i)=>{if(i===1)el.title='Currently equipped weapon';});
  });
})();
