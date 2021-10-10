// Node Server which will handles socket io connection

const { response } = require("express");


const express = require('express');

const app = express();
const socket  = require('socket.io');


const PORT = process.env.PORT || 8000;

const server  = app.listen(PORT, ()=>{
    console.log(`Listning on Port ${PORT}`);

})

const io = socket(server, {
    cors : {
        origin : '*'
    }
});


const users = {};

io.on('connection', socket=>{
    socket.on('new-user-joined',name=>{
        
        console.log("New user" , name);
        if(name != null){
            users[socket.id] = name;
            socket.broadcast.emit('user-joined',name);
        }
       
    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name : users[socket.id]});
    })

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',  users[socket.id]);
        delete users[socket.id];
    })
})