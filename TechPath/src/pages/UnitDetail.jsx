import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import unitContent from '../data/unitContent.json';
import { useLocalStorage } from '../hooks/useLocalStorage';
import UnitDiagram from '../components/UnitDiagrams';
import { ArrowLeft, CheckCircle2, PlayCircle, Key, Briefcase, Award, Code, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const UnitDetail = () => {
    const { slug } = useParams();
    const unit = unitContent[slug];

    const [openedModules, setOpenedModules] = useLocalStorage('techpath_opened_modules', {});
    const [completedRevisions, setCompletedRevisions] = useLocalStorage('techpath_completed_revisions', {});

    useEffect(() => {
        if (unit && !openedModules[slug]) {
            setOpenedModules(prev => ({ ...prev, [slug]: true }));
        }
    }, [slug, unit, openedModules, setOpenedModules]);

    if (!unit) {
        return <Navigate to="/study" replace />;
    }

    const isRevised = completedRevisions[slug];

    const handleCompleteRevision = () => {
        setCompletedRevisions(prev => ({ ...prev, [slug]: true }));
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link to="/study" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to all modules
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-indigo-600 px-8 py-10 text-white">
                        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{unit.title}</h1>
                        <p className="text-indigo-100 text-lg sm:text-xl max-w-3xl">{unit.intro}</p>
                    </div>

                    <div className="p-8 space-y-16">

                        {/* 1. Core Learning Sections */}
                        <div className="space-y-12">
                            {unit.sections.map((section, idx) => (
                                <section key={idx} className="scroll-mt-20">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2 flex items-center">
                                        <span className="bg-indigo-100 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                                            {idx + 1}
                                        </span>
                                        {section.title}
                                    </h2>
                                    <p className="text-slate-700 leading-relaxed text-lg mb-6">{section.explanation}</p>

                                    {section.keyPoints && (
                                        <div className="mb-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                                            <h4 className="font-bold text-slate-900 mb-3 flex items-center text-sm uppercase tracking-wider">
                                                <CheckSquare className="w-4 h-4 text-primary mr-2" /> Key Points
                                            </h4>
                                            <ul className="space-y-2">
                                                {section.keyPoints.map((kp, i) => (
                                                    <li key={i} className="flex items-start text-slate-700">
                                                        <span className="text-primary mr-2 mt-0.5">•</span>
                                                        <span>{kp}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {section.example && (
                                        <div className="mb-6 border-l-4 border-secondary pl-4 py-2 italic text-slate-600">
                                            <strong>Real-world Example:</strong> {section.example}
                                        </div>
                                    )}

                                    {section.summary && (
                                        <p className="text-sm font-medium text-slate-500 bg-slate-100 inline-block px-3 py-1 rounded-full">
                                            Summary: {section.summary}
                                        </p>
                                    )}
                                </section>
                            ))}
                        </div>

                        {/* 2. Visual Learning Section */}
                        {unit.diagramId && (
                            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200 overflow-hidden">
                                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center justify-center">
                                    Visual Architecture
                                </h3>
                                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                                    <UnitDiagram diagramId={unit.diagramId} />
                                </div>
                            </section>
                        )}

                        {/* 3. Quick Revision Section */}
                        {unit.revision && (
                            <section className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                    <Key className="w-6 h-6 text-primary mr-2" />
                                    Quick Revision
                                </h3>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white p-5 rounded-xl shadow-sm">
                                        <h4 className="font-bold text-slate-900 mb-3">Core Concepts</h4>
                                        <ul className="space-y-1">
                                            {unit.revision.keyConcepts.map((c, i) => <li key={i} className="text-sm text-slate-700 font-medium">• {c}</li>)}
                                        </ul>
                                    </div>
                                    <div className="bg-white p-5 rounded-xl shadow-sm">
                                        <h4 className="font-bold text-slate-900 mb-3">Key Tools</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {unit.revision.tools.map((t, i) => <span key={i} className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-bold text-slate-700">{t}</span>)}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 bg-white p-5 rounded-xl shadow-sm">
                                    <h4 className="font-bold text-slate-900 mb-3">Important Definitions</h4>
                                    <dl className="space-y-3">
                                        {unit.revision.importantDefinitions.map((def, i) => (
                                            <div key={i}>
                                                <dt className="font-bold text-indigo-700 text-sm">{def.term}</dt>
                                                <dd className="text-slate-600 text-sm mt-0.5">{def.definition}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </section>
                        )}

                        {/* 4. Career Opportunities */}
                        {unit.career && (
                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                    <Briefcase className="w-6 h-6 text-orange-500 mr-2" />
                                    Career Opportunities
                                </h3>
                                <p className="text-slate-600 mb-6">{unit.career.intro}</p>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {unit.career.roles.map((role, rIndex) => (
                                        <div key={rIndex} className="bg-white shadow-sm border border-slate-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                                            <h4 className="font-bold text-slate-900 text-lg mb-2">{role.name}</h4>
                                            <p className="text-sm text-slate-600 mb-4">{role.desc}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {role.skills.map(s => <span key={s} className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-medium border border-orange-100">{s}</span>)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 5. Certification Guidance */}
                        {unit.certifications && (
                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                    <Award className="w-6 h-6 text-yellow-500 mr-2" />
                                    Recommended Certifications
                                </h3>
                                <div className="space-y-4">
                                    {unit.certifications.map((cert, cIndex) => (
                                        <div key={cIndex} className="bg-white border text-sm box-border sm:text-base border-slate-200 p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-primary transition-colors">
                                            <div className="flex-grow">
                                                <h4 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{cert.name}</h4>
                                                <p className="text-slate-500 text-sm font-medium mb-2">{cert.provider}</p>
                                                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600 mb-2">
                                                    <span className="flex items-center"><strong>Difficulty:</strong>&nbsp;{cert.difficulty}</span>
                                                    <span className="flex items-center"><strong>Duration:</strong>&nbsp;{cert.duration}</span>
                                                </div>
                                                <p className="text-sm text-slate-500"><strong>Skills:</strong> {cert.skills}</p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold rounded-lg transition-colors">
                                                    View Official
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 6. Mini Projects */}
                        {unit.projects && Array.isArray(unit.projects) && (
                            <section>
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                                    <Code className="w-6 h-6 text-secondary mr-2" />
                                    Mini Project Ideas
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {unit.projects.map((proj, pIndex) => (
                                        <div key={pIndex} className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl">
                                            <h4 className="font-bold text-emerald-900 mb-2">{proj.name}</h4>
                                            <p className="text-sm text-emerald-700 leading-relaxed">{proj.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <hr className="border-slate-100" />

                        {/* Completion Actions */}
                        <section className="flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm gap-4">
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Finished revising?</h3>
                                <p className="text-sm text-slate-500">Mark this module as revised to track it on your dashboard.</p>
                            </div>
                            <button
                                onClick={handleCompleteRevision}
                                disabled={isRevised}
                                className={`inline-flex items-center px-6 py-3 rounded-xl font-bold transition-all ${isRevised ? 'bg-green-100 text-green-700 cursor-default' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                            >
                                {isRevised ? (
                                    <><CheckCircle2 className="w-5 h-5 mr-2" /> Revision Completed</>
                                ) : (
                                    'Mark as Revised'
                                )}
                            </button>
                        </section>

                    </div>
                </div>

                {/* Quiz Call to action */}
                <div className="text-center py-6">
                    <Link
                        to={`/quiz?unit=${slug}`}
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-white bg-primary hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all hover:-translate-y-1"
                    >
                        <PlayCircle className="w-6 h-6 mr-2" />
                        Take the 10-Question Quiz
                    </Link>
                    <p className="mt-4 text-slate-500 text-sm">Test everything you learned about {unit.title}</p>
                </div>
            </div>
        </div>
    );
};

export default UnitDetail;
