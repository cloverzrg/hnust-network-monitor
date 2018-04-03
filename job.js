const schedule = require('node-schedule');
const app = require('./app')

const j = schedule.scheduleJob('*/1 * * * *', async function () {
    try {
        await app.start()
        console.log(new Date() + ':run schedule')
    } catch (err) {
        console.log(err)
    }
})