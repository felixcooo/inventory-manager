import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:4000",
});

export const getItems = () => API.get("/api/inventory");
export const addItem = (data) => API.post("/api/inventory", data);
export const updateItem = (id, data) => API.put(`/api/inventory/${id}`, data);
export const deleteItem = (id) => API.delete(`/api/inventory/${id}`);
