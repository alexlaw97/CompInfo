const express = require('express')
const amqp = require('amqplib/callback_api')
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

 

app.post('/delete', (req,res) => {
  var info = require('./articledb');
  info.remove({})
  .then((response) => {
    console.log("Done");
  })
})

app.post('/advanced_search', (req,res) => res.render('pages/index2'))

app.post('/searchnews', (req,res) => {
  var compname = req.body.comp;
  var info = require('./articledb');
  var emdb = require('./emaildb.js');
  var news = [];
  var array = [];
  var old = [];
  
  const querystr = `https://newsapi.org/v2/everything?q=${compname}&apiKey=${apikey}`; //Get Api by link it to the url and api key
  axios.get(querystr).then((response) => {
    array.push(compname);
    if(response == null){
      console.log("error");
    }
    else{
      const querykeys = Object.keys(response.data.articles);
      for(var x=0;x < querykeys.length; x++) { //Reroll all the data into an array 
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
  //     inf = new info({
  //       keyword : compname,
  //       info : response.data
  //     })
  //     inf.save().then((result) => {
  //       var tdydate = new Date();
  //       tdydate.setHours(tdydate.getHours() + 8); //Set timezone to GMT + 8
  //       emdb
  //       .find()
  //       .sort({"_id":-1})
  //       .limit(1)
  //       .then((response) =>{
  //         if(response.length > 0){
  //           lasdate = response[0].date;
  //           id = response[0]._id;
  //           var Diff_in_time = lasdate.getTime() - tdydate.getTime();
  //           var Diff_in_days = Diff_in_time / (1000*3600*24);
  //           if(Diff_in_days > -7 && Diff_in_days < 1){ //Check whether it is between 7 days 
  //             old = response[0].data;
  //             for(var x = 0; x < old.length;x++){
  //               if(old[x][0] == compname){
  //                 break;
  //               }
  //               if(x == old.length-1){
  //                 old.push(array);
  //               }
  //             }     
  //             emdb.updateOne({
  //               _id : id
  //             },
  //             {
  //               $set:{
  //                 "data" : old
  //               }},
  //             { upsert:true },
  //             function(result){
  //               console.log("done");
  //             })     
  //           }
  //           else{ //else create a new document
  //             old.push(array);
  //             email_db = new emdb({
  //               date : tdydate,
  //               send : "0",
  //               data : old
  //             })
  //             email_db.save().then((result) => {
  //               console.log("done");
  //             })
  //           }
  //         }
  //         else{
  //           old.push(array);
  //           email_db = new emdb({
  //             date : tdydate,
  //             send : "0",
  //             data : old
  //           })
  //           email_db.save().then((result) => {
  //             console.log("done");
  //           })
  //         }
  //       })
  //     })
    }   
  }) 
})

app.post('/search_advanced_news', (req,res) => {
  var compname = req.body.comp;
  var country = req.body.coun;
  res.charset = 'utf-8';
  res.contentType('text');
  var info = require('./articledb');
  var emdb = require('./emaildb.js');
  var news = [];
  var array = [];
  var old = [];
  
  const querystr = `https://newsapi.org/v2/top-headlines?q=${compname}&country=${country}&apiKey=${apikey}`; //Get Api by link it to the url and api key
  axios.get(querystr).then((response) => {
    array.push(compname);
    if(response == null){
      console.log("error");
    }
    else{
      console.log("la" +response.data.articles);
      const querykeys = Object.keys(response.data.articles);
      for(var x=0;x < querykeys.length; x++) { //Reroll all the data into an array 
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
  //     inf = new info({
  //       keyword : compname,
  //       info : response.data
  //     })
  //     inf.save().then((result) => {
  //       var tdydate = new Date();
  //       tdydate.setHours(tdydate.getHours() + 8); //Set timezone to GMT + 8
  //       emdb
  //       .find()
  //       .sort({"_id":-1})
  //       .limit(1)
  //       .then((response) =>{
  //         if(response.length > 0){
  //           lasdate = response[0].date;
  //           id = response[0]._id;
  //           var Diff_in_time = lasdate.getTime() - tdydate.getTime();
  //           var Diff_in_days = Diff_in_time / (1000*3600*24);
  //           if(Diff_in_days > -7 && Diff_in_days < 1){ //Check whether it is between 7 days 
  //             old = response[0].data;
  //             for(var x = 0; x < old.length;x++){
  //               if(old[x][0] == compname){
  //                 break;
  //               }
  //               if(x == old.length-1){
  //                 old.push(array);
  //               }
  //             }     
  //             emdb.updateOne({
  //               _id : id
  //             },
  //             {
  //               $set:{
  //                 "data" : old
  //               }},
  //             { upsert:true },
  //             function(result){
  //               console.log("done");
  //             })     
  //           }
  //           else{ //else create a new document
  //             old.push(array);
  //             email_db = new emdb({
  //               date : tdydate,
  //               send : "0",
  //               data : old
  //             })
  //             email_db.save().then((result) => {
  //               console.log("done");
  //             })
  //           }
  //         }
  //         else{
  //           old.push(array);
  //           email_db = new emdb({
  //             date : tdydate,
  //             send : "0",
  //             data : old
  //           })
  //           email_db.save().then((result) => {
  //             console.log("done");
  //           })
  //         }
  //       })
  //     })
    }   
  }) 
})
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
