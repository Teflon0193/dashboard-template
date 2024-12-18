import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Banner from '../../partials/Banner';

function GeneralLedger() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [generalLedger, setGeneralLedger] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/general-ledger')
      .then(response => setGeneralLedger(response.data))
      .catch(error => console.error('Error fetching general ledger:', error));
  }, []);

  // Calculate totals for Debit, Credit, and Net Movement
  const totalDebit = generalLedger.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = generalLedger.reduce((sum, item) => sum + item.credit, 0);
  const totalNetMovement = generalLedger.reduce((sum, item) => sum + item.netMovement, 0);

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
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">General Ledger Summary</h1>
              <p className="text-sm text-gray-600">From 1 June 2021 to 30 June 2021</p>
            </div>

            {/* Table displaying General Ledger */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
              <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">General Ledger Details</h2>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700">
                    <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="p-2 border text-left">Account</th>
                        <th className="p-2 border text-right">Debit</th>
                        <th className="p-2 border text-right">Credit</th>
                        <th className="p-2 border text-right">Net Movement</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                      {generalLedger.map((item, index) => (
                        <tr key={index}>
                          <td className="p-2 border">{item.accountName} ({item.accountCode})</td>
                          <td className="p-2 border text-right">{item.debit.toFixed(2)}</td>
                          <td className="p-2 border text-right">{item.credit.toFixed(2)}</td>
                          <td className={`p-2 border text-right ${ item.netMovement < 0 ? 'text-red-500' : 'text-gray-800' }`}                                          
                          >
                            {item.netMovement.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="font-bold bg-gray-100 dark:bg-gray-700">
                        <td className="p-2 border">Total</td>
                        <td className="p-2 border text-right">${totalDebit.toFixed(2)}</td>
                        <td className="p-2 border text-right">${totalCredit.toFixed(2)}</td>
                        <td className={`p-2 border text-right ${totalNetMovement < 0 ? 'text-red-500' : 'text-gray-800' }`}
                        >
                          ${totalNetMovement.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="p-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => alert('Exporting to Excel...')} // Replace with export logic
                >
                  Export detailed General Ledger to Excel
                </button>
              </div>
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default GeneralLedger;
