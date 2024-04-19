import axios from "axios";

// create base URL
const http = axios.create({
    baseURL: import.meta.env.VITE_URL,
});

// Login
async function login(user) {
    return http
        .post("/login", user, { withCredentials: true })
        .then((response) => response.data)
        .catch((err) => {
            throw err.response.data.errors;
        });
}

// Register
async function register(user) {
    return http
        .post("/register", user, { withCredentials: true })
        .then((response) => response.data)
        .catch((err) => {
            throw err.response.data.errors;
        });
}

// Logout
async function logout() {
    console.log("logging out...");
    return http
        .post("/logout", {}, { withCredentials: true })
        .then((response) => response.data)
        .catch((err) => {
            throw err.response.data.errors;
        });
}

export { login, register, logout };