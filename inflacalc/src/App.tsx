import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TaxCalculator from './pages/TaxCalculator';
import Documentation from './pages/Documentation';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/calculator" element={<TaxCalculator />} />
                <Route path="/docs" element={<Documentation />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </Layout>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;