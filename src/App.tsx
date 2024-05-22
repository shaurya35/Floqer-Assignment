// src/App.tsx
import React from 'react';
import MainTable from './components/MainTable';
import LineGraph from './components/LineGraph';
import './App.css';

const App: React.FC = () => (
  <div className="App">
    <h1>ML Engineer Salaries</h1>
    <MainTable />
    <h2>Trends</h2>
    <LineGraph />
  </div>
);

export default App;
