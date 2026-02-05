function Upgrade() {
    return (
        <div className="min-h-screen bg-slate-100">
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-semibold mb-4">
                    Upgrade to Pro
                </h1>

                <p className="text-slate-600 mb-8">
                    Unlock advanced analytics and productivity features.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Free */}
                    <div className="bg-white border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-2">Free</h2>
                        <p className="text-slate-500 mb-4">$0 / month</p>
                        <ul className="text-sm space-y-2">
                            <li>✔ Basic analytics</li>
                            <li>✔ Daily study tracking</li>
                            <li>✖ Advanced charts</li>
                            <li>✖ Export data</li>
                        </ul>
                    </div>

                    {/* Pro */}
                    <div className="bg-white border-2 border-blue-600 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-2">Pro</h2>
                        <p className="text-slate-500 mb-4">$2.99 / month</p>
                        <ul className="text-sm space-y-2 mb-6">
                            <li>✔ Everything in Free</li>
                            <li>✔ Weekly & monthly analytics</li>
                            <li>✔ CSV export</li>
                            <li>✔ Priority features</li>
                        </ul>

                        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            Upgrade to Pro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upgrade;
