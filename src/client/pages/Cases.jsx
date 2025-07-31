import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cases() {
  const [cases, setCases] = useState([]);
  const [form, setForm] = useState({ type: '', description: '', location: '' });

  useEffect(() => {
    const fetchCases = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/cases', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCases(response.data);
    };
    fetchCases();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3000/api/cases', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ type: '', description: '', location: '' });
    const response = await axios.get('http://localhost:3000/api/cases', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCases(response.data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cases</h2>
      <form onSubmit={handleSubmit} className="mb-6 bg-gray-900 p-4 rounded">
        <input
          type="text"
          placeholder="Case Type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full p-2 mb-2 bg-gray-700 rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 mb-2 bg-gray-700 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full p-2 mb-2 bg-gray-700 rounded"
        />
        <button type="submit" className="p-2 bg-blue-600 rounded hover:bg-blue-700">Add Case</button>
      </form>
      <div>
        {cases.map((c) => (
          <div key={c.id} className="p-4 mb-2 bg-gray-900 rounded">
            <p><strong>Type:</strong> {c.type}</p>
            <p><strong>Description:</strong> {c.description}</p>
            <p><strong>Location:</strong> {c.location}</p>
            <p><strong>Status:</strong> {c.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cases;