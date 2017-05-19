'use strict'

const Lucid = use('Lucid')
const uuidV4 = require('uuid/v4');

class Profile extends Lucid {
  
  constructor(data) {
    super()

    console.log(`Profile data: ${data.name}`)
    console.log(JSON.stringify(data))

    this.uuid = uuidV4()
    this.name = data.name
    this.email = data.email
    this.tel_no = data.tel_no 
    this.addrs = data.addrs 
  }  

  static get visible(){
    return ['id', 'uuid', 'name', 'email', 'tel_no', 'addrs']
  }

  // profile () {
  //   return this.hasOne('App/Model/Profile')
  // }

}

module.exports = Profile
