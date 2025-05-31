import { useState, useEffect } from 'react';
import { addItem, updateItem } from '../api';

function ItemForm({ currentItem, onSave }) {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(currentItem?.name || '');
  }, [currentItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentItem) {
      await updateItem(currentItem.id, { name });
    } else {
      await addItem({ name });
    }
    onSave();
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} required />
      <button type="submit">{currentItem ? 'Update' : 'Add'}</button>
    </form>
  );
}

export default ItemForm;
