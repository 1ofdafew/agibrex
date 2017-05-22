'use strict'

const got = require('got');
const Coin = use('App/Services/Coins/Coin')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.IntcInVzZXJuYW1lXCI6XCJnaWJyZXhcIixcImVtYWlsXCI6XCJhZG1pbkBnaWJyZXguY29tXCJ9Ig.0GkMJHKkOoJB5J_tDrykQysOiTDFXFiscZ6bmVgLSM4';

class TractoCoin extends Coin {

  constructor() {
    super()
  }

  * createWallet(username, pin) {
    console.log(`Creating wallet for ${username}...`)
    return got.post('localhost:8080/api/v1/tracto', {
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
