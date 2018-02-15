import React from 'react';

function AnswerOption(props) {

    return (
        <li className="answerOption">
            <input
                type="radio"
                name="radioGroup"
                className="radioCustomButton"
                id={props.answerId}
                checked={false}
                onChange={props.answerSelected}
            />
            <label className="radioCustomLabel" htmlFor={props.answerId}>
                {props.content}
            </label>
        </li>
    );

}

export default AnswerOption;