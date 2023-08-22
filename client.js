const socket = io();

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
            socket.emit('chat message', message);
            document.getElementById('message').value = '';}
        });

        // Receive and display messages
        socket.on('chat message', (msg) => {
            const messages = document.getElementById('messages');
            const li = document.createElement('li');
            const mesg = msg.split(" ");
            
            for(var i=0;i<mesg.length;i++){
                const p=mesg[i].toLowerCase();
            switch(p){
                case "react" : mesg[i]="⚛️";break;
                case "hey" : mesg[i]="👋";break;
                case "lol" : mesg[i]="😂";break;
                case "like" : mesg[i]="❤️";break;
                case "congratulations" : mesg[i]="🎉";break;
                default: mesg[i]=mesg[i];break;
            }
        }
        msg=mesg.join(" ");
        
        li.textContent = msg;
         //console.log(li);
        messages.appendChild(li);
        
        });