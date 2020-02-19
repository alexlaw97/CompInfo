// const amqp = require('amqplib/callback_api');
const mongoose = require('mongoose')
const db = "mongodb+srv://admin:abc0123@cluster0-k1y0a.mongodb.net/CompInfo?retryWrites=true&w=majority";
const nodemailer = require('nodemailer')
var username = 'contributor477@gmail.com';
var password = 'Contributor123~';
// amqp.connect('amqp://hfptilho:Bun-1UDcqu42BFT2RHnHVEkAsZYi3doP@toad.rmq.cloudamqp.com/hfptilho', function(err, conn) {
  // Mongodb connection
mongoose.connect(db).then(() => { 
  console.log('connected');
})

    var date = new Date();
    var emdb = require('./emaildb.js');
    var title = [];
    var msg_title = [];
    var msg_desc = [];
    var msg_url = [];
    var msg = [];
    msg.length = 0;
    
    emdb
    .find()
    .sort({"_id":-1})
    .limit(1)
    .then((response) =>{
      for(var x = 0; x < response[0].data.length; x++){   
        msg_title.length = 0;
        msg_desc.length = 0;
        msg_url.length = 0; 
        // title.push(response[0].data[x][0]);
        title = response[0].data[x][0];
        upper_title = title.toUpperCase();
        // msg.push(titles);
        for(var y = 1; y < response[0].data[x].length; y++){
          msg_title.push(response[0].data[x][y][0].title);
          msg_desc.push(response[0].data[x][y][0].desc);
          msg_url.push(response[0].data[x][y][0].url); 
        }
        nodemail(upper_title,msg_desc,msg_title,msg_url);
      }
      
    
    if(date.getHours() === 13 && date.getMinutes() === 12){
      send_email(title);
    }
    })
  
  function nodemail(upper_title,msg_desc,msg_title,msg_url){
    var msg_desc = msg_desc;
    var msg_title = msg_title;
    var msg_url = msg_url;
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
      subject: "Topic :" +upper_title,
      html : "Hi Thomas," + extract(msg_desc,msg_title,msg_url)
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        console.log("error : " + JSON.stringify(error));
        console.log("info : " + JSON.stringify(info))
        return process.abort();
      } else {
        console.log('Email sent: ' + info.response);
        return process.abort();
      }
    });
  }
  
  function extract(msg_desc,msg_title,msg_url){
    var desc = [];
    var title = [];
    var url = [];
    desc = msg_desc;
    title = msg_title;
    url = msg_url;
   var tags = "";
   for(var x = 0; x < desc.length; x ++){
    tags += "<h3>'"+title[x]+"'</h3><h4>'"+desc[x]+"'</h4><a href='"+url[x]+"'>Link</a><br>"
   }
   return tags;
  }
 
  