import React from 'react';
import UserForm from '../components/UserForm';
import { useNavigate } from 'react-router-dom';

export default function NewUserPage() {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log('Novo Usuário:', data);
    navigate('/');
  };

  return (
    <div>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
