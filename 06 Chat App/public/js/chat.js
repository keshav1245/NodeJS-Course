const socket = io()

//Elements
const messageForm = document.querySelector('#message-form');
const inputData = document.querySelector('#data');
const sendButton = document.querySelector('#send');
const locationButton = document.querySelector('#sendLocation');
const messagesDiv = document.querySelector('#messages')
const sidebarDiv = document.querySelector('#sidebar')


//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

//Options
const {username , room} = Qs.parse(location.search, { ignoreQueryPrefix : true })

const autoscroll = () =>{
    const newMsg = messagesDiv.lastElementChild
    const newMsgStyles = getComputedStyle(newMsg)
    const newMsgMargin = parseInt(newMsgStyles.marginBottom)
    const newMsgHeight = newMsg.offsetHeight + newMsgMargin

    const visibleHeight = messagesDiv.offsetHeight

    const containerHeight = messagesDiv.scrollHeight

    const scrollOffset = messagesDiv.scrollTop + visibleHeight

    if(containerHeight - newMsgHeight <= scrollOffset){
        messagesDiv.scrollTop = messagesDiv.scrollHeight
    }
}

socket.on('welcome', (data)=>{
    const html = Mustache.render(messageTemplate,
        {
            username : data.username,
            message : data.text,
            createdAt : moment(data.createdAt).format('HH:mm A')
        }
    )
    messagesDiv.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

socket.on('locationUpdate', (data)=>{
    const html = Mustache.render(locationTemplate,
        {
            username : data.username,
            location : data.url,
            createdAt: moment(data.createdAt).format('HH:mm A')
        }
    )
    messagesDiv.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

socket.on('roomData', ({room, users})=>{
    const html = Mustache.render(sidebarTemplate,
        {
            room,
            users
        }
    )
    sidebarDiv.innerHTML = html;
})

messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    sendButton.setAttribute('disabled','disabled');

    socket.emit('onMessageSent', inputData.value, (serverMessage)=>{
        sendButton.removeAttribute('disabled');
        inputData.value = ''
        inputData.focus()
        console.log(serverMessage)
    })
})


locationButton.addEventListener('click',()=>{

    locationButton.setAttribute('disabled','disabled')

    if(!navigator.geolocation){
        locationButton.removeAttribute('disabled')
        return alert("Geolocation not supported !")
    }

    navigator.geolocation.getCurrentPosition((position)=>{

        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        socket.emit('sendLocation', {lat,long},(data)=>{
            locationButton.removeAttribute('disabled')
            console.log(data)
        })
    })
})

socket.emit('join', {username, room}, (error) => {
    if(error){
        alert(error)
        location.href = '/'
    }
})