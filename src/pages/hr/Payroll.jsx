import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

function Payroll() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddPayrollModal, setShowAddPayrollModal] = useState(false); // State for modal
  const employeesPerPage = 8;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/payroll")
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching payroll data:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredEmployees(employees);
    } else {
      setFilteredEmployees(
        employees.filter((payroll) =>
          payroll.employee.name.toLowerCase().includes(query)
        )
      );
    }
    setCurrentPage(1);
  }; 

  const handleAddPayroll = () => {
    setShowAddPayrollModal(true);
  };

  const handleCloseModal = () => {
    setShowAddPayrollModal(false);
  };

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

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
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Payroll Calculation</h1>
            <div className="flex items-center space-x-4">
              <label htmlFor="month" className="font-medium">
                Month:
              </label>
              <input
                type="month"
                id="month"
                className="border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by employee..."
              className=" border border-gray-300 rounded"
            />
         
            <button
                onClick={handleAddPayroll}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Payroll
            </button>
            
              </div>

          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Employee</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Base Salary, $</th>
                <th className="px-4 py-2">Commissions, $</th>
                <th className="px-4 py-2">Penalties, $</th>
                <th className="px-4 py-2">Bonuses, $</th>
                <th className="px-4 py-2">Total, $</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.length > 0 ? (
                currentEmployees.map((payroll, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{payroll.employee.name}</td>
                    <td className="px-4 py-2">{payroll.employee.jobTitle}</td>
                    <td className="px-4 py-2 text-left">
                      {payroll.baseSalary.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-left">
                      {payroll.commissions.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-left">
                      {payroll.penalties.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-left">
                      {payroll.bonuses.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-left font-bold">
                      {(
                        payroll.baseSalary +
                        payroll.commissions -
                        payroll.penalties +
                        payroll.bonuses
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-gray-500 italic py-4"
                  >
                    No payroll data available.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t font-bold">
                <td colSpan="2" className="px-4 py-2 text-right">
                  Total:
                </td>
                <td className="px-4 py-2 text-left">
                  {filteredEmployees.reduce(
                    (sum, payroll) => sum + payroll.baseSalary,
                    0
                  ).toFixed(2)}
                </td>
                <td className="px-4 py-2 text-left">
                  {filteredEmployees.reduce(
                    (sum, payroll) => sum + payroll.commissions,
                    0
                  ).toFixed(2)}
                </td>
                <td className="px-4 py-2 text-left">
                  {filteredEmployees.reduce(
                    (sum, payroll) => sum + payroll.penalties,
                    0
                  ).toFixed(2)}
                </td>
                <td className="px-4 py-2 text-left">
                  {filteredEmployees.reduce(
                    (sum, payroll) => sum + payroll.bonuses,
                    0
                  ).toFixed(2)}
                </td>
                <td className="px-4 py-2 text-left">
                  {filteredEmployees.reduce(
                    (sum, payroll) =>
                      sum +
                      payroll.baseSalary +
                      payroll.commissions -
                      payroll.penalties +
                      payroll.bonuses,
                    0
                  ).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            <p>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>

        {showAddPayrollModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded p-6 shadow-md w-1/3">
              <h2 className="text-lg font-bold mb-4">Add New Payroll</h2>
              <form>
                <div className="mb-4">
                  <label className="block font-medium">Employee Name:</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter employee name"
                  />
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Role:</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Enter Role"
                    />
                  </div>
                 <div className="mb-4">
                    <label className="block font-medium">Base Salary:</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Enter base salary"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Commissions:</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Enter commissions"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Penalties:</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Enter penalties"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Bonuses:</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Enter bonuses"
                    />
                  </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payroll;
