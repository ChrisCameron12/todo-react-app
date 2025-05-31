import { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../api';

function ItemList({ onEdit }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const res = await getItems();
    setItems(res.data);
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    loadItems();
  };

  return (
     <ul className="todoItemsList">
    {items.length === 0 ? (
      <li className="todoItems" key="default">
        Buy Elisha some flowers
        <div className="editBtnWrapper">
          <button onClick={() => onEdit({ id: 'default', name: 'Sample Item' })}>Edit</button>
          <button onClick={() => handleDelete('default')}>Delete</button>
        </div>
       
      </li>
    ) : (
      items.map(item => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => onEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))
    )}
  </ul>
  );
}

export default ItemList;