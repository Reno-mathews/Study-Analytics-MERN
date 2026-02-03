import { useState } from "react";
import { useAnalyticsBoard } from "../hooks/useAnalyticsBoard";

function Board() {
    const { sessions, loading, error, addSession } = useAnalyticsBoard();

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Study Analytics</h1>

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
    </div>
    
);
}

export default Board;
