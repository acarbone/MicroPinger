# MicroPinger

Application written in a Microservice Architecture fashion which the aim is to register multiple health checks for web resources and release a Slack notification in case of errors.

The application is composed of multiple services to ensure loosely coupled business logic and technology agnostic solutions.

![alt text](https://github.com/acarbone/MicroPinger/raw/master/MicroPinger-Architecture.png)

## Pinger

The main responsibility of the Pinger microservice is to offer a CRUD REST API for managing the health checks.
Each health check is scheduled with an inner crontab system and the result is logged within the database.
In case of an error status code being returned the pinger generates a message for communicating the error.

The service is built using NodeJS and uses a MongoDB service as database and a Redis service to publish a message within its pubsub system.

## Notifier

This micro (very micro) service has been developed in Python and keeps listening for a message published from the Redis service and generates a Slack Notification whenever it happens.


The communication between the services is ensured by the Redis pubsub system and is structured following the event based approach.
