import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Database, Brain, ShieldCheck, GitMerge, Cloud, Layout } from 'lucide-react';
import unitsData from '../data/units.json';

const IconMap = {
    Database,
    Brain,
    ShieldCheck,
    GitMerge,
    Cloud,
    Layout,
};

const Study = () => {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">Study Modules</h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
                        Select a learning track below to explore the syllabus, read key concepts, and prepare for your career paths.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {unitsData.map((unit) => {
                        const Icon = IconMap[unit.icon] || Layout;
                        return (
                        <Link key={unit.slug} to={`/study/${unit.slug}`} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all flex flex-col group cursor-pointer block">
                            <div className={`h-2 ${unit.color} group-hover:opacity-90 transition-opacity`}></div>
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex flex-col items-start mb-4 gap-4">
                                    <div className={`w-12 h-12 rounded-xl border border-slate-100 flex items-center justify-center shadow-sm text-slate-700 bg-white group-hover:${unit.color} group-hover:text-white transition-colors`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{unit.title}</h3>
                                </div>
                                <p className="text-slate-600 mb-6 flex-grow">{unit.description}</p>
                                <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                                    <span className="flex items-center"><BookOpen className="w-4 h-4 mr-1" /> Syllabus unit</span>
                                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> ~2 hrs read</span>
                                </div>
                                <div
                                    className={`w-full text-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${unit.color} group-hover:opacity-90 flex justify-center items-center transition-all`}
                                >
                                    Start Studying
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Study;
