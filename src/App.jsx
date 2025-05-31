// App.jsx
import { useState, useEffect } from 'react';
import ItemForm from './components/todoForm';
import ItemList from './components/todoList';
import { getItems, addItem, updateItem, deleteItem, setStatus } from './api';

function App() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [filter, setFilter] = useState('');

  const loadItems = async (sortValue = '') => {
    try {
      const res = await getItems(sortValue);
      const items = res.data;
      setItems(items);

      const statusMap = {};
      items.forEach(item => {
        statusMap[item.id] = item.isComplete;
      });
      setSelectedStatuses(statusMap);
    } catch (err) {
      console.error('Error loading items:', err);
    }
  };

  useEffect(() => {
    loadItems(filter);
  }, [filter]);

  const handleSave = async ({ id, title }) => {
  if (id) {
    // Find the current item to preserve its status
    const existingItem = items.find(item => item.id === id);
    const status = existingItem?.isComplete || 'pending';

    await updateItem(id, { title, isComplete: status });
  } else {
    await addItem({ title, isComplete: 'pending' }); // default new items to 'pending'
  }

  await loadItems(filter);
  setCurrentItem(null);
};

  const handleDelete = async (id) => {
    await deleteItem(id);
    await loadItems(filter);
  };

  const handleStatusChange = async (id, status) => {
    await setStatus(id, status);
    await loadItems(filter);
  };

  return (
    <div className="container">
      <div className="todo-wrapper">
        <ItemForm
          currentItem={currentItem}
          onSave={handleSave}
          onSortChange={(value) => setFilter(value)}
        />
        <ItemList
          items={items}
          onEdit={setCurrentItem}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          selectedStatuses={selectedStatuses}
        />
      </div>
    </div>
  );
}

export default App;
