import React, { useState } from 'react';
import './App.css';
import ChangePasswordModal from './components/modals/ChangePasswordModal';
import ProfileSettingsModal from './components/modals/ProfileSettingsModal';


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
      <button onClick={openModal}>Open modal</button>
      <ProfileSettingsModal isOpen={isOpen} handleClose={openModal} handleChangePassword={openChangePasswordModal} />
      <ChangePasswordModal isOpen={isPasswordChangeOpen} handleClose={handleCloseChangePassword} />
    </>
  );
}

export default App;
