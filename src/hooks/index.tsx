import React from 'react';
import { AuthProvider } from './modules/AuthContext';
import { ChatProvider } from './modules/ChatContext';
import { ToastProvider } from './modules/ToastContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ChatProvider>
      <ToastProvider>{children}</ToastProvider>
    </ChatProvider>
  </AuthProvider>
);

export default AppProvider;
