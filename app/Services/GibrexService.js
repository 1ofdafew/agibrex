'use strict'

const axios = require('axios')

class GibrexService {

  * send(method, url, data) {
    console.log('GibrexService: Sending', method, 'data to', url, ', data:', data)
    return axios({
      method: method,
      url: url,
      headers: {
        'content-type': 'application/json'
      },
      data: data,
      timeout: 10000
    }).then(res => { 
      console.log('GibrexService:response:: ', res.data)
      return res.data
    }).catch(err => { 
      console.log('GibrexService:error:: ', err.response.data)
      return err.response.data
    })
  }

}

module.exports = GibrexService
