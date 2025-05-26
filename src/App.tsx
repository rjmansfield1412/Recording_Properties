import React from 'react';
import HomePage from './components/HomePage';
import { RecordingSettingsProvider } from './context/RecordingSettingsContext';

function App() {
  return (
    <RecordingSettingsProvider>
      <div className="min-h-screen bg-gray-50">
        <HomePage />
      </div>
    </RecordingSettingsProvider>
  );
}

export default App;