function LogoutButton({ onLogout }) {
    return (
    <button
        className="mb-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition"
        onClick={onLogout}
    >
        Logout
    </button>
    );
}

export default LogoutButton;