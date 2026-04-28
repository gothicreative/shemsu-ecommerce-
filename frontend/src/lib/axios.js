// import axios from "axios";

// const axiosInstance = axios.create({
// 	baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
// 	withCredentials: true,
// });

// export default axiosInstance;

import axios from "axios";

const fallbackBaseURL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";
const apiBaseURL = import.meta.env.VITE_API_URL || fallbackBaseURL;

const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
	baseURL: apiBaseURL,
	withCredentials: true,
});

export default axiosInstance;