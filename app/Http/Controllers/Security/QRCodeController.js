'use strict'

const SecurityService = make('App/Services/SecurityService')

class QRCodeController {

  * index (request, response) {
    const user = yield request.auth.getUser()
    const secret = yield SecurityService.getOrCreateSecret(user)
    const qrcode = yield SecurityService.getQRCode(secret, user.username)
    yield response.sendView('security.2fa', { qrcode: qrcode })
  }

  * verify(request, response) {
    const otp = request.only(['token'])
    console.log('otp:', otp)

    const user = yield request.auth.getUser()
    const verified = yield SecurityService.verifyToken(otp.token, user)

    if (verified) {
      response.redirect('/security/options')
    } else {
      // need to generate the image again.
      const qrcode = yield SecurityService.getQRCode(user.otp_secret, user.username)
      const errors = {
        error: 'Invalid security token. Please retry again',
        qrcode: qrcode
      }

      yield request.with(errors).flash()
      response.redirect('back')      
    }
    
  }

}

module.exports = QRCodeController
