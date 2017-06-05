'use strict'

const UserService = make('App/Services/UserService')

class RobotTraderService {

  constructor() {
    // check if robot user is already exists
    try {
      const user = UserService.findByOrFail('username', 'robot')
    } catch (e) {
      // user not there
      const robot = UserService.register(
          'robot', 'robot@gibrex.com', 'secret')
    }
  }

  * makeOrderBook () {
  }

}

module.exports = RobotTraderService

