ASHEN HALO — ENGLISH PROFILE UPDATE
===================================

INSTALLATION
1. Back up your current project folder first.
2. Extract this archive.
3. Open the extracted folder named "a".
4. Copy its contents (index.html, style.css, game.js, ASSET-GUIDE.html, and assets/) into your current game folder.
5. Allow the assets folder to merge with the existing assets folder and replace files when prompted.
6. Open index.html or run a local server from this folder.

WINDOWS LOCAL SERVER (recommended)
- Open the project folder in File Explorer.
- Click the address bar, type cmd, and press Enter.
- Run: python -m http.server 8000
- Open: http://localhost:8000

NEW FEATURES
- English interface and campaign names.
- Gothic-styled Hero Profile panel in the top bar.
- Live profile values: hero name, level, XP, coins, cleared missions, defeated enemies, boss victories, current act/stage, equipped weapon, owned weapon count and play time.
- Profile values are read from the game's existing local save data; no separate profile save is created.

SAVE DATA
The game continues using its existing browser localStorage keys. Do not clear browser site data if you want to keep your progress. Back up the browser profile or export your localStorage values before clearing data.

NOTES
- Existing gameplay systems and asset paths are retained.
- English localization is applied to menus, campaign names, common combat messages and dynamically rendered UI. Unmapped Persian narrative fragments use a short English fallback rather than displaying Persian text.
- The profile panel is responsive and uses the game's dark crimson/gothic visual theme.
