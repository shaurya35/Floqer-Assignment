// src/App.tsx
import React from 'react';
// import 'antd/dist/reset.css';
import MainTable from './components/MainTable';
import LineGraph from './components/LineGraph';
// import ChatApp from './components/ChatApp';
import './App.css';

const App: React.FC = () => (
  <div className="App">
    <h1>ML Engineer Salaries</h1>
    <MainTable />
    <h2>Trends</h2>
    <LineGraph />
    <h2>Chat Insights</h2>
    {/* <ChatApp /> */}
  </div>
);

export default App;
