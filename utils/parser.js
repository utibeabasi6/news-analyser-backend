class Parser{
    parseNews(news){
       let parsedNews =  news.articles.map(news =>{
           let newsObject = {}
           newsObject.url = news.url
           newsObject.description = news.description
           newsObject.title = news.title
           newsObject.image = news.urlToImage
           newsObject._id = this.getNewsId(news.title)
           return newsObject
       })
       return parsedNews;
    }

    getNewsId(title){
        return title.split(' ').join('-')
    }
}



module.exports = Parser