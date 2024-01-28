const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');

async function xyzenAPIs(endpoint) {
    try {
        const res = await axios.get(hostAPI + endpoint)
        return res.data
    } catch (err) {
        console.log(err);
        return err
    }
}

async function lolAPIs(endpoint) {
    try {
        const res = await axios.get('https://api.lolhuman.xyz' + endpoint)
        return res.data
    } catch (err) {
        console.log(err);
        return err
    }
}

module.exports = { xyzenAPIs, lolAPIs }

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update '${__filename}'`));
  delete require.cache[file];
  require(file);
});