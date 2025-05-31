// components/ItemForm.jsx
import { useState, useEffect } from 'react';

function ItemForm({ currentItem, onSave, onSortChange }) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(currentItem?.title || '');
  }, [currentItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({ id: currentItem?.id, title });
    setTitle('');
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
        <button type="submit">{currentItem ? 'Update' : 'Add'}</button>
      </div>
    </form>
  );
}

export default ItemForm;
