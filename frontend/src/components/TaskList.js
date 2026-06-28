import React from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

function TaskList({ tasks, onEdit, onDelete, onStatusToggle }) {
  if (tasks.length === 0) {
    return <div className="empty-state">No tasks found. Add one above!</div>;
  }

  return (
    <div className="task-list">
      <h2 className="task-count">{tasks.length} Task{tasks.length !== 1 ? 's' : ''}</h2>
      {tasks.map(task => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusToggle={onStatusToggle}
        />
      ))}
    </div>
  );
}

export default TaskList;