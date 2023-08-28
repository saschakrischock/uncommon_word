const socket = io()

//CLIENT

const usersDiv = document.getElementById('users');


// toggle

const questionElement = document.querySelector('.btn-question');
const overlayElement = document.querySelector('.info__overlay');

questionElement.addEventListener('click', () => {
  overlayElement.classList.toggle('active');
  questionElement.classList.toggle('active');
});


const urlParam = new URLSearchParams(window.location.search);
const roomName = urlParam.get('room'); // Get the value of the 'room' parameter

// Find the div element with the class "roomname"
const roomNameDiv = document.querySelector('.roomname');

// Set the extracted room name as the content of the div
if (roomName) {
    roomNameDiv.textContent = roomName;
} else {
    roomNameDiv.textContent = 'No room name specified';
}




// toggle

document.addEventListener('DOMContentLoaded', function () {
  var copyButton = document.querySelector('.copy-url');

  copyButton.addEventListener('click', function () {
      // Get the current URL
      var currentUrl = window.location.href;

      // Create a temporary input element
      var tempInput = document.createElement('input');
      tempInput.value = currentUrl;
      document.body.appendChild(tempInput);

      // Select the text in the input element
      tempInput.select();
      tempInput.setSelectionRange(0, 99999); // For mobile devices

      // Copy the text to the clipboard
      document.execCommand('copy');

      // Remove the temporary input element
      document.body.removeChild(tempInput);

      // Show an alert
      alert('URL has been copied to your clipboard!');
  });
});

const invite = document.querySelector('.btn-invite');
const overlayinvite = document.querySelector('.invite-overlay');

invite.addEventListener('click', () => {
  invite.classList.toggle('active');
  overlayinvite.classList.toggle('active');
});


