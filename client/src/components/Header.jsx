function Header({ onLogout }) {
    return (
        <div className="flex items-center jusitfy-bewtween px-6 py-4 bg-gray-800 border-b border-gray-700">
            <h1 className="text-3xl font-bold text-center">
                Study Analytics
            </h1>

            <button
                onClick={onLogout}
                className="mb-6 bg-red-600 hover:bg-white-700 px-4 py-2 rounded font-semibold transition"
            >
                Logout
            </button>
        </div>
    );
}

export default Header;