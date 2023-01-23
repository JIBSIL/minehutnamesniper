// Imports

// const randomWords = require('random-english-words');
import axios from 'axios'
import { writeFileSync, existsSync, unlinkSync } from 'fs'
import chalk from 'chalk'

if (existsSync("config.txt") === false) {
    console.log('Config not valid. Stopping process...')
    process.exit(1)
}

import * as dotenv from 'dotenv'
dotenv.config({ path: 'config.txt' })

if(JSON.parse(process.env.UNLINK_AT_START) === true) {
    if(existsSync(process.env.OUTPUTFILE)) {
        unlinkSync(process.env.OUTPUTFILE)
    }
}

const options = {
    debug: JSON.parse(process.env.DEBUG),
    logErrors: JSON.parse(process.env.ERRORS),
}

// Generate words

// const wordarr = require('an-array-of-english-words')

import { words } from 'popular-english-words'

const wordarr = words.getMostPopular(process.env.NUMWORDS)

// const words = randomWords({ minChars: 4, maxChars: 12, /*minCount: options.minCount*/ })

// const wordarr = words.split(' ')
// console.log(wordarr)

// Debug log function

const debug = {
    log: (message) => {
        if (options.debug === true) {
            console.log(chalk.gray(`[DEBUG] ${message}`))
        }
    }
}

const error = {
    log: (message) => {
        if (options.logErrors === true) {
            console.log(chalk.red(`[ERROR] ${message}`))
        }
    }
}

/**
 * Produces a function which uses template strings to do simple interpolation from objects.
 * 
 * Usage:
 *    var makeMeKing = generateTemplateString('${name} is now the king of ${country}!');
 * 
 *    console.log(makeMeKing({ name: 'Bryan', country: 'Scotland'}));
 *    // Logs 'Bryan is now the king of Scotland!'
 */
 var generateTemplateString = (function(){
    var cache = {};

    function generateTemplate(template){
        var fn = cache[template];

        if (!fn){
            // Replace ${expressions} (etc) with ${map.expressions}.

            var sanitized = template
                .replace(/\$\{([\s]*[^;\s\{]+[\s]*)\}/g, function(_, match){
                    return `\$\{map.${match.trim()}\}`;
                    })
                // Afterwards, replace anything that's not ${map.expressions}' (etc) with a blank string.
                .replace(/(\$\{(?!map\.)[^}]+\})/g, '');

            fn = Function('map', `return \`${sanitized}\``);
        }

        return fn;
    }

    return generateTemplate;
})();

// Fetch Online servers

const fetchOnlineServers = () => {
    return new Promise((resolve) => {
        axios.get('https://api.minehut.com/servers').then(async (response) => {
            const res = response.data
            console.log(`Total Players: ${res.total_players}, Total servers: ${res.total_servers}`)
            let totalservers = -1
            let serverarr = []
            const servers = res.servers
            const createMap = servers.map((object) => {
                totalservers = totalservers + 1
                serverarr.push((object.name).toLowerCase())
            })
            await Promise.all(createMap)
            console.log(`${totalservers + 1} servers are online according to data fetched just now.`)
            resolve(serverarr)
        }).catch((err) => {
            error.log('ERROR WHILE FETCHING SERVERS! ', err)
        })
    })
}

// Parse data

let available = []

const templatestr = process.env.STRING

const templateString = generateTemplateString(templatestr)

const parseWordResults = async () => {
    console.log(chalk.blue('[INIT] Initializing web client and fetching resources.'))
    console.log(chalk.blue(`[INIT] Fetching ${wordarr.length} words from the specied list "Wikipedia-270k"...`))
    const serverarr = await fetchOnlineServers()
    await Promise.all(wordarr.map(async (word) => {
        word = templateString({
            word
        })
        if (word.length >= 3 && word.length <= 12 && !available.includes(word)) {
            if (serverarr.includes(word.toLowerCase()) === false) {
                axios.get(`https://api.minehut.com/server/${word.toLowerCase()}?byName=true`).then(async (response) => {
                    const res = response.data
                    let minehutResponse = res.ok ?? true
                    minehutResponse === false ? debug.log(`An internal (Minehut) error occured while fetching ${word}`) : debug.log(`${word} is not available!`)
                }).catch((error) => {
                    if (error.response) {
                        const res = error.response.data
                        let minehutResponse = res.ok ?? true
                        let result = minehutResponse === false ? true : false
                        if (result === true && word.length > 3 && word.length < 13 && !available.includes(word)) {
                            available.push(word)
                            console.log(chalk.green(`[STATUS] ${word} is available!`))
                            writeFileSync(process.env.OUTPUTFILE, `${word}\n`, {
                                flag: 'a+'
                            });
                        }
                    }
                })
            }
        }
    }))
}

parseWordResults()