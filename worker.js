
const amqp = require('amqplib/callback_api')
const nodemailer = require('nodemailer')
var username = 'contributor477@gmail.com';
var password = 'Contributor123~';

function sendEmailTo(a){
    nodemailer.createTestAccount((err,account) => {
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
            text: a
        };
            
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                    
            }
        });
    })
}

amqp.connect('amqp://hfptilho:Bun-1UDcqu42BFT2RHnHVEkAsZYi3doP@toad.rmq.cloudamqp.com/hfptilho', function(err, conn) {
  
  conn.createChannel(function(err, ch) {
    
    const q = 'email';
    ch.assertQueue(q, { durable: true });
    
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());

    //   let form = JSON.parse(msg.content.toString());
       sendEmailTo(msg.content);
    //   ch.ack(msg);
    }, { noAck: true });
    
  });
});