# What is an API Gateway?

API Gateway is a type of service in a microservice architecture which provides a shared layer and API for clients to communicate with internal services. The API Gateway can **route requests**, transform protocols, **aggregate data** and implement shared logic like authentication and rate-limiters.

> [!NOTE][What is an API Gateway?] (https://blog.risingstack.com/building-an-api-gateway-using-nodejs/)

You can think about API Gateway as the entry point to our microservices world.
Our system can have one or multiple API Gateways, depending on the client's requirements. For example, we can have a separate gateway for desktop browsers, mobile applications and public API(s) as well.

![API Gateway as an entry point to microservices](image.png)
<sup> API Gateway as an entry point to microservices </sup>
