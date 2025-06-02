function ItemList({ items, onEdit, onDelete, onStatusChange, selectedStatuses }) {
  return (
    
    <ul className="todo-items-list">
      {items.map(item => (
        <li key={item.id} className={selectedStatuses[item.id]}>
          {item.title}

          <div className="settings-section">
            <div className="settings-section-options">
              <strong className="settings-section-options-title">Options:</strong>
              <button onClick={() => onEdit(item)}>Edit</button>
              <button onClick={() => onDelete(item.id)}>Delete</button>
              <div className="dot"></div>
            </div>

            <div className="settings-section-status">
              <strong className="settings-section-options-title">Set status:</strong>
              {['inProgress', 'complete', 'pending'].map(status => (
                <button
                  key={status}
                  className={selectedStatuses[item.id] === status ? 'selected' : ''}
                  onClick={() => onStatusChange(item.id, status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
