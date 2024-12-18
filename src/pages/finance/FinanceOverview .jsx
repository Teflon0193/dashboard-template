import React, { useState, useEffect } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Banner from '../../partials/Banner';
import axios from 'axios';
import { FaMoneyBill, FaCalendarAlt, FaUsers, FaWallet, FaChartLine } from 'react-icons/fa';

function FinanceOverview() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [finances, setFinances] = useState({
    totalOwed: 0,
    upcomingPaymentDueDate: '',
    topSupplier: '',
    totalReceivables: 0,
    totalAssets: 0,
    recentTransactions: [],
  });

  useEffect(() => {
    // Fetching mock data for demonstration; replace with your API call
    setFinances({
      totalOwed: 1500 + 1800 + 1680 + 2200,
      upcomingPaymentDueDate: '2024-07-19',
      topSupplier: 'Explosives Suppliers',
      totalReceivables: 500 + 130 + 2800,
      totalAssets: 10000 + 20000 + 26400,
      recentTransactions: [
        { id: 1, status: 'Successful', date: '2024-07-25', amount: 500 },
        { id: 2, status: 'Pending', date: '2024-07-19', amount: 130 },
        { id: 3, status: 'Failed', date: '2024-07-25', amount: 2800 },
      ],
    });
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
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Finance Overview</h1>
            </div>

            {/* Finance Overview Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Finance Overview Left Section */}
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Finance Overview</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <FaMoneyBill className="text-blue-500 w-6 h-6" />
                    <p className="text-lg font-medium">Total Amount Owed: <span className="font-bold">${finances.totalOwed}</span></p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaCalendarAlt className="text-blue-500 w-6 h-6" />
                    <p className="text-lg font-medium">Upcoming Payment Due Date: <span className="font-bold">{finances.upcomingPaymentDueDate}</span></p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaUsers className="text-blue-500 w-6 h-6" />
                    <p className="text-lg font-medium">Top Supplier: <span className="font-bold">{finances.topSupplier}</span></p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaWallet className="text-blue-500 w-6 h-6" />
                    <p className="text-lg font-medium">Total Receivables: <span className="font-bold">${finances.totalReceivables}</span></p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FaChartLine className="text-blue-500 w-6 h-6" />
                    <p className="text-lg font-medium">Total Assets: <span className="font-bold">${finances.totalAssets}</span></p>
                  </div>
                </div>
              </div>

              {/* Profile Section */}
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/150" // Replace with real avatar URL
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">Joshua Helen</h3>
                    <p className="text-sm">Tier 1</p>
                    <p className="text-sm">joshua24@gmail.com</p>
                    <p className="text-sm">+2347010653627</p>
                    <p className="text-sm">Nigeria</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p><strong>Satisfaction Rate:</strong> 75%</p>
                  <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Account Control</button>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 mt-8">
              <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">Recent Transactions</h2>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="p-2 whitespace-nowrap text-left">Transaction ID</th>
                        <th className="p-2 whitespace-nowrap text-left">Status</th>
                        <th className="p-2 whitespace-nowrap text-left">Date</th>
                        <th className="p-2 whitespace-nowrap text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                      {finances.recentTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="p-2 whitespace-nowrap">{transaction.id}</td>
                          <td className={`p-2 whitespace-nowrap ${transaction.status === 'Successful' ? 'text-green-500' : transaction.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                            {transaction.status}
                          </td>
                          <td className="p-2 whitespace-nowrap">{new Date(transaction.date).toLocaleDateString()}</td>
                          <td className="p-2 whitespace-nowrap">${transaction.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default FinanceOverview;
