ASHEN HALO — MUSIC FOLDER
=========================

Put the game's soundtrack files in this folder. Supported formats: MP3, OGG, WAV, M4A, AAC and FLAC (browser support varies).

IMPORTANT: The game does not scan folders automatically because a static browser game cannot safely enumerate server folders. The in-game selector is a whitelist. To publish a song in the profile player, add an entry to playlist.js using the exact filename.

Example:
window.ASHEN_LOBBY_TRACKS = [
  { id: 'theme-01', name: 'Main Theme', src: 'music/main-theme.mp3' },
  { id: 'theme-02', name: 'Sanctuary', src: 'music/sanctuary.ogg' }
];

Only entries in playlist.js are visible to players. There is no file-upload button in the game. Selected songs repeat continuously until the player chooses another track or pauses the music.
