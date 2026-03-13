import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Briefcase, ChevronRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';

const questions = [
    {
        id: 1,
        question: "Which of the following activities do you enjoy the most?",
        options: [
            { text: "Analyzing trends and working with numbers", career: "Data Scientist" },
            { text: "Teaching a computer how to do something smart", career: "AI Engineer" },
            { text: "Finding flaws, breaking things, or solving security puzzles", career: "Cybersecurity Analyst" },
            { text: "Automating repetitive tasks and connecting systems", career: "DevOps Engineer" },
            { text: "Building scalable infrastructure on the internet", career: "Cloud Engineer" },
            { text: "Creating beautiful, interactive websites from scratch", career: "Full Stack Developer" },
            { text: "Designing layouts and making apps look great", career: "UI/UX Designer" }
        ]
    },
    {
        id: 2,
        question: "If you had to solve a problem, how would you approach it?",
        options: [
            { text: "Use historical data to find the root cause", career: "Data Scientist" },
            { text: "Create an algorithm to solve it automatically", career: "AI Engineer" },
            { text: "Look for vulnerabilities and patch them securely", career: "Cybersecurity Analyst" },
            { text: "Create a reliable script to ensure it never happens again", career: "DevOps Engineer" },
            { text: "Scale up servers and distribute the workload", career: "Cloud Engineer" },
            { text: "Build a tool or web app to manage it", career: "Full Stack Developer" },
            { text: "Design a better user interface to prevent user errors", career: "UI/UX Designer" }
        ]
    },
    {
        id: 3,
        question: "What kind of output do you prefer to see from your work?",
        options: [
            { text: "Charts, graphs, and actionable business insights", career: "Data Scientist" },
            { text: "A model that can predict outcomes or generate text", career: "AI Engineer" },
            { text: "A secure system that resists external attacks", career: "Cybersecurity Analyst" },
            { text: "A smooth, automated pipeline delivering software fast", career: "DevOps Engineer" },
            { text: "A highly available network spanning multiple regions", career: "Cloud Engineer" },
            { text: "A fast, fully functional web application", career: "Full Stack Developer" },
            { text: "A stunning, intuitive design prototype", career: "UI/UX Designer" }
        ]
    },
    {
        id: 4,
        question: "Which tool or concept sounds the most interesting to learn?",
        options: [
            { text: "Python, Pandas, and Hadoop", career: "Data Scientist" },
            { text: "Neural Networks and TensorFlow", career: "AI Engineer" },
            { text: "Wireshark, Ethical Hacking, and Cryptography", career: "Cybersecurity Analyst" },
            { text: "Docker, Kubernetes, and Jenkins", career: "DevOps Engineer" },
            { text: "AWS, Azure, and Virtualization", career: "Cloud Engineer" },
            { text: "React, Node.js, and MongoDB", career: "Full Stack Developer" },
            { text: "Figma, Color Theory, and User Research", career: "UI/UX Designer" }
        ]
    }
];

const careerInfo = {
    "Data Scientist": {
        desc: "You love diving into data, discovering patterns, and making predictive models.",
        skills: ["Python/R", "SQL", "Statistics", "Machine Learning"],
        salary: "$100k - $160k",
        path: "/study/data-science"
    },
    "AI Engineer": {
        desc: "You are fascinated by making machines act intelligent. You fit right into building the next generation of AI.",
        skills: ["Python", "Deep Learning", "NLP", "Mathematics"],
        salary: "$120k - $180k",
        path: "/study/ai-ml"
    },
    "Cybersecurity Analyst": {
        desc: "You have a hacker mindset but want to use it for good. You enjoy protecting systems from malicious actors.",
        skills: ["Networking", "Linux", "Ethical Hacking", "Cryptography"],
        salary: "$90k - $150k",
        path: "/study/cybersecurity"
    },
    "DevOps Engineer": {
        desc: "You love automation and efficiency. You ensure software is delivered quickly and reliably.",
        skills: ["Linux", "Docker", "CI/CD", "Scripting"],
        salary: "$105k - $165k",
        path: "/study/devops-testing"
    },
    "Cloud Engineer": {
        desc: "You're interested in the backbone of the modern internet—scalable, distributed cloud infrastructure.",
        skills: ["AWS/Azure/GCP", "Networking", "Security", "Infrastructure as Code"],
        salary: "$110k - $160k",
        path: "/study/cloud-computing"
    },
    "Full Stack Developer": {
        desc: "You want to build everything from the database to the user interface. You are a versatile creator.",
        skills: ["JavaScript/TypeScript", "React", "Node.js", "Databases"],
        salary: "$90k - $150k",
        path: "/study/full-stack"
    },
    "UI/UX Designer": {
        desc: "You care deeply about how things look and how users interact with them. Empathy and creativity are your strong suits.",
        skills: ["Figma", "User Research", "Wireframing", "Prototyping"],
        salary: "$80k - $130k",
        path: "/study/full-stack" // We point UX to full stack as well for study basics
    }
};

