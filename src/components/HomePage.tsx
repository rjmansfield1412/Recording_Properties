import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import RecordingSettingsModal from './RecordingSettingsModal';
import { useRecordingSettings } from '../context/RecordingSettingsContext';

const HomePage: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { retentionPeriod } = useRecordingSettings();

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Recording Dashboard</h1>
            <span className="text-sm text-gray-500">v1.0</span>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-800">Recording Management</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Current retention period: <span className="font-semibold">{retentionPeriod} days</span>
                </p>
              </div>
              <button
                onClick={handleOpenSettings}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg transition-all hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <Settings size={18} className="mr-2" />
                <span>Recording Settings</span>
              </button>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="text-md font-medium text-gray-700 mb-2">System Status</h3>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {isSettingsOpen && (
        <RecordingSettingsModal onClose={handleCloseSettings} />
      )}
    </div>
  );
};

export default HomePage;