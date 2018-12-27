# Chat Room app
Real-time chat room application with Angular, Node.js and Socket.io using mongoDB as database-as-a-Service by mLab.

### Prerequisites

Make sure that you have Node and npm installed.

### Installing

After downloading and extracting or cloning the project follow these instructions:


#### Client

  1. Under `chat-room-app/client/chat-app` run `npm install`.
  2. Make sure you have angular-cli installed globally and then run `ng serve` command.
  
Now angular application will run on `localhost:4200`.

#### Server

  1. Under `chat-room-app/server` run `npm install`
  2. Run `npm start` in order to start express server on port 3000.


Now you can launch [I'm an inline-style link](http://localhost:4200/) from your browser and register to **chat-room-app** 


### Exstras

* Angular Authentication implemented with Http Client and Http Interceptors. this implementation involve user token that sent to server in every request.

* Real-time functionality implemented with socket.io library.

* MongoDB as database-as-a-Service by mLab using mongoose.

## Author

* **Meny Taieb**

