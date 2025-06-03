// App.jsx

// Import necessary React hooks and child components
import { useState, useEffect } from 'react';
import TodoForm from './components/todoForm';
import TodoList from './components/todoList';

// Import API functions
import { getTodos, addTodo, updateTodo, deleteTodo, setStatus } from './api';

function App() {
  // State to store all todos
  const [todos, setTodos] = useState([]);

  // State to store the todo currently being edited
  const [currentTodo, setCurrentTodo] = useState(null);

  // State to store the completion status of each todo
  const [selectedStatuses, setSelectedStatuses] = useState({});

  // State for filtering/sorting todos
  const [filter, setFilter] = useState('');

  //fetch todos from the backend and set local state
  const loadTodos = async (sortValue = '') => {
    try {
      // sort/filter
      const res = await getTodos(sortValue);
      const todos = res.data;
      setTodos(todos);

      // Create a map of todo IDs to their completion statuses
      const statusMap = {};
      todos.forEach(todo => {
        statusMap[todo.id] = todo.isComplete;
      });
      setSelectedStatuses(statusMap);
    } catch (err) {
      console.error('Error loading todos:', err); 
    }
  };

  // useEffect: load todos whenever the filter value changes
  useEffect(() => {
    loadTodos(filter);
  }, [filter]);

  // Handle adding a new todo or updating an existing one
  const handleSave = async ({ id, title }) => {
    if (id) {
      // Find the existing todo to preserve its status
      const existingTodo = todos.find(todo => todo.id === id);
      const status = existingTodo?.isComplete || 'pending';

      // Update the todo with the new title and existing status
      await updateTodo(id, { title, isComplete: status });
    } else {
      // Add a new todo with default status "pending"
      await addTodo({ title, isComplete: 'pending' });
    }

    await loadTodos(filter);
    setCurrentTodo(null);
  };

  // Handle deleting a todo
  const handleDelete = async (id) => {
    await deleteTodo(id);
    await loadTodos(filter); // Refresh the list
  };

  // Handle changing status
  const handleStatusChange = async (id, status) => {
    await setStatus(id, status); // Update the status via API
    await loadTodos(filter);     // Refresh the list
  };

  return (
    <div className="container">
      <div className="todo-wrapper">
        <TodoForm
          currentTodo={currentTodo}                
          onSave={handleSave}                      
          onSortChange={(value) => setFilter(value)}
        />

        <TodoList
          todos={todos}                            
          onEdit={setCurrentTodo}                  
          onDelete={handleDelete}                  
          onStatusChange={handleStatusChange}       
          selectedStatuses={selectedStatuses}      
        />
      </div>
    </div>
  );
}

export default App;
