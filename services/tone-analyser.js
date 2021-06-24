const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const Config = require('../config');

class ToneAnalyser {
    constructor() {
        const config = new Config().getToneAnalyserConfig()
        this.toneAnalyzer = new ToneAnalyzerV3({
            version: '2017-09-21',
            authenticator: new IamAuthenticator({
                apikey: config.apiKey,
            }),
            serviceUrl: 'https://api.eu-gb.tone-analyzer.watson.cloud.ibm.com/instances/c080430e-be19-4be4-8e67-505c98acd04a',
        });
    }
    analyseDescription(description){
        return this.toneAnalyzer.tone({toneInput: {text: description}, contentType: 'application/json',})
    }

}

module.exports = ToneAnalyser