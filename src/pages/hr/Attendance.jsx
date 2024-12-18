import React, { useState, useEffect } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import axios from 'axios';
import { DatePicker } from 'antd'; // Using Ant Design for DatePicker component
import 'antd/dist/antd.css'; // Import Ant Design styles

function Attendance() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [message, setMessage] = useState('');
  const [filterDates, setFilterDates] = useState([null, null]);

  useEffect(() => {
    // Fetch the attendance data from the backend
    axios
      .get('http://localhost:8080/api/attendance')
      .then((response) => {
        console.log('Fetched Attendance:', response.data);
        setAttendanceList(response.data);

      })
      .catch((error) => {
        console.error('Error fetching attendance data:', error);
        setMessage('An error occurred while fetching attendance data.');
      });
  }, []);

  // Group attendance data by date
  const groupedByDate = attendanceList.reduce((acc, record) => {
    const date = record.date || 'Unknown Date';
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {});

  // Handle the date range filter
  const handleDateRangeChange = (dates) => {
    setFilterDates(dates);
    // You can implement your API call here to fetch data within the selected date range
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          {/* Filters Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Shift Attendance Report</h1>
            </div>
            <div className="flex items-center">
              {/* Group by Dropdown */}
              <div className="mr-4">
                <label htmlFor="groupBy" className="mr-2 text-sm font-medium">Group by:</label>
                <select id="groupBy" className="border p-2 text-sm">
                  <option value="date">Date</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              {/* Date Range Filter */}
              <DatePicker.RangePicker
                value={filterDates}
                onChange={handleDateRangeChange}
                className="border p-2"
                format="YYYY-MM-DD"
              />
            </div>
          </div>

          {/* Attendance Table */}
          {attendanceList.length > 0 ? (
            <table className="min-w-full border rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Employee Name</th>
                  <th className="py-2 px-4 border">Shift</th>
                  <th className="py-2 px-4 border">Start Time</th>
                  <th className="py-2 px-4 border">Required Time</th>
                  <th className="py-2 px-4 border">Actual Time</th>
                  <th className="py-2 px-4 border">Late Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedByDate).map((date, idx) => (
                  <React.Fragment key={idx}>
                    {/* Date Row */}
                    <tr className="bg-gray-200">
                      <td colSpan="7" className="py-2 px-4 font-bold text-left">
                        {date}
                      </td>
                    </tr>
                    {/* Attendance Records for that Date */}
                    {groupedByDate[date].map((record, index) => (
                      <tr key={index} className="text-sm text-center">
                        <td className="py-2 px-4 border"></td>
                        <td className="py-2 px-4 border">
                          {record.employee?.name || 'N/A'}
                        </td>
                        <td className="py-2 px-4 border">{record.shift}</td>
                        <td className="py-2 px-4 border">{record.startTime}</td>
                        <td className="py-2 px-4 border">{record.requiredTime}</td>
                        <td className="py-2 px-4 border">{record.actualTime}</td>
                        <td
                          className={`py-2 px-4 border font-bold ${
                            record.lateStatus === 'Late'
                              ? 'text-red-500'
                              : record.lateStatus === 'Early'
                              ? 'text-blue-500'
                              : 'text-green-500'
                          }`}
                        >
                          {record.lateStatus}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-gray-500 text-center py-6">
              {message || 'No attendance records available.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Attendance;
