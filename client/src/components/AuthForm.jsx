function AuthForm ({
    isSignUp,
    setIsSignUp,
    email,
    setEmail,
    password,
    setPassword,
    onLogin,
    onSignUp,
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-md bg-slate-400 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-2">
                    { isSignUp ? "Create an account" : "Welcome back"}
                </h2>
                <p className="text-center text-gray-400 mb-6">
                    {isSignUp ? "Sign up to get started" : "Log in to your Study Analytics board"}
                </p>

                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            isSignUp? onSignUp(email,password): onLogin(email,password);
                        }}
                        className="space-y-4"
                    >
                        <div className="space-y-1">
                            <label className="text-sm text-gray-300">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm text-gray-300">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                            <button
                                type="submit"
                                className="w-full mt-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-semibold"
                            >
                                {isSignUp ? "Sign up": "Log in"}
                            </button>
                    </form>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        {isSignUp? "Already have an account?" : "Don't have an account"}{" "}
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-blue-400 hover:underline ml-1"
                        >
                            {isSignUp? "Log in" : "Sign up"}
                        </button>
                    </p>
            </div>
        </div>
    );
}

export default AuthForm;