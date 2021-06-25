const express = require("express");
const helmet = require("helmet");
const config = require('./config');
const CloudantDB = require("./services/cloudantdb");
const NaturalLanguage = require("./services/natural-language");
const newsapi = require('./services/newsapi');
const ToneAnalyser = require("./services/tone-analyser");
const parser = require('./utils/parser');
require('dotenv').config();

const app = express();
app.use(helmet());

// Configure services
const appEnv = new config().getAppEnv()
console.log(appEnv.services);

var newsApi = new newsapi()
var db = new CloudantDB();
var newsParser = new parser();
var naturalLanguage = new NaturalLanguage();
var toneAnalyser = new ToneAnalyser();

app.get('/get-news', (req, res) => {
	let news = newsApi.getNews();
	news.then(news =>{
		// parse the news to get only url and description
		let parsedNews = newsParser.parseNews(news);
		// add news to the database
		db.addBulkNews(parsedNews);
		res.json(parsedNews);
	}).catch(err => {
		console.log(err);
		res.json({"error": "Could not fetch news"});
	});
	
});

app.get('/get-analysis', (req, res, next) => {
	let url = req.query.url;
	naturalLanguage.analyzeUrl(url).then(response =>{
		res.json(response.result)
	}).catch(next)
})

app.get('/get-tone-analysis', (req, res, next) =>{
	let description = req.query.description;
	toneAnalyser.analyseDescription(description).then(response => {
		res.json(response);
	}).catch(next);
});


app.listen(appEnv.port, () => {
	console.log(`The server has started on url ${appEnv.url}`);
});
