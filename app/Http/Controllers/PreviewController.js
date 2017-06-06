'use strict'

const axios = require('axios')
const co = require('co')

const UserService = make('App/Services/UserService')

class PreviewController {

  * index (request, response) {
    axios.get('https://blockchain.info/ticker')
      .then(function (resp) {
        co(function * () {
          const data = resp.data
          yield response.sendView('preview', {data: data})
        })
      })
  }

  * invited (request, response) {
    // process invited guest
    const data = request.only(['code'])
    console.log('data:', data)

    // do some verification
    // and redirect
    if (data.code === '') {
      response.redirect('/')
    } else {
      // fetch verification id by that code.
      try {
        yield UserService.findByOrFail('verification_code', data.code)
        response.redirect('/home')
      } catch(e) {
        response.redirect('/')
      }
    }
  }

}

module.exports = PreviewController

