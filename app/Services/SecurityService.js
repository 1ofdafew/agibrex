'use strict'

const SpeakEasy = use('SpeakEasy')
const QR = require('qr-image')

class SecurityService {

  * getOrCreateSecret(user) {
    if (!user || typeof (user.toJSON) !== 'function') {
      throw new Error('SecurityService expects a valid instance of User Model.')
    }

    if (user.otp_secret === null) {
      var secret = SpeakEasy.generateSecret()
      user.otp_secret = secret.base32
      yield user.save()

      console.log('secret:', secret)
      return secret      
    }
    return user.otp_secret
  }

  * getQRCode(secret, username) {
    // Get the data URL of the authenticator URL
    // otpauth_url: 'otpauth://totp/SecretKey?secret=HFTHGVKREFJEU6Z4JFNEQKKWORJGQTRVJ4UWWMJDMETD4T2LPBDQ' }
    const OTP_URL = `otpauth://totp/${username}:gibrex.com?secret=${secret}`
    console.log('OTP_URL:', OTP_URL)

    return QR.imageSync(OTP_URL, {type: 'svg'})
  }

  * verifyToken(token, user) {
    if (!user || typeof (user.toJSON) !== 'function') {
      throw new Error('SecurityService expects a valid instance of User Model.')
    }

    console.log('token:', token)

    const data = {
      secret: user.otp_secret,
      encodding: 'base32',
      token: token
    }
    console.log('data:', data)
    
    const verified = SpeakEasy.totp.verify(data)
    console.log('verified: ', verified)

    if (verified) {
      user.otp_status = 'enabled'
      yield user.save()
      return true
    }      
    return false
  }
}

module.exports = SecurityService
