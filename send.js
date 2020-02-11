const amqp = require('amqplib/callback_api');
// const nodemailer = require('nodemailer')
// var username = 'contributor477@gmail.com';
// var password = 'Contributor123~';
// amqp.connect('amqp://hfptilho:Bun-1UDcqu42BFT2RHnHVEkAsZYi3doP@toad.rmq.cloudamqp.com/hfptilho', function(err, conn) {
  
//   conn.createChannel(function(err, ch) {
//     const q = 'hello';
//     ch.assertQueue(q, { durable: true });
//     // Note: on Node 6 Buffer.from(msg) should be used
//     ch.sendToQueue(q, 
//      new Buffer('Hello World!'),
//      { persistent: true }
//     );
//     console.log(" [x] Sent 'Hello World!'");
//   });
// });

// amqp.connect('amqp://hfptilho:Bun-1UDcqu42BFT2RHnHVEkAsZYi3doP@toad.rmq.cloudamqp.com/hfptilho', function(err, conn) {
//       conn.createChannel(function(err, ch) {
//         const q = 'email';
//         ch.assertQueue(q, { durable: true });
//         ch.sendToQueue(q, new Buffer('Hello'),{ persistent: true });
//         console.log("Message sent to queue : ", );
//       });
//     });


    // var transporter = nodemailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: 'contributor477@gmail.com',
    //     pass: 'Contributor123~'
    //   }
    // });
    
    // var mailOptions = {
    //   from: username,
    //   to: 'robotboss1997@gmail.com',
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
    var helper = require('sendgrid').mail;
    var from_email = new helper.Email('robotboss1997@gmail.com');
    var to_email = new helper.Email('robotboss1997@gmail.com');
    var subject = 'Hello World from the SendGrid Node.js Library!';
    var content = new helper.Content('text/plain', 'Hello, Email!');
    var mail = new helper.Mail(from_email, subject, to_email, content);
    
    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });
    
    sg.API(request, function(error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });