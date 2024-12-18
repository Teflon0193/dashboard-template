import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Banner from '../../partials/Banner';

function EnvironmentalIncident() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Fetch environmental incidents
    axios.get('http://localhost:8080/api/environmental-incidents')
      .then(response => setIncidents(response.data))
      .catch(error => console.error('Error fetching incidents:', error));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page title */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Environmental Incidents</h1>
            </div>

            {/* Table displaying Environmental Incidents */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
              <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">Incident Details</h2>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="p-2 whitespace-nowrap text-left">Incident Description</th>
                        <th className="p-2 whitespace-nowrap text-left">Date</th>
                        <th className="p-2 whitespace-nowrap text-left">Status</th>
                        <th className="p-2 whitespace-nowrap text-left">Corrective Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                      {incidents.map((incident) => (
                        <tr key={incident.id}>
                          <td className="p-2 whitespace-nowrap">{incident.incidentDescription}</td>
                          <td className="p-2 whitespace-nowrap">{new Date(incident.incidentDate).toLocaleDateString()}</td>
                          <td className="p-2 whitespace-nowrap">{incident.status}</td>
                          <td className="p-2 whitespace-nowrap">{incident.correctiveActions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default EnvironmentalIncident;
