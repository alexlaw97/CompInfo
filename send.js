const amqp = require('amqplib/callback_api');
amqp.connect('amqp://hfptilho:Bun-1UDcqu42BFT2RHnHVEkAsZYi3doP@toad.rmq.cloudamqp.com/hfptilho', function(err, conn) {
  
  conn.createChannel(function(err, ch) {
    const q = 'hello';
    ch.assertQueue(q, { durable: true });
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, 
     new Buffer('Hello World!'),
     { persistent: true }
    );
    console.log(" [x] Sent 'Hello World!'");
  });
});