const Cloudant = require('@cloudant/cloudant')
const Config = require('../config')

var mydb;

class CloudantDB {
    constructor() {
        if(process.env.NODE_ENV == 'production'){
            this.cloudant = Cloudant(process.env.VCAP_SERVICES.cloudantNoSQLDB[0].credentials);
        }
        else{
        const appEnv = new Config().getAppEnv()
        this.cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
        }
        this.cloudant.db.create('news', (err) => {
            if (!err) {
                console.log('created db');
            }
        })
        mydb = this.cloudant.db.use('news');
    }

    getNews() {
        return mydb.list()
    }

    addBulkNews(news) {
        mydb.bulk({ docs: news }, function (err, res) {
            if (err) {
                throw err;
            }
            // We do not parse the response for errors as all documents will return a conflict error if they were duplicates
            // This behaviour however is desired as we do not want to save news that is already in the database
            console.log('Inserted all documents');
        })
    }

}

module.exports = CloudantDB