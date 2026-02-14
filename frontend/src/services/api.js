import axios from "axios";

const API = axios.create({
  baseURL: "https://node-backend-hsdn.onrender.com/api"
});

// Helper to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Authenticated requests
export const getTasks = () => API.get("/tasks", { headers: getAuthHeaders() });
export const createTask = (data) => API.post("/tasks", data, { headers: getAuthHeaders() });
export const deleteTask = (id) => API.delete(`/tasks/${id}`, { headers: getAuthHeaders() });
export const updateTaskStatus = (id, status) =>
  API.patch(`/tasks/${id}/status`, { status }, { headers: getAuthHeaders() });
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data, { headers: getAuthHeaders() });

// Auth endpoints
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getAnalytics = (userId) => API.get(`/analytics/stats/${userId}`, { headers: getAuthHeaders() });

export default API;
