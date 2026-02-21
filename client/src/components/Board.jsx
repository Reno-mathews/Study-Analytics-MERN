import { useState } from "react";
import { useContext } from "react";

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
import { AreaChart, Area } from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";
import DashboardCard from "../components/DashboardCard";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function Board({ user }) {
    const { 
        sessions,
        loading, 
        error, 
        addSession, 
        dailyChartData, 
        subjectChartData,
        cumulativeChartData,
        totalMinutes,
        sessionCount,
        averageMinutes,
        mostStudiedSubject,
        currentStreak,
        longestStreak,
        heatmapChartData,
         } = useAnalyticsBoard();

        const [subject, setSubject] = useState("");
        const [duration, setDuration] = useState("");
        const [date,setDate] = useState("");
        const [showModal, setShowModal] = useState(false)

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

            {user?.isPro ? (
              <>  
                <DashboardCard
                    title="Avg / Session"
                    value={`${averageMinutes} min`}
                />

                <DashboardCard
                    title="Top Subject"
                    value={mostStudiedSubject}
                />

                <DashboardCard
                    title="Current Streak"
                    value={`${currentStreak} days 🔥`}
                />

                <DashboardCard
                    title="Longest Streak"
                    value={`${longestStreak} days ⭐`}
                />
            </>
            ) : (
                <>
                    <DashboardCard
                        title="Avg / Session"
                        value="🔒 Pro"
                    />
                </>
                
            )}
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <div className="bg-white border border-slate-200 rounded-lg p-5 mb-8">
            <h2 className="text-base font-semibold mb-4">Sessions Per Day</h2>

            <ResponsiveContainer width="100%" height={260}>
                <BarChart data={dailyChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="sessions" fill="#10b981" />
                </BarChart>
            </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 mb-8">
            <h2 className="text-base font-semibold mb-4">Cumulative Study Time </h2>

            <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={cumulativeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Area 
                    type="monotone"
                    dataKey="cumulativeMinutes"
                    stroke="#6366f1"
                    fill="#c7d2fe"
                />
                </AreaChart>
            </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 mb-8">
            <h2 className="text-base font-semibold mb-4">Subject Distribution</h2>

            <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                    <Pie    
                        data={subjectChartData}
                        dataKey="minutes"
                        nameKey="subject"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

            <div className="bg-white border border-slate-200 rounded-lg p-5 mb-8">
                <h2 className="text-base font-semibold mb-4">
                    Study Consistency
                </h2>

                <CalendarHeatmap
                    startDate={new Date("2026-01-01")}
                    endDate={new Date()}
                    values={heatmapChartData}
                    classForValue={(value) => {
                        if (!value) return "color-empty";
                        if (value.count < 60) return "color-scale-1";
                        if (value.count < 120) return "color-scale-2";
                        if (value.count < 240) return "color-scale-3";
                        return "colour-scalr-4";
                    }}
                    tooltipDataAttrs={(value) => ({
                        "data-tip":
                        value?.date
                         ? `${value.date}: ${value.count} min`
                         : "No study",
                    })}
                />
            </div>
        </div>
        </div>


            {user?.isPro ? (
                <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
                 <h2 className="text-base font-semibold mb-4 text-slate-800">
                    Time by Subject
                </h2>

        {subjectChartData.length <= 1 ? (
            <p className="text-sm text-slate-500">
                Add more subjects to see a comparison.
            </p>
    
            ) : (
            
            <ResponsiveContainer width="100%" height={220}>
                <BarChart data={subjectChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" stroke="#64748b" />
                    <YAxis 
                        type="category"
                        dataKey="subject"
                        stroke="#64748b"
                    />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
            )}
        </div>
            ) : (
                    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8 text-center">
        <h2 className="text-base font-semibold mb-4 text-slate-800">
            Time by Subject
        </h2>
        <p className="text-slate-500 mb-3">
            🔒 Subject comparison is a Pro feature.
        </p>
        <button
            onClick={() => window.location.href = "/upgrade"}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
            Upgrade to Pro
        </button>
    </div>
            )}
        <div className="flex justify-end mb-6">
            <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
                >
                    + Add Session
            </button>
        </div>
        {sessions.length === 0 ? (
            <p>No sessions yet</p>
        ) : (
            <div className="bg-white border border-slate-200 rounded-lg divide-y">
            {sessions.map((s) => (
            <div 
            key={s.id}
            className="px-5 py-3 flex justify-between text-sm">
                <div className="font-medium"><strong>{s.subject}</strong></div>
                <div className="text-slate-500">{s.duration} minutes • {new Date(s.session_date).toLocaleDateString()}

                </div>
            </div>
            ))}
        </div>
)}
    <div className="flex justify-end">
    </div>
    </div>
    </div>

    {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">
            Add Study Session
        </h2>

        <form 
            onSubmit={(e) => {
                e.preventDefault();

                addSession({
                    subject,
                    duration: Number(duration),
                    session_date: date,
                });

                setSubject("");
                setDuration("");
                setDate("");
                setShowModal(false);
            }}
            className="space-y-4"
            >
            {/* Subject */}
            <input
                type="text"
                placeholder="Subject (e.g. Math, React)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />

            {/* Duration */}
            <input
                type="number"
                placeholder="Duration (minutes)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="1"
                required
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />

            {/* Date */}
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm rounded-md border border-slate-300 hover:bg-slate-100"
                >
                Cancel
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                    Save
                </button>
            </div>
        </form>
        </div>
        </div>
    )}
</div>
);
}

export default Board;


