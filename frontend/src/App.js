import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import axios from 'axios';
import './App.css';

const API = 'https://task-tracker-backend-jh2j.onrender.com/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '', sortBy: '' });

  const fetchTasks = async () => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.search) params.search = filters.search;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      const res = await axios.get(API, { params });
      setTasks(res.data);
    } catch (err) {
      toast.error('Failed to fetch tasks');
    }
  };
  
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchTasks(); }, [filters]);

  const handleCreate = async (data) => {
    try {
      await axios.post(API, data);
      toast.success('Task created!');
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error creating task');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await axios.put(`${API}/${id}`, data);
      toast.success('Task updated!');
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating task');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axios.delete(`${API}/${id}`);
      toast.success('Task deleted!');
      fetchTasks();
    } catch (err) {
      toast.error('Error deleting task');
    }
  };

  const handleStatusToggle = async (task) => {
    const nextStatus = task.status === 'Pending' ? 'In Progress' : task.status === 'In Progress' ? 'Completed' : 'Pending';
    await handleUpdate(task._id, { ...task, status: nextStatus });
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Task Tracker</h1>
        <p>Manage your tasks efficiently</p>
      </header>
      <div className="container">
        <TaskForm
          onSubmit={editingTask ? (data) => handleUpdate(editingTask._id, data) : handleCreate}
          editingTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />
        <FilterBar filters={filters} setFilters={setFilters} />
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDelete}
          onStatusToggle={handleStatusToggle}
        />
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default App;