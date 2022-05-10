const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words');
const {generateMessage, generatedLocationMessage} = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')


const publicDirectoryPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app) // this is done because socket io
                                      // expects to be called with a raw http server
                                      // Though express do the same behind the scenes
                                      // but we dont get the access to server variable

const io = socketio(server)

app.use(express.static(publicDirectoryPath))

// let count = 0;

io.on('connection', (socket)=>{
    console.log('New Socket IO Connection!')
    
    socket.on('join', ({username, room}, callback) =>{

        const { error, user } = addUser({id: socket.id, username, room})

        if(error){
            return callback(error)
        }

        socket.join(user.room)
        socket.emit('welcome', generateMessage("Admin", "Welcome to Chat App"))
        socket.broadcast.to(user.room).emit('welcome',generateMessage("Admin", `${user.username} has joined !`))
        io.to(user.room).emit('roomData',{
            'room' : user.room,
            'users' : getUsersInRoom(user.room)
        })
        callback() 
    })

    socket.on('onMessageSent',(data, callback)=>{
        const filter = new Filter()
        const user = getUser(socket.id)

        if(user){

            if(filter.isProfane(data)){
                return callback('Profanity is not allowed !')
            }

            io.to(user.room).emit('welcome', generateMessage(user.username, data))
            callback('Message Delivered !')
        }
    })

    socket.on('sendLocation',(data, callback)=>{
        const user = getUser(socket.id)
        if(user){
            io.to(user.room).emit('locationUpdate',generatedLocationMessage( user.username,`https://google.com/maps?q=${data.lat},${data.long}`))
            callback('Location Shared !')
        }
    })

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user[0].room).emit('welcome', generateMessage("Admin", `${user[0].username} has left`))
            io.to(user[0].room).emit('roomData',{
                'room' : user[0].room,
                'users' : getUsersInRoom(user[0].room)
            })
        }
    })

})

app.get('/', (req, res)=>{
    res.render('index.html')
})

server.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})