import { useEffect, useState } from "react";
import { fetchSessions, createSession } from "../api/sessions";

export const useAnalyticsBoard = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        const newSession = await createSession(session);
        setSessions((prev) => [...prev, newSession]);
    };

    return {
        sessions,
        loading,
        error,
        addSession,
    };
};