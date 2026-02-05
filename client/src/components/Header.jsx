import { Link, useLocation } from "react-router-dom";

function Header({ onLogout }) {
    return (
        <div className="flex items-center jusitfy-between px-6 py-4 bg-gray-800 border-b border-gray-700">
            <div className="flex gap-4">
                <Link
                    to="/"
                    className="text-sm font-medium hover:underline"
                >
                    Dashboard
                </Link>

                <Link
                    to="/upgrade"
                    className="text-sm font-medium text-blue-600 hover:underline"
                >
                    Upgrade
                </Link>
            </div>
            <h1 className="text-3xl font-bold text-center">
                Study Analytics
            </h1>

            <button
                onClick={onLogout}
                className=" justify-right mb-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition"
            >
                Logout
            </button>
        </div>
    );
}

export default Header;