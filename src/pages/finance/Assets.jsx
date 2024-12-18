import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Banner from '../../partials/Banner';

function Asset() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/assets')
      .then(response => setAssets(response.data))
      .catch(error => console.error('Error fetching assets:', error));
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
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Assets</h1>
            </div>

            {/* Display Assets */}
            <div className="grid grid-cols-1 gap-6">
              {assets.map((asset) => (
                <div key={asset.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-md p-4">
                  <h3 className="text-lg font-semibold mb-2">{asset.assetName}</h3>
                  <p className="text-sm">Purchase Price: ${asset.purchasePrice.toFixed(2)}</p>
                  <p className="text-sm">Purchase Date: {new Date(asset.purchaseDate).toLocaleDateString()}</p>
                  <p className="text-sm">Depreciation Value: ${asset.depreciationValue.toFixed(2)}</p>
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

export default Asset;
