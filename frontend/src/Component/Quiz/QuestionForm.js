import React, { useState, useEffect } from 'react';

import './Quiz.css';

const QuestionForm = ({ index, question, onChange, onAnswerChange, onRemove }) => {
    return (
        <div className="question-form">
            <div className="question-header">
                <h4>Question {index + 1}</h4>
                <button 
                    type="button" 
                    className="remove-question-btn"
                    onClick={() => onRemove(index)}
                >
                    Remove
                </button>
            </div>
            
            <div className="form-group">
                <label>Question Text</label>
                <input
                    type="text"
                    value={question.text}
                    onChange={(e) => onChange(index, 'text', e.target.value)}
                    required
                />
            </div>
            
            <div className="form-group">
                <label>Answer Options</label>
                {question.answerOptions.map((option, aIndex) => (
                    <div key={aIndex} className="answer-option-input">
                        <input
                            type="radio"
                            name={`correct-answer-${index}`}
                            checked={question.correctAnswerIndex === aIndex}
                            onChange={() => onChange(index, 'correctAnswerIndex', aIndex)}
                        />
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => onAnswerChange(index, aIndex, e.target.value)}
                            required
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionForm;