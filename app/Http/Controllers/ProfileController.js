'use strict'

const Profile = use('App/Model/Profile')

class ProfileController {

   * index (request, response) {
      // yield response.sendView('profile')
      // response.ok(profile)
      const profile = yield Profile.all()
      response.json(profile)
    }
  

    * store(request, response) {
      const data = request.only(['name', 'email', 'tel_no', 'addrs'])
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

      * show (request, response) {
        const data = request.post()

         yield response.sendView('profile',  { characters: characters })
      }


  }

module.exports = ProfileController
