import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Brain, ShieldCheck, GitMerge, Cloud, Layout, ArrowRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import unitsData from '../data/units.json';

const IconMap = {
    Database,
    Brain,
    ShieldCheck,
    GitMerge,
    Cloud,
    Layout,
};

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white pt-20 pb-32">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-indigo-50" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
                            Explore Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Tech Careers</span>
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-10">
                            SkillNavigator is an interactive learning platform designed to help students discover emerging technology fields and identify the best career path tailored to their skills and interests.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to="/study"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-white bg-primary hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1"
                            >
                                Start Learning
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                to="/career-finder"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-primary bg-indigo-50 hover:bg-indigo-100 transition-all hover:-translate-y-1"
                            >
                                <Compass className="mr-2 w-5 h-5" />
                                Find Your Tech Career
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Domain Cards Section */}
            <section className="py-20 bg-slate-50 relative -mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">Featured Study Domains</h2>
                        <p className="mt-4 text-lg text-slate-600">Master the 6 key pillars of modern technology</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {unitsData.map((unit, index) => {
                            const Icon = IconMap[unit.icon] || Layout;
                            return (
                                <motion.div
                                    key={unit.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 transition-all hover:shadow-xl group"
                                >
                                    <div className={`w-14 h-14 rounded-xl ${unit.color} text-white flex items-center justify-center mb-6 shadow-md`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{unit.title}</h3>
                                    <p className="text-slate-600 line-clamp-3 mb-6">
                                        {unit.description}
                                    </p>
                                    <Link
                                        to={`/study`}
                                        className="inline-flex items-center text-primary font-medium hover:text-indigo-700"
                                    >
                                        Explore Unit
                                        <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
