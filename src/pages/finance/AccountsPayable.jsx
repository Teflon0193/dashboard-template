import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import Banner from "../../partials/Banner";

function AccountsPayable() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountsPayable, setAccountsPayable] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/accounts-payable")
      .then((response) => setAccountsPayable(response.data))
      .catch((error) => console.error("Error fetching accounts payable:", error));
  }, []);

  // Group data by due date
  const groupedData = accountsPayable.reduce((acc, item) => {
    const dueDate = new Date(item.paymentDueDate).toLocaleDateString();
    if (!acc[dueDate]) {
      acc[dueDate] = [];
    }
    acc[dueDate].push(item);
    return acc;
  }, {});

  // Calculate total amounts
  const totalBalance = accountsPayable.reduce((sum, item) => sum + item.amountOwed, 0);

   // Helper to check if the due date has passed
   const isOverdue = (dueDate) => {
    const today = new Date();
    const parsedDueDate = new Date(dueDate);
    return parsedDueDate < today;
  };

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
                Accounts Payable Grouped by Due Date
              </h1>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-sm border border-gray-200 dark:border-gray-700">
              <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-gray-100">
                  Accounts Payable Details
                </h2>
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="p-2 whitespace-nowrap text-left">Due Date</th>
                        <th className="p-2 whitespace-nowrap text-left">Vendor</th>
                        <th className="p-2 whitespace-nowrap text-left">Reference</th>
                        <th className="p-2 whitespace-nowrap text-left">Date</th>
                        <th className="p-2 whitespace-nowrap text-left">Type</th>
                        <th className="p-2 whitespace-nowrap text-left">Transaction</th>
                        <th className="p-2 whitespace-nowrap text-left">Amount</th>
                        <th className="p-2 whitespace-nowrap text-left">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700">
                      {Object.entries(groupedData).map(([dueDate, items], index) => (
                        <React.Fragment key={index}>
                          {/* Due date row */}
                          <tr>
                             <td
                                className={`p-2 whitespace-nowrap font-semibold ${
                                    isOverdue(dueDate) ? "text-red-500 dark:text-red-400" : "text-gray-800 dark:text-gray-100"
                                  }`}
                                colSpan={8}
                           >
                              {dueDate}
                            </td>
                          </tr>
                          {/* Data rows */}
                          {items.map((item) => (
                            <tr key={item.id}>
                              <td className="p-2 whitespace-nowrap"></td>
                              <td className="p-2 whitespace-nowrap">{item.supplierName}</td>
                              <td className="p-2 whitespace-nowrap">{item.reference}</td>
                              <td className="p-2 whitespace-nowrap">
                                {new Date(item.invoiceDateIssued).toLocaleDateString()}
                              </td>
                              <td className="p-2 whitespace-nowrap">{item.transactionType}</td>
                              <td className="p-2 whitespace-nowrap">{item.transactionId}</td>
                              <td className="p-2 whitespace-nowrap">${item.amountOwed.toFixed(2)}</td>
                              <td className="p-2 whitespace-nowrap">${item.amountOwed.toFixed(2)}</td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                      {/* Totals row */}
                      <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
                        <td
                          className="p-2 whitespace-nowrap text-right"
                          colSpan={7}
                        >
                          Total
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          ${totalBalance.toFixed(2)}
                        </td>
                      </tr>
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

export default AccountsPayable;
