'use strict'

class DashboardController {

  /**
   * main dashboard page
   *
   * @param {object} request
   * @param {object} response
   */
  * index (request, response) {
    try {
      yield response.sendView('dashboard')
    } catch(e) {
      response.redirect('/auth/login')
    }
  }
  
}

module.exports = DashboardController
