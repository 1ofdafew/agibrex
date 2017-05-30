'use strict'

const SecurityService = make('App/Services/SecurityService')

class SecurityController {
  * index (request, response) {
    yield response.sendView('security.index')
  }

  * pick (request, response) {
    const type = request.only(['method'])
    console.log('Type chosen:', type)
    const user = yield request.auth.getUser()

    const secret = yield SecurityService.getOrCreateSecret(user)
    const qrcode = yield SecurityService.getQRCode(secret, user.username)

    // console.log('QRCode:', qrcode)
    yield request.with({ qrcode: qrcode }).flash()
    response.redirect('/security/qrcode')

  }

}

module.exports = SecurityController
