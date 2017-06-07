'use strict'

const log = use('npmlog')
const TwitterService = make('App/Services/TwitterService')

class TwitterController {

  * index(request, response) {
    const twt = yield TwitterService.getTweet()
    response.send(1)
    response.json(twt)
  }

}

module.exports = TwitterController
