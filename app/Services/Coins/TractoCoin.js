'use strict'

const Env = use('Env')
const Exceptions = use('App/Exceptions')
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
    return yield this.send('post', `${URL}/api/v1/tracto`, data)
  }

  * getAddress(username) {
    return yield this.send('get', `${URL}/api/v1/tracto/${username}`, {})
  }

  * getBalance(address) {
    return yield this.send('get', `${URL}/api/v1/tracto/${address}`, {})
  }

}

module.exports = TractoCoin
