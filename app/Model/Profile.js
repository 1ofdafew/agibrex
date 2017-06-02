'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4');

class Profile extends Lucid {
  
  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'Profile.checkEmail')
    this.addHook('beforeCreate', 'Profile.checkMobileNo')
  }

  static get visible(){
    return ['id', 'uuid', 'name', 'email', 'mobile_no', 'address']
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Profile
