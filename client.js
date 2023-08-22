const socket = io();

// ... (existing code) ...

let username = ''; // Variable to store the user's name

// Handle joining the chat
const joinButton = document.getElementById('join-button');
const usernameInput = document.getElementById('username');
const joinForm = document.querySelector('.join-form');
const chatForm = document.getElementById('chat-form');
const messagesList = document.getElementById('messages');
const messageInput = document.getElementById('message');
const sendButton = document.querySelector('.send-button');

joinButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username !== '') {
        // Hide the join form
        joinForm.style.display = 'none';
        
        // Show the chat form
        chatForm.style.display = 'block';
        messageInput.removeAttribute('disabled');
        sendButton.removeAttribute('disabled');

        // Emit a "user joined" message
        socket.emit('user joined', username);
    }
});

// Handle form submission
const form = document.getElementById('chat-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    var message = document.getElementById('message').value;
            var messages = document.getElementById('messages');
            const li = document.createElement('li');
            if(message[0]=="/"){
                const slashmsg=message.slice(1);
                switch(slashmsg){
                    case "help" : alert("Available commands:\n/help: Show this message\n/clear: clear the chat\n/random: Show a random number");break;
                    case "random" :const t1="The random number generated is "; rand=Math.random(); message= t1.concat(rand);li.textContent = message;messages.appendChild(li);break;
                    case "clear" : while (messages.firstChild) {
                        messages.removeChild(messages.firstChild);
                }break;
                }
                document.getElementById('message').value = '';
            }
            else{

    // Emit the message along with the username
    socket.emit('chat message', { username, message });

    // Clear the input field
    document.getElementById('message').value = '';
            }
});

// Receive and display messages
socket.on('chat message', (msg) => {
    const li = document.createElement('li');
    const mesg = msg.message.split(" ");
            
            for(var i=0;i<mesg.length;i++){
                const p=mesg[i].toLowerCase();
            switch(p){
                case "react" : mesg[i]="⚛️";break;
                case "hey" : mesg[i]="👋";break;
                case "lol" : mesg[i]="😂";break;
                case "like" : mesg[i]="❤️";break;
                case "congratulations" : mesg[i]="🎉";break;
                case "india": mesg[i]="🇮🇳";break;
                default: mesg[i]=mesg[i];break;
            }
        }
        msg.message=mesg.join(" ");
    li.innerHTML = `<strong>${msg.username}:</strong> ${msg.message}`;
    messagesList.appendChild(li);
});

// ... (rest of your code) ...
