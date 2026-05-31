import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TravelProvider } from './contexts/TravelContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <TravelProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar />
            <main>
              <AppRoutes />
            </main>
          </div>
        </Router>
      </TravelProvider>
    </AuthProvider>
  );
}

export default App;
