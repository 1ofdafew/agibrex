'use strict'

const Redis = use('Redis')

Redis.subscribe('cron', function * (location) {
  console.log('received location to pull from: ', location)
  if (location === 'poloniex') {
  	console.log("Pulling from poloniex...")

  	// .. pull from poloniex
  	
  } else {
  	console.log("Pulling from ", location)
  }
})