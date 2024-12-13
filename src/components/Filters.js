import React from 'react';

const Filters = ({ filterType, filterStatus, onTypeChange, onStatusChange }) => {
  return (
    <div>
      <div className="mb-3">
        <label className="form-label">By Plant Type:</label>
        <select className="form-select" value={filterType} onChange={(e) => onTypeChange(e.target.value)}>
          <option value="all">All</option>
          <option value="succulent">Succulent</option>
          <option value="tropical">Tropical</option>
          <option value="herb">Herb</option>
          <option value="cacti">Cacti</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">By Watering Status:</label>
        <select className="form-select" value={filterStatus} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="all">All</option>
          <option value="ok">Ok</option>          
          <option value="duesoon">Due Soon</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
