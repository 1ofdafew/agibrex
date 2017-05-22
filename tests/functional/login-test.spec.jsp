'use strict'

const assert = require('assert')
const Browser = require("zombie")
require('handle')

describe('Login & Register Tests', function() {

  const browser = new Browser()

  before(function(done) {
    browser.visit('http://localhost:3333/auth/register', done)
  })

  describe('Do register', function() {

    before(function(done) {
      browser
        .fill('username', 'foo')
        .fill('email', 'foo@gmail.com')
        .fill('password', 'secret')
        .pressButton('Register', done)
    })

    it('should be successful', function * () {
      browser.assert.success()
    })

    it('should see email verification page', function * () {
      console.log(browser)
      browser.assert.text('title', 'Confirmation')
    })
  })

})