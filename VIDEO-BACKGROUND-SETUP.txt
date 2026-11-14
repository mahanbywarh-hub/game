ASHEN HALO — VIDEO BACKGROUND SETUP (v1.6)

1) Replace these three code files in your existing project:
   - index.html
   - game.js
   - style.css

2) Keep your existing assets folder. Do not replace or delete its character,
   enemy, boss, weapon, campaign, or image files.

3) Create this folder if it does not already exist:
   assets/backgrounds/

4) Put your video here, with this exact filename:
   assets/backgrounds/gameplay-loop.mp4

5) The video is muted, autoplayed, looped, and drawn behind the ground,
   enemies, boss, player, HUD effects, and other foreground elements.

Recommended video:
   - MP4 with H.264 video encoding
   - 1920x880 or 1920x1080
   - 24–30 FPS
   - A seamless loop (the end should connect naturally to the beginning)
   - No important text near the edges because the video is cropped to fill
     the wide gameplay canvas.

Autoplay note:
   Browsers generally allow autoplay when the video is muted. If a browser
   delays playback, opening the game or pressing Start retries playback.
   If the file is missing or cannot be decoded, the previous image/canvas
   background is used automatically.

Per-stage video option:
   In game.js, find GAMEPLAY_VIDEO_CONFIG near the top. You can add entries
   to stageSources using zero-based stage indexes, for example:
     stageSources: {
       0: 'assets/backgrounds/forest-loop.mp4',
       1: 'assets/backgrounds/cathedral-loop.mp4'
     }
   Stages without an entry use gameplay-loop.mp4.
