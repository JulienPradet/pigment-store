const chalk = require('chalk')

const typeToColor = {
  error: chalk.red,
  warn: chalk.yellow,
  log: chalk.white,
  info: chalk.gray,
  debug: chalk.blue,
  success: chalk.green
}
const typeToTitleColor = {
  error: chalk.white.bgRed.bold,
  warn: chalk.black.bgYellow.bold,
  log: chalk.black.bgWhite.bold,
  info: chalk.white.bgBlack.bold,
  debug: chalk.bgBlue.white.bold,
  success: chalk.bgGreen.white.bold
}

let longestTitle = 10

const message = (subject) => (type, string) => {
  if (!typeToColor.hasOwnProperty(type)) {
    console.log(typeToColor.warn(`Type ${type} is not defined as logging type`))
    type = 'info'
  }

  if (subject.length < longestTitle) {
    const appendChar = ' '
    while (subject.length < longestTitle) {
      subject = appendChar + subject
    }
  } else {
    longestTitle = subject.length
  }

  console.log(typeToTitleColor[type](subject + ' ') + ' ' + typeToColor[type](string))
}

module.exports = function logger (subject) {
  return {
    message: message(subject)
  }
}
