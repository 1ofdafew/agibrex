'use strict'

const log = make('App/Services/LogService')
const TwitterService = make('App/Services/TwitterService')

class TwitterController {

  * twitter(request, response) {
    const twt = yield TwitterService.getTweet()
    log.info('this tweet: >> ', twt)
    response.ok(twt)
    // response.ok(1)
  }

}

module.exports = TwitterController
