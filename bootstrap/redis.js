'use strict'

const Redis = use('Redis')
const Event = use('Event')

const KrakenPoller = use('App/Services/KrakenPoller')
// const KrakenPoller = use('App/Services/KrakenPoller')

Redis.subscribe('cron', function * (location) {
  console.log('received location to pull from: ', location)
  switch (location) {
    case 'GDAX':
      console.log('Polling data from GDAX')
      // Call DGAX poller
      // and send event data
      return
    case 'Kraken':
      console.log('Polling data from Kraken')

      const kraken = new KrakenPoller()

      // konon nya, data ni dari Kraken lah.
      const data = yield kraken.poll()

      Event.fire('kraken.data', data)
      return
    default:
      console.log('Je ne comprend pas!')
  }
})
