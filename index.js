const http = require('http')

const express = require('express');
const path = require( 'path' );

const {Server} = require( "socket.io" );

const app = express();
const server = http.createServer(app)

const  io = new Server(server);

// Socket io
io.on("connection", (socket)=>{
    socket.on('userMsg', (msg)=>{
      // console.log(msg);
      io.emit("msg", msg)
    })
})

// Serve static files from the `public
app.use(express.static(path.resolve("./public")))

app.get('/', (req, res)=> {
  return res.sendFile("/public/index.html")
})

server.listen(9000, ()=>{
    console.log('Server running at port 9000');
})