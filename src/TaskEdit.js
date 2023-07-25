import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7008/api/TaskItems', 
});
const TaskEdit = ({ task }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpdate = async () => {
    try {
      await api.put(`/TaskItems/${task.id}`, {
        title,
        description,
      });
      console.log('Task updated successfully!');
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <div>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description: </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>Update Task</button>
    </div>
  );
};

export default TaskEdit;
