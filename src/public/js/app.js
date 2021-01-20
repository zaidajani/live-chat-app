let txt;
const text = document.getElementById('message');
const mearea = document.getElementById('mearea');
const post = document.getElementById('post');
let socket;

var person = prompt("Please enter your name:", "Your name");
if (person == null || person == "") {
  txt = "User cancelled the prompt.";
} else {
  txt = person;
}

socket = io.connect('http://localhost:3000/');

socket.on('message', (data) => {
  mearea.innerHTML += `
    <br>
    ${data.name}: ${data.message}
  `
});

mearea.innerHTML += `
  <br>
  you Joined the chat
`

post.addEventListener('click', () => {
  mearea.innerHTML += `
    <br>
    You: ${text.value}
  `

  console.log('sending: ' + text.value);
  socket.emit('message', {
    name: person,
    message: text.value
  });

  text.value = '';
});