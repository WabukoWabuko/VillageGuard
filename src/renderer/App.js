import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './style.css';

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default App;