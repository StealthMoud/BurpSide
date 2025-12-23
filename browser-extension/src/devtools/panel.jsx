import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, Shield, Search, Database, Terminal, Settings } from 'lucide-react';
import '../index.css';

const NavItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 mb-1 text-sm transition-colors rounded-r-lg border-l-4 ${active
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-surface'
            }`}
    >
        <Icon size={18} className="mr-3" />
        <span className="font-medium tracking-wide">{label}</span>
    </button>
);

const Dashboard = () => (
    <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface p-5 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-400 font-mono text-sm">ACTIVE NODES</h3>
                    <Activity size={16} className="text-primary" />
                </div>
                <p className="text-3xl font-bold text-white">0</p>
            </div>
            <div className="bg-surface p-5 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-400 font-mono text-sm">VULNERABILITIES</h3>
                    <Shield size={16} className="text-danger" />
                </div>
                <p className="text-3xl font-bold text-white">0</p>
            </div>
            <div className="bg-surface p-5 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-400 font-mono text-sm">SECRETS FOUND</h3>
                    <Search size={16} className="text-secondary" />
                </div>
                <p className="text-3xl font-bold text-white">0</p>
            </div>
        </div>
    </div>
);

const Panel = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="flex h-screen bg-background text-gray-200 font-sans selection:bg-primary/30">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-800 flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-primary tracking-wider flex items-center">
                        <Terminal className="mr-2" /> BURPSIDE
                    </h1>
                </div>

                <nav className="flex-1 pr-2">
                    <NavItem
                        icon={Activity}
                        label="Dashboard"
                        active={activeTab === 'dashboard'}
                        onClick={() => setActiveTab('dashboard')}
                    />
                    <NavItem
                        icon={Search}
                        label="Reconnaissance"
                        active={activeTab === 'recon'}
                        onClick={() => setActiveTab('recon')}
                    />
                    <NavItem
                        icon={Shield}
                        label="Vulnerabilities"
                        active={activeTab === 'vulns'}
                        onClick={() => setActiveTab('vulns')}
                    />
                    <NavItem
                        icon={Database}
                        label="Data/Storage"
                        active={activeTab === 'data'}
                        onClick={() => setActiveTab('data')}
                    />
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <NavItem
                        icon={Settings}
                        label="Settings"
                        active={activeTab === 'settings'}
                        onClick={() => setActiveTab('settings')}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto bg-[#0d0d0d]">
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'recon' && <div className="p-6">Recon Module Placeholder</div>}
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<Panel />);
