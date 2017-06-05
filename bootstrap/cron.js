
const Redis = use('Redis')
const CronJob = require('cron').CronJob

console.log('Preparing cron...')

const dailyData = new CronJob({
	cronTime: '5 0 * * * *',
	onTick: function() {
		Redis.publish('data', 'fetchDailyData')
	},
	start: false,
	timeZone: 'Australia/Sydney'
})
dailyData.start()

const tickerData = new CronJob({
	cronTime: '0 0,5,10,15,20,25,30,35,40,45,50,55 * * * *',
	onTick: function() {
		Redis.publish('data', 'fetchTickerData')
	},
	start: false,
	timeZone: 'Australia/Sydney'
})
tickerData.start()
=======
data.start()
>>>>>>> Stashed changes

const job = new CronJob({
  cronTime: '0,10,20,30,40,50 * * * * *',
  onTick: function() {
    // runs every minute
    // console.log('Running cron for poloniex...')
    // Redis.publish('cron', 'poloniex')
    Redis.publish('cron', 'Kraken')
    Redis.publish('cron', 'GDAX')
  },
  start: false,
  timeZone: 'Australia/Sydney'
})
job.start()
