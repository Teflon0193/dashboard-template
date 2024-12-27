import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/employees/${id}`) 
      .then((response) => setEmployee(response.data))
      .catch((error) => console.error('Error fetching employee details:', error));
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="p-6 bg-gray-100 shadow rounded-lg m-4 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">{employee.name}</h1>
        <div className="flex justify-center mb-6">
          <img
            src={employee.image}
            alt={employee.name}
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="font-semibold text-lg">Job Title:</p>
            <p>{employee.jobTitle || "No Job Title Provided"}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="font-semibold text-lg">Certification:</p>
            <p>{employee.certification || "No Certification Provided"}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="font-semibold text-lg">Employment Contract:</p>
            <p>{employee.employmentContract || "No Employment Contract Provided"}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="font-semibold text-lg">Training:</p>
            <p>{employee.training || "No Training Provided"}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="font-semibold text-lg">Work Schedule:</p>
            <p>{employee.workSchedule || "No Work Schedule Provided"}</p>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => alert('Edit Employee feature coming soon!')}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Edit Employee
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
