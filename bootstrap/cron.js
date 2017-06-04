
const Redis = use('Redis')
const CronJob = require('cron').CronJob

console.log('Preparing cron...')

const data = new CronJob({
	crontime: '0 * * * * *',
	onTick: function() {
		Redis.publish('graph', 'HistoricalData')
	},
	start: false,
	timeZone: 'Australia/Sydney'
})
data.start()

const job = new CronJob({
  cronTime: '0,10,20,30,40,50 * * * * *',
  onTick: function() {
    // runs every minute
    // console.log('Running cron for poloniex...')
    // Redis.publish('cron', 'poloniex')
    // Redis.publish('cron', 'Kraken')
    // Redis.publish('cron', 'GDAX')
  },
  start: false,
  timeZone: 'Australia/Sydney'
})
job.start()
