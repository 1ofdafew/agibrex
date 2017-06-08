'use strict'

const Env = use('Env')

const Twitter = require('twitter')
const log = require('npmlog')
const co = require('co')

class TwitterService {

  constructor() {
    this.data = []
  }

  * getTweet() {

    const client = new Twitter({
      consumer_key: Env.get('TWTR_KEY'),
      consumer_secret: Env.get('TWTR_SECRET'),
      access_token_key: Env.get('TWTR_TOKEN_KEY'),
      access_token_secret: Env.get('TWTR_TOKEN_SECRET')
    })

    const params = { screen_name: 'gibrex_' }
    const self = this
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
      co(function * () {
        if (!error) {
          self.data = []
          yield tweets.forEach(function (tweet, idx) {
            self.data.push(tweet.text)
          })
        }
      })
    })
    log.info('data-return:', this.data)
    return this.data
  }

}

module.exports = TwitterService
