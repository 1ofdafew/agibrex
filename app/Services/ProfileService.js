'use strict'

const Database = use('Database')
const uuid = require('uuid/v4');


class ProfileService {

  /**
   * injecting required dependencies auto fulfilled
   * by IoC container
   *
   * @return {Array}
   */
  static get inject () {
    return ['App/Model/Profile']
  }

  /**
   * Constructor
   * @param {Profile} - The Profile model
   */
  constructor (Profile) {
    this.Profile = Profile
  }

  //show all data profile user
  * showAll() {
    return yield Database.table('profiles')
  }

  // => insert data profile user
  * store (name, email, mobile_no, address) {
  	const profile = new this.Profile()
  	console.log('Profileservice data....')
  	console.log(name)

  	profile.uuid = uuid()
  	profile.name = name
    profile.email = email
    profile.mobile_no = mobile_no
    profile.address = address

    yield profile.save()
  }

  //=>show some data profile 
  * show(){
    return yield Database
    .table('profiles')
    .select('name', 'email', 'mobile_no', 'address')
    .where({ id: id})
  }

  //=>update data email, mobile_no, address 
  * update (email, mobile_no, address){
  	const updateRow = yield Database
    .table('profiles')
    .where({ id: id})
    .update('email', email)
    .update('mobile_no', mobile_no)
    .update('address', address)
  }
}

module.exports = ProfileService