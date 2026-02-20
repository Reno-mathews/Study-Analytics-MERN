import { useEffect, useState } from "react";
import { fetchSessions, createSession } from "../api/sessions";

export const useAnalyticsBoard = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
;

    useEffect(() => {
        const loadSessions = async () => {
            try {
                const data = await fetchSessions();
                setSessions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadSessions();
    }, []);

    const addSession = async (session) => {
        try {
        const newSession = await createSession(session);
        setSessions((prev) => [...prev, newSession]);
        } catch (err) {
            if (err.message === "PRO_REQUIRED") {
                throw err;
            }
            setError(err.message || "Failed to create session");
        }
    };

    const dailyStats = sessions.reduce((qcc, session) => {
        const date = new Date(session.session_date).toLocaleDateString();

        if (!acc[date]) {
            acc[date] = { minutes: 0, sessions: 0 };
        }

        acc[date].minutes += session.duration;
        acc[date].sessions += 1;

        return acc;
    }, {});

    const dailyChartData = Object.entries(dailyStats).map(
        ([date, stats]) => ({
            date,
            minutes: stats.minutes,
            sessions: stats.sessions,
        })
    );

    let runningTotal = 0;

    const cumulativeChartData = dailyChartData.map((d) => {
        runningTotal += d.minutes;
        return {
            ...d,
            cumulativeMinutes: runningTotal,
        };
    });

    const subjectTotals = sessions.reduce((acc, session) => {
        acc[session.subject] =
            (acc[session.subject] || 0) + session.duration;
        return acc;
    }, {});

    const colors = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
    ]

    const subjectChartData = Object.entries(subjectTotals).map(
        ([subject, minutes]) => ({
            subject,
            minutes,
        })
    );

    const totalMinutes = sessions.reduce(
        (sum, s) => sum + s.duration,
        0
    );

    const sessionCount = sessions.length;

    const averageMinutes =
        sessionCount === 0
            ? 0
            : Math.round(totalMinutes / sessionCount);
    
    const mostStudiedSubject = (() => {
        if (sessions.length === 0) return "-";

        const subjectTotals = sessions.reduce((acc, s) => {
            acc[s.subject] = (acc[s.subject] || 0) + s.duration;
            return acc;
        }, {});
    return Object.entries(subjectTotals).sort(
        (a, b) => b[1] - a[1]
    )[0][0];
    }) ();

    return {
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
        cumulativeChartData
    };
};