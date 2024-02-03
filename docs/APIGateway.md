# What is an API Gateway?

API Gateway is a type of service in a microservice architecture which provides a shared layer and API for clients to communicate with internal services. The API Gateway can **route requests**, transform protocols, **aggregate data** and implement shared logic like authentication and rate-limiters.

> source: [What is an API Gateway?][What-is-an-API-Gateway-def]

You can think about API Gateway as the entry point to our microservices world.
Our system can have one or multiple API Gateways, depending on the client's requirements. For example, we can have a separate gateway for desktop browsers, mobile applications and public API(s) as well.

![API Gateway as an entry point to microservices](image.png)

<sup> API Gateway as an entry point to microservices </sup>

[What-is-an-API-Gateway-def]: https://blog.risingstack.com/building-an-api-gateway-using-nodejs/

## Node.js API Gateway for frontend teams

As API Gateway provides functionality fo client applications like browsers - it can be implemented and managed by the team who is responsible for the frontend application.

As JavaScript is the primary language to develop applications for the browser, Node.js can be excellent choice to implement an API Gateway even if your microservices architecture is developed in a different language.

For example: Netflix successfully uses Node.js API Gateway with their Java backend to support a broad range of clients.

![Alt text](netflix-nodejs-api-gateway.png)

<sup>Netflix’s approach to handle different clients</sup>
