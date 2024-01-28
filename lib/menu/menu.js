const { ucapanWaktu } = require("../assets/func");
const { ownerMenu, otherMenu, convertMenu, mainMenu, downMenu, searchMenu, groupMenu } = require('./listMenu');
const fs = require('fs');
const chalk = require('chalk');

exports.menu = (m) => {
  const menuText = `*OWNER MENU*
${generateMenuList(ownerMenu)}

*DOWN MENU*
${generateMenuList(downMenu)}

*GROUP MENU*
${generateMenuList(groupMenu)}

*SEARCH MENU*
${generateMenuList(searchMenu)}

*MAIN MENU*
${generateMenuList(mainMenu)}

*CONVERT MENU*
${generateMenuList(convertMenu)}

*OTHER MENU*
${generateMenuList(otherMenu)}

${footer}`;

  return menuText;
};

const generateMenuList = (featureArray) => {
  return featureArray.map((feature, index) => {
    return `${index + 1}. *.${feature.command}*`;
  }).join('\n');
};

const handleFileUpdate = () => {
  const file = require.resolve(__filename);
  fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update '${__filename}'`));
    delete require.cache[file];
    require(file);
  });
};

handleFileUpdate();