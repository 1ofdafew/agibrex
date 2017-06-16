'use strict'

const Env = use('Env')
const axios = require('axios')
const APIAuthService = make('App/Services/APIAuthService')
const logger = make('App/Services/LogService')

const ADMIN = Env.get('COIN_ADMIN')
const EMAIL = Env.get('COIN_ADMIN_EMAIL')
const PASSWORD = Env.get('COIN_ADMIN_PASSWORD')

class Coin {

  constructor() {
    // check all the methods implemented.
    if (this.constructor === Coin) {
      throw new TypeError('Shall not call this class directly')
    }

    if (this.createWallet === undefined) {
      throw new TypeError('createWallet is not defined')
    }
    if (this.getAddress === undefined) {
      throw new TypeError('getAddress is not defined')
    }
    if (this.getBalance === undefined) {
      throw new TypeError('getBalance is not defined')
    }
  }

  * send(method, url, data) {

    var auth
    try {
      logger.debug('Authenticating via local token...')
      auth = yield APIAuthService.getToken(ADMIN)
    } catch(e) {
      logger.debug('Authenticating via new user token...')
      auth = yield APIAuthService.createToken(ADMIN, EMAIL, PASSWORD)
    }

    logger.debug('Proceeding with creating coin account...')
    logger.info(`Coin:${this.type}: URL => ${url}, method => ${method}, data =>`, data)

    return axios({
      method: method,
      url: url,
      headers: {
        'content-type': 'application/json',
        'x-auth': auth.token
      },
      data: data,
      timeout: 10000
    }).then(res => {
      logger.info(`Coin:${this.type}: response => `, res.data)
      return res.data
    }).catch(err => {
      logger.info(`Coin:${this.type}: response => `, err.response.data)
      return err.response.data
    })
  }

}

module.exports = Coin
