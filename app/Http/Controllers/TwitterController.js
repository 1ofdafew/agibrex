'use strict'

const log = use('npmlog')
const TwitterService = make('App/Services/TwitterService')

class TwitterController {

  * index(request, response) {
    const twt = yield TwitterService.getTweet()
    log.info('this tweet: >> ', twt)
    response.ok(twt)
    // response.ok(1)
  }

}

module.exports = TwitterController
