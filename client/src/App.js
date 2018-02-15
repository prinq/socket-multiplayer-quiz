import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import AnswerOption from './AnswerOptions';


const socket = socketIOClient('http://localhost:4001');

class App extends Component {
  constructor() {
    super();
    this.state = {
	  question: "",
	  name: "",
	  inputValue:"",
	  showQuestion:false
      
    };
	
	 this.setQuestion = this.setQuestion.bind(this);
	 this.sendName = this.sendName.bind(this);
	 this.resetName = this.resetName.bind(this);
	 this.answerSelected = this.answerSelected.bind(this);
	
  }

 
  send() {
    socket.emit('question');
  }

  
  start(color)  {
    socket.emit('start');
  }
  setQuestion(question){
	  
	  this.setState(prevState => ({
                     ...prevState,
                     question:question,
					 showQuestion:true
        }));
  }
  
  sendName(){
	  
	  socket.emit('name',this.state.inputValue);
	  this.setState(prevState => ({
              ...prevState,
              name:this.state.inputValue,
			  inputValue:""
        }));
  }
  
  setName(ev){
	  
	  let name = ev.target.value;
	  
	  this.setState(prevState => ({
              ...prevState,
               inputValue:name
        }));
  }
  
  resetName(){
	   this.setState(prevState => ({
              ...prevState,
				name: "",
				inputValue:""
        }));
  }
  
  
  //listen socket from server
  componentDidMount() {
   
    socket.on('question', this.setQuestion );
    socket.on('resetName', this.resetName);
   
  }
  
  answerSelected(ev){
	  console.log(ev.target.id);
	  
	  let answer = ev.target.id
	  socket.emit('answer',answer);
	  
  }
  
  render() {
    // testing for socket connections

	
    
    let question = this.state.question;
	
	console.log(question)
	
	if(this.state.name !== ""){
		
		if(this.state.showQuestion){
			
			 const listOptions = question.options.map((option, index) =>
                <AnswerOption key={index} answerId={index + 1} answerSelected={this.answerSelected} content={option}/>
				);
				return (
					<div className="container">
					<button onClick={() => this.send() }>Nastepne pytanie</button>
					<button onClick={() => this.start()}>Od nowa</button>
                    <div className='questionCount'>
                        <h2 className='question'>{question.question}</h2>
                    </div>
                    <ul className="answerOptions">
                        {listOptions}
                    </ul>
					</div>
					
				)	
			
			
			
		}else{
			return (
			<div style={{ textAlign: "center" }}>
				<button onClick={() => this.start()}>Od nowa</button>
				<span>Czekamy na wyniki pozostałych</span>
			</div>
			)	
		}
	
	}else{
		return (
		<div>
		<label>
			Name:
				<input value={this.state.inputValue} onChange={(ev) => this.setName(ev)} type="text" />
		</label>
		<button onClick={() => this.sendName()}>Podaj Imie</button></div>
		)
	}

    
  }
}
export default App;