import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:5000";

const login = async(email, password) => {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password}),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || data.error || "Login failed");
    }
    const token = data.token;
    const decoded = jwtDecode(token);

    localStorage.setItem("token", data.token);
    return { 
        userId: decoded.userId,
        isPro: decoded.isPro,
        token
    };
}

const signup = async (email, password) => {
    const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password}),
    });
    const data = await res.json();

    if(!res.ok) {
        throw new Error(data.message || data.error || "Signup failed");
    }

    const token = data.token;
    const decoded = 
    localStorage.setItem("token", data.token);
    return { token:data.user};
};

export { login, signup };