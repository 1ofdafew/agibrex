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

    if (Env.get('MODE') === 'production') {
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
  }

  debug(...msg) {
    this.logger.debug(msg)
  }

  info(...msg) {
    this.logger.info(msg)
  }

  warn(...msg) {
    this.logger.warn(msg)
  }

  error(...msg) {
    this.logger.error(msg)
  }

  logger(type, ...msg) {
    this.logger.logger(type, msg)
  }

}

module.exports = LogService

