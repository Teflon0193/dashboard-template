import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Banner from '../../partials/Banner';

function AccountsReceivable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountsReceivable, setAccountsReceivable] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/accounts-receivable')
      .then((response) => setAccountsReceivable(response.data))
      .catch((error) => console.error('Error fetching accounts receivable:', error));
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
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                Schedule of Accounts Receivable
              </h1>
              <h2 className="text-lg text-gray-500 dark:text-gray-400">
               All Customers
              </h2>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Balance as of July 2017 Ending
              </p>
            </div>

            {/* Table displaying Accounts Receivable */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
              <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                  Accounts Receivable Details
                </h2>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="p-2 whitespace-nowrap text-left">Customer ID</th>
                        <th className="p-2 whitespace-nowrap text-left">Name</th>
                        <th className="p-2 whitespace-nowrap text-left">Address</th>
                        <th className="p-2 whitespace-nowrap text-left">Contact</th>
                        <th className="p-2 whitespace-nowrap text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                      {accountsReceivable.map((item) => (
                        <tr key={item.customerId}>
                          <td className="p-2 whitespace-nowrap">{item.customerId}</td>
                          <td className="p-2 whitespace-nowrap">{item.customerName}</td>
                          <td className="p-2 whitespace-nowrap">{item.address}</td>
                          <td className="p-2 whitespace-nowrap">{item.contact}</td>
                          <td className="p-2 whitespace-nowrap text-right">
                            ${item.balance.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
                        <td className="p-2 whitespace-nowrap" colSpan={4}>
                          Grand Total
                        </td>
                        <td className="p-2 whitespace-nowrap text-right">
                          $
                          {accountsReceivable
                            .reduce((sum, item) => sum + item.balance, 0)
                            .toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
              <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                  Summary of A/R Accounts
                </h2>
              </header>
              <div className="p-3">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="p-2 whitespace-nowrap text-left">Account</th>
                      <th className="p-2 whitespace-nowrap text-left">Account Description</th>
                      <th className="p-2 whitespace-nowrap text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                    <tr>
                      <td className="p-2 whitespace-nowrap">03000-000</td>
                      <td className="p-2 whitespace-nowrap">Accounts Receivable</td>
                      <td className="p-2 whitespace-nowrap text-right">
                        $
                        {accountsReceivable
                          .reduce((sum, item) => sum + item.balance, 0)
                          .toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="font-bold bg-gray-100 dark:bg-gray-700">
                      <td className="p-2 whitespace-nowrap" colSpan={2}>
                        Total
                      </td>
                      <td className="p-2 whitespace-nowrap text-right">
                        $
                        {accountsReceivable
                          .reduce((sum, item) => sum + item.balance, 0)
                          .toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default AccountsReceivable;
