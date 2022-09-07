import React, { useState } from 'react';
import './css/common.css'
import './App.css';
import ChangePasswordModal from './components/modals/ChangePasswordModal';
import ProfileSettingsModal from './components/modals/ProfileSettingsModal';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

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
      <LoginPage />      
      {/* <button onClick={openModal}>Open modal <span className="material-icons">pie_chart</span></button>
      <ProfileSettingsModal isOpen={isOpen} handleClose={openModal} handleChangePassword={openChangePasswordModal} />
      <ChangePasswordModal isOpen={isPasswordChangeOpen} handleClose={handleCloseChangePassword} /> */}
    </>
  );
}

export default App;
