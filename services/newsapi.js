const NewsAPI = require('newsapi');
const config = require('../config');

class NewsApi {
    constructor() {
        let newsApiConfig = new config().getNewsApiConfig()
        this.newsapi = new NewsAPI(newsApiConfig.apiKey);
    }
    getNews() {
        let news = this.newsapi.v2.everything({ q: 'twitter' })
        return news;
    }
}

module.exports = NewsApi