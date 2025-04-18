import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/registration/Register';
import JobSeekerDashboard from './components/dashboard/JobSeekerDashboard';
import EmployerDashboard from './components/dashboard/EmployerDashboard';
import JobListings from './components/jobs/JobListings';
import JobPost from './components/jobs/JobPost';
import Profile from './components/profile/Profile';
import Companies from './components/companies/Companies';
import CompanyDetail from './components/companies/CompanyDetail';

// Context
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/routing/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main style={{ minHeight: 'calc(100vh - 130px)', padding: '20px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/jobs" element={<JobListings />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/companies/:id" element={<CompanyDetail />} />
                <Route
                  path="/dashboard/job-seeker"
                  element={
                    <PrivateRoute>
                      <JobSeekerDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard/employer"
                  element={
                    <PrivateRoute>
                      <EmployerDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/post-job"
                  element={
                    <PrivateRoute>
                      <JobPost />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
