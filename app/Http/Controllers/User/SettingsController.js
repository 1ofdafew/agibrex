'use strict'

class SettingsController {

  * profile (request, response) {
    yield response.sendView('user.profile')
  }

  * changePassword (request, response) {
    yield response.sendView('user/changePasswd')
  }
  
}

module.exports = SettingsController
