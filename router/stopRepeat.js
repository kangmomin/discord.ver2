const fs = require('fs')

module.exports = (msg) => {
    const path = 'F:/files/node.js/discord-ver.2/public/repeatData.json'
    let {dataes} = JSON.parse(fs.readFileSync(path, 'utf8'))
    const id = Number(msg.content.slice(4))

    if(id === null || typeof id !== "number") return msg.channel.send("id값을 입력해 주십시오. ex)$종료 0") //아이디 값 없을때 예외 처리
    if(dataes.length < id) return msg.channel.send("Not Found Repeat Process") //배열에 그 값이 없으면 에러 표시

    const comment = `
    id: ${id} / started-user: <@${dataes[id].userId}> / count: ${dataes[id].count} / start-time: ${dataes[id].time}
    `
    dates = dataes.splice(id, 1)
    msg.channel.send(comment)
    fs.writeFileSync(path, JSON.stringify({dataes}), 'utf8')
}