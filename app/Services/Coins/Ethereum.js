'use strict'

const got = require('got');
const Coin = use('App/Services/Coins/Coin')

class Ethereum extends Coin {

  constructor() {
    super()
  }

  * createWallet(username, pin) {
    console.log(`Creating wallet for ${username}...`)
    return got.post('localhost:8080/api/v1/ethereum', {
      headers: {
        'content-type': 'application/json'
      },
      json: true,
      body: {
        username: username,
        pin: pin
      }
    }).then(res => {
      // console.log(res.body)
      return JSON.stringify(res.body)
    })
  }

}

module.exports = Ethereum