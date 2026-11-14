/*
  ASHEN HALO — FILE-BASED ART CONFIGURATION
  Replace the PNG files in the listed folders to change the art in-game.
  Keep filenames frame_00.png, frame_01.png, ... and update count if you add frames.
*/
window.ASHEN_ASSETS = {
  player: {
    fallback: 'assets/characters/player/idle/frame_00.png',
    animations: {
      idle:   { folder: 'assets/characters/player/idle',   count: 4, fps: 5 },
      walk:   { folder: 'assets/characters/player/walk',   count: 8, fps: 9 },
      run:    { folder: 'assets/characters/player/run',    count: 8, fps: 12 },
      jump:   { folder: 'assets/characters/player/jump',   count: 3, fps: 8 },
      dash:   { folder: 'assets/characters/player/slide', count: 3, fps: 18 },
      dodge:  { folder: 'assets/characters/player/dodge', count: 3, fps: 15 },
      attack: { folder: 'assets/characters/player/attack-showcase', count: 7, fps: 16 }
    }
  },
  /* Order matches the five weapons in the game's forge/shop. */
  weapons: [
    { id: 'ash-blade',       folder: 'assets/weapons/ash-blade/frames',       count: 6, fps: 18 },
    { id: 'ember-blade',     folder: 'assets/weapons/ember-blade/frames',     count: 6, fps: 18 },
    { id: 'blood-scythe',    folder: 'assets/weapons/blood-scythe/frames',    count: 6, fps: 18 },
    { id: 'lightning-blade', folder: 'assets/weapons/lightning-blade/frames', count: 6, fps: 20 },
    { id: 'halo-breaker',    folder: 'assets/weapons/halo-breaker/frames',    count: 6, fps: 16 }
  ],
  weaponSprites: [
    'assets/weapons/generated-swords/sword_00.png',
    'assets/weapons/generated-swords/sword_03.png',
    'assets/weapons/generated-swords/sword_04.png',
    'assets/weapons/generated-swords/sword_01.png',
    'assets/weapons/generated-swords/sword_06.png'
  ],
  effects: {
    'red-slash':   { folder: 'assets/effects/red-slash', count: 5, fps: 18 },
    'red-strike':  { folder: 'assets/effects/red-strike', count: 5, fps: 18 },
    'ice-wave':    { folder: 'assets/effects/ice-wave', count: 5, fps: 16 },
    'void-bolt':   { folder: 'assets/effects/void-bolt', count: 5, fps: 18 },
    'fire-burst':  { folder: 'assets/effects/fire-burst', count: 5, fps: 16 },
    'impact-spark':{ folder: 'assets/effects/impact-spark', count: 4, fps: 20 },
    'ultimate':    { folder: 'assets/effects/ultimate', count: 7, fps: 14 }
  },
  bossRoster: [
    'assets/bosses/roster/01-ash-brute.png',
    'assets/bosses/roster/02-blood-bishop.png',
    'assets/bosses/roster/03-fallen-seraph.png',
    'assets/bosses/roster/04-frost-beast.png',
    'assets/bosses/roster/05-void-reaper.png',
    'assets/bosses/roster/06-ember-dragon.png',
    'assets/bosses/roster/07-crimson-duelist.png',
    'assets/bosses/roster/08-horned-demon.png',
    'assets/bosses/roster/09-spectral-knight.png',
    'assets/bosses/roster/10-spider-queen.png',
    'assets/bosses/roster/11-feathered-nightmare.png',
    'assets/bosses/roster/12-final-seraph.png'
  ],
  backgrounds: [
    'assets/backgrounds/01-ash-forest.png',
    'assets/backgrounds/02-red-church.png',
    'assets/backgrounds/03-frozen-peak.png',
    'assets/backgrounds/04-cursed-foundry.png',
    'assets/backgrounds/05-empty-throne.png'
  ],
  bosses: [
    'assets/bosses/guardian.png',
    'assets/bosses/bishop.png',
    'assets/bosses/titan.png',
    'assets/bosses/spider-king.png',
    'assets/bosses/void-emperor.png'
  ],
  background: {
    /* 0 = no dark filter, 0.25 = darker. Keep around 0.08–0.20. */
    darkness: 0.12,
    /* Horizontal movement of the background while camera moves: 0.0–1.0 */
    parallax: 0.18
  }
};
