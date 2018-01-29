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
The authorization callback URL is `http://<yourdomain>:<yourport>/callback`. For example, with the docker setup we used during development, our callback URL was `http://localhost:9090/callback`. 

Afterward, you can get the application code : 

```
$ git clone https://github.com/vikingandrobot/shoot_em_up.git
$ cd shoot_em_up
```

When this step is done, you have to create `.env` file in the application root folder. You have an example `.env.example` that contains 
the required fields.

```
PORT= // Port of the application you'd like to use
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

You can now access to the application via: [http://<yourdomain>:<yourport>](http://<yourdomain>:<yourport>)

## About

### Gamification

The gamification is achieved in this project because the player's level in the game is decided according to his
commit contribution on the repository he's playing on. The more commits the player has made, the more powerful his
weapons will be. 

The game is actually kind of hard on the long run, and having the most powerful weapons is actually a great help
to last more than a few minutes. 

#### Calculation of the player's level

The server calculates the mean commit contribution for the repository

```
mean commit contribution = (total number of commits) / (number of contributors)
```

Then the player contribution is calculated relative to said mean

```
player contribution relative to the mean = (player number of commits) / (mean commit contribution)
```

Then the level of the player is given in percent of commits to the mean. The minimum is -100% (when the player has 0 commit)
and the maximum is infinite, but the level max in the game is reached when you have +100% commits (that is two times more commits than the mean).

```
player's level = (player contribution relative to the mean) - 1
```

The player's level is then mapped to the power of weapons as such (1 is weakest, 5 is most powerful): 

- [-100%, -50%[ : 1
- [-50%, +0%[ : 2
- [+0%, +50%[ : 3
- [+50%, +100%[ : 4
- [+100%, +infinite[ : 5

### Improvements

Even though we are pretty happy about the result of this project, there are many things we'd like to improve in the future. 

#### Game

- Add a boss fight
- Add some fine tuning on enemy waves
- Add a game logic check on the server side to prevent cheating

#### Application

- Decide the player's level on more information than just the commit contribution
- Check score inputs from the player

#### Security

- To inform ourselves about security issues with the application 

### Assets

- The pictograms and logos (such as the rocket pictogram or the GitHub logo) come from the [iconsmonstr.com](https://iconmonstr.com) website. 

- The music in the game is [Arcade Music Lopp](https://freesound.org/people/joshuaempyre/sounds/251461/) 
by [joshuaempyre](https://freesound.org/people/joshuaempyre/) licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).

- All other assets such as game sprites were created by us.
