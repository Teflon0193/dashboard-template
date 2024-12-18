import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Banner from '../../partials/Banner';

function EnvironmentalMetric() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [metrics, setMetrics] = useState([]);
  
  // State for chart data
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/environmental-metrics');
        setMetrics(response.data);

        // Map new metrics to chart data
        const newChartData = response.data.map(metric => ({
          timestamp: new Date(metric.timestamp).toLocaleTimeString(),
          value: metric.value,
        }));

        // Update chart data
        setChartData(prev => [...prev, ...newChartData]);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    // Fetch metrics initially
    fetchMetrics();

    // Set up an interval to fetch new metrics periodically (every 5 seconds)
    const intervalId = setInterval(fetchMetrics, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
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
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Environmental Metrics</h1>
            </div>

            {/* Display Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 mb-6">
              <h3 className="text-lg font-semibold mb-2">Real-Time Environmental Metrics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Display Environmental Metrics */}
            <div className="grid grid-cols-1 gap-6">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-md p-4">
                  <h3 className="text-lg font-semibold mb-2">Metric: {metric.metricName}</h3>
                  <p className="text-sm">Value: {metric.value} {metric.unit}</p>
                  <p className="text-sm">Timestamp: {new Date(metric.timestamp).toLocaleString()}</p>
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

export default EnvironmentalMetric;
