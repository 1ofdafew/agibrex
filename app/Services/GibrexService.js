'use strict'

const axios = require('axios')
const log = require('npmlog')

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
      log.info('GibrexService:response:: ', res.data)
      return res.data
    }).catch(err => { 
      log.info('GibrexService:error:: ', err.response.data)
      return err.response.data
    })
  }

}

module.exports = GibrexService
