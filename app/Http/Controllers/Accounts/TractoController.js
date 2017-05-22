'use strict'

const CoinFactory = use('App/Services/Coins/CoinFactory')

class TractoController {

  * account (request, response) {

    const factory = new CoinFactory()
    yield factory.checkBalance('TvxTwZhrxaHV5GnfZgSfiLX5XmfVR4fB5dBAzm91AW7cDfShT19AFno7gMhZp1ejdJdxBKkRTnQ8RNDxB2fjDqg32gQR7zsDp')
    response.send(tractoAcc)

    yield response.sendView('accounts/tabs', { type: 'tracto'})

  }

  * deposit (request, response) {
    yield response.sendView('accounts/deposit/tracto', { type: 'tracto'})
  }

  * withdraw (request, response) {
    yield response.sendView('accounts/withdraw/tracto', { type: 'ethereum'})
  }


}

module.exports = TractoController
