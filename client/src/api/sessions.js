const API_URL = "http://localhost:5000";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

export const fetchSessions = async () => {
    const res = await fetch(`${API_URL}/sessions`, {
        headers: getAuthHeader(),  
    });

    if (!res.ok) {
        throw new Error("Failed to fetch sessions");
    }

    return res.json();
};

export const createSession = async (session) => {
    const res = await fetch(`${API_URL}/sessions`, {
        method: "POST",
        headers: getAuthHeader(),
        body: JSON.stringify(session),
    });

    if (!res.ok) {
        throw new Error("Failed to create session");
    }

    return res.json();
};