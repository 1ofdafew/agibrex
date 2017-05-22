'use strict'

const Env = use('Env')
const Exceptions = use('App/Exceptions')
const axios = require('axios')

const Coin = use('App/Services/Coins/Coin')
const URL = Env.get('COIN_URL')

class TractoCoin extends Coin {

  constructor() {
    super()
  }

  * createWallet(username, pin) {
    console.log(`Creating wallet for ${username}...`)
    const data = {
      username: username,
      pin: pin
    }
    const resp = yield this.send('post', URL + '/api/v1/tracto', data)
    console.log('createWallet:', resp)
  }

  * checkBalance(wallet_address) {
      console.log(`Checking balance for ${wallet_address}...`)
      return got.get(`http://158.69.170.180:8080/api/v1/tracto/${wallet_address}`, {
          headers: {
              'content-type': 'application/json',
              'x-auth': token
          },
          json: true
      }).then(res => {
        return JSON.stringify(res.body)
      })
  }

}

module.exports = TractoCoin
