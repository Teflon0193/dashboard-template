import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import ComplianceReport from './pages/environmental/ComplianceReport';
import EnvironmentalIncident from './pages/environmental/EnvironmentalIncident';
import EnvironmentalMetric from './pages/environmental/EnvironmentalMetric';
import AccountsPayable from './pages/finance/AccountsPayable';
import AccountsReceivable from './pages/finance/AccountsReceivable';
import Assets from './pages/finance/Assets';
import GeneralLedger from './pages/finance/GeneralLedger';
import FinanceOverview from './pages/finance/FinanceOverview ';
import ApplicantForm from './pages/hr/ApplicantForm';
import EmployeeList from './pages/hr/EmployeeList';
import Attendance from './pages/hr/Attendance';


function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/environmental/compliance-reports" element={<ComplianceReport />} />
        <Route path="/environmental/environmental-incidents" element={<EnvironmentalIncident />} />
        <Route path="/environmental/environmental-metrics" element={<EnvironmentalMetric />} />
        <Route path="/finance/accounts-payable" element={<AccountsPayable />} />
        <Route path="/finance/accounts-receivable" element={<AccountsReceivable />} />
        <Route path="/finance/assets" element={<Assets />} />
        <Route path="/finance/general-ledger" element={<GeneralLedger />} />
        <Route path="/finance-dashboard" element={<FinanceOverview />} />
        <Route path="/hr/applicants" element={<ApplicantForm />} />
        <Route path="/hr/attendance"  element={<Attendance />}/>
        <Route path="/hr/employees" element={<EmployeeList />} />
      </Routes>
    </>
  );
}

export default App;