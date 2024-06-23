#!/usr/bin/env node

var amqp = require("amqplib/callback_api");
const ExchangeType = {
  FANOUT: "fanout",
  DIRECT: "direct",
  TOPIC: "topic",
  HEADERS: "headers",
};
require("dotenv").config();
const host = process.env.RABBIT_HOST;
//then connect to RabbitMQ server
amqp.connect(`amqp://${host}`, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    var exchangeName = "logs";

    channel.assertExchange(exchangeName, ExchangeType.FANOUT, {
      durable: false,
    });

    channel.assertQueue(
      "",
      {
        exclusive: true,
      },
      function (error2, q) {
        if (error2) {
          throw error2;
        }
        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          q.queue
        );
        channel.bindQueue(q.queue, exchangeName, "");

        channel.consume(
          q.queue,
          function (msg) {
            if (msg.content) {
              console.log(" [x] %s", msg.content.toString());
            }
          },
          {
            noAck: true,
          }
        );
      }
    );
  });
});
