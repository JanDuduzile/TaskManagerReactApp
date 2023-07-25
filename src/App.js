import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import api from './api';
import TaskList from './TaskList';
import TaskEdit from './TaskEdit';

const api = axios.create({
  baseURL: 'https://localhost:7008/api/TaskItems', 
});
const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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

  const createTask = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/TaskItems', {
        title,
        description,
      });

      setTitle('');
      setDescription('');
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const updateTask = async (id, newTitle, newDescription) => {
    try {
      await api.put(`/TaskItems/${id}`, {
        title: newTitle,
        description: newDescription,
      });
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/TaskItems/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={createTask}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create Task</button>
      </form>
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
      <TaskEdit />
    </div>
  );
};

export default TaskManager;
