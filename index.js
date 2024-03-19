const express = require('express');
// const { Socket } = require('node:dgram');
const { createServer } = require('node:http')
const { join } = require('node:path')
const { Server } = require('socket.io')

const app = express();
const server = createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
} )

io.on('connection', (Socket)=>{
    console.log('a user connected');
    Socket.on('chat message', (msg)=>{
        io.emit('chat message', msg)
    })
})

server.listen(3000, ()=>{
    console.log('Server running at port 3000');
})