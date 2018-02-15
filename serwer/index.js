const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// our localhost port
const port = 4001;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);


//Zatępcza baza danych do testu
const questions = [
	{
		question:"Jaki jezyk oprogramowuje Node",
		options:["Java","Javascript","Scala"],
		answer:2
	},
	{
		question:"Co używamy jako leku na kaszel",
		options:["Javy","Syropu","Kluczyka do szafy"],
		answer:2
	},
	{
		question:"Czy Quiz jest trudny",
		options:["Tak","Nie","Byc może","Wszystkie odpowiedzi są poprawne"],
		answer:1
	}
];
let i =  0 ;
let users = {};



function generateQuestion()
{
    x = 5;  // 5 Seconds
	

	
	if(i === questions.length){
		console.log(users);
		return true;
	}else{
		io.sockets.emit('question', questions[i] );
		i++;
		setTimeout(generateQuestion, x*1000);
	}
    
}


// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
 
  if(!socket.username){
	  socket.emit('resetName');
  }
  
  
  socket.on('question', () => {
    io.sockets.emit('question', questions[i] );
	i++;
	
  });
  
  socket.on('answer',(answer)=> {
	  users[socket.id][i-1] = answer;
  });
  
  socket.on('name', (name) => {
     socket.username = name;
	 
	 users[socket.id]= [];
	
	
	  console.log(io.sockets);
	  console.log(socket.id);
  });
  
	
 
  socket.on('start', () => {
	  i = 0;
	  generateQuestion();

  });
  

  
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
	  
	  delete users[socket.id];
	  
    console.log('user disconnected')
  })
});

server.listen(port, () => console.log(`Listening on port ${port}`));