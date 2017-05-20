'use strict'

const Profile = use('App/Model/Profile')
const Database = use('Database');

class ProfileController {

   * index (request, response) {
      // yield response.sendView('profile')
      // response.ok(profile)
      //const profile = yield Profile.all()
       const profile = yield Database.table('profiles')
      response.json(profile)
    }
  

    * store(request, response) {
      const data = request.only(['name', 'email', 'mobile_no', 'address'])
      console.log('ProfileController data....')
      console.log(data)

          const profile = new Profile(data)
          yield profile.save()
          response.ok(profile)

          // var profileMessage = {
          //     success: 'already save'
          // }

          // yield response.sendView('profile', { profileMessage : profileMessage })
      }

      * show(request, response) {

        const id = request.param("id");

        
        const data = yield Database
        .table('profiles')
        .select('name', 'email', 'mobile_no', 'address')
        .where({id:id})
        // .where({id:id});
        // const profiles = data[0]

        // var request = require('request');
        // request(article.href, function (error, response, body) {
        //   if(!error){
        //     console.log(body)
        //   }
        // })
        // return profiles
        response.json(data)

        }


        * update(request, response) {

          const data=request.only(['id','email','mobile_no','address'])
          console.log('Updating a row....')
          console.log(data)

          const updateRow = yield Database
          .table('profiles')
          .where('id', data.id)
          .update('email',data.email)
          .update('mobile_no', data.mobile_no)
          .update('address',data.address)
          response.ok(updateRow)
          }


  }

module.exports = ProfileController
