const path = require('path')
const chalk = require('chalk')
module.exports = async (client) => {
    client.languages = require('i18n')

    client.languages.configure({
        locales: ['en', 'es'],
        directory: path.join(__dirname, "..", "locales"),
        defaultLocale: 'en',
        retryInDefaultLocale: true,
        objectNotation: true,
        register: global,

        logWarnFn: function (msg){
            console.log(chalk.yellow.bold(`WARN\n\n${msg}`))
        },
        logErrorFn: function (msg){
            console.log(chalk.red.bold(`ERROR\n\n${msg}`))
        },
        missingKeyFn: function (value){
            console.log(chalk.yellowBright.bold(`${value}`))
        },
        
        mustacheConfig: {
            tags: ["{{", "}}"],
            disable: false
        }
    })
}