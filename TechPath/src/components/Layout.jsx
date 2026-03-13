import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Footer = () => {
    return (
        <footer className="bg-dark py-8 text-center text-slate-400 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p>© {new Date().getFullYear()} SkillNavigator. Made by Karanjot Singh. Reg no.: 12509049</p>
            </div>
        </footer>
    );
};

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
