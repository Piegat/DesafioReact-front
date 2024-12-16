import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserListPage from './pages/UserListPage';
import NewUserPage from './pages/NewUserPage';
import EditUserPage from './pages/EditUserPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/new-user" element={<NewUserPage />} />
        <Route path="/edit-user/:id" element={<EditUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
