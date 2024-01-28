require("./config");
const os = require("os");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const ytdl = require('ytdl-core')
const { exec } = require("child_process");
const { performance } = require("perf_hooks");
const { v4: uuidv4 } = require('uuid');
const speed = require('performance-now')
const moment = require("moment-timezone");
const cron = require('node-cron');
const { toAudio, toPTT, toVideo, ffmpeg, webp2mp4file } = require('../lib/assets/converts.js')
const { sleep,getGroupAdmins,runtime,ucapanWaktu,formatp,getRandom, uploader,generateProfilePicture,Tmp, clockString } = require("../lib/assets/func.js");
const { getTrack, getArtist, downloadTrack, getPlaylist, downloadPlaylist, getAlbum} = require('../src/scapers/spotify');
const { xyzenAPIs, lolAPIs } = require("../lib/assets/api.js");
const { removebg } = require("../src/scapers/removebg.js");
const { generateWAMessage, areJidsSameUser, proto } = require("@whiskeysockets/baileys");

const today = moment.tz("Asia/Jakarta").format("dddd, DD MMMM YYYY");

global.db.data = JSON.parse(fs.readFileSync('./src/database.json'))
if (global.db.data) global.db.data = {
    users: {},
    game: {},
    others: {},
    marga: {},
    ...(global.db.data || {})
}

const tebaklagu = db.data.game.tebaklagu = []
const family100 = db.data.game.family100 = []
const kuismath = db.data.game.math = []
const tebakgambar = db.data.game.tebakgambar = []
const tebakkata = db.data.game.tebakkata = []
const caklontong = db.data.game.lontong = []
const caklontong_desk = db.data.game.lontong_desk = []
const tebakkalimat = db.data.game.kalimat = []
const tebaklirik = db.data.game.lirik = []
const tebaktebakan = db.data.game.tebakan = []
const tebakbendera = db.data.game.bendera = []
const tebakbendera2 = db.data.game.bendera2 = []
const tebakkabupaten = db.data.game.kabupaten = []
const tebakkimia = db.data.game.kimia = []
const tebakasahotak = db.data.game.asahotak = []
const tebaksiapakahaku = db.data.game.siapakahaku = []
const tebaksusunkata = db.data.game.susunkata = []
const tebaktekateki = db.data.game.tekateki = []

const vote = db.data.others.vote = []
const hitTotal = db.data.others.hitTotal = 0

