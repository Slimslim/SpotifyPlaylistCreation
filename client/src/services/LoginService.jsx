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
            console.log("error in LoginService: ", err);
            throw err.response.data;
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
    localStorage.clear();
    return http
        .post("/logout", {}, { withCredentials: true })
        .then((response) => response.data)
        .catch((err) => {
            throw err.response.data.errors;
        });
}

// Get logged in user information
async function getUserById(id) {
    return http
        .get(`/get_user_info_by_id/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            throw err.response.data.errors;
        });
}

export { login, register, logout, getUserById };
