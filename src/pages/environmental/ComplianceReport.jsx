import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Banner from '../../partials/Banner';

function ComplianceReport() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch compliance reports
    axios.get('http://localhost:8080/api/compliance-reports')
      .then(response => setReports(response.data))
      .catch(error => console.error('Error fetching compliance reports:', error));
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
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Compliance Reports</h1>
            </div>

            {/* Display Compliance Reports as Individual Sections */}
            <div className="grid grid-cols-1 gap-6">
              {reports.map((report) => (
                <div key={report.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 border border-gray-200 dark:border-gray-700">
                  {/* Card Header as a Table */}
                  <div className="overflow-x-auto mb-2">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="p-2 text-left font-semibold text-gray-800 dark:text-gray-100">Report Name</th>
                          <th className="p-2 text-left font-semibold text-gray-800 dark:text-gray-100">Date</th>
                          <th className="p-2 text-left font-semibold text-gray-800 dark:text-gray-100">Content</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 whitespace-nowrap">{report.reportName}</td>
                          <td className="p-2 whitespace-nowrap">{new Date(report.reportDate).toLocaleDateString()}</td>
                          <td className="p-2 whitespace-nowrap">
                            {/* Link to PDF file */}
                            <a
                              href={report.pdfUrl} // Ensure the URL for the PDF is correct
                              target="_blank" // Open in a new tab
                              rel="noopener noreferrer" // Security best practice
                              className="text-blue-500 hover:underline"
                            >
                              {report.content || "This report covers all Regulatory compliance activities for the year of 2020 to 2023."}
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default ComplianceReport;
