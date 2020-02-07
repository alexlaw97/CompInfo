const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')
const mongoose = require('mongoose')
const app = express()
const NewsAPI = require('newsapi')
const nodemailer = require("nodemailer")
const apikey = "577b0d2c8e9e4d579ed70cdc9a09aba0";
const newsapi = new NewsAPI('577b0d2c8e9e4d579ed70cdc9a09aba0');
var username = 'contributor477@gmail.com';
var password = 'Contributor123~';
const db = "mongodb+srv://admin:abc0123@cluster0-k1y0a.mongodb.net/CompInfo?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000
const countries = ["my","id"];

  // Mongodb connection
  mongoose.connect(db).then(() => { 
    console.log('connected');
  })

  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))


  app.get('/', (req, res) => res.render('pages/index'))

    // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: username,
    //     pass: password
    //   }
    // });
    
    // var mailOptions = {
    //   from: username,
    //   to: 'robotboss1997@gmail.com, wei.jing.law@intel.com',
    //   subject: 'Warning ',
    //   text: "Hi testing 1 2"
    // };
    
    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
        
    //   }
    // });

  app.post('/delete', (req,res) => {
    var info = require('./articledb');
    info.remove({})
    .then((response) => {
      console.log("Done");
    })
  })

  //   window.setInterval(function(){ // Set interval for checking
  //     var date = new Date(); // Create a Date object to find out what time it is
  //     if(date.getHours() === 10 && date.getMinutes() === 55){ // Check the time
  //         console.log("reach");
  //     }
  // }, 60000); // Repeat every 60000 milliseconds (1 minute)

  function intervalFunc() {
    var date = new Date(); // Create a Date object to find out what time it is
        if(date.getHours() === 13 && date.getMinutes() === 13){ // Check the time
          var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: username,
                pass: password
              }
            });
            
            var mailOptions = {
              from: username,
              to: 'robotboss1997@gmail.com',
              subject: 'Warning ',
              text: "Hi testing 1 2"
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
                
              }
            });
        }
    }
    setInterval(intervalFunc,30000);

  app.post('/searchnews', (req,res) => {
    var compname = req.body.comp;
    var county = req.body.cty;
    var news = [];
    var array = [];
    var obj = [];
    // To query everything
    // newsapi.v2.topHeadlines({
    //   q: compname,
    //   // category : 'health',
    //   country: countries
    // }).then(response => {
    //   // console.log(response);
    //   if(response == null){
    //       console.log("error");
    //   }
    //   else{
    //       const querykeys = Object.keys(response.articles);
    //       // console.log(querykeys);
    //       for(var x=0;x < querykeys.length; x++) {
    //         var totalresult = response.totalResults;
    //         var sourcename = response.articles[x].source.name;
    //         var author = response.articles[x].author;
    //         var title = response.articles[x].title;
    //         var desc = response.articles[x].description;
    //         var url = response.articles[x].url;
    //         var img = response.articles[x].urlToImage;
    //         var date = response.articles[x].publishedAt;
    //         var content = response.articles[x].content;
    //         news = [{
    //             "total" : totalresult,
    //             "source" : sourcename,
    //             "author" : author,
    //             "title" : title,
    //             "desc" : desc,
    //             "url" : url,
    //             "img" : img,
    //             "date" : date,
    //             "content" : content
                
    //         }]
    //       array.push(news);
    //       }
    //   res.send(array);
    //   }   
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
  // });
   
    // for(y=0; y < 2; y++){
      const querystr = `https://newsapi.org/v2/everything
      ?q=${compname}&apiKey=${apikey}`;
      axios.get(querystr).then((response) => {
        // obj = Object.assign(obj, response.data);
        // console.log(response.data);
        if(response == null){
                console.log("error");
            }
        else{
          const querykeys = Object.keys(response.data.articles);
          for(var x=0;x < querykeys.length; x++) {
            var totalresult = response.data.totalResults;
            var sourcename = response.data.articles[x].source.name;
            var author = response.data.articles[x].author;
            var title = response.data.articles[x].title;
            var desc = response.data.articles[x].description;
            var url = response.data.articles[x].url;
            var img = response.data.articles[x].urlToImage;
            var date = response.data.articles[x].publishedAt;
            var content = response.data.articles[x].content;
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
          // response.data = {Countre : country};
          // console.log(y);
          // if(obj.length > 1){
          //   obj.pop();
          //   obj.push(response.data);
          // }
          // else{
          //   obj.push(response.data);
          // }
          // var cty;
          // if(county == "au"){
          //   cty = "Australia";
          // }
          // else if(county == "cn"){
          //   cty = "China";
          // }
          // else if (county == "hk"){
          //   cty = "Hong Kong"
          // }
          // else if (county == "in"){
          //   cty = "India";
          // }
          // else if (county == "id"){
          //   cty = "Indonesia";
          // }
          // else if (county == "jp"){
          //   cty = "Japan";
          // }
          // else if (county == "my"){
          //   cty = "Malaysia";
          // }
          // else if (county == "nz"){
          //   cty = "New Zealand";
          // }
          // else if (county == "ph"){
          //   cty = "Philippines";
          // }
          // else if (county == "sg"){
          //   cty = "Singapore";
          // }
          // else if (county == "za"){
          //   cty = "South Africa";
          // }
          // else if (county == "kr"){
          //   cty = "South Korea"
          // }
          // else if (county == "tw"){
          //   cty = "Taiwan";
          // }
          // else if (county == "th"){
          //   cty = "Thailand";
          // }
          var info = require('./articledb');
          inf = new info({
            keyword : compname,
            info : response.data
          })
          inf.save().then((result) => {
            console.log("done");
          })
      }   
    })
  // }
  
  
  
})

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
