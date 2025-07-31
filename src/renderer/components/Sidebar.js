import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="#conflicts">Conflicts</a></li>
        <li><a href="#suspects">Suspects</a></li>
        <li><a href="#resolved">Resolved Issues</a></li>
        <li><a href="#pending">Pending Issues</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;