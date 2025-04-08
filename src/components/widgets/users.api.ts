import { User, isOnline } from "@/context/interfaces/movieTypes";
import envsUtils from "@/utils/envs.utils";

const API_URL = "https://movielist-backend.vercel.app";
// const API_URL = "http://localhost:9000"
console.log("🚀 ~ API_URL:", API_URL);



export async function createUser(userData: User): Promise<Response> {
    console.log("🚀 ~ envsUtils:", envsUtils);
    const res = await fetch(`${API_URL}/api/sessions/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });
    return res;
}

export async function loginUser(credentials: { email: string; password: string }): Promise<Response> {
    const res = await fetch(`${API_URL}/api/sessions/login`, { // CORREGIDO: uso de backticks
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
    });
    return res;
}

export async function checkOnlineStatus(): Promise<isOnline> {
    const res = await fetch(`${API_URL}/api/sessions/online`, { // CORREGIDO: uso de backticks
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });
    if (!res.ok) {
        throw new Error(`Error al verificar el estado online: ${res.status}`);
    }
    const data = await res.json();
    console.log("🚀 ~ checkOnlineStatus ~ data:", data);
    console.log("🚀 ~ checkOnlineStatus ~ res:",res);
    return data
}

export async function logoutUser(): Promise<Response> {
    const res = await fetch(`${API_URL}/api/sessions/signout`, { // CORREGIDO: uso de backticks
        method: "POST",
        credentials: "include",
    });
    return res;
}

export async function createCookie(): Promise<Response> {
    const res = await fetch(`${API_URL}/api/cookies/create`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Error al obtener la cookie: ${res.status}`);
    }

    return res;
}

export async function getCookie(): Promise<Response> {
    const res = await fetch(`${API_URL}/api/cookies/read`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Error al obtener la cookie: ${res.status}`);
    }

    return res;
}