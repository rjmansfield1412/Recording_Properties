import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import PasswordConfirmationModal from './PasswordConfirmationModal';
import { useRecordingSettings } from '../context/RecordingSettingsContext';
import UnsavedChangesModal from './UnsavedChangesModal';

interface RecordingSettingsModalProps {
  onClose: () => void;
}

const RecordingSettingsModal: React.FC<RecordingSettingsModalProps> = ({ onClose }) => {
  const { retentionPeriod, updateRetentionPeriod } = useRecordingSettings();
  const [currentValue, setCurrentValue] = useState(retentionPeriod);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUnsavedChangesModalOpen, setIsUnsavedChangesModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(currentValue !== retentionPeriod);
  }, [currentValue, retentionPeriod]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setCurrentValue(value);
    }
  };

  const handleSave = () => {
    setIsPasswordModalOpen(true);
  };

  const handleConfirmSave = () => {
    updateRetentionPeriod(currentValue);
    setIsPasswordModalOpen(false);
    setHasChanges(false);
  };

  const handleClose = () => {
    if (hasChanges) {
      setIsUnsavedChangesModalOpen(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setIsUnsavedChangesModalOpen(false);
    onClose();
  };

  const handleCancelClose = () => {
    setIsUnsavedChangesModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={handleClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-fade-in overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Recording Settings</h2>
            <button 
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="retentionPeriod" className="block text-sm font-medium text-gray-700">
                  Recording Retention Period (days)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  id="retentionPeriod"
                  value={currentValue}
                  onChange={handleValueChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Recordings older than this period will be automatically deleted.
              </p>
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  hasChanges
                    ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {isPasswordModalOpen && (
        <PasswordConfirmationModal
          onConfirm={handleConfirmSave}
          onCancel={() => setIsPasswordModalOpen(false)}
          newRetentionPeriod={currentValue}
        />
      )}

      {isUnsavedChangesModalOpen && (
        <UnsavedChangesModal
          onContinue={handleConfirmClose}
          onCancel={handleCancelClose}
        />
      )}
    </>
  );
};

export default RecordingSettingsModal;