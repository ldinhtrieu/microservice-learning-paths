#!/usr/bin/env node

//require the library
var amqp = require("amqplib/callback_api");
require("dotenv").config();
const host = process.env.RABBIT_HOST;
//then connect to RabbitMQ server
amqp.connect(`amqp://${host}`, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  //Next we create a channel, which is where most of the API for getting things done resides:
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = "task_queue";
    var msg = process.argv.slice(2).join(" ") || "Hello World!";

    channel.assertQueue(queue, {
      durable: true,
    });
    channel.sendToQueue(queue, Buffer.from(msg), {
      persistent: true,
    });
    console.log(" [x] Sent '%s'", msg);
  });
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
