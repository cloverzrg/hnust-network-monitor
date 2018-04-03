const req = require('./utils/request')
const cherrio = require('cheerio')
const mysql = require('./utils/mysql')

const scrape = (html) => {
    let $ = cherrio.load(html)
    let data1 = $('#moblie2 > span').text()
    let data1Arr = data1.match(/([\d]+).*?([\d]+)/)
    let data2 = $('#moblie4').text()
    let data2Arr = data2.trim().match(/([\d]+).*?\n.*?([\d\. ]+).*?([\d\. ]+)/)
    data1Arr = data1Arr.map(str => str.trim())
    data2Arr = data2Arr.map(str => str.trim())
    return {
        onlineRoom: parseInt(data1Arr[1]),
        onlinePeople: parseInt(data1Arr[2]),
        totalOnline: parseInt(data2Arr[1]),
        inTraffic: data2Arr[2],
        outTraffic: data2Arr[3]
    }
}


async function start() {
    let res = await req.get('https://support.hnust.edu.cn/app/')
    let html = res.body
    let data = scrape(html)
    await mysql.insert(data)
}


module.exports = { start }