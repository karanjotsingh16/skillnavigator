import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Compass, CheckSquare, Target, BookOpen, Clock, CheckCircle2, FileText } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import unitsData from '../data/units.json';

const Dashboard = () => {
    const [scores] = useLocalStorage('techpath_quiz_scores', {});
    const [savedCareer] = useLocalStorage('techpath_career_result', null);
    const [openedModules] = useLocalStorage('techpath_opened_modules', {});
    const [completedRevisions] = useLocalStorage('techpath_completed_revisions', {});

    const completedQuizzesCount = Object.keys(scores).length;
    const openedModulesCount = Object.keys(openedModules).length;
    const completedRevisionsCount = Object.keys(completedRevisions).length;
    const totalUnits = unitsData.length;

    // Calculate average score
    const scoreValues = Object.values(scores);
    const averageScore = scoreValues.length > 0
        ? Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length)
        : 0;

    // Determine Learning Status
    let learningStatus = 'Just Started';
    if (completedQuizzesCount === totalUnits && completedRevisionsCount === totalUnits) {
        learningStatus = 'Graduate';
    } else if (openedModulesCount > 0) {
        learningStatus = 'In Progress';
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Student Dashboard</h1>
                        <p className="mt-1 text-lg text-slate-600">Track your learning journey comprehensively.</p>
                    </div>
                    {learningStatus === 'Graduate' && (
                        <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full text-white font-bold flex items-center shadow-md">
                            <Trophy className="w-5 h-5 mr-2" />
                            SkillNavigator Graduate
                        </div>
                    )}
                </div>

                {/* Top Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                            <BookOpen className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Modules Read</p>
                            <h3 className="text-2xl font-bold text-slate-900">{openedModulesCount} <span className="text-sm font-medium text-slate-400">/ {totalUnits}</span></h3>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mr-4">
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Revisions Done</p>
                            <h3 className="text-2xl font-bold text-slate-900">{completedRevisionsCount} <span className="text-sm font-medium text-slate-400">/ {totalUnits}</span></h3>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center">
                        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mr-4">
                            <CheckSquare className="w-6 h-6 text-indigo-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Quizzes Passed</p>
                            <h3 className="text-2xl font-bold text-slate-900">{completedQuizzesCount} <span className="text-sm font-medium text-slate-400">/ {totalUnits}</span></h3>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center">
                        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mr-4">
                            <Target className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Average Score</p>
                            <h3 className="text-2xl font-bold text-slate-900">{averageScore}%</h3>
                        </div>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Career Suggestion Box */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-indigo-600 px-6 py-4 flex items-center">
                                <Compass className="w-6 h-6 text-white mr-2" />
                                <h2 className="text-lg font-bold text-white">Career Path Finder</h2>
                            </div>
                            <div className="p-8 text-center bg-gradient-to-b from-indigo-50/50 to-white">
                                {savedCareer ? (
                                    <>
                                        <p className="text-slate-500 font-medium mb-2 uppercase tracking-wider text-sm">Recommended Career</p>
                                        <h3 className="text-3xl font-extrabold text-primary mb-6">{savedCareer}</h3>
                                        <div className="flex justify-center gap-4">
                                            <Link to="/career-finder" className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2 border rounded-lg transition-colors">Retake Career Quiz</Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-slate-600 text-lg mb-6">You haven't taken the Career Finder quiz yet to discover your ideal tech role.</p>
                                        <Link to="/career-finder" className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-white bg-primary hover:bg-indigo-700 font-medium transition-colors shadow-sm">
                                            Find My Career Path
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Modules Progress Details */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="border-b border-slate-100 px-6 py-4">
                                <h2 className="text-lg font-bold text-slate-900 flex items-center">
                                    <FileText className="w-5 h-5 text-primary mr-2" />
                                    Detailed Module Progress
                                </h2>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {unitsData.map(unit => {
                                    const score = scores[unit.slug];
                                    const hasTakenQuiz = score !== undefined;
                                    const hasRevised = completedRevisions[unit.slug];
                                    const hasOpened = openedModules[unit.slug];

                                    return (
                                        <div key={unit.slug} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition-colors gap-4">
                                            <div className="flex items-center">
                                                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white mr-4 shadow-sm ${hasOpened ? unit.color : 'bg-slate-200 text-slate-400'}`}>
                                                    {hasRevised && hasTakenQuiz ? <CheckSquare className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                                                </div>
                                                <div>
                                                    <h4 className={`font-bold ${hasOpened ? 'text-slate-900' : 'text-slate-600'}`}>{unit.title}</h4>
                                                    <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-500">
                                                        <span className={hasOpened ? "text-blue-600" : ""}>Viewed</span>
                                                        <span className="text-slate-300">•</span>
                                                        <span className={hasRevised ? "text-emerald-600" : ""}>Revised</span>
                                                        <span className="text-slate-300">•</span>
                                                        <span className={hasTakenQuiz ? "text-indigo-600" : ""}>Quiz Done</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end">
                                                {hasTakenQuiz ? (
                                                    <div className="inline-flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold border border-indigo-100">
                                                        Quiz: {score}%
                                                    </div>
                                                ) : (
                                                    <Link to={`/study/${unit.slug}`} className="text-primary hover:text-indigo-800 text-sm font-medium bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">
                                                        Resume Study
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Next Steps</h3>
                            <ul className="space-y-4">
                                {!savedCareer && (
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-primary flex justify-center items-center text-xs font-bold mr-3 mt-0.5">1</span>
                                        <p className="text-sm text-slate-700">Take the <Link to="/career-finder" className="text-primary font-medium hover:underline">Career Finder Quiz</Link> to get a recommendation.</p>
                                    </li>
                                )}
                                {openedModulesCount < totalUnits && (
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-primary flex justify-center items-center text-xs font-bold mr-3 mt-0.5">
                                            {savedCareer ? '1' : '2'}
                                        </span>
                                        <p className="text-sm text-slate-700">Explore all {totalUnits} <Link to="/study" className="text-primary font-medium hover:underline">Study Modules</Link>.</p>
                                    </li>
                                )}
                                {completedQuizzesCount < totalUnits && (
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-primary flex justify-center items-center text-xs font-bold mr-3 mt-0.5">
                                            •
                                        </span>
                                        <p className="text-sm text-slate-700">Pass the 10-question <Link to="/quiz" className="text-primary font-medium hover:underline">Practice Quizzes</Link> for every module.</p>
                                    </li>
                                )}
                                {completedRevisionsCount < totalUnits && (
                                    <li className="flex items-start">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-primary flex justify-center items-center text-xs font-bold mr-3 mt-0.5">
                                            •
                                        </span>
                                        <p className="text-sm text-slate-700">Mark all modules as "Revised" to cement your knowledge.</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
