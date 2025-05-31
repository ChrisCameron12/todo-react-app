import { useState } from 'react';
import ItemList from './components/todoList';
import ItemForm from './components/todoForm';

function App() {
  const [currentItem, setCurrentItem] = useState(null);
  const [reload, setReload] = useState(false);

  return (
    <div className='container'>
      <div className='todo-wrapper'>
      <h1>Todo Items</h1>
      <ItemForm
        currentItem={currentItem}
        onSave={() => {
          setReload(!reload);
          setCurrentItem(null);
        }}
      />
      <ItemList
        key={reload} // force reload
        onEdit={item => setCurrentItem(item)}
      />
      </div>
     
    </div>
  );
}

export default App;