colors = ['#8800ff', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#800080', '#008000'];
userColorIndex = Math.floor(Math.random() * 8);
userColor = colors[userColorIndex];


// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')
const $messages_compose = document.querySelector('#messages_compose')




const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const localroom = urlParams.get('room')
const user = urlParams.get('colour');
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
const { colour, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

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



    document.getElementById('toggle').addEventListener('click', () => {
      socket.emit('toggle');
    });


  


    socket.on('toggleBackground', () => {
      document.body.classList.toggle('read');
      document.body.classList.toggle('compose-body');
      document.querySelector('#toggle').classList.toggle('active');
    });


          // compose toggle button
          /*
    document.getElementById('toggle').addEventListener('click', () => {
    document.body.classList.toggle('read');
    document.body.classList.toggle('compose-body');
    document.querySelector('#toggle').classList.toggle('active');
      });*/



      // COMPOSE sort buttons
      const container = document.getElementById("messages_compose");
      const sortButtonalphabet = document.getElementById("sort-button-alphabet");
      const sortButtonalphabetReverse = document.getElementById("sort-button-alphabet-reverse");
      const sortButtonauthor = document.getElementById("sort-button-author");
      const sortButtonauthorReverse = document.getElementById("sort-button-author-reverse");
      const sortButtonlength = document.getElementById("sort-button-length");
      const sortButtonlengthReverse = document.getElementById("sort-button-length-reverse");
      const sortButtonTime = document.getElementById("sort-button-time");
      const sortButtonTimeReverse = document.getElementById("sort-button-time-reverse");

      // sort alphabet A-Z words



  
      sortButtonalphabet.addEventListener('click', () => {
        socket.emit('sortAlphabet');
      });

      socket.on('clicksortAlphabet', () => {

  for (const button of document.querySelectorAll('.sort-group button')) {
    button.classList.remove('active');
  }
  sortButtonalphabet.classList.add('active');
  const divs = container.querySelectorAll(".message");

  const sortedDivs = [...divs].sort((a, b) => {
    const firstWordA = a.querySelector(".message__inner").textContent.split(" ")[0];
    const firstWordB = b.querySelector(".message__inner").textContent.split(" ")[0];
    return firstWordA.localeCompare(firstWordB);
  });

  sortedDivs.forEach((div) => {
    container.appendChild(div);
  });
});


sortButtonalphabetReverse.addEventListener('click', () => {

  socket.emit('sortAlphabetReverse');
});

socket.on('clicksortAlphabetReverse', () => {

  for (const button of document.querySelectorAll('.sort-group button')) {
    button.classList.remove('active');
  }
  sortButtonalphabetReverse.classList.add('active');
  const divs = container.querySelectorAll(".message");

  const sortedDivs = [...divs].sort((a, b) => {
    const firstWordA = a.querySelector(".message__inner").textContent.split(" ")[0];
    const firstWordB = b.querySelector(".message__inner").textContent.split(" ")[0];
    return firstWordB.localeCompare(firstWordA);
  });

  sortedDivs.forEach((div) => {
    container.appendChild(div);
  });
});


sortButtonauthor.addEventListener("click", () => {
  socket.emit('sortAuthor');
});

socket.on('clicksortAuthor', () => {

  for (const button of document.querySelectorAll('.sort-group button')) {
    button.classList.remove('active');
  }
  sortButtonauthor.classList.add('active');
  const divs = container.querySelectorAll(".message");

  const sortedDivs = [...divs].sort((a, b) => {
    const firstWordA = a.querySelector(".message__name").textContent.split(" ")[0];
    const firstWordB = b.querySelector(".message__name").textContent.split(" ")[0];
    return firstWordA.localeCompare(firstWordB);
  });

  sortedDivs.forEach((div) => {
    container.appendChild(div);
  });
});

sortButtonauthorReverse.addEventListener("click", () => {
  socket.emit('sortAuthorReverse');
});

socket.on('clicksortAuthorReverse', () => {

  for (const button of document.querySelectorAll('.sort-group button')) {
    button.classList.remove('active');
  }
  sortButtonauthorReverse.classList.add('active');
  const divs = container.querySelectorAll(".message");

  const sortedDivs = [...divs].sort((a, b) => {
    const firstWordA = a.querySelector(".message__name").textContent.split(" ")[0];
    const firstWordB = b.querySelector(".message__name").textContent.split(" ")[0];
    return firstWordB.localeCompare(firstWordA);
  });

  sortedDivs.forEach((div) => {
    container.appendChild(div);
  });
});


sortButtonTime.addEventListener("click", () => {
  socket.emit('sortTime');
});


socket.on('clicksortTime', () => {

  for (const button of document.querySelectorAll('.sort-group button')) {
    button.classList.remove('active');
  }
  sortButtonTime.classList.add('active');
  const divs = container.querySelectorAll(".message");

  const sortedDivs = [...divs].sort((a, b) => {
    const firstWordA = a.querySelector(".message__meta").textContent.split(" ")[0];
    const firstWordB = b.querySelector(".message__meta").textContent.split(" ")[0];
    return firstWordA.localeCompare(firstWordB);
  });

  sortedDivs.forEach((div) => {
    container.appendChild(div);
  });
});


sortButtonTimeReverse.addEventListener("click", () => {
  socket.emit('sortTimeReverse');
});

socket.on('clicksortTimeReverse', () => {

  for (const button of document.querySelectorAll('.sort-group button')) {
    button.classList.remove('active');
  }
  sortButtonTimeReverse.classList.add('active');
  const divs = container.querySelectorAll(".message");

  const sortedDivs = [...divs].sort((a, b) => {
    const firstWordA = a.querySelector(".message__meta").textContent.split(" ")[0];
    const firstWordB = b.querySelector(".message__meta").textContent.split(" ")[0];
    return firstWordB.localeCompare(firstWordA);
  });

  sortedDivs.forEach((div) => {
    container.appendChild(div);
  });
});


socket.on('gone', () => {
alert("left");
});



      // sort alphabet A-Z words


      sortButtonlength.addEventListener("click", () => {
        socket.emit('sortLength');
      });


      socket.on('clicksortLength', () => {

  for (const button of document.querySelectorAll('.sort-group button')) {
    button.classList.remove('active');
  }
  sortButtonlength.classList.add('active');
  const divs = container.querySelectorAll(".message");

  const sortedDivs = [...divs].sort((a, b) => {
    const textLengthA = a.querySelector(".message__inner").textContent.length;
    const textLengthB = b.querySelector(".message__inner").textContent.length;
    return textLengthA - textLengthB;
  });

  sortedDivs.forEach((div) => {
    container.appendChild(div);
  });
});

      // sort alphabet Z-A words


      sortButtonlengthReverse.addEventListener("click", () => {
        socket.emit('sortLengthReverse');
      });

      socket.on('clicksortLengthReverse', () => {

        for (const button of document.querySelectorAll('.sort-group button')) {
          button.classList.remove('active');
        }
        sortButtonlengthReverse.classList.add('active');
        const divs = container.querySelectorAll(".message");
      
        const sortedDivs = [...divs].sort((a, b) => {
          const textLengthA = a.querySelector(".message__inner").textContent.length;
          const textLengthB = b.querySelector(".message__inner").textContent.length;
          return textLengthB - textLengthA;
        });
      
        sortedDivs.forEach((div) => {
          container.appendChild(div);
        });
      });
      


      // uppercase toggle button
      document.getElementById('case').addEventListener('click', () => {
        socket.emit('uppercase');
      });

      socket.on('clickUppercase', () => {
        document.body.classList.toggle('uppercase');
        document.querySelector('#case').classList.toggle('active');
          });




          const slider = document.querySelector('.slider');
          const text = document.querySelector('#messages');
          const text_compose = document.querySelector('#messages_compose');



    
          slider.addEventListener('input', () => {
            const fontSize = slider.value;
            text.style.fontSize = fontSize + 'rem';
            text_compose.style.fontSize = fontSize + 'rem';
            text.classList.remove('size-1rem','size-2rem', 'size-3rem', 'size-4rem', 'size-5rem', 'size-6rem', 'size-7rem', 'size-8rem', 'size-9rem', 'size-10rem', )
            text_compose.classList.remove('size-1rem','size-2rem', 'size-3rem', 'size-4rem', 'size-5rem', 'size-6rem', 'size-7rem', 'size-8rem', 'size-9rem', 'size-10rem', )
            text.classList.add('size-' + fontSize  + 'rem' );
            text_compose.classList.add('size-' + fontSize  + 'rem' );
            socket.emit('font-size-change', fontSize);
          });
          
          socket.on('font-size-change', (fontSize) => {
            text.style.fontSize = fontSize + 'rem';
            text_compose.style.fontSize = fontSize + 'rem';
            slider.value = fontSize;

            text.classList.remove('size-1rem','size-2rem', 'size-3rem', 'size-4rem', 'size-5rem', 'size-6rem', 'size-7rem', 'size-8rem', 'size-9rem', 'size-10rem', )
            text.classList.add('size-' + fontSize  + 'rem' );

            text_compose.classList.remove('size-1rem','size-2rem', 'size-3rem', 'size-4rem', 'size-5rem', 'size-6rem', 'size-7rem', 'size-8rem', 'size-9rem', 'size-10rem', )
            text_compose.classList.add('size-' + fontSize  + 'rem' );
          });

  

          slider.addEventListener('input', () => {
            socket.emit('range');
          });
    



    socket.on('color', (data) => {
        document.querySelector('.color-indicator').style.backgroundColor = data.getuser;
        document.querySelector('.' + data.getposition + '_indicator').style.backgroundColor = data.getuser;
            document.querySelector('#cursors').style.backgroundColor = data.getuser;
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
    cursor.style.backgroundColor = data.color;
    cursor.style.left = `${data.x}px`;
    cursor.style.top = `${data.y}px`;
  });


  



socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        colour: message.colour,
        message: message.text,
        color: message.color,
        position: message.position,
        createdAt: moment(message.createdAt).format('h:mm:ss a')
    })

    if (message.position == 'anchor_1') {
     //   document.querySelector('.anchor_1 .message:last-child');
        document.querySelector('#messages .anchor_1').insertAdjacentHTML('beforeend', html)
        document.querySelector('#messages_compose .anchor_1').insertAdjacentHTML('beforeend', html)
    }
    else if (message.position == 'anchor_2') {
      //  document.querySelector('.anchor_2').style.color= message.color;
        document.querySelector('#messages .anchor_2').insertAdjacentHTML('beforeend', html)
        document.querySelector('#messages_compose .anchor_2').insertAdjacentHTML('beforeend', html)
    }
    else if (message.position == 'anchor_3') {
     //   document.querySelector('.anchor_3').style.color= message.color;
        document.querySelector('#messages .anchor_3').insertAdjacentHTML('beforeend', html)
        document.querySelector('#messages_compose .anchor_3').insertAdjacentHTML('beforeend', html)
    }
    else if (message.position == 'anchor_4') {
      //  document.querySelector('.anchor_4').style.color= message.color;
        document.querySelector('#messages .anchor_4').insertAdjacentHTML('beforeend', html)
        document.querySelector('#messages_compose .anchor_4').insertAdjacentHTML('beforeend', html)
    }
    else {
     //   document.querySelector('.anchor_5').style.color= message.color;
        document.querySelector('#messages .anchor_5').insertAdjacentHTML('beforeend', html)
        document.querySelector('#messages_compose .anchor_5').insertAdjacentHTML('beforeend', html)
    }
    autoscroll()
})



// get the messages content in Local Storage
window.addEventListener("load", function() {
    const storedMessagesContent = localStorage.getItem("messagesContent" + localroom);
    if (storedMessagesContent) {
      document.querySelector('#messages').innerHTML = storedMessagesContent;
      document.querySelector('#messages_compose').innerHTML = storedMessagesContent;
      for (const indicator of document.querySelectorAll('.anchor_indicator')) {
       indicator.style.backgroundColor = '#fff';
      }
    }
  });


socket.on('locationMessage', (message) => {
    console.log(message)
    const html = Mustache.render(locationMessageTemplate, {
        colour: message.colour,
        url: message.url,
       // userColor: message.userColor,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    $messages_compose.insertAdjacentHTML('beforeend', html)
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

socket.emit('join', { colour, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})