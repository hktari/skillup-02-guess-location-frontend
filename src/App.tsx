import React, { useState } from 'react';
import './css/common.css'
import './App.css';
import ChangePasswordModal from './components/modals/ChangePasswordModal';
import ProfileSettingsModal from './components/modals/ProfileSettingsModal';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import UserProfilePage from './pages/UserProfilePage';
import { RequireAuth } from './components/context/AuthProvider';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false)

  function openModal() {
    setIsOpen(!isOpen);
  }

  function openChangePasswordModal() {
    // setIsOpen(false)
    setIsPasswordChangeOpen(!isPasswordChangeOpen)
  }

  function handleCloseChangePassword() {
    setIsPasswordChangeOpen(false)
    // setIsOpen(true)

  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="dashboard" element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>} />
            <Route path="userProfile/:id" element={
              <RequireAuth>
                <UserProfilePage />
              </RequireAuth>
            } />
          </Route>
        </Routes>
      </BrowserRouter>    
      </>
  );
}

export default App;
