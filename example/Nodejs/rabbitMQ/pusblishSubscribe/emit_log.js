#!/usr/bin/env node

var amqp = require("amqplib/callback_api");
require("dotenv").config();
const host = process.env.RABBIT_HOST;
const ExchangeType = {
  FANOUT: "fanout",
  DIRECT: "direct",
  TOPIC: "topic",
  HEADERS: "headers",
};
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
    var msg = process.argv.slice(2).join(" ") || "Hello World!";

    channel.assertExchange(exchangeName, ExchangeType.FANOUT, {
      durable: false,
    });
    //publish with routingKey is Empty
    channel.publish(exchangeName, "", Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
