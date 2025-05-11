import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Server from '../../Server/Server';
import { toast } from 'react-toastify';
import './Quiz.css';

const QuizTaker = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [timer, setTimer] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuiz();
        
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [quizId]);

    const fetchQuiz = async () => {
        try {
            const response = await Server.get(`/api/quizzes/${quizId}`);
            setQuiz(response.data);
            setTimeLeft(response.data.timeLimit);
            setLoading(false);
            
            // Initialize answers object
            const initialAnswers = {};
            response.data.questions.forEach(question => {
                initialAnswers[question.id] = null;
            });
            setAnswers(initialAnswers);
            
            // Start timer
            const interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        handleSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            setTimer(interval);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to load quiz');
            navigate('/quiz');
        }
    };

    const handleAnswerSelect = (questionId, answerIndex) => {
        setAnswers({
            ...answers,
            [questionId]: answerIndex
        });
    };

    const handleSubmit = async () => {
        if (timer) clearInterval(timer);
        setSubmitted(true);
        
        try {
            const response = await Server.post(
                `/api/quizzes/${quizId}/attempt`,
                answers
            );
            navigate(`/quiz/${quizId}/results`, { state: { result: response.data } });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit quiz');
            navigate('/quiz');
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    if (loading) return <div className="loading">Loading quiz...</div>;
    if (!quiz) return <div className="error">Quiz not found</div>;

    return (
        <div className="quiz-taker-container">
            <div className="quiz-header">
                <h2>{quiz.title}</h2>
                <p>{quiz.description}</p>
                <div className="quiz-timer">
                    Time remaining: <span>{formatTime(timeLeft)}</span>
                </div>
            </div>
            
            <form className="quiz-questions">
                {quiz.questions.map((question, qIndex) => (
                    <div key={question.id} className="question-container">
                        <h3>{qIndex + 1}. {question.text}</h3>
                        
                        <div className="answer-options">
                            {question.answerOptions.map((option, aIndex) => (
                                <div key={aIndex} className="answer-option">
                                    <input
                                        type="radio"
                                        name={`question-${question.id}`}
                                        id={`question-${question.id}-option-${aIndex}`}
                                        checked={answers[question.id] === aIndex}
                                        onChange={() => handleAnswerSelect(question.id, aIndex)}
                                        disabled={submitted}
                                    />
                                    <label htmlFor={`question-${question.id}-option-${aIndex}`}>
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                
                {!submitted && (
                    <button 
                        type="button" 
                        className="submit-quiz-btn"
                        onClick={handleSubmit}
                    >
                        Submit Quiz
                    </button>
                )}
            </form>
        </div>
    );
};

export default QuizTaker;