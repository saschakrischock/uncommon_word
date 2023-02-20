const socket = io()

//CLIENT

const usersDiv = document.getElementById('users');


// toggle


colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#800080', '#008000'];
userColorIndex = Math.floor(Math.random() * 8);
userColor = colors[userColorIndex];


// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')




const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const localroom = urlParams.get('room')
const user = urlParams.get('username');
if (user.length > 6) {
    document.querySelector('.indicator').innerHTML = "<-";
}
else {
    document.querySelector('.indicator').innerHTML = "->";

}

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// query string
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoscroll = () => {
    const $newMessage = $messages.lastElementChild
    //const newMessageStyles = //getComputedStyle($newMessage)
   // const newMessageMargin = parseInt(newMessageStyles.marginBottom)
  //  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    const visibleHeight = $messages.offsetHeight
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

 
}


document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
  
    socket.emit('mousemove', { x, y });
  });

/*
socket.on('user connected', (id) => {
      const colorPicker = document.createElement('input');
      colorPicker.type = 'color';
      colorPicker.id = `colorPicker-${id}`;
      usersDiv.appendChild(colorPicker);
      
      const userId = document.createElement('h1');
      userId.id = `userId-${id}`;
      usersDiv.appendChild(userId);
    });

    // Send a color change event to the server when the color picker is changed
    socket.on('user connected', (id) => {
      const colorPicker = document.getElementById(`colorPicker-${id}`);
      colorPicker.addEventListener('change', () => {
        const color = colorPicker.value;
        socket.emit('color change', color);
      });
    });

    // Change the color of the user's socket id when a color change event is received
    socket.on('color change', (data) => {
      const userId = document.getElementById(`userId-${data.id}`);
      if (userId) {
        userId.style.color = data.color;
      }
    });*/


          // compose toggle button
    document.getElementById('toggle').addEventListener('click', () => {
    document.body.classList.toggle('read');
    document.body.classList.toggle('compose-body');
    document.querySelector('#toggle').classList.toggle('active');
      });



      // uppercase toggle button
      document.getElementById('case').addEventListener('click', () => {
        document.body.classList.toggle('uppercase');
        document.querySelector('#case').classList.toggle('active');
          });




          const slider = document.querySelector('.slider');
          const text = document.querySelector('#messages');
          
          slider.addEventListener('input', () => {
            const fontSize = `${slider.value}rem`;
            text.style.fontSize = fontSize;
          });



    socket.on('color', (data) => {
        document.querySelector('.color-indicator').style.backgroundColor = data.getcolor;
        document.querySelector('.' + data.getposition + '_indicator').style.backgroundColor = data.getcolor;
            document.querySelector('#cursors').style.backgroundColor = data.getcolor;
      });

socket.on('cursor', (data) => {
    let cursor = document.getElementById(data.id);
  
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.id = data.id;
      cursor.classList.add('cursor');
      document.getElementById('cursors').appendChild(cursor);
    }
  
    if (socket.id === data.id) {
      cursor.classList.add('cursor-me');
    } else {
      cursor.classList.remove('cursor-me');
    }
  
    cursor.style.left = `${data.x}px`;
    cursor.style.top = `${data.y}px`;
  });


  

socket.on('toggleBackground', () => {
    document.body.classList.toggle('read');
  });

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        color: message.color,
        position: message.position,
        createdAt: moment(message.createdAt).format('h:mm a')
    })

    if (message.position == 'anchor_1') {
     //   document.querySelector('.anchor_1 .message:last-child');
        document.querySelector('.anchor_1').insertAdjacentHTML('beforeend', html)
    }
    else if (message.position == 'anchor_2') {
      //  document.querySelector('.anchor_2').style.color= message.color;
        document.querySelector('.anchor_2').insertAdjacentHTML('beforeend', html)
    }
    else if (message.position == 'anchor_3') {
     //   document.querySelector('.anchor_3').style.color= message.color;
        document.querySelector('.anchor_3').insertAdjacentHTML('beforeend', html)
    }
    else if (message.position == 'anchor_4') {
      //  document.querySelector('.anchor_4').style.color= message.color;
        document.querySelector('.anchor_4').insertAdjacentHTML('beforeend', html)
    }
    else {
     //   document.querySelector('.anchor_5').style.color= message.color;
        document.querySelector('.anchor_5').insertAdjacentHTML('beforeend', html)
    }
    autoscroll()
})



// get the messages content in Local Storage
window.addEventListener("load", function() {
    const storedMessagesContent = localStorage.getItem("messagesContent" + localroom);
    if (storedMessagesContent) {
      document.querySelector('#messages').innerHTML = storedMessagesContent;
    }
  });


socket.on('locationMessage', (message) => {
    console.log(message)
    const html = Mustache.render(locationMessageTemplate, {
        username: message.username,
        url: message.url,
       // userColor: message.userColor,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})


socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users,
    })

    document.querySelector('#sidebar').innerHTML = html
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }

        console.log('Message delivered!')

        // Store the messages content in Local Storage
        const messagesDiv = document.getElementById("messages");
        const messagesContent = messagesDiv.innerHTML;
        localStorage.setItem("messagesContent" + localroom, messagesContent);

    })


})

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared!')  
        })
    })
})

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})