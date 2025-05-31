import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const getItems = (sortBy) => {
  return API.get('/todo', {
    params: {
      sortBy: sortBy
    }
  });
};
export const addItem = (item) => API.post('/todo', item);
export const updateItem = (id, title) => API.put(`/todo/${id}`, title);
export const deleteItem = (id) => API.delete(`/todo/${id}`);
export const setStatus = (id, status) => API.patch(`/todo/${id}`, { isComplete: status });
