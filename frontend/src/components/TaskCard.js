import React from 'react';
import './TaskCard.css';

const priorityColors = { Low: '#48bb78', Medium: '#ed8936', High: '#e53e3e' };
const statusColors = { Pending: '#a0aec0', 'In Progress': '#4299e1', Completed: '#48bb78' };

function TaskCard({ task, onEdit, onDelete, onStatusToggle }) {
  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed';

  return (
    <div className={`task-card ${task.status === 'Completed' ? 'completed' : ''}`}>
      <div className="task-card-left">
        <div className="task-title">{task.title}</div>
        {task.description && <div className="task-desc">{task.description}</div>}
        <div className="task-meta">
          {task.dueDate && (
            <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
              {isOverdue ? 'Overdue: ' : 'Due: '}{formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>
      <div className="task-card-right">
        <span className="badge" style={{ background: priorityColors[task.priority] }}>{task.priority}</span>
        <button
          className="status-btn"
          style={{ background: statusColors[task.status] }}
          onClick={() => onStatusToggle(task)}
          title="Click to change status"
        >
          {task.status}
        </button>
        <div className="task-actions">
          <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(task._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;