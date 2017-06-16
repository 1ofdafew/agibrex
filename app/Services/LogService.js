'use strict'

const Env = use('Env')
const winston = require('winston')
require('winston-daily-rotate-file')
const fs = require('fs')

class LogService {
  
  constructor () {
    const logDir = Env.get('LOG_DIR', '/tmp/gibrex-log')
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir)
    }

    if (Env.get('NODE_ENV') === 'production') {
      this.logger = new winston.Logger({
        level: 'info',
        transports: [
          new winston.transports.DailyRotateFile({filename: `${logDir}/agibrex.log`})
        ]
      })
    } else {
      this.logger = new winston.Logger({
        level: 'info',
        transports: [
          (require('winston-color')),
          new winston.transports.Console()
        ]
      })
    }
    //this.logger.info(`Log dir is ${logDir}`)
  }

  debug(...msg) {
    this.logger.log('debug', msg)
  }

  info(...msg) {
    this.logger.log('info', msg)
  }

  warn(...msg) {
    this.logger.log('warn', msg)
  }

  error(...msg) {
    this.logger.log('error', msg)
  }

  log(type, ...msg) {
    this.logger.log(type, msg)
  }

}

module.exports = LogService

