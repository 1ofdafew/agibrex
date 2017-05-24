'use strict'

const Profile = use('App/Model/Profile')
const Validator = use('App/Services/Validator')
const ProfileService = make('App/Services/ProfileService')

const Database = use('Database');

class ProfileController {

  * index(request, response) {
    const profiles =  yield ProfileService.showAll()
    response.json(profiles)
  }


  * store(request, response) {

    const data = request.only('name', 'email', 'mobile_no', 'address')
    yield Validator.validate(data)

    const prfl = yield ProfileService.store(
      data.name, data.email, data.mobile_no, data.address)

    // const data = request.only(['name', 'email', 'mobile_no', 'address'])
    console.log('ProfileController data....')
    // console.log(data)
    console.log(data)
   

    //const profile = new Profile(data)
    //yield profile.save()
    response.json(prfl)

  }

  * show(request, response) {

    // const id = request.param("id");
    // const data = yield Database
    // .table('profiles')
    // .select('name', 'email', 'mobile_no', 'address')
    // .where({ id: id })
    const profiles =  yield ProfileService.show()
    response.json(profiles)

  }


  * update(request, response) {

    const data = request.only('id', 'email', 'mobile_no', 'address')
    yield Validator.validate(data)
    console.log('Updating a row....')
    console.log(data)


    const prfl = yield ProfileService.update(
          data.email, data.mobile_no, data.address)

   // const profile = new Profile(data)
    response.json(prfl)
  }


}

module.exports = ProfileController
