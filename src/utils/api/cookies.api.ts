export async function getCookie(): Promise<Response> {
    const res = await fetch(`https://movielist-backend.vercel.app/api/cookies/read`, {
        method: "GET",
        credentials: "include", // Asegura que las cookies se envíen con la solicitud
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Error al obtener la cookie: ${res.status}`);
    }

    return res;
}