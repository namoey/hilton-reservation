# Getting Started with hilton-reservation

## Introduction
This is a POC project to show the basic flow of the guest reservation. This includes:
* Basic user managemant with very basic roles like, Guest, Admin, Guest can make the reservation and delete before it's confirmed by Admin. Admin users can view reservations from all Guest users and have the full control of the records while a Guest can only view reservations created by their own.
* Basic jwt-token-based authorization implemented, all api call need the credential
* Basic graphql layer implemented, it's not a replacement of Restful api, it act as a gateway on top the the exiting Resful api.
* Docker support for reservation-server

### reservation-server (port: 4000)
This is a Node express server that provides Restful api for User and Reservation management

Basic URL: http://localhost:4000

<img width="207" alt="image" src="https://user-images.githubusercontent.com/8122026/176870136-c52e5518-0c2f-4f65-8d3e-88c72affb708.png">

### reservation-page (port: 3000)
This is a React single page app for guests and administrations to manage reservations

### reservation-graphql (port: 9000)
This is a graphql implementation built on top of the Restful api. userId here is a optional parameter.

```
query{
  greeting
  reservations(userId: "62bead6ca3826373578d074f") {
    userId,
    tableSize,
    arrivalTime,
    status
  }
}
```

## 3rd party packages

yarn add typescript -g  // Support typescript

yarn add express  // For Restful api

yarn add cors // Cross-Origin Resource sharing

yarn add mongoose  // For mongdb

yarn add -D @types/node @types/express @types/mongoose @types/cors  //install type support

yarn add -D concurrently nodemon

yarn add date-fns //For date processing

yarn add jsonwetoken

yarn add bcryptjs //For encryption

yarn add react-toastify //A fancy light-weight toast package


## Enrionment Preparing
### Mongodb setup
docker run --name mongodb -d -p 27017:27017 -v /data/db mongo
### Run reservation-server
yarn dev
### Create two users via user api
http://localhost:4000/user/add

Guest user:
```
{
    "userName": "user",
    "userType": 0,
    "phone": "111",
    "password": "123"
}
```
Admin user:
```
{
    "userName": "admin",
    "userType": 1,
    "phone": "111",
    "password": "123"
}
```
### Run reservation-page
yarn start

<img width="830" alt="image" src="https://user-images.githubusercontent.com/8122026/176872446-c843591a-15f0-4eb3-9b5e-2a563755d377.png">

After login, Guest user can make the reservation

<img width="840" alt="image" src="https://user-images.githubusercontent.com/8122026/176872628-91be50aa-b8ef-4927-8db3-57b7e5baf893.png">

Admin users can Confirm the reservation

<img width="839" alt="image" src="https://user-images.githubusercontent.com/8122026/176872816-89668c2e-0976-4d54-a82a-8c9d69782e14.png">

### Run reservation-graphql
yarn start

We can user [Graphql Playground](https://github.com/graphql/graphql-playground) or Postman to try with graphql

<img width="1197" alt="image" src="https://user-images.githubusercontent.com/8122026/176873499-759e4520-fe9c-4835-86e6-28bb8de3747e.png">

### Deploy to Docker
Docker file already created for reservation-server, we can build image and deploy via vscode easily.

<img width="1047" alt="image" src="https://user-images.githubusercontent.com/8122026/176874172-df3a4ebb-71fb-4757-b592-786fb38e1613.png">

# What need to be improved
Since this is a POC project and definitely there are lots of points need to improve
* User management and auth system should be better and the approaval process should be much more complicated in real life
* Better interactive UI should be designed, at list we should have pagenization for Admin view
* Server side optization should be concerened to serve high concurrency
* Unit test should be added
* Better log middleware should be involved maybe instead of morgan
