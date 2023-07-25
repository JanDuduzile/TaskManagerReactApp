import React, { useState, useEffect } from 'react';
import axios from 'axios';
const api = axios.create({
  baseURL: 'https://localhost:7008/api/TaskItems', 
});

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/TaskItems');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>Title:</strong> {task.title}<br />
            <strong>Description:</strong> {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
