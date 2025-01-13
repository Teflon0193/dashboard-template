import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Tag, Tooltip, Select, Tabs, Modal, Form, Input, DatePicker, message } from 'antd';
import { PlusOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

function JobPosting() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('All locations');
  const [selectedDepartment, setSelectedDepartment] = useState('All departments');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Job Counters
  const [activeJobs, setActiveJobs] = useState(0);
  const [archivedJobs, setArchivedJobs] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    setLoading(true);
    axios
      .get('http://localhost:8080/api/job-postings')
      .then((response) => {
        const data = response.data;
        setJobs(data);

        setActiveJobs(data.filter((job) => job.status === 'open').length);
        setArchivedJobs(data.filter((job) => job.status === 'closed').length);
      })
      .catch((error) => console.error('Error fetching jobs:', error))
      .finally(() => setLoading(false));
  };

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
      title: 'DEPARTMENT',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'LOCATION',
      dataIndex: 'location',
      key: 'location',
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

  const filteredJobs = jobs.filter(
    (job) =>
      (selectedLocation === 'All locations' || job.location === selectedLocation) &&
      (selectedDepartment === 'All departments' || job.department === selectedDepartment)
  );

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAddJob = (values) => {
    const newJob = {
      ...values,
      publishDate: values.publishDate.format('YYYY-MM-DD'),
    };

    axios
      .post('http://localhost:8080/api/job-postings', newJob)
      .then(() => {
        message.success('Job added successfully!');
        handleCloseModal();
        fetchJobs();
      })
      .catch((error) => {
        console.error('Error adding job:', error);
        message.error('Failed to add job.');
      });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header />
        <div className="p-6 bg-white shadow rounded-lg m-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Hiring</h1>
            <Button type="primary" size="large" onClick={handleOpenModal}>
              Add a Job
            </Button>
          </div>
          <Table
            dataSource={filteredJobs}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
        </div>
      </div>
      <Modal
        title="Add a New Job"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddJob}>
          <Form.Item name="jobTitle" label="Job Title" rules={[{ required: true, message: 'Please enter the job title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="department" label="Department" rules={[{ required: true, message: 'Please select the department!' }]}>
            <Select placeholder="Select department">
              <Option value="Accounting">Accounting</Option>
              <Option value="Office">Office</Option>
              <Option value="Customer Service">Customer Service</Option>
              <Option value="Sales">Sales</Option>
            </Select>
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please select the location!' }]}>
           <Input />
          </Form.Item>
          <Form.Item name="employmentType" label="Employment Type" rules={[{ required: true, message: 'Please enter the employment type!' }]}>
          <Select placeholder="Select employmentType">
              <Option value="Parttime">Part-Time</Option>
              <Option value="Fulltime">Full-Time</Option>
            </Select>
          </Form.Item>
          <Form.Item name="compensation" label="Compensation" rules={[{ required: true, message: 'Please enter the compensation!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="experience" label="Experience" rules={[{ required: true, message: 'Please enter the required experience!' }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="jobDescription" label="Job Description" rules={[{ required: true, message: 'Please enter the job description!' }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="applicationRequirements" label="Application Requirements" rules={[{ required: true, message: 'Please enter the application requirements!' }]}>
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item name="publishDate" label="Publish Date" rules={[{ required: true, message: 'Please select the publish date!' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status!' }]}>
            <Select placeholder="Select status">
              <Option value="open">Open</Option>
              <Option value="draft">Draft</Option>
              <Option value="closed">Closed</Option>
            </Select>
          </Form.Item>
          <Form.Item>
          <div style={{ display: 'flex', gap: '10px' }}>
             {/* Add Job Button */}
            <Button type="primary" htmlType="submit" block>
               Add Job
            </Button>
             {/* Return Button */}
            <Button type="default" block onClick={handleCloseModal}>
               Return
            </Button>
         </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default JobPosting;
