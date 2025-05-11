import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Server from '../../Server/Server';
import { toast } from 'react-toastify';
import './Quiz.css';

const QuizResults = () => {
    const { quizId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [result, setResult] = useState(location.state?.result);
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(!result);

    useEffect(() => {
        if (!result) {
            fetchResults();
        } else {
            fetchQuiz();
        }
    }, []);

    const fetchResults = async () => {
        try {
            const response = await Server.get(`/api/quizzes/${quizId}/attempts`);
            if (response.data.length > 0) {
                setResult(response.data[0]);
                fetchQuiz();
            } else {
                toast.error('No quiz results found');
                navigate('/quiz');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch results');
            navigate('/quiz');
        }
    };

    const fetchQuiz = async () => {
        try {
            const response = await Server.get(`/api/quizzes/${quizId}`);
            setQuiz(response.data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch quiz');
            navigate('/quiz');
        }
    };

    if (loading) return <div className="loading">Loading results...</div>;
    if (!result || !quiz) return <div className="error">Results not available</div>;

    const scorePercentage = Math.round((result.score / quiz.questions.length) * 100);

    return (
        <div className="quiz-results-container">
            <h2>Quiz Results: {quiz.title}</h2>
            
            <div className="results-summary">
                <div className="score-display">
                    <div className="score-circle">
                        <span>{scorePercentage}%</span>
                    </div>
                    <p>
                        You scored {result.score} out of {quiz.questions.length} questions correctly
                    </p>
                </div>
                
                <div className="time-completed">
                    Completed on: {new Date(result.attemptTime).toLocaleString()}
                </div>
            </div>
            
            <div className="detailed-results">
                <h3>Question Review</h3>
                
                {quiz.questions.map((question, qIndex) => {
                    const userAnswer = result.userAnswers.find(a => a.question.id === question.id);
                    const isCorrect = userAnswer.selectedAnswerIndex === question.correctAnswerIndex;
                    
                    return (
                        <div 
                            key={question.id} 
                            className={`question-review ${isCorrect ? 'correct' : 'incorrect'}`}
                        >
                            <div className="question-text">
                                <strong>Question {qIndex + 1}:</strong> {question.text}
                            </div>
                            
                            <div className="user-answer">
                                <span>Your answer:</span> 
                                {question.answerOptions[userAnswer.selectedAnswerIndex]}
                            </div>
                            
                            {!isCorrect && (
                                <div className="correct-answer">
                                    <span>Correct answer:</span> 
                                    {question.answerOptions[question.correctAnswerIndex]}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            
            <div className="results-actions">
                <button 
                    className="retake-quiz-btn"
                    onClick={() => navigate(`/quiz/${quizId}`)}
                >
                    Retake Quiz
                </button>
                <button 
                    className="back-to-quizzes-btn"
                    onClick={() => navigate('/quiz')}
                >
                    Back to Quizzes
                </button>
            </div>
        </div>
    );
};

export default QuizResults;