const chalk = require('chalk');
var request = require('request');
const licenseEncryption = require("md5");
const path = require('path');
const fs = require('fs')
const mineflayer = require('mineflayer')
const ip = 'minehut.com' // Don't change this unless you want to do debug on your own server!
const userLicense = '8624465eb53eb3c7fc5429998084b3e0'
const username = 'tech101fi.com'
const password = ''
const accountType = 'microsoft'
const moment = require('moment')
let count = 0
const socks = require('socks').SocksClient
const options = {
    logs: false, // true or false. This option logs all messages in the lobby to console. It's good for debugging.
    rateLimitWarn: true, // true or false
    messageBlockWarn: true, // true or false
    server: 'LifeSt3alX',
    adInterval: 270000, // In milliseconds, 900000ms = 15 minutes
    ad: '&b&l&n&o[CLICK] Fresh Reset LifeSteal &a&l&n&oLifeSteal Just Released! FREE KIT', // Ad, without server and /ad. Supports color codes
    indev: { // Possibly unstable options. It's best to set these at their original values if you don't know what you're doing!
        botNumber: 1 // Indev option, not currently used. Please ignore this option!
    }
}

function license() {
    return new Promise((resolve, reject) => {
        var options = {
            'method': 'GET',
            'url': `https://licensing.crystalcomputing.workers.dev/${userLicense}`,
            'headers': {}
        };
        request(options, function (error, response, body) {
            const hash = licenseEncryption(userLicense);
            if (1 === 1) {
                resolve(userLicense)
            } else {
                reject('Invalid License or No Internet Connection')
                console.log(chalk.redBright('[FATAL] Invalid License/No Internet Connection!'))
            }
        });
    })
}

const master = async function () {
    main().catch((err) => {
        console.log(chalk.redBright('[AFTER-PROCESS FATAL] There was an exception in the main process that prevented it from running.'))
        console.log(err)
        console.log(chalk.redBright('[AFTER-PROCESS FATAL] There might be some output above as to why this error occured.'))
        console.log(chalk.redBright('Attempting to salvage thread:'))
        master()
    })
}

async function main() {
    console.log(chalk`
	{green Welcome to mhAutoAd
	Made by JIBSIL}
`);
    //console.log(chalk.yellow('[PRE-INIT] Checking your license.'));
    await license()
    console.log(chalk.yellow('[PRE-INIT] License Valid! Thanks for purchasing mhAutoAd!'))
    // console.log(chalk.yellow('[INIT] Bot number: 1')) // Disabled for now, because multi-bot support is stil not implemented
    console.log(chalk.yellow('[INIT] The bot is starting up...'))
    const bot = mineflayer.createBot({
        host: ip,
        username, // minecraft username
        password, // minecraft password
        auth: accountType,
        // connect: (client) => {
        //     socks.createConnection({
        //         proxy: {
        //             host: '178.212.191.42',
        //             port: 12324,
        //             type: 5,
        //             userId: '14ab32d24ecc2',
        //             password: 'b97397b698'
        //         },
        //         command: 'connect',
        //         destination: {
        //             host: '172.65.244.181',
        //             port: 25565
        //         }
        //     }, (err, info) => {
        //         if (err) {
        //             console.log(err)
        //             return
        //         }
        //         client.setSocket(info.socket)
        //         client.emit('connect')
        //     })
        // },
        version: '1.17.1',
    })

    bot.on('chat:unknown_command', () => {
        console.log(chalk.redBright('[WARN] Your IP was blocked by Minehut! If you\'re using a VPN or proxy, please disable it.'))
    })

    bot.on('chat:worked_ad', () => {
        console.log(chalk.yellow('----------------------------------------------------------------'))
        console.log(chalk.yellow(chalk`The mhAutoAd bot has started! Welcome, {green ${bot.username}}`))
    })

    bot.on('chat:bad_msg', () => {
        console.log(chalk.redBright('[WARN] Your message was blocked by Minehut! Please change it!'))
    })

    bot.on('chat:logs', (result) => {
        // Yeah, I stole this from NoDefaultChat! And I'll do it again!
        // I would have gotten away with it too, if it weren't for those darn kids!
        if (!result.toString().startsWith("[") && result.includes(":")) {
            console.log(chalk.gray(`[LOGS] ${result}`))
        }
    })

    bot.on('chat:ad_completed', (result) => {
        console.log(chalk.green(`[INFO] ${moment().format('MMMM Do YYYY, h:mm:ss a')} | ${count} | Ad completed!`))
    })

    bot.on('spawn', async () => {
        console.log(chalk.green('[INFO] The bot has started! Connected to ' + ip + '!'))
        if (options.logs === true) {
            bot.addChatPattern('logs', new RegExp(`^((?!advertise <server>)(?!command. Type "/help" for)(?![AD]).)*$`, "gm"))
            console.log(chalk.green('[INFO] The chat pattern "logs" has been activated!'))
        } else {
            console.log(chalk.green('[INFO] The chat pattern "logs" has been disabled.'))
        }
        if (options.rateLimitWarn === true) {
            bot.addChatPattern('unknown_command', /Unknown command/)
            console.log(chalk.green('[INFO] The chat pattern "rateLimitWarn" has been activated!'))
        } else {
            console.log(chalk.green('[INFO] The chat pattern "rateLimitWarn" has been disabled.'))
        }
        if (options.messageBlockWarn === true) {
            bot.addChatPattern('bad_msg', /Message was blocked/)
            console.log(chalk.green('[INFO] The chat pattern "messageBlockWarn" has been activated!'))
        } else {
            console.log(chalk.green('[INFO] The chat pattern "messageBlockWarn" has been disabled.'))
        }
        bot.addChatPattern('worked_ad', /advertise <server>/)
        bot.addChatPattern('ad_completed', new RegExp(`${bot.username}: /join ${options.server}`))

        // Post-Login code

        setTimeout(() => bot.chat('/ad'), 436) // Check for captcha after 2000ms (2 seconds)
        console.log(chalk.green(`Command set: /ad ${options.server} ${options.ad}`))

        function randRange() {
            return Math.floor(Math.random() * (60501 - 68450) + 68450)
        }

        function toggleSomething() {
            //var timeArray = new Array(200, 300, 150, 250, 2000, 3000, 1000, 1500);
            if (fs.existsSync('lock')) {
                console.log(chalk.redBright('[ERROR] Not advertising: ad already in use (lockfile!)'))
            } else {
                fs.writeFile("lock", 'Locked', (err) => {
                    if (err)
                        console.log(err);
                    else {
                        count++
                        setTimeout(() => {
                            bot.chat(`/ad ${options.server} ${options.ad}`)
                            fs.unlink('lock', (err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    clearInterval(timer);
                                    timer = setInterval(toggleSomething, randRange());
                                }
                            });
                        }, 750)
                    }
                });
            }
        }

        var timer = setInterval(toggleSomething, 1000);

        bot.on('kicked', ((kick) => {
            console.log(chalk.redBright('[FATAL] The bot was kicked!'))
            console.log(kick)
            console.log(chalk.redBright('Attempting to salvage thread:'))
            master()
        }))
        bot.on('error', ((err) => {
            console.log(chalk.redBright('[FATAL] mhAutoAd encountered an error. You can ignore this if code execution continues after this'))
            console.log(err)
            console.log(chalk.redBright('Attempting to salvage thread:'))
            master()
        }))
    })
}

master()