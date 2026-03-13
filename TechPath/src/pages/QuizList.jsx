import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckSquare, ArrowLeft, CheckCircle2, XCircle, Trophy, RefreshCw } from 'lucide-react';
import quizzesData from '../data/quizzes.json';
import unitsData from '../data/units.json';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { motion, AnimatePresence } from 'framer-motion';

const QuizList = () => {
    const [searchParams] = useSearchParams();
    const unitSlug = searchParams.get('unit');

    const [activeQuiz, setActiveQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    const [scores, setScores] = useLocalStorage('techpath_quiz_scores', {});

    useEffect(() => {
        if (unitSlug && quizzesData[unitSlug]) {
            setActiveQuiz({
                slug: unitSlug,
                unit: unitsData.find(u => u.slug === unitSlug),
                questions: quizzesData[unitSlug]
            });
            setCurrentQuestionIndex(0);
            setSelectedAnswers({});
            setIsFinished(false);
        } else {
            setActiveQuiz(null);
        }
    }, [unitSlug]);

    const handleSelectAnswer = (questionId, optionIndex) => {
        if (selectedAnswers[questionId] !== undefined) return; // already answered
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const currentQuestion = activeQuiz?.questions[currentQuestionIndex];
    const isAnswered = currentQuestion && selectedAnswers[currentQuestion.id] !== undefined;

    const handleNext = () => {
        if (currentQuestionIndex < activeQuiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Calculate score
            let correctCount = 0;
            activeQuiz.questions.forEach(q => {
                if (selectedAnswers[q.id] === q.correct) {
                    correctCount++;
                }
            });
            const scorePercentage = Math.round((correctCount / activeQuiz.questions.length) * 100);

            setScores(prev => ({
                ...prev,
                [activeQuiz.slug]: Math.max(prev[activeQuiz.slug] || 0, scorePercentage)
            }));

            setIsFinished(true);
        }
    };

    if (!activeQuiz) {
        return (
            <div className="min-h-screen bg-slate-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 flex justify-center items-center">
                            <CheckSquare className="w-10 h-10 mr-4 text-primary" />
                            Practice Quizzes
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Test your knowledge across different technology subjects. Select a module below to begin.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {unitsData && unitsData.map((unit) => {
                            const previousScore = scores[unit.slug];
                            return (
                                <div key={unit.slug} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col hover:shadow-md transition-shadow">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{unit.title}</h3>
                                    <div className="flex-grow">
                                        {previousScore !== undefined ? (
                                            <div className="flex items-center text-sm text-green-600 font-medium mb-4">
                                                <Trophy className="w-4 h-4 mr-1" />
                                                Best Score: {previousScore}%
                                            </div>
                                        ) : (
                                            <p className="text-sm text-slate-500 mb-4">Not attempted yet</p>
                                        )}
                                    </div>
                                    <Link
                                        to={`/quiz?unit=${unit.slug}`}
                                        className={`w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium transition-colors ${previousScore !== undefined
                                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                            : 'bg-indigo-50 text-primary hover:bg-indigo-100'
                                            }`}
                                    >
                                        {previousScore !== undefined ? 'Retake Quiz' : 'Start Quiz'}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link to="/quiz" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-6">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Quizzes
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className={`${activeQuiz.unit.color} px-6 py-8 text-white text-center`}>
                        <h2 className="text-2xl font-bold">{activeQuiz.unit.title} Quiz</h2>
                        {!isFinished && (
                            <p className="mt-2 text-white/80">Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}</p>
                        )}
                    </div>

                    <div className="p-6 sm:p-10">
                        {isFinished ? (
                            <div className="text-center py-8">
                                <Trophy className="w-20 h-20 mx-auto text-yellow-400 mb-6" />
                                <h3 className="text-3xl font-bold text-slate-900 mb-4">Quiz Completed!</h3>
                                <p className="text-xl text-slate-600 mb-8">
                                    You scored <span className="font-bold text-primary">{Math.round((activeQuiz.questions.filter(q => selectedAnswers[q.id] === q.correct).length / activeQuiz.questions.length) * 100)}%</span>
                                </p>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={() => {
                                            setCurrentQuestionIndex(0);
                                            setSelectedAnswers({});
                                            setIsFinished(false);
                                        }}
                                        className="inline-flex items-center px-6 py-3 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 font-medium transition-colors"
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" /> Try Again
                                    </button>
                                    <Link
                                        to="/study"
                                        className="inline-flex items-center px-6 py-3 rounded-lg text-white bg-primary hover:bg-indigo-700 font-medium transition-colors"
                                    >
                                        Continue Studying
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuestionIndex}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-xl font-medium text-slate-900 mb-6">{currentQuestion.question}</h3>
                                    <div className="space-y-3">
                                        {currentQuestion.options && currentQuestion.options.map((option, idx) => {
                                            const isSelected = selectedAnswers[currentQuestion.id] === idx;
                                            const isCorrectOption = currentQuestion.correct === idx;
                                            let optionClasses = "w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center ";

                                            if (!isAnswered) {
                                                optionClasses += "border-slate-200 hover:border-indigo-300 hover:bg-slate-50";
                                            } else {
                                                if (isCorrectOption) {
                                                    optionClasses += "border-green-500 bg-green-50 text-green-800";
                                                } else if (isSelected && !isCorrectOption) {
                                                    optionClasses += "border-red-500 bg-red-50 text-red-800";
                                                } else {
                                                    optionClasses += "border-slate-100 opacity-50";
                                                }
                                            }

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleSelectAnswer(currentQuestion.id, idx)}
                                                    disabled={isAnswered}
                                                    className={optionClasses}
                                                >
                                                    <span className="font-medium">{option}</span>
                                                    {isAnswered && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                                                    {isAnswered && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-red-600" />}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {isAnswered && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`mt-6 p-4 rounded-lg ${selectedAnswers[currentQuestion.id] === currentQuestion.correct
                                                ? 'bg-green-50 text-green-800 border border-green-200'
                                                : 'bg-red-50 text-red-800 border border-red-200'
                                                }`}
                                        >
                                            <p className="font-bold mb-1">
                                                {selectedAnswers[currentQuestion.id] === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
                                            </p>
                                            <p className="text-sm">{currentQuestion.explanation}</p>
                                        </motion.div>
                                    )}

                                    <div className="mt-8 flex justify-end">
                                        <button
                                            onClick={handleNext}
                                            disabled={!isAnswered}
                                            className={`px-8 py-3 rounded-lg font-medium transition-all ${isAnswered
                                                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md transform hover:-translate-y-0.5'
                                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {currentQuestionIndex < activeQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizList;
