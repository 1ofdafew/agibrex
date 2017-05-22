'use strict'

const Exceptions = use('App/Exceptions')
const got = require('got')
const axios = require('axios')

const URL = 'http://147.135.171.127/auth'

class APIAuthService {

  /**
   * injecting required dependencies auto fulfilled
   * by IoC container
   *
   * @return {Array}
   */
  static get inject () {
    return [
      'App/Model/APIAuth',
      'App/Model/APIUser'
    ]
  }

  constructor (APIAuth, APIUser) {
    this.APIAuth = APIAuth
    this.APIUser = APIUser
  }

  * delete (username) {
    const response = yield this.send('delete', URL + '/' + username, {})
    console.log('delete response: ', response)
  }

  * register (username, email, password) {

    try {
      const payload = {
        username: username,
        email: email,
        password: password
      }
      console.log('payload:', payload)

      const response = yield this.send('post', URL, payload)
      console.log('register response: ', response)

      if (response.ok) {
        // save this user
        const user = new this.APIUser()
        user.uuid = response.ok.uuid
        user.username = response.ok.username
        user.email = response.ok.email
        user.mobile_no = response.ok.mobile_no
        user.password = response.ok.password
        yield user.save()

        if (user.isNew()) {
          throw new Exceptions.ApplicationException('Unable to create your account, please try after some time', 400)
        }
        return yield this.APIUser.find(user.id)
      }
      throw new Exceptions.ApplicationException('Unable to create your account, please try after some time', 400)    

    } catch(e) {
      throw(e)
    }
  }

  * authenticate (username, password) {
    const payload = {
      password: password 
    }    
    const response = yield this.send('post', URL + '/' + username, payload)
    console.log('authenticate response: ', response)
    if (response.status === 'ok') {
      const auth = new this.APIAuth()
      auth.username = username
      auth.token = response.data.token
      yield auth.save()

      if (auth.isNew()) {
        throw new Exceptions.ApplicationException('Unable to logging you in, please try after some time', 400)
      }
      return yield this.APIAuth.find(auth.id)
    }
    throw new Exceptions.ApplicationException('Unable to logging you in, please try after some time', 400)
  }

  * send(method, url, data) {
    // console.log('Sending', method, 'data to', url)
    return axios({
      method: method,
      url: url,
      headers: {
        'content-type': 'application/json'
      },
      data: data
    }).then(res => { 
      // console.log('response:: ', res.data)
      return res.data
    }).catch(err => { 
      console.log('error:: ', err.response.data)
      return err.response.data
    })
  }

}

module.exports = APIAuthService
