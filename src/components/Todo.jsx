import React, { useState, useEffect } from 'react';

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(updatedTasks);
      updateLocalStorage(updatedTasks);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const handleUpdateTask = () => {
    if (editingTaskText.trim()) {
      const updatedTasks = tasks.map((task, i) =>
        i === editingTaskIndex ? { ...task, text: editingTaskText } : task
      );
      setTasks(updatedTasks);
      updateLocalStorage(updatedTasks);
      setEditingTaskIndex(null);
      setEditingTaskText('');
    }
  };

  const startEditingTask = (index) => {
    setEditingTaskIndex(index);
    setEditingTaskText(tasks[index].text);
  };

  return (
    <div style={styles.container}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={styles.input}
        placeholder="Add a new task..."
      />
      <button onClick={handleAddTask} style={styles.button}>Add Task</button>
      {editingTaskIndex !== null && (
        <div>
          <input
            type="text"
            value={editingTaskText}
            onChange={(e) => setEditingTaskText(e.target.value)}
            style={styles.input}
            placeholder="Edit task..."
          />
          <button onClick={handleUpdateTask} style={styles.button}>Update Task</button>
        </div>
      )}
      <ul style={styles.list}>
        {tasks.map((task, index) => (
          <li key={index} style={styles.listItem}>
            <span
              onClick={() => handleToggleComplete(index)}
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {task.text}
            </span>
            <button onClick={() => startEditingTask(index)} style={styles.editButton}>Edit</button>
            <button onClick={() => handleDeleteTask(index)} style={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    width: '80%',
    marginRight: '10px',
  },
  button: {
    padding: '10px',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #ccc',
  },
  editButton: {
    background: 'blue',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  deleteButton: {
    background: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
};

export default ToDo;
