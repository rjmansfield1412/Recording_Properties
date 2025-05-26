import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface PasswordConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  newRetentionPeriod: number;
}

const PasswordConfirmationModal: React.FC<PasswordConfirmationModalProps> = ({
  onConfirm,
  onCancel,
  newRetentionPeriod,
}) => {
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No actual password verification as per requirements
    onConfirm();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div 
          className="bg-white rounded-xl shadow-xl w-full max-w-md animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">Confirm Changes</h2>
            <button 
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    Warning: changing the retention period to {newRetentionPeriod} days may result in recordings being deleted with no ability to recover.
                  </p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your password to continue
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your password"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!password}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    password
                      ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordConfirmationModal;