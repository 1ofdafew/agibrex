'use strict'

const Env = use('Env')
const Exceptions = use('App/Exceptions')
const Coin = use('App/Services/Coins/Coin')
const log = require('npmlog')

const URL = Env.get('COIN_URL')

class CoinFactory extends Coin {

  /**
   * constructor
   * @param: coin type: { 'ethereum', 'bitcoin', 'tracto', 'litecoin' }
   * set the coin type upon creation
   */
  constructor(type) {
    const coin = /^ethereum$|^bitcoin$|^tracto$|^litecoin$/
    if (coin.exec(type)) {
      super()
      this.type = type      
    } else {
      throw new Error('Invalid coin type')
    }
  }

  /**
   * creating new wallet
   * @param username: string
   * @param pin: string
   */
  * createWallet(username, pin) {
    log.info(`Creating wallet for ${username}...`)
    const data = {
      username: username,
      pin: pin
    }
    return yield this.send('post', `${URL}/api/v1/${this.type}`, data)
  }

  /**
   * getAddress: get the coin address
   * @param: username: string
   * @return json data
   */
  * getAddress(username) {
    return yield this.send('get', `${URL}/api/v1/${this.type}/${username}`, {})
  }

  /**
   * getBalance: get balance of the account
   * @param address: string
   * @return json data
   */
  * getBalance(address) {
    // info Coin:tracto: response =>  { status: 'ok',
    // info Coin:tracto: response =>    data: { balance: { available: 0, pending: 0 } } }

    const acc = yield this.send('get', `${URL}/api/v1/${this.type}/${address}`, {})
    return yield this.toDecimals(acc)
  }

  /**
   * transfer coins from one to another
   *
   * @params transferData
   *            - from: string
   *            - to: string
   *            - value: float
   *            - pin: string
   * @return json data
   */
  * transfer (data) {
    return yield this.send('put', `${URL}/api/v1/${this.type}`, data)
  }

  * getFees (data) {
    return yield this.send('get', 
      `${URL}/api/v1/${this.type}?from=${data.from}&to=${data.to}&value=${data.value}`)
  }

  * toDecimals(account) {
    log.info('parsing ', account)
    if (account !== undefined) {
      const available = parseFloat(account.data.balance.available).toFixed(8)
      if (account.data.balance.pending !== undefined) {
        const pending = parseFloat(account.data.balance.pending).toFixed(8)
        account.data.balance.available = available
        account.data.balance.pending = pending
        return account
      }
      account.data.balance.available = available
      return account
    }
  }
  

}

module.exports = CoinFactory
