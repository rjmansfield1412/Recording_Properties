import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface UnsavedChangesModalProps {
  onContinue: () => void;
  onCancel: () => void;
}

const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({
  onContinue,
  onCancel,
}) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"></div>
      <div className="fixed inset-0 flex items-center justify-center z-60 px-4">
        <div 
          className="bg-white rounded-xl shadow-xl w-full max-w-md animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Unsaved Changes</h2>
            <button 
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex items-start mb-4">
              <div className="flex-shrink-0 mt-0.5">
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-gray-700">
                  You have unsaved changes. Are you sure you want to leave without saving?
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Stay
              </button>
              <button
                onClick={onContinue}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors"
              >
                Leave Without Saving
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnsavedChangesModal;