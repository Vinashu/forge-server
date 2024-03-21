# FORGE
FORGE is a framework for managing rewards in gamified environments. It allows users to register rewards and define their release. The framework has an API that receives messages, processes them, and returns rewards.

## Live Demo
It is possible to test FORGE directly online. It is hosted on a free service that goes offline after 10 minutes of inactivity. The server works again as soon as a request is made to it.

### FORGE
<img src="docs/images/forge-ui-reward.png" style="display: block; margin: 10px auto; width: 75%;" />

The FORGE Framework: [https://forge-server-example.herokuapp.com/](https://forge-server-example.herokuapp.com/)

### FORGE-app
There is an online educational application that uses the framework (FORGE-app):

<img src="docs/images/forge-app.png" style="display: block; margin: 10px auto; width: 75%;" />

The Forge App: [https://forge-app-example.herokuapp.com/](https://forge-app-example.herokuapp.com/)

### FORGE-game
There is also an on-line game made with Unity that uses FORGE and can be accessed here:

<img src="docs/images/forge-game.png" style="display: block; margin: 10px auto; width: 75%;" />

[https://vinashu.github.io/forge-game/](https://vinashu.github.io/forge-game/)


## Features
- A single-page application to manage the framework.
- Backend with protected routes that serve as an intermediary between the Frontend and the Framework.
- A REST API.
- Two sample applications, FORGE-app and FORGE-game.

## Installation
The framework can be installed locally or on a remote server. 

### Cloning or Downloading the source code
The first step is to clone or download the source code. To clone it, open a terminal on your computer and use the command:

```bash
git clone https://github.com/Vinashu/forge-app.git
```

Alternatively, you can visit the repository, click the "code" button and then click Download ZIP.

<img src="docs/images/not_found.png" style="display: block; margin: 10px  auto; width: 50%;" />

After downloading it, you must unzip the file before using it. You don't need this step if you have cloned the repository.

```bash
unzip forge-app-main.zip
```

### Local Installation
The application is divided into two parts, the Backend, where all the communication and framework logic is located, and the Frontend, which is an application created to manage the framework. To install FORGE, it is necessary to install the Backend, install the Frontend, generate the static pages and create the config file.

#### Installing the Backend
In the root of the application directory, use the command:
```bash
npm install
```
This process will download all libraries and other dependencies. The process may take a few minutes.

#### Installing the Frontend
Enter the frontend directory and use two commands, one to install the dependencies and the other to generate the static pages:
```
cd frontend
npm install
npm build
```

#### Creating the .env File
The application needs a configuration file called **.env**. As this file contains sensitive content, it is unavailable in the repository. You can create your file using the Mac terminal:
```bash
touch .env
```

or on Windows:
```dos
copy con .env
```

The **.env** file must have the following pairs of variables and values:
```
NODE_ENV = production
PORT = 4500
JWT_SECRET = SEQUENCE_OF_NUMBERS_AND_CHARACTERS
ATLAS_L = online_database_name
ATLAS_P = online_database_password
MONGO_URI_CLOUD = mongodb+srv://YOUR_LOGIN:YOUR_PASSWORD@merncluster.gdqnr.mongodb.net/forgeApp?retryWrites=true&w=majority
MONGO_URI = mongodb://127.0.0.1:27017/forgeServer
FORGE_URI = http://localhost:4500
```

- **NOD_ENV** can have two values: **production** or **development**. The backend is ready to run if the value is set to **production**. You can run the application for tests if it is set to **development**.

- **PORT** accepts a numeric value and sets the port for which the server will be listening for requests. In this example, the port is set to **4500**.

- **JWT_SECRET** is used to encrypt the token to validate the communication between the Frontend and the Backend. Use a long sequence of numbers and letters without blank spaces.

- **MONGO_URI** is the address of a local MongoDB database, usually used when under development.

- **MONGO_URI_CLOUD** is the address of the online database hosted by MongoDB. You must add your login (**YOUR_LOGIN**) and password (**YOUR_PASSWORD**) to URI.

- **FORGE_URI** is the address of the FORGE framework. It can be on your local machine, for example, or on the internet.

#### Run the Server
The last step is to start the server:
```bash
npm run start
```

### Online Deployment
You can alternatively run FORGE in the cloud. If you want to create a free MongoDB Atlas account, read this article:
[https://www.mongodb.com/docs/atlas/getting-started/](https://www.mongodb.com/docs/atlas/getting-started/)

If you want to deploy FORGE directly from your git repository, follow the steps in this article:
[https://devcenter.heroku.com/articles/github-integration](https://devcenter.heroku.com/articles/github-integration)

You can also edit config vars from your app’s Settings tab in the Heroku Dashboard:
[https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard](https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard)
