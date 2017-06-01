'use strict'

const Hash = use('Hash')
const uuid = require('uuid/v4');
const Profile = exports = module.exports = {}

//check email
Profile.checkEmail = function * (next) {
  const re = /^hotmail\.com|gmail\.com|live\.com${foo@bar.com}/.exec(this.email)

  const inflect = require('inflect')
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid email address')
  }
  yield next
}

//check mobile number
Profile.checkMobileNo = function * (next) {
  const re = /^(?:(?:|0{1,2}|\+{0,2})41(?:|\(0\))|0)([1-9]\d)(\d{3})(\d{2})(\d{2})$/.exec(this.mobile_no)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid Mobile Number')
  }
  yield next
}