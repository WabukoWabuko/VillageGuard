import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-8">VillageGuard</h2>
      <nav>
        <NavLink to="/dashboard" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">Dashboard</NavLink>
        <NavLink to="/cases" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">Cases</NavLink>
        <NavLink to="/suspects" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">Suspects</NavLink>
        <NavLink to="/reports" className="block py-2 px-4 mb-2 rounded hover:bg-gray-700">Reports</NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;