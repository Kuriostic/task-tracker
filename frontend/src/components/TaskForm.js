import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const defaultForm = { title: '', description: '', status: 'Pending', priority: 'Medium', dueDate: '' };

function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || '',
        description: editingTask.description || '',
        status: editingTask.status || 'Pending',
        priority: editingTask.priority || 'Medium',
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : ''
      });
    } else {
      setForm(defaultForm);
    }
  }, [editingTask]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (form.dueDate && new Date(form.dueDate) < new Date().setHours(0,0,0,0)) {
      errs.dueDate = 'Due date cannot be in the past';
    }
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit(form);
    if (!editingTask) setForm(defaultForm);
  };

  return (
    <div className="task-form-card">
      <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Task title" />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Task description (optional)" rows={3} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
            {errors.dueDate && <span className="error">{errors.dueDate}</span>}
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">{editingTask ? 'Update Task' : 'Add Task'}</button>
          {editingTask && <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;