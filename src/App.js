import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const addTodo = (newTask) => {
    if (newTask.trim() === '') return;
    const newTodos = [...todos, { id: Date.now(), text: newTask, completed: false }];
    setTodos(newTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <div className="todo-header">
        <h1>Todo List</h1>
      </div>
      <div className="todo-input-group">
        <input type="text" placeholder="Add new todo" value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={() => addTodo(task)}>Submit</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}` }>
            <p className="todo-text">{todo.text}</p>
            <div className="todo-actions">
              <button className="btn-complete" onClick={() => toggleComplete(todo.id)}>✓</button>
              <button className="btn-delete" onClick={() => deleteTodo(todo.id)}>✕</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
