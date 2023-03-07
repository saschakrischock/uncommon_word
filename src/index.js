//serverside

const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getColor, getUsersInRoom, colors } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')




// Object to keep track of user colors



app.use(express.static(publicDirectoryPath))


const col = ['red', 'green', 'blue'];
// Initialize an empty object to store user colors
const userColors = {};

io.on('connection', (socket) => {



      socket.on('toggle', () => {
    io.emit('toggleBackground');
  });


  socket.on('sortAlphabet', () => {
    io.emit('clicksortAlphabet');
  });



  socket.on('sortAlphabetReverse', () => {
    io.emit('clicksortAlphabetReverse');
  });



  socket.on('sortAuthor', () => {
    io.emit('clicksortAuthor');
  });


  socket.on('sortAuthorReverse', () => {
    io.emit('clicksortAuthorReverse');
  });


  socket.on('sortTime', () => {
    io.emit('clicksortTime');
  });

  socket.on('sortTimeReverse', () => {
    io.emit('clicksortTimeReverse');
  });


  socket.on('sortLength', () => {
    io.emit('clicksortLength');
  });

  socket.on('sortLengthReverse', () => {
    io.emit('clicksortLengthReverse');
  });



   

    console.log(`User ${socket.id} connected`);
  


    console.log('New WebSocket connection');

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }



        
       // const id = getUser(socket.id)
        console.log('color ' + user.userColor);
        console.log('name ' + user.colour);
        console.log('position ' + user.userPosition);

        socket.join(user.room)

        socket.on('mousemove', (data) => {
            console.log('room' + user.colour);
            io.to(user.room).emit('cursor', { id: socket.id, x: data.x, y: data.y, color: user.colour });
          });
    




        socket.emit('color', {getcolor: user.userColor, getuser: user.colour, getposition: user.userPosition});



        socket.emit('message', generateMessage('Uncommon admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Uncommon Admin', `${user.colour} has joined!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        

        callback()
    })


    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }


        
        io.to(user.room).emit('message', generateMessage(user.colour, message, user.userColor, user.userPosition))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.colour, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })




    socket.on('disconnect', () => {
        socket.emit('gone');
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('Uncommon Admin', `${user.colour} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})


server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})