const fs = require("fs");
const chalk = require("chalk");

/* 
    * Settings Creator And Premium Users Default
*/
global.ownernumber = "6289513081052"; // Owner Utama
global.namebot = "NAISA - MULTI DEVICE" // Name Bot
global.owner = ["6289513081052"].map((v) => v.toString()); // Owner Lain
global.premium = ["6289513081052", "6283820726489", "6285852460073", "6283152328672"].map((v) => v.toString()); // Premium

/*
    * SETTINGS BOT
*/
global.options = {
    read: true,
    public: true,
    readsw: true,
    block212: true,
    onlyindo: true
}
global.typemenu = 1
global.packname = "NAISA - MULTI DEVICE"
global.author = "083838530788"
global.footer = 'Created By Adrian'
global.hostAPI = "https://api.xyzen.tech"

/*
    * REQUIRED APIKEY 
*/

global.api = {
  lol: "YoshCasaster",
  xyz: "xyzen"
};

/*
    * DEFAULT LIMIT USER
*/
global.limit = {
  free: 20,
  prem: 1000,
};

/*
    * DEFAULT MESS
*/
global.mess = {
  error: {
    api: "*Maaf Fitur Error, Atau Apikey Salah Atai Limit API Abis*",
    error: "*Fitur Sedang Error*",
    url: "*Link atau Url Salah Atau invalid",
  },
  need: {
    url: "*Kirim Url Dengan Benar*",
    image: "*Kirim Sebuah Foto*",
    video: "*Kirim Sebuah Video*",
    sticker: "*Kirim Sebuah Sticker*",
    audio: "*Kirim Sebuah Audio*",
    q: 'Kirim Query'
  },
  only: {
    group: "*Fitur ini khusus di group*",
    private: "*Fitur Ini khusus di private chat*",
    owner: "*Fitur Khusus Owner*",
    prem: "*Fitur Khusus Premium User*",
  },
  done: "*Done!*",
  wait: "*Tunggu Sebentar*",
};

/*
    * IMAGE & THUMBNAIL & URL
*/
global.thumbailUrl = "https://telegra.ph/file/2c23f25c021c440a1db56.jpg";
global.thumb = fs.readFileSync('./src/media/thumbnail.png');
global.urlgc = "https://chat.whatsapp.com/JANxc87ZwSoDkrvo8ltLz7";
global.url = "https://api.xyzen.tech"

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update'${__filename}'`));
  delete require.cache[file];
  require(file);
});
