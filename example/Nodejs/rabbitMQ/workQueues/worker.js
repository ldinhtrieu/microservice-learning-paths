#!/usr/bin/env node

var amqp = require("amqplib/callback_api");
const host = process.env.RABBIT_HOST;
amqp.connect(`amqp://${host}`, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = "task_queue";

    //we need to make sure that the queue will survive a RabbitMQ node restart. In order to do so, we need to declare it as durable true
    channel.assertQueue(queue, {
      durable: true,
    });
    //This tells RabbitMQ not to give more than one message to a worker at a time. Or, in other words, don't dispatch a new message to a worker until it has processed and acknowledged the previous one. Instead, it will dispatch it to the next worker that is not still busy
    channel.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(
      queue,
      function (msg) {
        var secs = msg.content.toString().split(".").length - 1;

        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function () {
          console.log(" [x] Done");
          channel.ack(msg);
        }, secs * 1000);
      },
      {
        // manual acknowledgment mode,
        // see /docs/confirms for details
        noAck: false,
      }
    );
  });
});
