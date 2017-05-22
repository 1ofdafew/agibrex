'use strict'

const axios = require('axios')

class Coin {

  constructor() {
    // check all the methods implemented.
    if (this.constructor === Coin) {
      throw new TypeError('Can\'t call this class directly')
    }

    if (this.createWallet === undefined) {
      throw new TypeError('createWallet is not defined')
    }
  }

  * send(method, url, data) {
    console.log('Coin: Sending', method, 'data to', url, ', data:', data)
    return axios({
      method: method,
      url: url,
      headers: {
        'content-type': 'application/json'
      },
      data: data
    }).then(res => { 
      console.log('Coin:response:: ', res.data)
      return res.data
    }).catch(err => { 
      console.log('Coin:error:: ', err.response.data)
      return err.response.data
    })
  }

}

module.exports = Coin 