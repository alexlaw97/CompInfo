const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const apikey = '577b0d2c8e9e4d579ed70cdc9a09aba0'
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('577b0d2c8e9e4d579ed70cdc9a09aba0');
const PORT = process.env.PORT || 5000

  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))


  app.get('/', (req, res) => res.render('pages/index'))

  app.post('/searchnews', (req,res) => {
    var compname = req.body.comp;
    var news = [];
    var array = [];

    // To query everything
    newsapi.v2.everything({
      q: compname,
      // category : 'health'
    }).then(response => {
      // console.log(response);
      if(response == null){
          console.log("error");
      }
      else{
          const querykeys = Object.keys(response.articles);
          // console.log(querykeys);
          for(var x=0;x < querykeys.length; x++) {
            var totalresult = response.totalResults;
            var sourcename = response.articles[x].source.name;
            var author = response.articles[x].author;
            var title = response.articles[x].title;
            var desc = response.articles[x].description;
            var url = response.articles[x].url;
            var img = response.articles[x].urlToImage;
            var date = response.articles[x].publishedAt;
            var content = response.articles[x].content;
            news = [{
                "total" : totalresult,
                "source" : sourcename,
                "author" : author,
                "title" : title,
                "desc" : desc,
                "url" : url,
                "img" : img,
                "date" : date,
                "content" : content
                
            }]
          array.push(news);
          }
      res.send(array);
      }   
    })
    .catch((error) => {
      console.log(error);
    })
  // });
    // const querystr = `https://newsapi.org/v2/everything?sortBy=publishedAt&apiKey=${apikey}&q=${compname}`;
    //     axios.get(querystr).then((response) => {
    //     if(response['data'].track == null){
    //         res.redirect('/error');
    //         }
    //     else{
            // const querykeys = Object.keys(response['data'].track);
            // console.log(querykeys);
            // for(var x=0;x < querykeys.length; x++) {
            //     var totalresult = response.data.totalResults;
            //     var sourcename = response.data.articles[x].source.name;
            //     var author = response.data.articles[x].author;
            //     var title = response.data.articles[x].title;
            //     var desc = response.data.articles[x].description;
            //     var url = response.data.articles[x].url;
            //     var img = response.data.articles[x].urlToImage;
            //     var date = response.data.articles[x].publishedAt;
            //     var content = response.data.articles[x].content;
            //     news = [{
            //         "total" : totalresult,
            //         "source" : sourcename,
            //         "author" : author,
            //         "title" : title,
            //         "desc" : desc,
            //         "url" : url,
            //         "img" : img,
            //         "date" : date,
            //         "content" : content
                    
            //     }]
            //     array.push(news);
            // }
            //     res.send(array);
            // }   
            // })
            // .catch((error) => {
            //     console.log(error);
            // })
  })

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
