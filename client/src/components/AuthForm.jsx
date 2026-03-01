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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-8 rounded-2xl border border-slate-200 shadow-lg">

            {/* Title */}
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
                    { isSignUp ? "Create an account" : "Welcome back"}
                </h2>

                <p className="text-center text-slate-500 mb-8">
                    {isSignUp ? "Sign up to get started" : "Log in to your Study Analytics board"}
                </p>
                {/* Form */}
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            isSignUp? onSignUp(email,password): onLogin(email,password);
                        }}
                        className="space-y-5"
                    >
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                            Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full  py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition font-semibold shadow-md"
                            >
                                {isSignUp ? "Sign up": "Log in"}
                            </button>
                    </form>

                    {/* Toggle*/}
                    <p className="text-center text-sm text-slate-500 mt-8">
                        {isSignUp? "Already have an account?" : "Don't have an account"}{" "}
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            {isSignUp? "Log in" : "Sign up"}
                        </button>
                    </p>
            </div>
        </div>
    );
}

export default AuthForm;