'use strict'

const Env = use('Env')
const axios = require('axios')
const APIAuthService = make('App/Services/APIAuthService')

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
      auth = yield APIAuthService.getToken(ADMIN)      
    } catch(e) {
      auth = yield APIAuthService.createToken(ADMIN, EMAIL, PASSWORD)
    }

    console.log(`Coin:${this.type}: URL => ${url}, method => ${method}, data =>`)
    console.log(data)
    
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
      console.log(`Coin:${this.type}: response => `)
      console.log(res.data)
      return res.data
    }).catch(err => { 
      console.log(`Coin:${this.type}: response => `)
      console.log(err.response.data)
      return err.response.data
    })
  }

}

module.exports = Coin 