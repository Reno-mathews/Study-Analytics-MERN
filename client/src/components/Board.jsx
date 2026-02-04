import { useState } from "react";
import { useAnalyticsBoard } from "../hooks/useAnalyticsBoard";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { BarChart, Bar } from "recharts";
import DashboardCard from "../components/DashboardCard";

function Board() {
    const { 
        sessions,
        loading, 
        error, 
        addSession, 
        dailyChartData, 
        subjectChartData,
        totalMinutes,
        sessionCount,
        averageMinutes,
        mostStudiedSubject,
         } = useAnalyticsBoard();

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-6">
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Study Analytics</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <DashboardCard
                title="Total Study Time"
                value={`${totalMinutes} min`}
            />

            <DashboardCard
                title="Sessions"
                value={sessionCount}
            />

            <DashboardCard
                title="Sessions"
                value={sessionCount}
            />

            <DashboardCard
                title="Avg / Session"
                value={`${averageMinutes} min`}
            />

            <DashboardCard
                title="Top Subject"
                value={mostStudiedSubject}
            />

        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 mb-8">
            <h2 className="text-base font-semibold mb-4">Daily Study Time</h2>

            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={dailyChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#64748b"/>
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="minutes"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-4 rounded mb-6">
            <h2 className="text-lg font-semibold mb-3">Time by Subject</h2>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={subjectChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="#22c55e" />
                </BarChart>
            </ResponsiveContainer>
        </div>

        {sessions.length === 0 ? (
            <p>No sessions yet</p>
        ) : (
            sessions.map((s) => (
            <div 
            key={s.id}
            className="bg-gray-800 p-3 rounded mb-2">
                <div><strong>{s.subject}</strong></div>
                <div>{s.duration} minutes</div>
                <div>{new Date(s.session_date).toLocaleDateString()}</div>
            </div>
        ))
    )}

    <button
        onClick={() => 
            addSession({
                subject: "React",
                duration: 45,
                session_date: "2026-02-03",
            })
        }
        className="mt-4 bg-blue-600 px-4 py-2 rounded"
    >
        Add test session
    </button>
    </div>
    </div>
    </div>
    
);
}

export default Board;
