




const socket = io('http://localhost:8000/');
const form  = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');


var audio = new Audio('./../tune1.mp3');



const append =(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left')
    {
        audio.play();
    }
   
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = $('#messageInp').val();
    console.log(message);
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
     $('#messageInp').val = " ";
})






// when user Joined
const name = prompt("Enter Your Name to Join for iChat");



if(name != null  || typeof(name) === undefined){
    socket.emit('new-user-joined',name);
  
    socket.on('user-joined', name=>{
        append(`${name}: joined the chat`, `right`);
        });



        socket.on('receive', (message)=>{
            console.log(message);
            if(message.name != undefined){
                append(`${message.name} : ${message.message} `, `left`);
            }
           
            })
        
        
        socket.on('left', name=>{

            console.log(name);
            if(name != null){
                append(`${name} :left the chat`, `left`);
            }
               
                })
}



