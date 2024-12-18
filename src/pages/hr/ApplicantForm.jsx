import React, { useState, useEffect } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import axios from 'axios';

function ApplicantList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the list of applicants from the backend
    axios
      .get('http://localhost:8080/api/applicants')
      .then((response) => {
        console.log('Fetched Applicants:', response.data); // Debug log
        setApplicants(response.data);
      })
      .catch((error) => {
        console.error('Error fetching applicants:', error);
        setMessage('An error occurred while fetching applicants.');
      });
  }, []);

  // Count applicants by status with normalization
  const countByStatus = (status) => {
    if (status === 'All') return applicants.length;

    return applicants.filter(
      (applicant) =>
        applicant.phase?.trim().toLowerCase() === status.trim().toLowerCase()
    ).length;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Applicants List</h1>
            <div>
              <button className="text-blue-500 underline">View job details</button>
              <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
                Add Applicant
              </button>
            </div>
          </div>

          {/* Status Cards */}
          <div className="flex gap-4 mb-6 overflow-x-auto">
            {['All', 'Screening', '1st Personal Interview', '2nd Personal Interview', 'Offer', 'Rejected', 'Accepted'].map(
              (status, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center px-4 py-2 border rounded-lg ${
                    index === 0 ? 'bg-blue-100' : 'bg-gray-100'
                  } cursor-pointer`}
                >
                  <span className="text-lg font-semibold">{countByStatus(status)}</span>
                  <span className="text-sm text-gray-500">{status}</span>
                </div>
              )
            )}
          </div>

          {/* Applicants Table */}
          {applicants.length > 0 ? (
            <table className="min-w-full border rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Application Date</th>
                  <th className="py-2 px-4 border">Position</th>
                  <th className="py-2 px-4 border">Category</th>
                  <th className="py-2 px-4 border">Resume</th>
                  <th className="py-2 px-4 border">Messages</th>
                  <th className="py-2 px-4 border">Evaluations</th>
                  <th className="py-2 px-4 border">Notes</th>
                  <th className="py-2 px-4 border">Tags</th>
                  <th className="py-2 px-4 border">Phase</th>
                  <th className="py-2 px-4 border">Days in Phase</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant, index) => (
                  <tr key={index} className="text-sm">
                    <td className="py-2 px-4 border">{applicant.name}</td>
                    <td className="py-2 px-4 border">{applicant.applicationDate}</td>
                    <td className="py-2 px-4 border">{applicant.position}</td>
                    <td className="py-2 px-4 border">{applicant.category}</td>
                    <td className="py-2 px-4 border">
                      <a
                        href={applicant.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        View Resume
                      </a>
                    </td>
                    <td className="py-2 px-4 border">{applicant.messages}</td>
                    <td className="py-2 px-4 border">{applicant.evaluations}</td>
                    <td className="py-2 px-4 border">{applicant.notes}</td>
                    <td className="py-2 px-4 border">{applicant.tags}</td>
                    <td className="py-2 px-4 border">{applicant.phase}</td>
                    <td className="py-2 px-4 border">{applicant.daysInPhase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-gray-500 text-center py-6">{message || 'No applicants available.'}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicantList;
