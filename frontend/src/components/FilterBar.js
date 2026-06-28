import React from 'react';
import './FilterBar.css';

function FilterBar({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({ status: '', priority: '', search: '', sortBy: '' });
  };

  return (
    <div className="filter-bar">
      <input
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Search tasks..."
        className="search-input"
      />
      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="">All Status</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <select name="priority" value={filters.priority} onChange={handleChange}>
        <option value="">All Priority</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
        <option value="">Sort By</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
      <button onClick={clearFilters} className="clear-btn">Clear</button>
    </div>
  );
}

export default FilterBar;