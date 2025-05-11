import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import Server from '../../Server/Server';
import QuestionForm from './QuestionForm';
import { toast } from 'react-toastify';
import './Quiz.css';

const QuizCreator = () => {
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState({
        title: '',
        description: '',
        timeLimit: 300, // default 5 minutes
        questions: []
    });

    const addQuestion = () => {
        setQuiz({
            ...quiz,
            questions: [
                ...quiz.questions,
                {
                    text: '',
                    answerOptions: ['', '', '', ''],
                    correctAnswerIndex: 0
                }
            ]
        });
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index][field] = value;
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const handleAnswerOptionChange = (questionIndex, answerIndex, value) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[questionIndex].answerOptions[answerIndex] = value;
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const removeQuestion = (index) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions.splice(index, 1);
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate quiz
        if (!quiz.title.trim()) {
            toast.error('Please enter a quiz title');
            return;
        }
        
        if (quiz.questions.length === 0) {
            toast.error('Please add at least one question');
            return;
        }
        
        for (const question of quiz.questions) {
            if (!question.text.trim()) {
                toast.error('All questions must have text');
                return;
            }
            
            if (question.answerOptions.some(opt => !opt.trim())) {
                toast.error('All answer options must be filled');
                return;
            }
        }

        try {
            const response = await Server.post('/api/quizzes', quiz);
            toast.success('Quiz created successfully!');
            navigate('/quiz');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create quiz');
        }
    };

    return (
        <div className="quiz-creator-container">
            <h2>Create New Quiz</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Quiz Title</label>
                    <input
                        type="text"
                        value={quiz.title}
                        onChange={(e) => setQuiz({...quiz, title: e.target.value})}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Description (Optional)</label>
                    <textarea
                        value={quiz.description}
                        onChange={(e) => setQuiz({...quiz, description: e.target.value})}
                    />
                </div>
                
                <div className="form-group">
                    <label>Time Limit (seconds)</label>
                    <input
                        type="number"
                        min="30"
                        value={quiz.timeLimit}
                        onChange={(e) => setQuiz({...quiz, timeLimit: parseInt(e.target.value) || 0})}
                        required
                    />
                </div>
                
                <h3>Questions</h3>
                <button type="button" className="add-question-btn" onClick={addQuestion}>
                    Add Question
                </button>
                
                {quiz.questions.map((question, qIndex) => (
                    <QuestionForm
                        key={qIndex}
                        index={qIndex}
                        question={question}
                        onChange={handleQuestionChange}
                        onAnswerChange={handleAnswerOptionChange}
                        onRemove={removeQuestion}
                    />
                ))}
                
                <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={() => navigate('/quiz')}>
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                        Create Quiz
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuizCreator;