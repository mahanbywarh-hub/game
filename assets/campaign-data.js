/* ASHEN HALO Phase 3: data-driven campaign content. Kept separate from runtime systems. */
(function () {
  const regions = [
    {id:'fallen-kingdom',name:'پادشاهی سقوط‌کرده',style:'forest',color:'#293329',accent:'#bd9a78',hazard:'ash',ambient:'باد و خاکستر',description:'قلعه‌های فروریخته، روستاهای خاموش و سربازانی که هنوز سوگند مرده را اجرا می‌کنند.'},
    {id:'crimson-forest',name:'جنگل سرخ',style:'forest',color:'#45212e',accent:'#f05b72',hazard:'thorn',ambient:'نجوای ریشه‌ها',description:'درختان کهن و موجوداتی که با خاطره‌ی قربانیان رشد کرده‌اند.'},
    {id:'cathedral-ash',name:'کلیسای خاکستر',style:'church',color:'#382331',accent:'#ed7286',hazard:'cinder',ambient:'ناقوس‌های دور',description:'راهروهای گوتیک، ناقوس‌های خاموش و کشیشانی که نام‌ها را پنهان می‌کنند.'},
    {id:'frozen-wastes',name:'برهوت یخ‌زده',style:'ice',color:'#1d3548',accent:'#a9e7ff',hazard:'frost',ambient:'بوران و یخ',description:'صومعه‌های مدفون، دره‌های یخ و شکارچیانی که خاطرات را می‌دزدند.'},
    {id:'volcanic-depths',name:'ژرفای آتشفشانی',style:'factory',color:'#43261f',accent:'#ff985b',hazard:'lava',ambient:'غرش کوره',description:'رگ‌های گدازه و آهنگری‌هایی که بال‌های فرشتگان را به زنجیر تبدیل می‌کنند.'},
    {id:'sunken-kingdom',name:'پادشاهی غرق‌شده',style:'void',color:'#17333a',accent:'#74d7c8',hazard:'tide',ambient:'آوای اعماق',description:'قصرهای زیرآبی و تالارهایی که زمان در آن‌ها به عقب می‌رود.'},
    {id:'shadow-kingdom',name:'پادشاهی سایه‌ها',style:'void',color:'#211b32',accent:'#b28af4',hazard:'shadow',ambient:'زمزمه‌ی آینه‌ها',description:'بازارهای تاریک، آینه‌های دروغگو و راهروهایی که مسیرشان عوض می‌شود.'},
    {id:'heavens-ruins',name:'ویرانه‌های بهشت',style:'church',color:'#37334a',accent:'#e4d3ff',hazard:'light',ambient:'سرود شکسته',description:'سازه‌های آسمانی و بقایای تمدنی که نور را به قفس بدل کرد.'},
    {id:'forgotten-abyss',name:'پرتگاه فراموش‌شده',style:'factory',color:'#292333',accent:'#c17b9c',hazard:'void',ambient:'طنین سنگ',description:'ویرانه‌های پیش از آفرینش و نگهبانانی که هیچ‌گاه نام نداشتند.'},
    {id:'the-void',name:'خلأ',style:'void',color:'#171326',accent:'#d4a0ff',hazard:'void',ambient:'سکوت بی‌انتها',description:'بُعدی بیرون از زمان؛ جایی که حقیقت هاله و سرچشمه‌ی سقوط آشکار می‌شود.'}
  ];
  const acts = [
    {name:'ریشه‌هایی که خون می‌گریند',subtitle:'Act I · The Fallen Crown',intro:'سِرا کنار دروازه‌ای بیدار می‌شود که انگار سال‌هاست کسی از آن عبور نکرده. روی زمین ردّ نبرد مانده، اما کسی نمی‌گوید چه اتفاقی افتاده. تنها صدایی از هاله‌ی ترک‌خورده‌اش می‌گوید: «این بار، پیش از آن‌که چیزی را بشکنی، خوب نگاه کن.»',companion:'اِیرِن: «این درخت‌ها اسم آدم‌ها را نگه می‌دارند؛ اسم‌هایی که شورا خواسته از یادها ببرد. شاید یکی‌شان تو را به خاطر داشته باشد.»',reveal:'نگهبان اعتراف می‌کند که دروازه را به فرمان سِرا بسته بود. اما همان فرمان، دستور دیگری هم داشت: بچه‌هایی را که پشت دروازه مانده‌اند زنده بیرون ببرید؛ حتی اگر نام من از دفتر پاک شود.',ending:'وقتی نشان اول باز می‌شود، جنگل برای چند لحظه ساکت می‌ماند. بعد صدایی از زیر ریشه‌ها نام سِرا را به یاد می‌آورد.'},
    {name:'کلیسای نام‌های دزدیده‌شده',subtitle:'Act II · The Silent Choir',intro:'در کلیسای خاکستر، ناقوس‌ها بی‌دلیل به صدا درمی‌آیند. کاهنان می‌گویند فقط باد است؛ اما هر بار که ناقوس می‌زند، یک نام از دیوارها ناپدید می‌شود.',companion:'اِیرِن: «اسقف از حقیقت خبر دارد. مسئله این است که نمی‌داند بعد از گفتنش چه چیزی از این شهر باقی می‌ماند.»',reveal:'اسقف زمانی عضو شورای آسمان بوده. می‌دانسته هاله با خاطره‌ی آدم‌ها روشن می‌ماند، اما اسناد را پنهان کرده تا شهرها به آشوب کشیده نشوند.',ending:'وقتی سرود خاموش می‌شود، سِرا می‌فهمد همه‌ی کسانی که روبه‌رویش ایستاده‌اند دشمن نیستند. بعضی‌ها فقط راه دیگری برای زنده‌ماندن بلد نبوده‌اند.'},
    {name:'زمستانی که نام‌ها را بلعید',subtitle:'Act III · The White Silence',intro:'برف اینجا ردّ پا را پاک نمی‌کند؛ خاطره‌ها را زیر خودش دفن می‌کند. تایتان‌های یخ هنوز نگهبان قولی هستند که سِرا به کودکی داده بود.',companion:'اِیرِن: «لازم نیست همین حالا همه‌چیز را به یاد بیاوری. گاهی یک صدا کافی است تا راه را پیدا کنی.»',reveal:'قول سِرا ساده بود: بچه‌هایی را که پشت دروازه مانده‌اند نجات بده. او برای بازکردن راه، هاله را شکست و بخشی از خودش راپشت همان دروازه جا گذاشت.',ending:'یخ از درون ترک می‌خورد. نام کودک دوباره در دفتر پیدا می‌شود؛ اما اِیرِن دیگر مثل قبل صدایش نمی‌رسد.'},
    {name:'قلب آهنین و آتش خاموش',subtitle:'Act IV · The Ember Covenant',intro:'در ژرفای آتشفشانی، دستگاهی هنوز کار می‌کند؛ خاطره‌ها را می‌گیرد و به سلاح تبدیل می‌کند. بال‌های فرشتگان هم بخشی از همین ماشین‌اند.',companion:'اِیرِن: «هر سلاح اینجا از چیزی ساخته شده که یک نفر از دست داده. حواست باشد قدرت تازه را به چه بهایی به دست می‌آوری.»',reveal:'مهندسان می‌خواستند چرخه‌ی حذف خاطره‌ها را متوقف کنند. شورا از ترس فروپاشی هاله، آن‌ها را به دستگاه دوخت و حقیقت را زیر آهن و آتش پنهان کرد.',ending:'کوره خاموش می‌شود. پشت آخرین چرخ‌دنده، نقشه‌ی شهری پیدا می‌شود که سال‌هاست زیر آب مانده؛ همان‌جا که نخستین هاله ساخته شد.'},
    {name:'آینه‌هایی در زیر دریا',subtitle:'Act V · The Drowned Mirror',intro:'پادشاهی غرق‌شده دو روایت از یک خاطره را نگه داشته. هر آینه سِرا را طور دیگری نشان می‌دهد و هیچ‌کدام حاضر نیستند تصویرشان را پس بگیرند.',companion:'اِیرِن: «آینه شاید دروغ نگوید، اما همه‌ی ماجرا را هم نشان نمی‌دهد. به چیزی که پشت سرت جا مانده نگاه کن.»',reveal:'سِرا نگهبان تخت نبود؛ او نخستین سازنده‌ی هاله بود. وقتی فهمید هاله با حذف خاطره‌ها زنده می‌ماند، تصمیم گرفت راهی برای پایان‌دادن به این چرخه پیدا کند.',ending:'آینه‌ی آخر می‌شکند و راه ویرانه‌های آسمان باز می‌شود. این بار، هیچ‌کس نمی‌تواند گذشته‌ی سِرا را به جای او تعریف کند.'},
    {name:'آخرین نام در خلأ',subtitle:'Act VI · Beyond the Halo',intro:'در ویرانه‌های بهشت، ردّ همه‌چیز به یک‌جا می‌رسد. خلأ هیولایی از بیرون نیست؛ از تمام خاطره‌هایی ساخته شده که برای روشن نگه‌داشتن جهان حذف شده‌اند.',companion:'اِیرِن: «من روح نبودم، سِرا. آخرین نامی بودم که از خودت نگه داشتی؛ شاید چون می‌دانستی یک روز به آن احتیاج پیدا می‌کنی.»',reveal:'امپراتور خلأ نخستین فرشته‌ی بی‌نام است. او جهان را از نابودی حفظ کرد، اما هیچ‌وقت نپذیرفت امنیتی که با انتخاب دیگران به دست بیاید، ارزشی ندارد.',ending:'سِرا روبه‌روی سرچشمه می‌ایستد. این بار هاله با فرمان شورا شکل نمی‌گیرد؛ کسانی که نامشان را پس گرفته‌اند، خودشان آینده را انتخاب می‌کنند.'}
  ];
  const majorBosses = [
    {id:'hollow-knight',name:'شوالیه‌ی توخالی',subtitle:'نگهبان دروازه‌ی بی‌نام',style:'knight',color:'#c5a7a0',attacks:['slam','charge','bolt'],speed:1.05,damage:1.0,hp:1.0},
    {id:'crimson-beast',name:'جانور سرخ',subtitle:'قلب تپنده‌ی جنگل',style:'beast',color:'#ff5575',attacks:['charge','slam','pulse'],speed:1.55,damage:1.12,hp:1.1},
    {id:'corrupted-archbishop',name:'اسقف فاسد',subtitle:'نگهبان نام‌های ربوده‌شده',style:'bishop',color:'#e17b9c',attacks:['bolt','bolt','slam'],speed:.9,damage:1.08,hp:1.15},
    {id:'bell-warden',name:'نگهبان ناقوس',subtitle:'صدای آخرین سرود',style:'bell',color:'#ffd27e',attacks:['pulse','slam','bolt'],speed:1.0,damage:1.18,hp:1.18},
    {id:'frozen-titan',name:'تایتان یخ',subtitle:'آخرین قول زمستان',style:'titan',color:'#a8eaff',attacks:['slam','pulse','charge'],speed:.82,damage:1.3,hp:1.35},
    {id:'pale-huntress',name:'شکارچی رنگ‌پریده',subtitle:'ردیاب خاطرات گمشده',style:'huntress',color:'#d9edff',attacks:['bolt','charge','bolt'],speed:1.7,damage:1.0,hp:1.05},
    {id:'flame-devourer',name:'بلعنده‌ی شعله',subtitle:'قلب کوره‌ی ممنوع',style:'flame',color:'#ff9a56',attacks:['pulse','charge','slam'],speed:1.15,damage:1.25,hp:1.28},
    {id:'iron-matriarch',name:'مادرآهن',subtitle:'معمار زنجیرهای آسمان',style:'iron',color:'#dfb27b',attacks:['slam','bolt','pulse'],speed:.95,damage:1.22,hp:1.34},
    {id:'abyssal-queen',name:'ملکه‌ی اعماق',subtitle:'فرمانروای تالار غرق‌شده',style:'queen',color:'#74d9cd',attacks:['bolt','pulse','charge'],speed:1.15,damage:1.18,hp:1.3},
    {id:'drowned-king',name:'شاه غرق‌شده',subtitle:'تاج‌دار شهر خاموش',style:'king',color:'#78bfc8',attacks:['slam','bolt','charge'],speed:1.05,damage:1.22,hp:1.35},
    {id:'forgotten-god',name:'خدای فراموش‌شده',subtitle:'آن‌که پیش از نام‌ها بود',style:'god',color:'#dba8ff',attacks:['pulse','slam','bolt'],speed:1.0,damage:1.4,hp:1.75},
    {id:'void-emperor',name:'امپراتور خلأ',subtitle:'پادشاهی که نام نداشت',style:'void',color:'#f0bbff',attacks:['charge','pulse','bolt'],speed:1.35,damage:1.5,hp:1.9}
  ];
  const stageTitles = [
    'دروازه‌ی سیاه','روستای آخرین اخگر','باغ نخ‌های سرخ','ریشه‌های نام‌ها','صومعه‌ی کلاغ‌ها','شکست تاج سقوط‌کرده',
    'راهپیمایی خاکستر','برج ناقوس بی‌زبان','شبستان بی‌سرود','دندان‌های زائر','محاکمه‌ی سرخ','قلب کلیسای خاکستر',
    'جاده‌ی سفید','صومعه‌ی بادشکافته','بایگانی یخ','یخچال استخوان','آخرین شکار زمستان','تاج سکوت',
    'جاده‌ی کوره','کارگاه زنجیر طلایی','مخزن اخگر','کلیسای چرخ‌دنده','شکاف گدازه','قلب آهنین',
    'گذرگاه غرق‌شده','دربار زیر آب','کلیسای نمک','مروارید سیاه','آینه‌ی جزر','تاج مدفون',
    'بازار بی‌سایه','تالار آینه‌ی سیاه','کشتی سرافیم','ویرانه‌ی آسمان','پرتگاه فراموش‌شده','تخت آن‌سوی نام'
  ];
  const bossByStage = new Map();
  for (let act=0; act<6; act++) {
    bossByStage.set(act*6+2, majorBosses[act*2]);
    bossByStage.set(act*6+5, majorBosses[act*2+1]);
  }
  const regionPath = [0,0,1,1,1,0, 2,2,2,3,3,2, 3,3,3,4,4,3, 4,4,4,5,5,4, 5,5,6,6,6,5, 6,7,7,7,8,9];
  const missionTypes = ['purge','relic','mechanism','rescue','survive','hunt'];
  const missionLabels = {
    purge:{name:'پاک‌سازی مسیر',objective:'نگهبانان منطقه را شکست بده',target:5},
    relic:{name:'بازیابی خاطره',objective:'تکه‌های خاطره‌ی پراکنده را جمع‌آوری کن',target:4},
    mechanism:{name:'فعال‌سازی مُهر',objective:'سه سازوکار باستانی را فعال کن',target:3},
    rescue:{name:'نجات بازماندگان',objective:'بازماندگان گمشده را پیدا و آزاد کن',target:3},
    survive:{name:'پایداری در طوفان',objective:'در برابر موج‌های دشمن دوام بیاور',target:80},
    hunt:{name:'شکار نگهبان',objective:'ردّ نگهبان اصلی را دنبال کن و شکستش بده',target:1}
  };
  const regionalWarden = ['سردسته‌ی زره‌پوش','گرگ ریشه‌خوار','شماس بی‌چهره','نگهبان یخ‌زده','ماشین زنجیردار','شکارچی مروارید','سایه‌ی دوقلو','فرشته‌ی بی‌بال','نگهبان سنگی','پیک خلأ'];
  const stageDefs = stageTitles.map((title, i) => {
    const actIndex = Math.floor(i/6), region = regions[regionPath[i]], local = i%6;
    const type = missionTypes[local];
    const mission = missionLabels[type];
    const majorBoss = bossByStage.get(i) || null;
    const pattern = [0,1,2,3,4,5][local];
    const hazardTypes = ['ash','thorn','cinder','frost','lava','tide','shadow','light','void','void'];
    const sideQuestIds = [actIndex*3,actIndex*3+1,actIndex*3+2];
    const layoutPatterns=['pincer','staggered','ambush','relay','gauntlet','boss-approach'];
    const routeShift=((actIndex%3)-1)*34+(regionPath[i]%4)*9;
    const pickupXs=[520,1120,1660,2320].map((x,j)=>Math.max(300,Math.min(2680,x+routeShift+((i*23+j*31)%75)-37)));
    const interactX=[660,1420,2180].map((x,j)=>Math.max(420,Math.min(2520,x+routeShift+((i*19+j*13)%45)-22)));
    const sidePickupXs=[780,1480,2280].map((x,j)=>Math.max(350,Math.min(2700,x+((i*37+j*29)%85)-42)));
    const checkpointXs=[920+routeShift,1880-routeShift];
    const hazardZones=(local===1||local===4)?[{x:620+((i*83)%520),w:140+((i*17)%70)},{x:1710+((i*71)%430),w:150+((i*13)%80)}]:[];
    return {
      id:`stage-${String(i+1).padStart(2,'0')}`, index:i, name:title, sub:`نشان ${String(i+1).padStart(2,'0')}`, desc:`${region.name} — ${mission.name}. ${region.description}`,
      actIndex, actName:acts[actIndex].name, actSubtitle:acts[actIndex].subtitle, regionId:region.id, regionName:region.name,
      style:region.style, color:region.color, accent:region.accent, hazard: (local===1||local===4)?hazardTypes[regionPath[i]]:'none', ambient:region.ambient,
      missionType:type, missionName:mission.name, objective:mission.objective, objectiveTarget:type==='survive'?mission.target+actIndex*10:mission.target+Math.floor(actIndex*.5),
      rewardCoins:65+i*7, rewardXp:95+i*12, enemyCount:6+(local%3)+actIndex, encounterPattern:pattern, layoutPattern:layoutPatterns[local], formationOffset:(i*53)%180,
      boss:majorBoss ? majorBoss.name : regionalWarden[regionPath[i]], bossTitle:majorBoss ? majorBoss.subtitle : 'نگهبان مسیر مُهر',
      bossMajor:!!majorBoss, bossProfile:majorBoss || {id:`warden-${region.id}`,name:regionalWarden[regionPath[i]],style:'warden',color:region.accent,attacks:local%2?['slam','bolt','charge']:['charge','slam','bolt'],speed:1+actIndex*.035,damage:1+actIndex*.04,hp:1+actIndex*.07},
      layoutSeed:(i+3)*7919, sideQuestIds, checkpointXs, interactX, pickupXs, sidePickupXs, secretX:2470+((i*43)%210), loreX:1120+((i*73)%170), sideMechanismX:1540+((i*47)%105), hazardZones,
      regionIndex:regionPath[i], regionDescription:region.description, backgroundIndex:regionPath[i]%5
    };
  });
  const sideQuests = [
    ['آوای سرباز گمشده','سربازی را در گذرگاه سیاه پیدا کن','با یادآوری نام او، راه روستا را باز کن.'],['آخرین نان روستا','سه نشان آذوقه را بازیابی کن','بازماندگان هنوز در خانه‌های سوخته پناه گرفته‌اند.'],['ریشه‌ی بی‌نام','نگهبان ریشه‌خوار را شکست بده','ریشه‌ها به نام کسی پاسخ می‌دهند که فراموش شده است.'],
    ['شیشه‌های اعتراف','سه شیشه‌ی نام را جمع کن','کاهنان حقیقت را در محراب‌های کوچک پنهان کرده‌اند.'],['ناقوس پنجم','سازوکار ناقوس را فعال کن','صدای پنجم مسیر پنهان را نمایان می‌کند.'],['اعتراف اسقف','اسقف نگهبان را شکست بده','بخشی از پرونده‌ی شورای آسمان را به دست بیاور.'],
    ['قول زیر یخ','تکه‌های خاطره را جمع کن','صدای کودکی از زیر دریاچه می‌آید.'],['ردّ شکارچی','شکارچی رنگ‌پریده را شکست بده','او نام آخرین شاهد را می‌داند.'],['شعله‌ی بی‌دود','آتشدان‌های خاموش را روشن کن','در کوره هنوز یک خاطره زنده است.'],
    ['قلب آهنگر','سه چرخ‌دنده‌ی یادبود را فعال کن','ماشین‌ها هنوز برای کسی کار می‌کنند.'],['مادر زنجیرها','مادرآهن را شکست بده','نقشه‌ی دستگاه را از سینه‌ی فولادی‌اش بردار.'],['آب‌نوشته','سه لوح غرق‌شده را بخوان','این نوشته‌ها پیش از نخستین هاله حک شده‌اند.'],
    ['تاج مرواریدی','ملکه‌ی اعماق را شکست بده','تاج او کلید عبور به شهر سایه‌هاست.'],['نام در آینه','تکه‌های آینه را جمع کن','هر تکه یک خاطره‌ی متفاوت از سِرا نشان می‌دهد.'],['راهروی بی‌صدا','از موج سایه‌ها جان سالم به در ببر','در اینجا هر صدایی جای تو را آشکار می‌کند.'],
    ['بال شکسته','فرشته‌ی نگهبان را شکست بده','او روزی هم‌پیمان سِرا بوده است.'],['دفتر پیش از خلقت','اسناد پرتگاه را پیدا کن','نخستین نام در این دفتر نوشته شده است.'],['آخرین کاتب','امپراتور خلأ را شکست بده','اِیرِن تنها یک جمله‌ی دیگر برای گفتن دارد.']
  ].map((q,i)=>({id:`side-${i+1}`,title:q[0],description:q[1],lore:q[2],actIndex:Math.floor(i/3),stageIndex:[1,2,4,7,9,11,13,14,16,19,20,22,24,26,28,31,34,35][i],type:['kill','collect','boss','mechanism','collect','boss','collect','boss','mechanism','mechanism','boss','collect','boss','collect','survive','boss','collect','boss'][i],target:['collect','collect'].includes(['kill','collect','boss','mechanism','collect','boss','collect','boss','mechanism','mechanism','boss','collect','boss','collect','survive','boss','collect','boss'][i])?3:1,rewardCoins:90+i*12,rewardXp:140+i*18,rewardItem:i%4===0?'relic':null}));
  window.ASHEN_CAMPAIGN = {regions, acts, majorBosses, stageDefs, sideQuests};
})();
