import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

function SafetyTraining() {
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false); // For modal visibility
  const [newTraining, setNewTraining] = useState({
    training_name: "",
    startDate: "",
    endDate: "",
    duration: "",
    status: "",
  }); // Form state for new training
  const trainingsPerPage = 8;

  useEffect(() => {
    // Fetch training data from the API
    axios
      .get("http://localhost:8080/api/safety-training")
      .then((response) => {
        setTrainings(response.data);
        setFilteredTrainings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching safety training data:", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredTrainings(trainings);
    } else {
      setFilteredTrainings(
        trainings.filter((training) =>
          training.training_name.toLowerCase().includes(query)
        )
      );
    }
    setCurrentPage(1); // Reset to the first page of filtered results
  };

  const handleAddTraining = () => {
    axios
      .post("http://localhost:8080/api/safety-training", newTraining)
      .then((response) => {
        setTrainings([...trainings, response.data]);
        setFilteredTrainings([...filteredTrainings, response.data]);
        setShowAddModal(false); // Close the modal
        setNewTraining({
          training_name: "",
          startDate: "",
          endDate: "",
          duration: "",
          status: "",
        }); // Reset form
      })
      .catch((error) => {
        console.error("Error adding safety training:", error);
      });
  };

  const totalPages = Math.ceil(filteredTrainings.length / trainingsPerPage);

  const currentTrainings = filteredTrainings.slice(
    (currentPage - 1) * trainingsPerPage,
    currentPage * trainingsPerPage
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
            <h1 className="text-xl font-bold">HR Safety Training Plan</h1>
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
              placeholder="Search by name..."
              className=" border border-gray-300 rounded"
            />
         
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Training
              </button>
            
              </div>

          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Training Name</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">End Date</th>
                <th className="px-4 py-2">Duration (days)</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Certificate</th>
              </tr>
            </thead>
            <tbody>
              {currentTrainings.length > 0 ? (
                currentTrainings.map((training, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{training.training_name}</td>
                    <td className="px-4 py-2">{training.startDate}</td>
                    <td className="px-4 py-2">{training.endDate}</td>
                    <td className="px-4 py-2">{training.duration}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          training.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : training.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {training.status || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {training.certificate ? (
                        <a
                          href={training.certificate}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Certificate
                        </a>
                      ) : (
                        "Not Available"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-500 italic py-4"
                  >
                    No training data available.
                  </td>
                </tr>
              )}
            </tbody>
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

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-lg font-bold mb-4">Add New SafetyTraining</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Training Name
                  </label>
                  <input
                    type="text"
                    value={newTraining.training_name}
                    onChange={(e) =>
                      setNewTraining({
                        ...newTraining,
                        training_name: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newTraining.startDate}
                    onChange={(e) =>
                      setNewTraining({ ...newTraining, startDate: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newTraining.endDate}
                    onChange={(e) =>
                      setNewTraining({ ...newTraining, endDate: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    value={newTraining.duration}
                    onChange={(e) =>
                      setNewTraining({ ...newTraining, duration: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={newTraining.status}
                    onChange={(e) =>
                      setNewTraining({ ...newTraining, status: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="">Select Status</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">Available</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddTraining}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add
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

export default SafetyTraining;
