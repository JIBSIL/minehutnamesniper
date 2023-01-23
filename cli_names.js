const axios = require('axios')

let serverarr = []

let ExampleServer = 'EwBox'

// Fetch Online servers

axios.get('https://api.minehut.com/servers').then(async (response) => {
    const res = response.data
    console.log(`Total Players: ${res.total_players}, Total servers: ${res.total_servers}`)
    let totalservers = -1
    const servers = res.servers
    const createMap = servers.map((object) => {
        totalservers = totalservers + 1
        serverarr.push((object.name).toLowerCase())
    })
    await Promise.all(createMap)
    console.log(`${totalservers + 1} servers are online according to data fetched just now.`)
    let isAvailable = (serverarr.includes(ExampleServer.toLowerCase())) ? console.log('Status: TAKEN') : console.log('Status: AVAILABLE!');
    console.log(isAvailable)
}).catch((error) => {
    console.log('ERROR! ', error)
})