import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Server from '../../Server/Server';
import QuizCard from './QuizCard';
import { toast } from 'react-toastify';
import './Quiz.css';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('available'); // 'available' or 'my-quizzes'
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetchQuizzes();
    }, [tab]);

    const fetchQuizzes = async () => {
        try {
            setLoading(true);
            const endpoint = tab === 'my-quizzes' 
                ? '/api/quizzes/my-quizzes' 
                : '/api/quizzes/available-quizzes';
            
            const response = await Server.get(endpoint);
            setQuizzes(response.data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch quizzes');
            setLoading(false);
        }
    };

    const handleCreateQuiz = () => {
        navigate('/quiz/create');
    };

    const handleDeleteQuiz = async (quizId) => {
        if (window.confirm('Are you sure you want to delete this quiz?')) {
            try {
                await Server.delete(`/api/quizzes/${quizId}`);
                toast.success('Quiz deleted successfully');
                fetchQuizzes();
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to delete quiz');
            }
        }
    };

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h2>Quiz Challenge</h2>
                <div className="quiz-tabs">
                    <button 
                        className={tab === 'available' ? 'active' : ''}
                        onClick={() => setTab('available')}
                    >
                        Available Quizzes
                    </button>
                    <button 
                        className={tab === 'my-quizzes' ? 'active' : ''}
                        onClick={() => setTab('my-quizzes')}
                    >
                        My Quizzes
                    </button>
                </div>
                <button className="create-quiz-btn" onClick={handleCreateQuiz}>
                    Create New Quiz
                </button>
            </div>

            {loading ? (
                <div className="loading">Loading quizzes...</div>
            ) : (
                <div className="quiz-grid">
                    {quizzes.length === 0 ? (
                        <div className="no-quizzes">
                            {tab === 'my-quizzes' 
                                ? "You haven't created any quizzes yet." 
                                : "No quizzes available at the moment."}
                        </div>
                    ) : (
                        quizzes.map(quiz => (
                            <QuizCard 
                                key={quiz.id}
                                quiz={quiz}
                                isOwner={quiz.creator.id === userId}
                                onDelete={handleDeleteQuiz}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default QuizList;