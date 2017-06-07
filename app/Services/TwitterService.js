'use strict'

const Env = use('Env')

const Twitter = require('twitter')
const log = require('npmlog')

class TwitterService {

  * getTweet() {

    const client = new Twitter({
      consumer_key: Env.get('TWTR_KEY'),
      consumer_secret: Env.get('TWTR_SECRET'),
      access_token_key: Env.get('TWTR_TOKEN_KEY'),
      access_token_secret: Env.get('TWTR_TOKEN_SECRET')
    })

    const params = { screen_name: 'gibrex_' }
    var data =new Array;
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
      if (!error) {
        tweets.forEach((tweet, idx) => {
          data.push(tweet.text)
          log.info('tweet: >> ', tweet.text)
        })
      }
      // return data
    })
    return data
  }

}

module.exports = TwitterService
