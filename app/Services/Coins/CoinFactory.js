'use strict'

const Env = use('Env')
const Exceptions = use('App/Exceptions')
const Coin = use('App/Services/Coins/Coin')
const log = require('npmlog')

const URL = Env.get('COIN_URL')

class CoinFactory extends Coin {

  constructor(type) {
    super()
    this.type = type
  }

  * createWallet(username, pin) {
    log.info(`Creating wallet for ${username}...`)
    const data = {
      username: username,
      pin: pin
    }
    return yield this.send('post', `${URL}/api/v1/${this.type}`, data)
  }

  * getAddress(username) {
    return yield this.send('get', `${URL}/api/v1/${this.type}/${username}`, {})
  }

  * getBalance(address) {
    return yield this.send('get', `${URL}/api/v1/${this.type}/${address}`, {})
  }

}

module.exports = CoinFactory
