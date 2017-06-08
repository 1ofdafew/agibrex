'use strict'

const SecurityService = make('App/Services/SecurityService')

class SecurityController {
  * index (request, response) {
    const user = yield request.auth.getUser()
    const otp_status = user.otp_status
    const sms_status = user.sms_status
    const data = {
      otp_status: otp_status,
      sms_status: sms_status
    }
    yield response.sendView('security.index', data)
  }

  * pick (request, response) {
    const user = yield request.auth.getUser()
    const options = request.only(['method'])
    console.log('Type chosen:', options)

    if (options.method === 'otp') {
      // OTP
      if (user.otp_status === 'enabled') {
        const err = {
          error: 'OTP Authentication is already activated'
        }
        yield request.with(err).flash()
        response.redirect('/security/options')              
      } else {

        // const secret = yield SecurityService.getOrCreateSecret(user)
        // const qrcode = yield SecurityService.getQRCode(secret, user.username)

        // // console.log('QRCode:', qrcode)
        // yield request.with({ qrcode: qrcode }).flash()
        response.redirect('/security/qrcode')      
      }
    } else {
      // SMS
        const err = {
          error: 'SMS Authentication is coming soon'
        }
        yield request.with(err).flash()
        response.redirect('/security/options')                    
    }
  }

}

module.exports = SecurityController