const CareerFinder = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);

    const [savedCareer, setSavedCareer] = useLocalStorage('techpath_career_result', null);

    const handleSelect = (career) => {
        const newAnswers = [...answers, career];
        setAnswers(newAnswers);

        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Calculate Most Frequent
            const frequency = {};
            let maxFreq = 0;
            let topCareer = newAnswers[0];

            newAnswers.forEach(c => {
                frequency[c] = (frequency[c] || 0) + 1;
                if (frequency[c] > maxFreq) {
                    maxFreq = frequency[c];
                    topCareer = c;
                }
            });

            setResult(topCareer);
            setSavedCareer(topCareer);
        }
    };

    const resetQuiz = () => {
        setCurrentStep(0);
        setAnswers([]);
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 flex justify-center items-center">
                        <Compass className="w-10 h-10 mr-4 text-primary" />
                        Career Tech Finder
                    </h1>
                    <p className="text-xl text-slate-600">
                        Answer a few quick questions to discover which technology career path aligns best with your interests and personality.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {result || savedCareer ? (
                        <div className="p-8 sm:p-12 text-center">
                            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                                <Briefcase className="w-10 h-10" />
                            </div>
                            <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">Your Ideal Tech Match</h2>
                            <h3 className="text-4xl font-extrabold text-slate-900 mb-6">{result || savedCareer}</h3>

                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 text-left mb-8">
                                <p className="text-lg text-slate-700 mb-6">{careerInfo[result || savedCareer]?.desc}</p>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                                            <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                                            Key Skills Needed
                                        </h4>
                                        <ul className="space-y-2">
                                            {careerInfo[result || savedCareer]?.skills.map(skill => (
                                                <li key={skill} className="text-slate-600 flex items-center">
                                                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-3 text-slate-900 flex items-center">
                                            <Briefcase className="w-4 h-4 text-orange-500 mr-2" />
                                            Average Salary Range
                                        </h4>
                                        <p className="text-2xl font-bold text-orange-600">{careerInfo[result || savedCareer]?.salary}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    to={careerInfo[result || savedCareer]?.path || "/study"}
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-primary hover:bg-indigo-700 transition-colors"
                                >
                                    View Learning Roadmap
                                    <ChevronRight className="ml-2 w-5 h-5" />
                                </Link>
                                <button
                                    onClick={resetQuiz}
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                                >
                                    Retake Quiz
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 sm:p-10">
                            <div className="mb-8">
                                <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                                    <span>Question {currentStep + 1} of {questions.length}</span>
                                    <span>{Math.round(((currentStep) / questions.length) * 100)}% Complete</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${((currentStep) / questions.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-2xl font-bold text-slate-900 mb-6">{questions[currentStep].question}</h3>
                                    <div className="space-y-3">
                                        {questions[currentStep].options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSelect(option.career)}
                                                className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-primary hover:bg-indigo-50 transition-all font-medium text-slate-700 hover:text-primary flex justify-between items-center group"
                                            >
                                                {option.text}
                                                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CareerFinder;
