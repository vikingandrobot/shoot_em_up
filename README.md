# Shoot'Em Hub

The game where your hard work actually pays off.

## The project

Shoot'Em Hub is a project developed at the School of Management and Engineering Vaud (HEIG-VD). It's a Web 
application thought for GitHub users all around the world. The user connects to the website using his 
GitHub account and can play a cool game on one of the repository he's collaborating to. 

The advantages he has in the game are chosen based on his participation to said repository. The harder you work, the more fun you'll have ! 

## Installation

You want to deploy this application on your server? First, you need to create and register an OAuth App on Github.
You can just follow this guide : [Creating an OAuth App](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/).

Afterward, you can get the application code : 

```
$ git clone https://github.com/vikingandrobot/shoot_em_up.git
$ cd shoot_em_up
```

When this step is done, you have to create `.env` file in the application root folder. You have an example `.env.example` that contains 
the required fields.

```
PORT= // Port of the application
GH_BASIC_CLIENT_ID= // Your Github client ID (Do not store this value in any public place)
GH_BASIC_SECRET_ID= // Your Github secret ID (Do not store this value in any public place)
```

**Docker**

You like Docker? This repository comes with a Docker configuration. It contains a `Mongo` and a `NodeJs` containers.

```
$ cd docker
$ docker-compose up --build
```

Prerequisites for Docker:
+ [Docker](https://www.docker.com/get-docker)
+ [Docker Compose](https://docs.docker.com/compose/install/)

You can now access to the application via: [http://localhost:yourport](http://localhost:yourport)
