const Cloudant = require('@cloudant/cloudant')
const Config = require('../config')

var mydb;

class CloudantDB {
    constructor() {
        const appEnv = new Config().getAppEnv()
        this.cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
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

    checkDuplicates(news) {
        const selector = { selector: { title: news.title } };
        mydb.find(selector, (err, result) =>{
            console.log(err);
            console.log(result);
            if(err) return false;
            if(result) return false
        })
    }
}

module.exports = CloudantDB