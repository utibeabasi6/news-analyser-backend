var cfenv = require("cfenv")
var vcapLocal = require('./vcap-local.json');

class Config {
    // Get global app configuration
    getAppEnv() {
        const appEnvOpts = vcapLocal ? { vcap: vcapLocal } : {}
        const appEnv = cfenv.getAppEnv(appEnvOpts)
        return appEnv
    }

    // Get configuration for the news api
    getNewsApiConfig() {
        return {
            apiKey: process.env.NEWS_API_APIKEY
        }
    }

    getNaturalLanguageConfig(){
        return {
            apiKey: process.env.NATURAL_LANGUAGE_APIKEY
        }
    }
getToneAnalyserConfig(){
    return {
        apiKey: process.env.TONE_ANALYSER_APIKEY
    }
}

}

module.exports = Config