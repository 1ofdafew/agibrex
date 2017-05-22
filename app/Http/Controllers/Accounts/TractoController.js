'use strict'

const TractoCoin = use('App/Services/Coins/TractoCoin')

class TractoController {

  * account (request, response) {

    const tractoAcc = new TractoCoin()
    yield tractoAcc.checkBalance('TvxTwZhrxaHV5GnfZgSfiLX5XmfVR4fB5dBAzm91AW7cDfShT19AFno7gMhZp1ejdJdxBKkRTnQ8RNDxB2fjDqg32gQR7zsDp')
    response.send(tractoAcc)

    yield response.sendView('accounts/tracto', { type: 'tracto'})
  }

  * deposit (request, response) {
    yield response.sendView('accounts/deposit/tracto', { type: 'tracto'})
  }

  * withdraw (request, response) {
    yield response.sendView('accounts/withdraw/tracto', { type: 'ethereum'})
  }


}

module.exports = TractoController
