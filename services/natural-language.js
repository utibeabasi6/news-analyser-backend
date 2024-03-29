const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const Config = require('../config');

class NaturalLanguage {
    constructor() {
        const config = new Config()
            let nlConfig = config.getNaturalLanguageConfig()
            this.nlu = new NaturalLanguageUnderstandingV1({
                authenticator: new IamAuthenticator({ apikey: nlConfig.apiKey }),
                version: '2018-04-05',
                serviceUrl: 'https://api.eu-gb.natural-language-understanding.watson.cloud.ibm.com/instances/9ed65066-5926-4a4a-b795-8448ae5c335c'
            });

    }

    analyzeUrl(url) {
        return this.nlu.analyze(
            {
                url: url,
                features: {
                    concepts: {},
                    categories: {},
                    entities: {}
                }
            })
    }

}
module.exports = NaturalLanguage