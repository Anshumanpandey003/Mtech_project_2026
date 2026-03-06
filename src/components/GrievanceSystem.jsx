import React, { useState, useEffect } from 'react';

const GrievanceSystem = () => {
  const [activeTab, setActiveTab] = useState('submit');
  const [grievances, setGrievances] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    else setShowUserModal(true);

    const storedGrievances = localStorage.getItem('grievances_db');
    if (storedGrievances) setGrievances(JSON.parse(storedGrievances));
  }, []);

  const saveGrievance = (text) => {
    if (!text) return;
    const newGrievance = {
      id: `GRV-${Date.now()}`,
      text,
      status: 'Pending',
      raisedBy: currentUser?.name || 'Anonymous',
      createdAt: new Date().toLocaleString()
    };
    const updated = [...grievances, newGrievance];
    setGrievances(updated);
    localStorage.setItem('grievances_db', JSON.stringify(updated));
    alert('Grievance submitted successfully!');
    setActiveTab('database');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <header className="mb-8 text-center bg-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">MTech Grievance Redressal System</h1>
        {currentUser && <p className="mt-2 opacity-90">Welcome back, {currentUser.name}</p>}
      </header>

      <nav className="flex justify-center gap-6 mb-8 border-b-2">
        {['submit', 'database', 'dashboard'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-6 capitalize transition-all ${activeTab === tab ? 'border-b-4 border-blue-600 font-bold text-blue-600' : 'text-gray-500 hover:text-blue-400'}`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="min-h-[400px]">
        {activeTab === 'submit' && (
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">New Grievance Report</h2>
            <textarea 
              id="grievance-text"
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Provide a detailed description of your grievance..."
            />
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => {
                  const el = document.getElementById('grievance-text');
                  saveGrievance(el.value);
                  el.value = '';
                }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md transform active:scale-95 transition-all"
              >
                Submit Report
              </button>
            </div>
          </div>
        )}

        {activeTab === 'database' && (
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Repository Records</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                    <th className="p-4 rounded-tl-lg">Ticket ID</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">User</th>
                    <th className="p-4 rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {grievances.length === 0 ? (
                    <tr><td colSpan="4" className="p-8 text-center text-gray-400">No records found.</td></tr>
                  ) : (
                    grievances.map(g => (
                      <tr key={g.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-mono text-xs text-blue-600">{g.id}</td>
                        <td className="p-4 text-gray-700">{g.text}</td>
                        <td className="p-4 text-sm text-gray-500">{g.raisedBy}</td>
                        <td className="p-4">
                          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                            {g.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl shadow-lg text-white">
              <h3 className="text-lg font-medium opacity-80">Total Registered</h3>
              <p className="text-6xl font-bold mt-2">{grievances.length}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 rounded-2xl shadow-lg text-white">
              <h3 className="text-lg font-medium opacity-80">Awaiting Action</h3>
              <p className="text-6xl font-bold mt-2">{grievances.filter(g => g.status === 'Pending').length}</p>
            </div>
          </div>
        )}
      </main>

      {showUserModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-2">User Identification</h2>
            <p className="text-gray-500 mb-6">Please enter your name to access the system.</p>
            <input 
              id="user-name"
              className="w-full p-4 border-2 border-gray-100 rounded-xl bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all mb-6"
              placeholder="Full Name"
            />
            <button 
              onClick={() => {
                const name = document.getElementById('user-name').value;
                if (!name) return;
                const user = { name };
                setCurrentUser(user);
                localStorage.setItem('current_user', JSON.stringify(user));
                setShowUserModal(false);
              }}
              className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrievanceSystem;
