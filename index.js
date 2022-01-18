const { Client, Intents } = require('discord.js');
const Discord = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs')


const startRepeat = require('./router/startRepeat')
const stopRepeat = require('./router/stopRepeat')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

setTimeout(() => {
    const path = 'public/repeatData.json'
    setInterval(() => {
        let {dataes} = JSON.parse(fs.readFileSync(path, 'utf8'))
        
        if(dataes.length === []) return 0

        for (let i = 0; i < dataes.length; i++) {
            let comment = `${dataes[i].message} / id: ${i}`
            client.channels.cache.get(dataes[i].channel.id).send(comment)
            dataes[i].count++
        }
        
        fs.writeFileSync(path, JSON.stringify({dataes}), 'utf8')
    }, 3000)
}, 1000)

client.on('message', async (msg) => {
    if(!msg.content.startsWith("$")) return 0 //커맨드가 아니라면 무시 
    if(msg.author.bot) return 0 //봇이 친 커맨드라면 무시

    const cmd = msg.content.slice(1, 3) //커맨드 부분만 따로 따냄 

    if(cmd === "반복") startRepeat(msg)
    else if(cmd === "종료") stopRepeat(msg)
})

client.login('ODExMTc5MDc2NTk2NjYyMjgy.YCubYg.zFrM00sh33IeS3L2aFJgD4Ut-jQ')