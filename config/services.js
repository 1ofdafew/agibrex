'use strict'

const Env = use('Env')

const Twitter = require('twitter')
const log = require('npmlog')

// ok, all keys should be put in .env file
//
// # Twitter
// TWTR_KEY=empwHXzDIRRNDDK4R7pSZ17fR
// TWTR_SECRET=w6pasmeHCljBikfja8C3fTKrY6dAnTSHWt2dLiPWB5vuV4aB2d
// TWTR_TOKEN_KEY=871436352776151040-5ZuvufMTH2HqfXnxZUGAVSYJOuFm98F
// TWTR_TOKEN_SECRET=IwNPKcAkhOJguVQvapIky8X5wSkPCuCprPHKiTp1e3gAr

const client = new Twitter({
  consumer_key: Env.get('TWTR_KEY'),
  consumer_secret: Env.get('TWTR_SECRET'), 
  access_token_key: Env.get('TWTR_TOKEN_KEY'), 
  access_token_secret: Env.get('TWTR_TOKEN_SECRET')
})

const params = { screen_name: 'gibrex_' }
client.get('statuses/user_timeline', params, (error, tweets, response) => {
  if (!error) {
    tweets.forEach((tweet, idx) => {
      log.info('tweet: >> ', tweet.text)
    })
  }
})

