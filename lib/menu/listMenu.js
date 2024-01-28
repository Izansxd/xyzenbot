const fs = require('fs');
const chalk = require('chalk');

const ownerMenu = [
    { command: 'getsesi' },
    { command: 'ambilsesi' },
    { command: 'delsesi' },
    { command: 'setppbot' },
    { command: 'broadcast' },
    { command: 'broadcastgroup' },
    { command: 'mode' }
];

const downMenu = [
  { command: 'ttdl' },
  { command: 'igdl' },
  { command: 'ytmp4' },
  { command: 'ytmp3' },
]

const groupMenu = [
  { command: 'afk'},
  { command: 'closetime'},
  { command: 'opentime'},
  { command: 'kick'},
  { command: 'add'},
  { command: 'promote'},
  { command: 'demote'},
  { command: 'tagall'},
  { command: 'listonline'},
  { command: 'hidetag'},
]
const mainMenu = [
  { command: 'menu' },
  { command: 'ping' },
  { command: 'runtime' },
  { command: 'creator' },
  { command: 'botstatus' }
]

const searchMenu = [
  { command : 'ytsearch' }
]

const convertMenu = [
  { command: 'sticker' },
  { command: 'smeme' },
  { command: 'take' },
  { command: 'toimage' },
  { command: 'tovideo' },
  { command: 'toaudio' },
  { command: 'emojimix' },
  { command: 'emojimix2' },
]

const otherMenu = [
    { command: 'upscale' },
    { command: 'removebg' },
    { command: 'quote' }
];

module.exports = { ownerMenu, downMenu, mainMenu, searchMenu, convertMenu, otherMenu, groupMenu }

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update '${__filename}'`));
  delete require.cache[file];
  require(file);
});