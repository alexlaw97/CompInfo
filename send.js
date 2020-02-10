const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer')
var username = 'contributor477@gmail.com';
var password = 'Contributor123~';
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


    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: username,
        pass: password
      }
    });
    
    var mailOptions = {
      from: username,
      to: 'robotboss1997@gmail.com, wei.jing.law@intel.com',
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
