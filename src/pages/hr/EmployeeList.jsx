import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const employeesPerPage = 12; // Number of employees per page
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/employees")
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initialize filtered employees
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setMessage("An error occurred while fetching employee data.");
      });
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredEmployees(employees); // Reset to full list if search is cleared
    } else {
      setFilteredEmployees(
        employees.filter(
          (employee) =>
            employee.name.toLowerCase().includes(query) ||
            (employee.jobTitle &&
              employee.jobTitle.toLowerCase().includes(query))
        )
      );
    }
    setCurrentPage(1); // Reset to the first page of filtered results
  };

  const handleCardClick = (id) => {
    // Navigate to the EmployeeDetails page with the employee ID
    navigate(`/hr/employees/${id}`);
  };

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  // Get employees for the current page
  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Employee Cards Section */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Employee Directory</h1>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded">
                + Add New Employee
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded">
                + Invite Employees
              </button>
            </div>
          </div>

         {/* Search Bar */}
         <div className="mb-6">
           <input
             type="text"
             value={searchQuery}
             onChange={handleSearchChange}
             placeholder="Search employees by name or job title..."
             className="w-1/2 p-2 border border-gray-300 rounded" 
            />
           </div>


          {/* Employee Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(employee.id)} // Navigate on click
                  className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-center">
                    {employee.name}
                  </h3>
                  <p className="text-sm text-center text-gray-600">
                    {employee.jobTitle || "No Job Title"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 italic">
                {message || "No employee data available"}
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next Page
            </button>
          </div>

          {/* Page Indicator */}
          <div className="text-center mt-4">
            <p className="text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
