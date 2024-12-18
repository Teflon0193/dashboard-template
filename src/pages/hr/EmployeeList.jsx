import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state

  useEffect(() => {
    // Fetch the list of employees from the backend
    axios
      .get("http://localhost:8080/api/employees") // Update API endpoint as necessary
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setMessage("An error occurred while fetching employee data.");
      });
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Employee Table Section */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Employee List</h1>
            <div>
              <button className="px-4 py-2 bg-green-500 text-white rounded">
                + Add New Employee
              </button>
              <button className="ml-4 px-4 py-2 bg-green-500 text-white rounded">
                + Invite Employees
              </button>
            </div>
          </div>

          {/* Table */}
          <table className="min-w-full border rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Certification</th>
                <th className="py-2 px-4 border">Employment Contract</th>
                <th className="py-2 px-4 border">Training</th>
                <th className="py-2 px-4 border">Work Schedule</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <tr key={index} className="text-sm">
                    <td className="py-2 px-4 border">{employee.name}</td>
                    <td className="py-2 px-4 border">
                      {employee.certification}
                    </td>
                    <td className="py-2 px-4 border">
                      {employee.employmentContract}
                    </td>
                    <td className="py-2 px-4 border">{employee.training}</td>
                    <td className="py-2 px-4 border">
                      {employee.workSchedule}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    {message || "No employee data available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
