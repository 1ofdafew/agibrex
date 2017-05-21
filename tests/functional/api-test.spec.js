'use strict'

const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)
process.env.NODE_ENV = 'test';

describe('API Test', function() {

  const URL = 'http://147.135.171.127'

  it('shall print no impl for /auth', function() {
    chai.request(URL)
      .get('/auth')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be('{"error":"enoimpl"}')
        done()
      })
  })

  it('shall allow us to register user', function() {
    const data = {
      username: 'mhishami',
      email: 'mhishami@gmail.com',
      password: 'secret'
    }
    chai.request(URL)
      .post('/auth')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('ok')
        res.body.ok.should.have.property('uuid')
        res.body.ok.should.have.property('username')
        res.body.ok.should.have.property('email')
        res.body.ok.should.have.property('mobile_no')
        res.body.ok.should.have.property('password')
        res.body.ok.should.have.property('created_at')
        res.body.ok.should.have.property('updated_at')
        done()
      })
  })

  it('shall give us the user details', function() {
    chai.request(URL)
      .get('/auth/mhishami')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('ok')
        res.body.ok.should.have.property('uuid')
        res.body.ok.should.have.property('username')
        res.body.ok.should.have.property('email')
        res.body.ok.should.have.property('mobile_no')
        res.body.ok.should.have.property('password')
        res.body.ok.should.have.property('created_at')
        res.body.ok.should.have.property('updated_at')
        done()
      })    
  })

  it('shall give us the authentication token', function() {
    chai.request(URL)
      .post('/auth')
      .send({ passwd: 'secret' })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status').eql('ok')
        res.body.should.have.property('data')
        res.body.data.should.have.property('token')
      })    
  }) 

  it('shall give us the authentication error', function() {
    chai.request(URL)
      .post('/auth')
      .send({ passwd: 'badpass' })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('status').eql('error')
        res.body.should.have.property('message').eql('Invalid username, or password')
      })    
  }) 

})
