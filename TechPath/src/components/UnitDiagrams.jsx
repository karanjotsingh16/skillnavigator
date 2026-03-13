import React from 'react';
import { motion } from 'framer-motion';

const UnitDiagram = ({ diagramId }) => {
    if (diagramId === 'data-science') {
        return (
            <div className="flex flex-col items-center py-6 w-full overflow-x-auto">
                <svg width="600" height="200" viewBox="0 0 600 200" className="max-w-full">
                    {/* Connecting Line */}
                    <path d="M 50 100 L 550 100" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="8 8" />

                    {/* Nodes */}
                    {[
                        { x: 50, label: "Capture", sub: "Raw Data", color: "#3b82f6" },
                        { x: 175, label: "Maintain", sub: "Clean & Store", color: "#6366f1" },
                        { x: 300, label: "Process", sub: "Mine Data", color: "#8b5cf6" },
                        { x: 425, label: "Analyze", sub: "Predict", color: "#a855f7" },
                        { x: 550, label: "Communicate", sub: "Visualize", color: "#d946ef" }
                    ].map((node, i) => (
                        <g key={i}>
                            <circle cx={node.x} cy="100" r="30" fill={node.color} className="shadow-lg" />
                            <text x={node.x} y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{(i + 1)}</text>
                            <text x={node.x} y="150" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">{node.label}</text>
                            <text x={node.x} y="170" textAnchor="middle" fill="#64748b" fontSize="12">{node.sub}</text>
                        </g>
                    ))}
                </svg>
            </div>
        );
    }

    if (diagramId === 'ai-ml') {
        return (
            <div className="flex flex-col items-center py-6 w-full overflow-x-auto">
                <svg width="600" height="250" viewBox="0 0 600 250" className="max-w-full">
                    <circle cx="300" cy="125" r="110" fill="#f8fafc" stroke="#3b82f6" strokeWidth="4" />
                    <text x="300" y="45" textAnchor="middle" fill="#1e293b" fontSize="16" fontWeight="bold">Artificial Intelligence (AI)</text>

                    <circle cx="300" cy="140" r="80" fill="#eff6ff" stroke="#8b5cf6" strokeWidth="4" />
                    <text x="300" y="90" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">Machine Learning (ML)</text>

                    <circle cx="300" cy="155" r="50" fill="#e0e7ff" stroke="#d946ef" strokeWidth="4" />
                    <text x="300" y="160" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">Deep Learning</text>
                    <text x="300" y="180" textAnchor="middle" fill="#64748b" fontSize="10">(Neural Networks)</text>
                </svg>
            </div>
        );
    }

    if (diagramId === 'cybersecurity') {
        return (
            <div className="flex flex-col items-center py-6 w-full overflow-x-auto">
                <svg width="400" height="300" viewBox="0 0 400 300" className="max-w-full">
                    <polygon points="200,40 320,240 80,240" fill="#fef2f2" stroke="#ef4444" strokeWidth="6" strokeLinejoin="round" />

                    <circle cx="200" cy="40" r="35" fill="#ef4444" />
                    <text x="200" y="45" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Integrity</text>

                    <circle cx="320" cy="240" r="35" fill="#f97316" />
                    <text x="320" y="245" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Availability</text>

                    <circle cx="80" cy="240" r="35" fill="#ec4899" />
                    <text x="80" y="245" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Confidentiality</text>

                    <text x="200" y="160" textAnchor="middle" fill="#1e293b" fontSize="18" fontWeight="extrabold">CIA Triad</text>
                </svg>
            </div>
        );
    }

    if (diagramId === 'devops-testing') {
        return (
            <div className="flex flex-col items-center py-6 w-full overflow-x-auto">
                <svg width="600" height="200" viewBox="0 0 600 200" className="max-w-full">
                    {/* Continuous Loop Infinity Symbol representation */}
                    <path d="M 200 100 C 100 0, 0 100, 100 180 C 200 250, 400 -50, 500 20 C 600 100, 500 200, 400 100 C 350 50, 250 150, 200 100 Z" fill="none" stroke="#f97316" strokeWidth="6" strokeOpacity="0.2" />
                    <path d="M 200 100 C 150 50, 50 50, 50 100 C 50 150, 150 150, 200 100 C 250 50, 350 50, 400 100 C 450 150, 550 150, 550 100 C 550 50, 450 50, 400 100 C 350 150, 250 150, 200 100 Z" fill="none" stroke="#f97316" strokeWidth="4" strokeDasharray="10 5" />

                    <rect x="60" y="80" width="80" height="40" rx="8" fill="#3b82f6" />
                    <text x="100" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Code</text>

                    <rect x="260" y="25" width="80" height="40" rx="8" fill="#6366f1" />
                    <text x="300" y="50" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Build / Test</text>

                    <rect x="460" y="80" width="80" height="40" rx="8" fill="#8b5cf6" />
                    <text x="500" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Deploy</text>

                    <rect x="260" y="135" width="80" height="40" rx="8" fill="#ec4899" />
                    <text x="300" y="160" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Monitor</text>
                </svg>
            </div>
        );
    }

    if (diagramId === 'cloud-computing') {
        return (
            <div className="flex flex-col items-center py-6 w-full overflow-x-auto">
                <svg width="600" height="250" viewBox="0 0 600 250" className="max-w-full">
                    {/* Base */}
                    <rect x="100" y="180" width="400" height="40" rx="4" fill="#64748b" />
                    <text x="300" y="205" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Datacenter / Physical Hardware</text>

                    {/* IaaS */}
                    <rect x="100" y="130" width="120" height="40" rx="4" fill="#3b82f6" opacity="0.9" />
                    <text x="160" y="155" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">IaaS</text>
                    <text x="160" y="115" textAnchor="middle" fill="#64748b" fontSize="10">You manage OS</text>

                    {/* PaaS */}
                    <rect x="240" y="130" width="120" height="40" rx="4" fill="#6366f1" opacity="0.9" />
                    <rect x="240" y="80" width="120" height="40" rx="4" fill="#6366f1" opacity="0.7" />
                    <text x="300" y="105" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">PaaS</text>
                    <text x="300" y="65" textAnchor="middle" fill="#64748b" fontSize="10">You manage App</text>

                    {/* SaaS */}
                    <rect x="380" y="130" width="120" height="40" rx="4" fill="#8b5cf6" opacity="0.9" />
                    <rect x="380" y="80" width="120" height="40" rx="4" fill="#8b5cf6" opacity="0.7" />
                    <rect x="380" y="30" width="120" height="40" rx="4" fill="#8b5cf6" opacity="0.5" />
                    <text x="440" y="55" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">SaaS</text>
                    <text x="440" y="15" textAnchor="middle" fill="#64748b" fontSize="10">They manage all</text>
                </svg>
            </div>
        );
    }

    if (diagramId === 'full-stack') {
        return (
            <div className="flex flex-col items-center py-6 w-full overflow-x-auto">
                <svg width="600" height="220" viewBox="0 0 600 220" className="max-w-full">

                    {/* Client */}
                    <rect x="50" y="60" width="150" height="100" rx="10" fill="#f1f5f9" stroke="#3b82f6" strokeWidth="3" />
                    <text x="125" y="100" textAnchor="middle" fill="#1e293b" fontSize="16" fontWeight="bold">Frontend (UI)</text>
                    <text x="125" y="130" textAnchor="middle" fill="#64748b" fontSize="12">HTML, CSS, React</text>

                    {/* Arrows */}
                    <path d="M 210 90 L 320 90" stroke="#94a3b8" strokeWidth="4" markerEnd="url(#arrowhead)" />
                    <text x="265" y="80" textAnchor="middle" fill="#64748b" fontSize="10" fontStyle="italic">HTTP Request</text>

                    <path d="M 320 130 L 210 130" stroke="#94a3b8" strokeWidth="4" markerEnd="url(#arrowhead)" />
                    <text x="265" y="145" textAnchor="middle" fill="#64748b" fontSize="10" fontStyle="italic">JSON Response</text>

                    {/* Server */}
                    <rect x="330" y="60" width="100" height="100" rx="10" fill="#f1f5f9" stroke="#6366f1" strokeWidth="3" />
                    <text x="380" y="100" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">Backend</text>
                    <text x="380" y="130" textAnchor="middle" fill="#64748b" fontSize="10">Node.js, APIs</text>

                    {/* Database */}
                    <path d="M 440 90 L 490 90" stroke="#94a3b8" strokeWidth="3" />
                    <path d="M 440 130 L 490 130" stroke="#94a3b8" strokeWidth="3" />

                    <ellipse cx="530" cy="70" rx="40" ry="15" fill="#f1f5f9" stroke="#8b5cf6" strokeWidth="3" />
                    <rect x="490" y="70" width="80" height="80" fill="#f1f5f9" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="300 0 0 160" />
                    <ellipse cx="530" cy="150" rx="40" ry="15" fill="#f1f5f9" stroke="#8b5cf6" strokeWidth="3" />
                    <text x="530" y="125" textAnchor="middle" fill="#1e293b" fontSize="14" fontWeight="bold">Database</text>

                    {/* Definitions */}
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                        </marker>
                    </defs>
                </svg>
            </div>
        );
    }

    return null;
};

export default UnitDiagram;
