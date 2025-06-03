import axios from 'axios'; //using axios (has auto json parsing)

const API = axios.create({ baseURL: '/api' });

export const getTodos = (sortBy) => {
  return API.get('/todo', {
    params: {
      sortBy: sortBy
    }
  });
};
export const addTodo = (todo) => API.post('/todo', todo);
export const updateTodo = (id, title) => API.put(`/todo/${id}`, title);
export const deleteTodo = (id) => API.delete(`/todo/${id}`);
export const setStatus = (id, status) => API.patch(`/todo/${id}`, { isComplete: status });
