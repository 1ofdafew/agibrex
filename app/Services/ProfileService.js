'use strict'

const Database = use('Database')
const uuid = require('uuid/v4');


class ProfileService {

  static get inject () {
    return ['App/Model/Profile']
  }

  constructor (Profile) {
    this.Profile = Profile
  }

  * showAll() {
    return yield Database.table('profiles')
  }


  * store (name, email, mobile_no, address) {

  	//const profile = new this.Profile()
  	const profile = new this.Profile()
  	console.log('Profileservice data....')
  	console.log(name)
	  console.log(email)
	  console.log(mobile_no)
	  console.log(address)

  	profile.uuid = uuid()
  	profile.name = name
    profile.email = email
    profile.mobile_no = mobile_no
    profile.address = address

	
     yield profile.save()
  }

  * show(){

    return yield Database
    .table('profiles')
    .select('name', 'email', 'mobile_no', 'address')
    .where({ id: id})
    
  }

  *update (email, mobile_no, address){

  	const updateRow = yield Database
    .table('profiles')
    .where({ id: id})
    .update('email', email)
    .update('mobile_no', mobile_no)
    .update('address', address)
  }
}

module.exports = ProfileService
