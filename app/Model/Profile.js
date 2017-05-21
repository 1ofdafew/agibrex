'use strict'

const Lucid = use('Lucid')
const uuid = use('node-uuid')

class Profile extends Lucid {
  
  constructor(data) {
    super()

    console.log(`Profile data: ${data.name}`)
    console.log(JSON.stringify(data))

    this.uuid = uuid.v1()
    this.name = data.name
    this.email = data.email
    this.mobile_no = data.mobile_no 
    this.address = data.address 
  }  

  static get visible(){
    return ['id', 'uuid', 'name', 'email', 'mobile_no', 'address']
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Profile
