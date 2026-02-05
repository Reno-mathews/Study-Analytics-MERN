import { Link, useLocation } from "react-router-dom";

function Header({ onLogout }) {
    const location = useLocation();

    const linkClass = (path) =>
        `text-sm font-medium ${
            location.pathname === path
            ? "text-blue-400"
            : "text-gray-300 hover:text-white"
        }`;

        return (
            <header className="bg-white border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                    {/* Left: Navigation */}
                    <nav className="flex items-center gap-6">
                        <Link to="/" className={linkClass("/")}>
                        DashBoard
                        </Link>
                        <Link to="/upgrade" className={linkClass("/upgrade")}>
                            Upgrade
                        </Link>
                    </nav>

                    {/* Center: Title */}
                    <h1 className="text-lg bg-white-100 font-semibold tracking-wide">
                        Study Analytics
                    </h1>

                    {/* Right: Logout */}
                    <button
                        onClick={onLogout}
                        className="text-sm border border-slate-600 px-4 py-1.5 rounded-md hover:bg-slate-800 transition"
                    >
                        Logout
                    </button>                
                    </div>
            </header>
        );
}

export default Header;