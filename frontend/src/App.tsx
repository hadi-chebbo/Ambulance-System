import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import AppRoutes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;