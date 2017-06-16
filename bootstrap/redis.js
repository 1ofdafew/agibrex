'use strict'

const Redis = use('Redis')
const Event = use('Event')
const Env = use('Env')
const Ws = use('Ws')

const log = make('App/Services/LogService')
const KrakenPoller = use('App/Services/KrakenPoller')
// const GDAXPoller = use('App/Services/GDAXPoller')
//
const CoindeskService = make('App/Services/CoindeskService')
const MarketDataService = make('App/Services/MarketDataService')

Redis.subscribe('data', function * (action) {
  const isCronServer = Env.get('IS_CRON', false)
  if (isCronServer) {
	  log.info('Processing cron for ', action)
	  switch (action) {
	  	case 'fetchTickerData':
        log.info('Running fetch for ticker data for BTC, ETH')
	  		yield MarketDataService.fetchCurrentData('BTC')
	  		yield MarketDataService.fetchCurrentData('ETH')
	  		break;
	  	case 'fetchDailyData':
        log.info('Fetching daily data for BTC, ETH')
	  		yield CoindeskService.cronFetchBitcoinData()
	  		yield CoindeskService.cronFetchEthereumData()
	  		break;
	  	default:
	  		log.error('Unknown cron job, action:', action)
	  }
  }

})

Redis.subscribe('cron', function * (location) {
  // console.log('received location to pull from: ', location)
  const channel = Ws.channel('market')
  // const channel = Ws.channel('eth')

  switch (location) {
    case 'GDAX':
      // console.log('Polling data from GDAX')
      // Call DGAX poller
      // const gdax = new GDAXPoller()
      //
      // const data = yield gdax.poll()
      // and send event data
      // channel.emit('message', 'Some market data from GDAX...')
      return

    case 'Kraken':
      // console.log('Polling data from Kraken')

      // const kraken = new KrakenPoller()

      // konon nya, data ni dari Kraken lah.
      // const data = yield kraken.poll()
      // channel.emit('message', data)

      return
    default:
      console.log('Je ne comprend pas!')
  }
})
