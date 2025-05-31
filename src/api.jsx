import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

export const getItems = () => API.get('/items');
export const addItem = (item) => API.post('/items', item);
export const updateItem = (id, item) => API.put(`/items/${id}`, item);
export const deleteItem = (id) => API.delete(`/items/${id}`);