module.exports = client = async (client, m, chatUpdate, store) => {
    try {
        const {
            chat,
            pushName,
            sender,
            type,
            reply
        } = m;
        const body = m.mtype === "conversation" ? m.message.conversation : m.mtype == "imageMessage" ? m.message.imageMessage.caption : m.mtype == "videoMessage" ? m.message.videoMessage.caption : m.mtype == "extendedTextMessage" ? m.message.extendedTextMessage.text : " ";
        const budy = typeof m.text == "string" ? m.text : "";
        const prefix = /^#.¦|\\^/.test(body) ? body.match(/^#.¦|\\^/gi) : ".";
        const isCmd = body.startsWith(prefix);
        const botNumber = await client.decodeJid(client.user.id);
        const isCommand = isCmd ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : "";
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1);
        const quoted = m.quoted ? m.quoted : "";
        const mime = (quoted.msg || quoted).mimetype || "";
        const qmsg = quoted.msg || quoted;
        const text = (q = args.join(" "));
        const xyz = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        const isMedia = /image|video|sticker|audio/.test(mime);
        const isImage = (type == 'imageMessage')
        const isVideo = (type == 'videoMessage')
        const isAudio = (type == 'audioMessage')
        const isText = (type == 'textMessage')
        const isSticker = (type == 'stickerMessage')
        const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage')
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')

        // GROUP
        const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
        const groupName = m.isGroup ? groupMetadata.subject : "";
        const participants = m.isGroup ? await groupMetadata.participants : "";
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
        const groupOwner = m.isGroup ? groupMetadata.owner : "";
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false;


        const theCreator = [global.ownernumber, ...global.owner].map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender);
        const isPremium = theCreator || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)

        if (!client.public) {
            if (isPremium || !m.key.fromMe || theCreator);
        }

        if (options.read) {
            await sleep(1500)
            client.readMessages([m.key])
        }

        if (options.block212) {
            if (sender.startsWith('212')) return client.updateBlockStatus(sender, 'block')
        }

        if (options.onlyindo) {
            if (!sender.startsWith('62')) return client.updateBlockStatus(sender, 'block')
        }

        if (chatUpdate['messages.upsert']) {
            const upsert = chatUpdate['messages.upsert']
            for (let msg of upsert.messages) {
                if (msg.key.remoteJid == 'status@broadcast' && !msg.key.fromMe && !msg.message?.protocolMessage) {
                    console.log(`Lihat status ${msg.pushName} ${msg.key.participant.split('@')[0]}\n`)
                    client.readMessages([msg.key])
                }
            }
        }

        if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.data.others.sticker)) {
            let hash = global.db.data.others.sticker[m.msg.fileSha256.toString('base64')]
            let {
                text,
                mentionedJid
            } = hash
            let messages = await generateWAMessage(m.chat, {
                text: text,
                mentions: mentionedJid
            }, {
                userJid: client.user.id,
                quoted: m.quoted && m.quoted.fakeObj
            })
            messages.key.fromMe = areJidsSameUser(m.sender, client.user.id)
            messages.key.id = m.key.id
            messages.pushName = m.pushName
            if (m.isGroup) messages.participant = m.sender
            let msg = {
                ...chatUpdate,
                messages: [proto.WebMessageInfo.fromObject(messages)],
                type: 'append'
            }
            client.ev.emit('messages.upsert', msg)
        }

        try {
            const isNumber = x => typeof x === 'number' && !isNaN(x)
            const limitUser = isPremium ? global.limit.prem : global.limit.free
            const user = global.db.data.users[m.sender]
            if (typeof user !== 'object') global.db.data.users[m.sender] = {}
            if (user) {
                if (!('_id' in user)) user._id = uuidv4()
                if (!isNumber(user.afkTime)) user.afkTime = -1
                if (!('afkReason' in user)) user.afkReason = ''
                if (!isNumber(user.limit)) user.limit = limitUser
            } else global.db.data.users[m.sender] = {
                _id: uuidv4(),
                afkTime: -1,
                afkReason: '',
                limit: limitUser,
            }

        } catch (err) {
            console.log(err)
        }

        cron.schedule('00 12 * * *', () => {
            let user = Object.keys(global.db.data.users)
            let limitUser = isPremium ? global.limit.prem : global.limit.free
            for (let jid of user) global.db.data.users[jid].limit = limitUser
            console.log('Reseted Limit')
        }, {
            scheduled: true,
            timezone: "Asia/Jakarta"
        })

        const ytmp3 = async (Link) => {
            try {
                await ytdl.getInfo(Link)
                let mp3File = Tmp('.mp3')
                const a = await ytdl(Link, {
                        filter: 'audioonly'
                    })
                    .pipe(fs.createWriteStream(mp3File))
                    .on('finish', async () => {
                        await client.sendMessage(m.chat, {
                            audio: fs.readFileSync(mp3File),
                            mimetype: 'audio/mp4'
                        }, {
                            quoted: m
                        })
                    })
                return a
            } catch (err) {
                reply(`${err}`)
            }
        }

        const ytmp4 = async (Link) => {
            try {
                await ytdl.getInfo(Link)
                let mp4File = Tmp('.mp4')
                const a = await ytdl(Link)
                    .pipe(fs.createWriteStream(mp4File))
                    .on('finish', async () => {
                        await client.sendMessage(m.chat, {
                            video: fs.readFileSync(mp4File),
                            caption: mess.done
                        }, {
                            quoted: m
                        })
                    })
                return a
            } catch (err) {
                m.reply(`${err}`)
            }
        }

        const xyzen = {
            key: {
                fromMe: !1,
                participant: "0@s.whatsapp.net",
                ...m.chat ? {
                    remoteJid: "status@broadcast"
                } : {}
            },
            message: {
                imageMessage: {
                    url: "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                    mimetype: "image/jpeg",
                    caption: namebot,
                    fileSha256: "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                    fileLength: "28777",
                    height: 1080,
                    width: 1079,
                    mediaKey: "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                    fileEncSha256: "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                    directPath: "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                    mediaKeyTimestamp: "1610993486",
                    jpegThumbnail: await client.reSize(thumb, 100, 100),
                    scansSidecar: "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                }
            }
        };


        if (budy) {
            console.log(
                chalk.cyan.bold(` FROM: ${client.getName(sender)} | ${sender.split('@')[0]}\n`),
                chalk.cyan.bold(`IN: ${m.isGroup ? groupMetadata.subject : client.getName(sender)} \n`),
                chalk.yellow.bold(`MESSAGE: ${budy || m.mtype}\n`),
                chalk.green.bold(`DATE : ${today}`),
            );
        }

        let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];

        for (let jid of mentionUser) {
            let user = global.db.data.users[jid];
            if (!user) continue;

            let afkTime = user.afkTime;
            if (!afkTime || afkTime < 0) continue;

            let reason = user.afkReason || '';
            let duration = clockString(new Date() - afkTime);

            m.reply(`❗ Jangan tag dia! Dia sedang AFK ${reason ? 'dengan alasan ' + reason : 'tanpa alasan'} Selama ${duration}`);
        }

        if (db.data.users[m.sender].afkTime > -1) {
            let user = global.db.data.users[m.sender];
            let duration = clockString(new Date() - user.afkTime);

            m.reply(`✅ Kamu berhenti AFK${user.afkReason ? ' setelah ' + user.afkReason : ''} Selama ${duration}`);
            user.afkTime = -1;
            user.afkReason = '';
        }

        switch (command) {
            case 'bcgc': 
            case 'bcgroup':
            case 'broadcastgroup': {
                if (!theCreator) return reply(mess.only.owner)
                if (!text) return reply('Text mana?')

                let getGroups = await client.groupFetchAllParticipating()
                let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
                let anu = groups.map(v => v.id)

                const broadcastMessage = `📢 Broadcast to Chats 📱\n\n${text}\n\n\nID BROADCAST: ${uuidv4}`;

                reply(`Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${anu.length * 1.5} detik`);
                
                for (let i of anu) {
                    await sleep(1500)
                    client.sendText(i, 'mono', broadcastMessage, xyzen)
                }

                reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group 🎉`);
            }
            break;

            case 'bc': 
            case 'broadcast': 
            case 'bcall': {
                if (!theCreator) return reply(mess.only.owner)
                if (!text) return reply('Text mana?')

                const allChats = await store.chats.all().map(v => v.id);
                const broadcastMessage = `📢 Broadcast to Chats 📱\n\n${text}\n\n\n\n\nID BROADCAST: ${uuidv4()}`;

                reply(`Mengirim Broadcast Ke ${allChats.length} Chat, Waktu Selesai ${allChats.length * 1.5} detik`);

                for (let i of allChats) {
                    await sleep(1500)
                    client.sendText(i, 'mono', broadcastMessage, xyzen)
                }

                reply('Sukses Broadcast 🎉');
            }
            break;

            case 'getsesi':
            case 'ambilsesi': {
                if (!theCreator) return reply(mess.only.owner);
                const a = await fs.readFileSync('./src/session/creds.json');
                await client.sendMessage(chat, {
                    document: a,
                    mimetype: 'application/json',
                    fileName: 'creds.json'
                }, {
                    quoted: m
                });
            }
            break;
            case 'delsesi': {
                if (!theCreator) return reply(mess.only.owner);
                await fs.readdir("./src/session", async function(err, files) {
                    if (err) {
                        console.log(err)
                        return reply('Gagal Scan File')
                    }
                    let file = await files.filter(item => item.startsWith('pre-key') || item.startsWith('sender-key') || item.startsWith('session-') || item.startsWith('app-state'))
                    await file.forEach(function(a) {
                        fs.unlinkSync(`./src/session/${a}`)
                    })
                })
                await sleep(2000)
                reply(mess.done)
            }
            break;
            case 'deltmp': {
                if (!theCreator) return reply(mess.only.owner);

                const tmpDir = './src/tmp';

                fs.readdir(tmpDir, async (err, files) => {
                    if (err) {
                        console.error(err);
                        return reply('Gagal Delete TMP');
                    }

                    const filesToDelete = files.filter(file => file !== '.nomedia');

                    for (const file of filesToDelete) {
                        fs.unlinkSync(`${tmpDir}/${file}`);
                    }

                    await sleep(2000);
                    reply(mess.done);
                });
            }
            break;
            case 'mode': {
                if (!theCreator) return reply(mess.only.owner)
                if (!args[0]) return reply('Public Or Self')
                if (args[0] === 'public') return global.options.public = true
                if (args[0] === 'self') return global.options.public = false
                await reply(mess.done)
            }
            break;
            case 'setpp':
            case 'setppbot': {
                if (!theCreator) return reply(mess.only.owner);
                if (!quoted) return reply(`Kirim/reply Image Dengan Caption ${prefix + command}`);
                if (!/image/.test(mime) || /webp/.test(mime)) return reply(`Kirim/reply Image Dengan Caption ${prefix + command}`);

                try {
                    const mediaPath = await client.downloadAndSaveMediaMessage(quoted, Tmp(''));
                    const isFull = args[0] === 'full';

                    if (isFull) {
                        const {
                            img
                        } = await generateProfilePicture(mediaPath);
                        await client.query({
                            tag: 'iq',
                            attrs: {
                                to: botNumber,
                                type: 'set',
                                xmlns: 'w:profile:picture'
                            },
                            content: [{
                                tag: 'picture',
                                attrs: {
                                    type: 'image'
                                },
                                content: img
                            }]
                        });
                    } else {
                        await client.updateProfilePicture(botNumber, {
                            url: mediaPath
                        });
                    }
                    reply(mess.done);
                } catch (error) {
                    console.error('Error:', error);
                    reply('Terjadi kesalahan saat menyetel foto profil.');
                }
            }
            break;

            /**
             *  GROUP MENU
             */
            case 'afk': {
                if (!m.isGroup) return reply(mess.only.group);
                const user = global.db.data.users[m.sender]
                user.afkTime = +new Date
                user.afkReason = text
                reply(`🚀 ${m.pushName} Telah Afk${text ? ': ' + text : ''} 🌙`);
            }
            break
            case 'closetime': {
                if (!m.isGroup) return reply(mess.only.group);
                if (!isAdmins && !theCreator) return reply(mess.only.admin);
                if (!isBotAdmins) return reply(mess.botAdmin);

                let timer;
                switch (args[1]) {
                    case 'detik':
                        timer = args[0] * 1000;
                        break;
                    case 'menit':
                        timer = args[0] * 60000;
                        break;
                    case 'jam':
                        timer = args[0] * 3600000;
                        break;
                    case 'hari':
                        timer = args[0] * 86400000;
                        break;
                    default:
                        return reply('*Pilih:*\ndetik\nmenit\njam\nhari\n\n*Contoh:*\n10 detik');
                }
                reply(`Grup akan ditutup selama ${args[0]} ${args[1]} dimulai dari sekarang`);
                setTimeout(() => {
                    const closeMessage = '*Tepat waktu!* Grup ditutup oleh admin.\nSekarang hanya admin yang dapat mengirim pesan.';
                    client.groupSettingUpdate(chat, 'announcement');
                    reply(closeMessage);
                }, timer);
            }
            break;
            case 'opentime': {
                if (!m.isGroup) return reply(mess.only.group);
                if (!isAdmins && !theCreator) return reply(mess.only.admin);
                if (!isBotAdmins) return reply(mess.botAdmin);

                let timer;
                switch (args[1]) {
                    case 'detik':
                        timer = args[0] * 1000;
                        break;
                    case 'menit':
                        timer = args[0] * 60000;
                        break;
                    case 'jam':
                        timer = args[0] * 3600000;
                        break;
                    case 'hari':
                        timer = args[0] * 86400000;
                        break;
                    default:
                        return reply('*Pilih:*\ndetik\nmenit\njam\nhari\n\n*Contoh:*\n10 detik');
                }

                reply(`Grup akan dibuka setelah ${args[0]} ${args[1]} dimulai dari sekarang`);
                setTimeout(() => {
                    const openMessage = '*Tepat waktu!* Grup dibuka oleh admin.\nSekarang semua member dapat mengirim pesan.';
                    client.groupSettingUpdate(m.chat, 'not_announcement');
                    reply(openMessage);
                }, timer);
            }
            break;
            case 'kick': {
                if (!m.isGroup) return reply(mess.only.group);
                if (!isAdmins && !isGroupOwner && !theCreator) return reply(mess.only.admin);
                if (!isBotAdmins) return reply(mess.botAdmin);
                const kickedUser = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                await client.groupParticipantsUpdate(m.chat, [kickedUser], 'remove')
                    .then(() => reply(mess.done))
                    .catch(() => reply(mess.error.general));
            }
            break;

            case 'add': {
                if (!m.isGroup) return reply(mess.only.group);
                if (!isAdmins && !isGroupOwner && !theCreator) return reply(mess.only.admin);
                if (!isBotAdmins) return reply(mess.botAdmin);
                let addUser = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                await client.groupParticipantsUpdate(m.chat, [addUser], 'add')
                    .then(() => reply(mess.done))
                    .catch(() => reply(mess.error.general));
            }
            break;

            case 'promote': {
                if (!m.isGroup) return reply(mess.only.group);
                if (!isAdmins && !isGroupOwner && !theCreator) return reply(mess.only.admin);
                if (!isBotAdmins) return reply(mess.botAdmin);
                let promoteUser = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                await client.groupParticipantsUpdate(m.chat, [promoteUser], 'promote')
                    .then(() => reply(mess.done))
                    .catch(() => reply(mess.error.general));
            }
            break;

            case 'demote': {
                if (!m.isGroup) return reply(mess.only.group);
                if (!isAdmins && !isGroupOwner && !theCreator) return reply(mess.only.admin);
                if (!isBotAdmins) return reply(mess.botAdmin);
                let demoteUser = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                await client.groupParticipantsUpdate(m.chat, [demoteUser], 'demote')
                    .then(() => reply(mess.done))
                    .catch(() => reply(mess.error.general));
            }
            break;

            case 'tagall': {
                if (!m.isGroup) return reply(mess.only.group);
                if (!isAdmins && !isGroupOwner && !theCreator) return reply(mess.only.admin);
                if (!isBotAdmins) return reply(mess.botAdmin);

                let teks = `🔔 *TAG FOR ADMIN* 🔔\n\n`;
                teks += `*MESSAGE:* ${q ? q : 'kosong'}\n\n`;

                for (let mem of participants) {
                    teks += `◈ @${mem.id.split('@')[0]}\n`;
                }

                await client.sendMessage(m.chat, {
                    text: teks,
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: m
                });
            }
            break;
            case 'hidetag':
                if (!m.isGroup) return reply(mess.only.group)
                if (!isAdmins && !isGroupOwner && !theCreator) return reply(mess.only.admin)
                if (!isBotAdmins) return reply(mess.botAdmin)
                client.sendMessage(m.chat, {
                    text: q ? q : '',
                    mentions: participants.map(a => a.id)
                }, {
                    quoted: xyzen
                })
            break;
            case 'listonline':
            case 'liston': {
                if (!m.isGroup) return m.reply(mess.only.group)
                if (!isAdmins && !isGroupOwner && !theCreator) return reply(mess.only.admin)
                let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
                let online = [...Object.keys(store.presences[id]), botNumber]
                client.sendText(m.chat, 'mono', `⏰ List Online:\n\n${online.map(v => '🌱 @' + v.replace(/@.+/, '')).join('\n')}`, m, { mentions: online });
            }
            break
                /**
                 *  MAIN MENU
                 */
            case 'menu': {
                const {
                    menu
                } = require('../lib/menu/menu.js');
                client.sendMessage(chat, {
                    video: fs.readFileSync('./src/media/menu.mp4'),
                    caption: menu(m),
                    gifPlayback: true,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        mentionedJid: [sender],
                        forwardedNewsletterMessageInfo: {
                            newsletterName: namebot,
                            newsletterJid: "120363182916458068@newsletter",
                        },
                        externalAdReply: {
                            showAdAttribution: true,
                            title: `${ucapanWaktu()} ${pushName}`,
                            body: '',
                            thumbnailUrl: thumbailUrl,
                            sourceUrl: url,
                            mediaType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }, {
                    quoted: xyzen
                })
            }
            break;
            case 'botstatus':
            case 'statusbot': {
                const used = process.memoryUsage();
                const cpus = os.cpus().map(cpu => {
                    cpu.total = Object.values(cpu.times).reduce((total, time) => total + time, 0);
                    return cpu;
                });

                const cpu = cpus.reduce((acc, curr) => {
                    acc.total += curr.total;
                    acc.speed += curr.speed / cpus.length;
                    Object.entries(curr.times).forEach(([type, time]) => acc.times[type] += time);
                    return acc;
                }, {
                    speed: 0,
                    total: 0,
                    times: {
                        user: 0,
                        nice: 0,
                        sys: 0,
                        idle: 0,
                        irq: 0
                    }
                });

                const timestamp = speed();
                const latensi = speed() - timestamp;
                const neww = performance.now();
                const oldd = performance.now();
                const respon = `Kecepatan Respon ${latensi.toFixed(4)} _Second_\n${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}\n\n💻 Info Server\nRAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}\n\n_NodeJS Memory Usage_\n${Object.entries(used).map(([key, value]) => `${key.padEnd(14)}: ${formatp(value)}`).join('\n')}\n${cpus[0] ? `_Total CPU Usage_\n${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.entries(cpu.times).map(([type, percentage]) => `- *${(type + '*').padEnd(6)}: ${(percentage / cpu.total * 100).toFixed(2)}%`).join('\n')}\n_CPU Core(s) Usage (${cpus.length} Core CPU)_\n${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.entries(cpu.times).map(([type, percentage]) => `- *${(type + '*').padEnd(6)}: ${(percentage / cpu.total * 100).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}`.trim();

                m.isGroup ?
                    client.relayMessage(chat, {
                        liveLocationMessage: {
                            degreesLatitude: 35.6895,
                            degreesLongitude: 139.6917,
                            caption: respon,
                            sequenceNumber: 1656662972682001,
                            timeOffset: 8600,
                            jpegThumbnail: thumb,
                            contextInfo: {
                                mentionedJid: [sender],
                                externalAdReply: {
                                    showAdAttribution: true
                                }
                            }
                        }
                    }, {
                        quoted: m
                    }) :
                    client.relayMessage(chat, {
                        requestPaymentMessage: {
                            currencyCodeIso4217: 'IDR',
                            amount1000: '9999999900',
                            requestFrom: sender,
                            noteMessage: {
                                extendedTextMessage: {
                                    text: respon,
                                    contextInfo: {
                                        externalAdReply: {
                                            showAdAttribution: true
                                        }
                                    }
                                }
                            }
                        }
                    }, {})
            }
            break;

            case 'ping': {
                const startTimestamp = Date.now();
                const sentMessage = await reply('🏓 Pong!');
                const endTimestamp = Date.now();
                const pingTime = endTimestamp - startTimestamp;
                const pingMessage = `⌛️ Ping: ${pingTime}ms`;
                if (pingTime < 50) {
                    reply(pingMessage + ' 🚀');
                } else if (pingTime < 100) {
                    reply(pingMessage + ' ⚡');
                } else if (pingTime < 200) {
                    reply(pingMessage + ' ✨');
                } else if (pingTime < 500) {
                    reply(pingMessage + ' 🌟');
                } else {
                    reply(pingMessage + ' 💤');
                }
            }
            break;
            case 'owner':
            case 'creator': {
                await client.sendContact(chat, owner, xyzen)
            }
            break;
            case 'runtime': {
                reply(`${runtime(process.uptime())}`)
            }
            break;

            /**
             *  CONVERT MENU
             */
            case 'emojimix2': {
                let [emoji1, emoji2] = text.split`+`
                if (!emoji1) return reply(`Contoh : ${prefix + command} 😅+🤔`)
                if (!emoji2) return reply(`Contoh : ${prefix + command} 😅+🤔`)
                let anu = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
                for (let res of anu.results) {
                    let encmedia = await client.sendImageAsSticker(m.chat, res.url, m, {
                        packname: global.packname,
                        author: global.author,
                        categories: res.tags
                    })
                    await fs.unlinkSync(encmedia)
                }
            }
            break
            case 'emojimix': {
                if (!text) return reply(`Contoh : ${prefix + command} 😅`)
                let anu = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(text)}`)
                for (let res of anu.results) {
                    let encmedia = await client.sendImageAsSticker(m.chat, res.url, m, {
                        packname: global.packname,
                        author: global.author,
                        categories: res.tags
                    })
                    await fs.unlinkSync(encmedia)
                }
            }
            break
            case 's':
            case 'sticker': {
                try {
                    if (/image/.test(mime)) {
                        let media = await client.downloadAndSaveMediaMessage(qmsg, Tmp(' '));
                        await client.sendImageAsSticker(chat, media, m, {
                            packname,
                            author
                        });
                    } else if (/video/.test(mime)) {
                        if ((quoted.msg || quoted).seconds > 11) return reply('Max 10 Detik!');
                        let media = await client.downloadAndSaveMediaMessage(qmsg, Tmp(' '));
                        await client.sendVideoAsSticker(m.chat, media, m, {
                            packname,
                            author
                        });
                    } else {
                        return reply('Invalid media type. Send an image or video.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    return reply('An error occurred while processing the sticker.');
                }
            }
            break;
            case 'smeme': {
                if (!/image/.test(mime) || !text) {
                    return reply(`Kirim/Reply image/sticker dengan caption ${prefix + command} text1|text2`);
                }

                const atas = text.split('|')[0] || '-';
                const bawah = text.split('|')[1] || '-';

                try {
                    const mediaPath = await client.downloadAndSaveMediaMessage(qmsg, Tmp(' '));
                    const fatGans = await uploader(mediaPath);
                    const smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(bawah)}/${encodeURIComponent(atas)}.png?background=${fatGans}`;

                    await client.sendImageAsSticker(m.chat, smeme, m, {
                        packname: packname,
                        author: author
                    });
                } catch (error) {
                    console.error(error);
                    reply('Terjadi kesalahan saat membuat meme. Silakan coba lagi.');
                }
            }
            break;
            case 'swm':
            case 'take': {
                if (!isPremium) return reply(mess.only.prem)
                let [teks1, teks2] = text.split`|`;
                if (!teks1 || !teks2) return reply(`Kirim/Reply image/video dengan caption ${prefix + command} teks1|teks2`);
                try {
                    if (/image/.test(mime)) {
                        let media = await client.downloadMediaMessage(qmsg, Tmp(' '));
                        await client.sendImageAsSticker(m.chat, media, m, {
                            packname: teks1,
                            author: teks2
                        });
                    } else if (/video/.test(mime)) {
                        if ((quoted.msg || quoted).seconds > 11) return reply('Maksimal 10 detik!');
                        let media = await client.downloadMediaMessage(qmsg, Tmp(' '));
                        await client.sendVideoAsSticker(m.chat, media, m, {
                            packname: teks1,
                            author: teks2
                        });
                    } else {
                        return reply(`Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`);
                    }
                } catch (error) {
                    console.error(error);
                    reply('Terjadi kesalahan saat membuat stiker dengan teks. Silakan coba lagi.');
                }
            }
            break;
            case 'toimage':
            case 'toimg': {
                if (!/webp/.test(mime)) {
                    return reply(`Reply sticker dengan caption *${prefix + command}*`);
                }
                try {
                    let media = await client.downloadAndSaveMediaMessage(qmsg);
                    let ran = getRandom('.png');
                    exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                        fs.unlinkSync(media);
                        if (err) {
                            console.error(err);
                            return reply('Terjadi kesalahan saat mengkonversi sticker ke gambar. Silakan coba lagi.');
                        }
                        let buffer = fs.readFileSync(ran);
                        client.sendImage(chat, buffer, mess.done, m)
                        fs.unlinkSync(ran);
                    });
                } catch (error) {
                    console.error(error);
                    reply('Terjadi kesalahan saat mengkonversi sticker ke gambar. Silakan coba lagi.');
                }
            }
            break;
            case 'tomp4':
            case 'tovideo': {
                if (!/webp/.test(mime)) {
                    return reply(`Reply stiker dengan caption *${prefix + command}*`);
                }
                try {
                    let media = await client.downloadAndSaveMediaMessage(qmsg, Tmp(''));
                    let webpToMp4 = await webp2mp4file(media);
                    await client.sendMessage(m.chat, {
                        video: {
                            url: webpToMp4.result,
                            caption: mess.done
                        }
                    }, {
                        quoted: m
                    });
                    await fs.unlinkSync(media);
                } catch (error) {
                    console.error(error);
                    reply('Terjadi kesalahan saat mengkonversi stiker ke video. Silakan coba lagi.');
                }
            }
            break;
            case 'toaud':
            case 'toaudio':
            case 'tomp3': {
                if (!/video/.test(mime) && !/audio/.test(mime)) {
                    return reply(`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`);
                }
                const a = './src/tmp/' + getRandom(' ')
                const b = './src/tmp/' + getRandom('.mp3')
                try {
                    let media = await client.downloadAndSaveMediaMessage(qmsg, a);
                    let audio = await toAudio(media, 'mp4', b);
                    await client.sendMessage(m.chat, {
                        audio: fs.readFileSync(b),
                        mimetype: 'audio/mpeg'
                    }, {
                        quoted: m
                    })
                } catch (err) {
                    console.log(err);
                    reply('Terjadi kesalahan saat mengkonversi video/audio ke audio. Silakan coba lagi.');
                }
            }
            break;
            case 'removebg':
            case 'nobg': {
                if (isImage || isQuotedImage || /image/.test(mime)) {
                    let media = await client.downloadAndSaveMediaMessage(qmsg, Tmp(''));
                    let removedBackgroundImage = await removebg(media);
                    await client.sendImage(chat, removedBackgroundImage, mess.done, m);
                } else {
                    return reply('Kirim/Reply Image Yang Ingin Menghapus Latar Belakang Dengan Caption');
                }
            }
            break;


            /**
             *  DOWNLOADER MENU
             */
            case 'titkok':
            case 'tiktokdl':
            case 'ttdl':
            case 'tiktokmp4': {
                if (!args[0]) return reply(mess.need.url);
                const data = await xyzenAPIs(`/api/downloader/tiktok?url=${q}&apikey=${api.xyz}`)
                if (data.status === false) {
                    return reply(data.message)
                } else {
                    const {
                        caption,
                        url
                    } = data.result
                    client.sendVideo(chat, url, caption, m)
                }
            }
            break;
            case 'igdl':
            case 'instagram': {
                if (!args[0]) return reply(mess.need.url);
                const data = await lolAPIs(`/api/instagram2?apikey=${api.lol}&url=${q}`)
                if (data.status === 500) {
                    return reply(mess.error.url)
                } else {    
                    for (let i = 0; i < data.result.media.length; i++) {
                        let caption = i == 0 ? data.result.caption : ''
                        let ext = data.result.media[i].includes('.jpg') ? 'image' : 'video'
                        await client.sendMessage(chat, {
                            [ext]: {
                                url: data.result.media[i]
                            },
                            caption,
                        }, {
                            quoted: m
                        })
                        await sleep(1000)
                    }
                }
            }
            break;
            case 'ytmp3': {
                if (!isPremium) return reply(mess.only.prem);
                if (!q) return reply(mess.need.url);
                try {
                    await ytmp3(q)
                } catch (err) {
                    reply(mess.error.url)
                }

            }
            break;
            case 'ytmp4': {
                if (!isPremium) return reply(mess.only.prem);
                if (!q) return reply(mess.need.url);
                try {
                    await ytmp4(q)
                } catch (err) {
                    reply(mess.error.url)
                }

            }
            break;


            /**
             *  SEARCH MENU
             */
            case 'yts':
            case 'ytsearch':
            case 'play': {
                if (!isPremium) return reply(mess.only.prem);
                if (!q) return reply(mess.need.q);
                const yts = require('yt-search');

                try {
                    const a = await yts(q);
                    const b = await a.videos[0];
                    const {
                        title,
                        url,
                        timestamp,
                        views,
                        ago,
                        seconds,
                        image
                    } = b
                    const c = `🎬 *Title:* ${title}\n\n🔗 *URL:* ${url}\n⏰ *Timestamp:* ${timestamp}\n👁‍🗨 *Views:* ${views}\n📅 *Uploaded:* ${ago}\n`;
                    await client.sendMessage(m.chat, {
                        text: c,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: title,
                                body: '',
                                thumbnailUrl: image,
                                sourceUrl: url,
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    }, {
                        quoted: m
                    })
                    if (seconds < 600) {
                        await client.sendPoll(chat, 'Pilih', [`ytmp3 ${url}`, `ytmp4 ${url}`])
                    } else return reply('Maaf Durasi Lebih Dari 10Menit')
                } catch (err) {
                    reply(mess.error.url)
                }
            }
            break
            case 'playspotify': {
                if (!isPremium) return reply(mess.only.prem);
                if (!q) return reply(mess.need.q);
            
                try {
                    const spotifySearchResult = await xyzenAPIs(`/api/search/spotify?q=${q}&apikey=${api.xyz}`);
                    if (spotifySearchResult.result.length === 0) return reply('Maaf, tidak dapat menemukan hasil pencarian Spotify untuk query ini.');
                    const { url, name, duration, artists } = spotifySearchResult.result[0];
                    const artistsArray = Array.isArray(artists) ? artists : [artists];
                    const formattedMessage = `Name Song : *${name.toUpperCase()}*\n\nBy : *${artistsArray.join(', ')}*\n\nDuration : ${duration}\n\nURL : ${url}\n\n\n\n*Powered By XYZENAPIS*`;
                    return await client.sendMessage(m.chat, {
                        text: formattedMessage,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                title: name.toUpperCase(),
                                body: '',
                                thumbnailUrl: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/folder_920_201707260845-1.png',
                                sourceUrl: url,
                                mediaType: 1,
                                renderLargerThumbnail: true
                            }
                        }
                    }, {
                        quoted: m
                    })
                } catch (error) {
                    console.error('Error fetching Spotify data:', error);
                    return reply('Maaf, terjadi kesalahan saat mencari lagu di Spotify. Silakan coba lagi nanti.');
                }
            }
            break;                 
            case 'pin': {
                if (!q) return reply(mess.need.q);
                const a = await xyzenAPIs(`/api/search/pinterest?q=${q}&apikey=${api.xyz}`)
                if (a.result.length === 0) return reply('Maaf, tidak dapat menemukan hasil pencarian Pinterest untuk query ini.');
                const b = a.result[Math.floor(Math.random() * a.result.length)]
                await client.sendImage(chat, b, mess.done, m)
            }
            break
            
            /**
             *  OTHER MENU
             */
            case 'remini':
            case 'upscale':
            case 'hd': {
                if (!isPremium) return reply(mess.only.prem)
                if (/image/.test(mime)) {
                    const a = await client.downloadAndSaveMediaMessage(qmsg, Tmp(''));
                    const b = await uploader(a);
                    await client.sendImage(chat, `${hostAPI}/api/generate/upscale?url=${b}&apikey=${api.xyz}`, mess.done, m);
                } else return reply(mess.only.image)
            }
            break
            case 'qc':
            case 'quote': {
                if (quoted) {
                    const a = await client.profilePictureUrl(quoted.sender, 'image').catch(_ => `https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg`)
                    const b = await client.getName(quoted.sender)
                    const c = await m.quoted.text
                    const d = `${hostAPI}/api/generate/quote?text=${c}&name=${b}&avatar=${a}&apikey=${api.xyz}`
                    await client.sendImageAsSticker(chat, d, m, {
                        packname,
                        author
                    })
                } else {
                    const a = await client.profilePictureUrl(m.sender, 'image').catch(_ => `https://i.pinimg.com/736x/8a/e9/e9/8ae9e92fa4e69967aa61bf2bda967b7b.jpg`)
                    const b = await client.getName(sender)
                    const c = await q
                    const d = `${hostAPI}/api/generate/quote?text=${c}&name=${b}&avatar=${a}&apikey=${api.xyz}`
                    await client.sendImageAsSticker(chat, d, m, {
                        packname,
                        author
                    })
                }
            }
            break;

            /**
             *  STALK MENU
             */
            case 'ghstalk': {
                if (!q) return reply('Kirim Nicknamenya')
                const data = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                enAPIs(`/api/stalk/github?apikey=${api.xyz}&nickname=${q}`);
                const {
                    image,
                    name,
                    location,
                    totalRepo,
                    followers,
                    following
                } = data.result
                const text = `GitHub Stalk Result for ${name} (@${q}): Name: ${name}\nLocation: ${location}\nTotal Repositories: ${totalRepo}\nFollowers: ${followers}\nFollowing: ${following}`
                await client.sendImage(chat, image, text, xyzen);
            }
            break;

            default:
                if (budy.startsWith("=>")) {
                    if (!theCreator) return reply(mess.only.owner);

                    function Return(string) {
                        a = JSON.parse(string, null, 2);
                        b = util.format(a);
                        if (a == undefined) {
                            b = util.format(string);
                        }
                        return reply(b);
                    }
                    try {
                        reply(
                            util.format(eval(`(async () => { return ${budy.slice(3)} })()`)),
                        );
                    } catch (e) {
                        reply(String(e));
                    }
                }

                if (budy.startsWith(">")) {
                    if (!theCreator) return reply(mess.owner);
                    try {
                        let evaled = await eval(budy.slice(2));
                        if (typeof evaled !== "string")
                            evaled = require("util").inspect(evaled);
                        await reply(evaled);
                    } catch (err) {
                        await reply(String(err));
                    }
                }
        }
    } catch (err) {
        await client.sendText(ownernumber + '@s.whatsapp.net', 'mono', `*ERROR TERDEKSI:*\n\n ${err}`, m)
        console.log(err);
    }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(chalk.redBright(`Update'${__filename}'`));
delete require.cache[file];
require(file);
});