import React from 'react';
import AnswerOption from './AnswerOptions';


class Quiz extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            userAnswers: [],
            _answerNumber: 1,
            _showResult: false,
            _correctAnswer: 0
        };

        this.answerSelected = this.answerSelected.bind(this);

    }

    componentWillMount() {

        let data = [
            {
                question: "Co to jest kot",
                answers: 1,
                options: [{
                    name: "Zwierze"
                }, {
                    name: "Miód"
                }]
            },
            {
                question: "Czy to quiz w technologii React",
                answers: 1,
                options: [{
                    name: "Tak na pewno "
                }, {
                    name: "Nie,nie jestem pewien "
                }, {
                    name: "To na pewno nie jest react"
                }]
            },
            {
                question: "Czy quiz bedzie rozszerzony o nowe funkcjonalności",
                answers: 1,
                options: [{
                    name: "Będą nowe funkcjonalości w kolejnych wersjach"
                }, {
                    name: "To zdecydowanie koniec z programowaniem "
                }]
            }];

        this.setState(prevState => ({
            ...prevState,
            data: data
        }));

        /* axios.get('https://qriusity.com/v1/questions?limit=10')
             .then(response => {
                 console.log(response);
                 this.setState(prevState => ({
                     ...prevState,
                     data:response.data
                 }));

             }).catch((error)=> {
             console.log(error);
         })*/
    }


    answerSelected(ev) {
        console.log(ev.target.id);

        if (this.state.data.length >= this.state._answerNumber + 1) {
            this.state.userAnswers.push(ev.target.id);
            this.state._answerNumber++;
            this.forceUpdate()
        } else {
            this.state.userAnswers.push(ev.target.id);
            let correctAnswer = 0, data = this.state.data, userAnswers = this.state.userAnswers;

            for (let i = 0; i < data.length; i++) {
                if (parseInt(data[i].answers,10) === parseInt(userAnswers[i],10)) {
                    correctAnswer++;
                }
            }
            this.setState(prevState => ({
                ...prevState,
                _showResult: true,
                _correctAnswer: correctAnswer
            }));
        }

    }

    render() {

        let data = this.state.data;
        let _answerNumber = this.state._answerNumber;
        let _showResult = this.state._showResult;

        if (data && !_showResult) {

            const listOptions = data[_answerNumber - 1].options.map((option, index) =>
                <AnswerOption key={index} answerId={index + 1} answerSelected={this.answerSelected}
                              content={option.name}/>
            );
            return (
                <div className="container">
                    <div className='questionCount'>
                        <h2 className='question'>{data[_answerNumber - 1].question}</h2>
                    </div>
                    <ul className="answerOptions">
                        {listOptions}
                    </ul>
                </div>
            )
        } else if (_showResult) {
            return (
                <div className="container">
                    <h2 className='question'>Correct answers:</h2>
                    <h2 className='question'>{this.state._correctAnswer}</h2>
                </div>
            )
        }
        else {
            return (null);
        }


    }
}

export default Quiz;