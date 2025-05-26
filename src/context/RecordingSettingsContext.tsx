import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RecordingSettingsContextType {
  retentionPeriod: number;
  updateRetentionPeriod: (value: number) => void;
}

const RecordingSettingsContext = createContext<RecordingSettingsContextType | undefined>(undefined);

interface RecordingSettingsProviderProps {
  children: ReactNode;
}

export const RecordingSettingsProvider: React.FC<RecordingSettingsProviderProps> = ({ children }) => {
  const [retentionPeriod, setRetentionPeriod] = useState(90);

  const updateRetentionPeriod = (value: number) => {
    setRetentionPeriod(value);
  };

  return (
    <RecordingSettingsContext.Provider value={{ retentionPeriod, updateRetentionPeriod }}>
      {children}
    </RecordingSettingsContext.Provider>
  );
};

export const useRecordingSettings = (): RecordingSettingsContextType => {
  const context = useContext(RecordingSettingsContext);
  if (context === undefined) {
    throw new Error('useRecordingSettings must be used within a RecordingSettingsProvider');
  }
  return context;
};