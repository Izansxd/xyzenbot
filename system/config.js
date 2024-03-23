const fs = require("fs");
const chalk = require("chalk");

/* 
    * Settings Creator And Premium Users Default
*/
global.ownernumber = "6282298627146"; // Owner Utama
global.namebot = "ZEE - MULTI DEVICE" // Name Bot
global.owner = ["6282298627146"].map((v) => v.toString()); // Owner Lain
global.premium = ["6282298627146", "6282298627146", "6282298627146", "6282298627146"].map((v) => v.toString()); // Premium

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
global.packname = "ZEE - MULTI DEVICE"
global.author = "082298627146"
global.footer = 'Created By Izans'
global.hostAPI = "https://api.xyzen.tech"

/*
    * REQUIRED APIKEY 
*/

global.api = {
  lol: "-",
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
global.thumbailUrl = "https://telegra.ph/file/a3705dcdeb526d539cbaa.jpg";
global.thumb = fs.readFileSync('./src/media/thumbnail.png');
global.urlgc = "https://chat.whatsapp.com/BQdnlFfs5cXIA1pxWY1cSH";
global.url = "https://api.xyzen.tech"

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update'${__filename}'`));
  delete require.cache[file];
  require(file);
});
