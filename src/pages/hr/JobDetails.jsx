import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/job-postings/${id}`) // Replace with your backend endpoint
      .then((response) => setJob(response.data))
      .catch((error) => console.error('Error fetching job details:', error));
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="p-6 bg-gray-100 shadow rounded-lg m-4 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">{job.jobTitle}</h1>
        <div className="space-y-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="font-semibold text-lg">Employment Type:</p>
            <p>{job.employmentType}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="font-semibold text-lg">Compensation:</p>
            <p>{job.compensation}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="font-semibold text-lg">Experience:</p>
            <p>{job.experience}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="font-semibold text-lg">Job Description:</p>
            <p>{job.jobDescription}</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <p className="font-semibold text-lg">Application Requirements:</p>
            <p>{job.applicationRequirements}</p>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => alert('Application feature coming soon!')} // Replace with actual apply functionality
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Apply for this Job
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

export default JobDetails;
