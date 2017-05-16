
const Redis = use('Redis')

console.log('Preparing cron...')

const CronJob = require('cron').CronJob
const job = new CronJob({
  cronTime: '0,10,20,30,40,50 * * * * *',
  onTick: function() {
    // runs every minute
    // console.log('Running cron for poloniex...')
    // Redis.publish('cron', 'poloniex')
  },
  start: false,
  timeZone: 'Australia/Sydney'
})
job.start()