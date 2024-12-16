const socket=io('http://localhost:8000');

const form=document.getElementById('sendcontainer');
const messageinput=document.getElementById('msginput');
const messagecontainer=document.querySelector(".container");
var audio = new Audio('ting.mp3')

const func=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('msg');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position=='left')
    audio.play();
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=messageinput.value;
    if(msg!='')
    {
    func(`You: ${msg}`,'right');
    socket.emit('send',msg);
    messageinput.value='';
    }
    else
    {
        alert("please enter the msg")
    }
})

const name=prompt("Enter your name to join:");  

if (name) {
    socket.emit('new-user-joined', name);
} else {
    console.error("Name is required to join.");
}

socket.on('user-joined',name=>{
    func(`${name} joined the chat`,'left');
})


socket.on('receive',data=>{
    func(`${data.name}: ${data.message}`,'left');
})

socket.on('left',name=>{
    func(`${name} left the chat`,'left');
})











