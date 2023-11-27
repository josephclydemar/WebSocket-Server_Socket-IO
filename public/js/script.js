 
const socket = io('https://thesis-socketio-server.onrender.com');


const sendMessage = (event) => {
    event.preventDefault();
    const button = document.getElementById('messageButton');
    const input = document.getElementById('textField');
    if (input.value) {
        // console.log(input.value);
        socket.emit('message', input.value);
        input.value = '';
    }
    // socket.send('INITIATE');
    input.focus();
};


// Listen for messages
socket.on('message', (data) => {
    const li = document.createElement('li');
    li.textContent = data;
    document.getElementById('messageBox').appendChild(li);
});



document.getElementById('messageForm').addEventListener('submit', sendMessage);


