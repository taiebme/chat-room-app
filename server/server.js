// use predefined env parameters
require('custom-env').env();

const express = require('express');
const bearerToken = require('express-bearer-token');
const bodyParser = require('body-parser');

// import cors in order to handle cross-origin issues
const cors = require('cors');

// using express
const app = express();
const port = process.env.PORT;

// using mongoose in order to communicate mongoDB
const mongoose = require('mongoose');

// reference to express router
const router = express.Router();


// initialize mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI);

// import route modules
const authRoute = require('./routes/auth.route');
const roomRoute = require('./routes/room.route');

// import webSocket
const webSocket = require('./web-socket');

const authController = require('./controllers/auth.controller');


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bearerToken());

// middleware for unauthorized users
app.use(async (req, res, next) => {
    if (req.url.includes('room')) {
        let authorized = await authController.isValidToken(req.token);
        if (authorized) {
            next();
        } else {
            res.status(401).json({message: 'Unauthorized'});
        }
    }else {
        next();
    }

});


// setting rout paths
app.use('/auth', authRoute);
app.use('/room', roomRoute);


// starting the server and storing the returned server variable
const server = app.listen(port, () => {
    console.log("Server started on port " + port + "...");
});


const roomService = require('./services/room.service');

// using socket.io in order to implement real time app
const socket = require('socket.io');

const io = socket.listen(server);


// connection socket.io event
io.sockets.on('connection', (socket) => { /* socket object allows us to join specific clients
                                            to chat rooms and also to catch
                                            and emit the events.*/

    // user joined to room event
    socket.on('joinRoom', (data) => {
        let user = {nickname: data.user.nickname, _id: data.user._id};
        roomService.addUser(data.room, user).then((userAdded) => {
            if (userAdded) {
                socket.join(data.room.id);
                io.in(data.room.id).emit('new user', user);
            }
        });
    });

    // user joined to room event
    socket.on('joinRooms', () => {
        socket.join('rooms');
    });

    // user joined to room event
    socket.on('leaveRoom', (data) => {
        let user = {nickname: data.user.nickname, _id: data.user._id};
        roomService.removeUser(data.room, user).then((userRemoved) => {
            if (userRemoved) {
                io.in(data.room.id).emit('user left', user);
            }
        });
    });

    // new room event
    socket.on('room', (data) => {
        // emitting the 'new room' event to the clients in the room page
        io.in('rooms').emit('new room', {id: data.id, name: data.name});
    });


    // new message event
    socket.on('message', (data) => {
        // emitting the 'new message' event to the clients in that room
        roomService.addMessage(data).then(() => {
            io.in(data.roomId).emit('new message', data.chatMessage);
        });


    });

});

/*
// start websocket listeners
webSocket(server);
*/


