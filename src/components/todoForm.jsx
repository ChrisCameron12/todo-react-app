import { useState, useEffect } from 'react';

function TodoForm({ currentTodo, onSave, onSortChange }) {
  // Local state for the input field (title of the todo)
  const [title, setTitle] = useState('');

  //edit: update the input field
  useEffect(() => {
    setTitle(currentTodo?.title || ''); // Use the todo title or default to an empty string
  }, [currentTodo]);

  //add or update a todo
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload
    await onSave({ id: currentTodo?.id, title });
    setTitle(''); // Clear the input after saving
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Todo List</h1>
      <div className="sort-options-wrapper">
        <label htmlFor="sortSelect" className="sort-options-heading">Sort options:</label>
        <select
          className="todo-sort"
          id="sortSelect"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="complete">Complete</option>
          <option value="inProgress">In progress</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <div className="todo-input">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
          required 
          placeholder="Enter todo..."
        />
        <button type="submit">{currentTodo ? 'Update' : 'Add'}</button>
      </div>
    </form>
  );
}

export default TodoForm;
