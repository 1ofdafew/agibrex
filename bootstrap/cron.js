
const Redis = use('Redis')
const CronJob = require('cron').CronJob

const dailyData = new CronJob({
	cronTime: '0 13 * * * *',
	onTick: function() {
		Redis.publish('data', 'fetchDailyData')
	},
	start: false,
	timeZone: 'Europe/Gibraltar'
})
dailyData.start()

const tickerData = new CronJob({
	//cronTime: '* * * * *',
	cronTime: '0 0,5,10,15,20,25,30,35,40,45,50,55 * * * *',
	onTick: function() {
		Redis.publish('data', 'fetchTickerData')
	},
	start: false,
	timeZone: 'Europe/Gibraltar'
})
tickerData.start()

const exchangeData = new CronJob({
  cronTime: '0,10,20,30,40,50 * * * * *',
  onTick: function() {
    // runs every minute
    // console.log('Running cron for poloniex...')
    // Redis.publish('cron', 'poloniex')
    Redis.publish('cron', 'Kraken')
    Redis.publish('cron', 'GDAX')
  },
  start: false,
	timeZone: 'Europe/Gibraltar'
})
exchangeData.start()

