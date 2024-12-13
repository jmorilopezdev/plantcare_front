import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import PlantForm from './components/PlantForm';

const App = () => {

  return (
    <Router>
      <div>
        {/* Barra de navegación */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              App Plant Care
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-plant">
                    Add New Plant
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Rutas */}
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-plant" element={<PlantForm />} />
            <Route path="/edit-plant" element={<PlantForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
