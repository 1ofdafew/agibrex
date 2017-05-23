'use strict'

const Env = use('Env')
const Exceptions = use('App/Exceptions')
const GibrexService = use('App/Services/GibrexService')

const URL = Env.get('COIN_URL')
const NEED_REG = Env.get('COIN_ADMIN_REG')

class APIAuthService extends GibrexService {

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
    super()
    this.APIAuth = APIAuth
    this.APIUser = APIUser
  }

  * delete (username) {
    const response = yield this.send('delete', `${URL}/auth/${username}`, {})
    if (response.status === 'ok') {
      // delete from table as well
      const user = yield this.APIUser.findBy('username', username)
      yield user.delete()

      return response
    } else {
      throw new Exceptions.ApplicationException(`Unable to delete user ${username}`, 400)
    }
  }

  * register (username, email, password) {
    const payload = {
      username: username,
      email: email,
      password: password
    }
    // console.log('payload:', payload)

    const response = yield this.send('post', `${URL}/auth`, payload)
    // console.log('register response: ', response)

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
  }

  * authenticate (username, password) {
    const payload = {
      password: password 
    }    
    const response = yield this.send('post', `${URL}/auth/${username}`, payload)
    if (response.status === 'ok') {
      try {
        console.log('findByOrFail:', response.data)
        const prev = yield this.APIAuth.findByOrFail('username', username, function() {
          throw new Exceptions.ApplicationException('Unable to logging you in, please try after some time', 400)
        })
        prev.token = response.data.token
        console.log('Saving a previous record: findByOrFail -', prev)
        yield prev.save()
        return yield this.APIAuth.find(prev.id)

      } catch(e) {
        console.log('Creating new auth record')
        const auth = new this.APIAuth()
        auth.username = username
        auth.token = response.data.token
        yield auth.save()
  
        if (auth.isNew()) {
          throw new Exceptions.ApplicationException('Unable to logging you in, please try after some time', 400)
        }
        return yield this.APIAuth.find(auth.id)                
      }      
    }
  }

  * getToken(username) {
    return yield this.APIAuth.findByOrFail('username', username, function() {
      throw new Exceptions.ApplicationException(`Cannot find user with ${field}`, 404)
    })
  }

  * createToken(username, email, password) {
    if (NEED_REG === 'yes') {
      const user = yield this.register(username, email, password)      
    }
    return yield this.authenticate(user.username, password)
  }

  * getUser(username) {
    return yield this.APIUser.findByOrFail('username', username, function() {
      throw new Exceptions.ApplicationException(`Cannot find user with ${field}`, 404)
    })
  }

}

module.exports = APIAuthService
