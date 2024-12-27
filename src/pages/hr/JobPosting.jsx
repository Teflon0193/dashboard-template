import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Tag, Tooltip, Select, Tabs } from 'antd';
import { PlusOutlined, EyeOutlined, UserOutlined  } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

const { Option } = Select;
const { TabPane } = Tabs;

function JobPosting() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('All locations');
  const [selectedDepartment, setSelectedDepartment] = useState('All departments');

  // Job Counters
  const [activeJobs, setActiveJobs] = useState(0);
  const [archivedJobs, setArchivedJobs] = useState(0);

  const navigate = useNavigate();

  // Fetch jobs from backend API
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8080/api/job-postings') 
      .then((response) => {
        const data = response.data;
        setJobs(data);

        // Calculate active job count (status === 'open')
        setActiveJobs(data.filter((job) => job.status === 'open').length);

        // Calculate archived job count (status === 'closed')
        setArchivedJobs(data.filter((job) => job.status === 'closed').length);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Define table columns
  const columns = [
    {
      title: 'TITLE',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      render: (text) => (
        <a href="#" className="text-blue-500">
          {text}
        </a>
      ),
    },
    {
      title: 'LOCATION',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'DEPARTMENT',
      dataIndex: 'department',
      key: 'department',
    },
    {
        title: 'CANDIDATES',
        key: 'candidates',
        render: (record) =>
          record.candidates ? (
            <div className="flex items-center">
              <UserOutlined style={{ marginRight: 4 }} />
              <span>{record.candidates}</span>
            </div>
          ) : (
            <span>—</span>
          ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'open' ? 'green' : status === 'draft' ? 'orange' : 'volcano'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'PUBLISH DATE',
      dataIndex: 'publishDate',
      key: 'publishDate',
    },
    {
        title: 'VIEW DETAILS',
        key: 'actions',
        render: (_, record) => (
          <Tooltip title="View Job Details">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/hr/job-posting/hr/job-details/${record.id}`)}
            />
          </Tooltip>
      ),
    },
  ];

  // Filter jobs based on selected location and department
  const filteredJobs = jobs.filter(
    (job) =>
      (selectedLocation === 'All locations' || job.location === selectedLocation) &&
      (selectedDepartment === 'All departments' || job.department === selectedDepartment)
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="p-6 bg-white shadow rounded-lg m-4">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Hiring</h1>
            <Button type="primary" icon={<PlusOutlined />} size="large">
              Add a Job
            </Button>
          </div>

          {/* Job Filters */}
          <div className="flex justify-between mb-4">
            {/* Job Tabs */}
            <Tabs defaultActiveKey="1">
              <TabPane tab={`Active Jobs (${activeJobs})`} key="1" />
              <TabPane tab={`Draft Jobs`} key="2" />
              <TabPane tab={`Archived Jobs (${archivedJobs})`} key="3" />
            </Tabs>

            {/* Dropdown Filters */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {/* Locations Dropdown */}
              <Select
                defaultValue="All locations"
                style={{ width: 150 }}
                onChange={(value) => setSelectedLocation(value)}
              >
                <Option value="All locations">All locations</Option>
                <Option value="Company HQ">Company HQ</Option>
                <Option value="Remote">Remote</Option>
              </Select>

              {/* Departments Dropdown */}
              <Select
                defaultValue="All departments"
                style={{ width: 150 }}
                onChange={(value) => setSelectedDepartment(value)}
              >
                <Option value="All departments">All departments</Option>
                <Option value="Accounting">Accounting</Option>
                <Option value="Office">Office</Option>
                <Option value="Customer Service">Customer Service</Option>
                <Option value="Sales">Sales</Option>
              </Select>
            </div>
          </div>

          {/* Job Table */}
          <Table
            dataSource={filteredJobs}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}

export default JobPosting;
