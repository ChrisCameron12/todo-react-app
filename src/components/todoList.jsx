function TodoList({ todos, onEdit, onDelete, onStatusChange, selectedStatuses }) {
  return (
    
    <ul className="todo-items-list">
      {todos.map(todo => (
        <li key={todo.id} className={selectedStatuses[todo.id]}>
          {todo.title}

          <div className="settings-section">
            <div className="settings-section-options">
              <strong className="settings-section-options-title">Options:</strong>
              <button onClick={() => onEdit(todo)}>Edit</button>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
              <div className="dot"></div>
            </div>

            <div className="settings-section-status">
              <strong className="settings-section-options-title">Set status:</strong>
              {['inProgress', 'complete', 'pending'].map(status => (
                <button
                  key={status}
                  className={selectedStatuses[todo.id] === status ? 'selected' : ''}
                  onClick={() => onStatusChange(todo.id, status)}
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

export default TodoList;
