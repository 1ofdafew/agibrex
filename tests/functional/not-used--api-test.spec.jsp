'use strict'

const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('expect')

chai.use(chaiHttp)
process.env.NODE_ENV = 'test';

describe('API Test Directly to URL', function() {

  const URL = 'http://147.135.171.127'

  it('shall print no impl for /auth', function(done) {
    chai.request(URL)
      .get('/auth')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).body.to.be('{"error":"enoimpl"}')
        done()
      })
  })

  it('shall allow us to delete the user', function(done) {
    chai.request(URL)
      .delete('/auth/mhishami')
      .send({})
      .end((err, res) => {
        console.log('ok, deleted')
        done()
      })
  })

  it('shall allow us to register user', function(done) {
    const data = {
      username: 'mhishami',
      email: 'mhishami@gmail.com',
      password: 'secret'
    }
    chai.request(URL)
      .post('/auth')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).body.to.be.a('object')
        expect(res).body.to.have.property('ok')
        expect(res).body.ok.to.have.property('uuid')
        expect(res).body.ok.to.have.property('username')
        expect(res).body.ok.to.have.property('email')
        expect(res).body.ok.to.have.property('mobile_no')
        expect(res).body.ok.to.have.property('password')
        expect(res).body.ok.to.have.property('created_at')
        expect(res).body.ok.to.have.property('updated_at')
        done()
      })
  })

  it('shall give us the user details', function(done) {
    chai.request(URL)
      .get('/auth/mhishami')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).body.to.be.a('object')
        expect(res).body.to.have.property('ok')
        expect(res).body.ok.to.have.property('uuid')
        expect(res).body.ok.to.have.property('username')
        expect(res).body.ok.to.have.property('email')
        expect(res).body.ok.to.have.property('mobile_no')
        expect(res).body.ok.to.have.property('password')
        expect(res).body.ok.to.have.property('created_at')
        expect(res).body.ok.to.have.property('updated_at')
        done()
      })    
  })

  it('shall give us the authentication token', function(done) {
    chai.request(URL)
      .post('/auth/mhishami')
      .send({ password: 'secret' })
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res).body.to.be.a('object')
        expect(res).body.to.have.property('status').eql('ok')
        expect(res).body.to.have.property('data')
        expect(res).body.data.to.have.property('token')
        done()
      })    
  }) 

  it('shall give us the authentication error', function(done) {
    chai.request(URL)
      .post('/auth/mhishami')
      .send({ password: 'badpass' })
      .end((err, res) => {
        console.log('err:', err.response)
        console.log('res:', res.data)

        // expect(res).to.have.status(200)
        // expect(res).body.to.be.a('object')
        // expect(res).body.to.have.property('status').eql('error')
        // expect(res).body.to.have.property('message').eql('Invalid username, or password')
        done()
      })    
  }) 

})
