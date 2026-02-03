import { useEffect, useState } from "react";
import { fetchSession, createSession } from "../api/sessions";

export const useAnalyticsBoard = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
}