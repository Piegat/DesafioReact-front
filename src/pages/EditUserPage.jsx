import React from 'react';
import UserForm from '../components/UserForm';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditUserPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialData = { id, name: 'Agent', username: 'agent@fthtex.com', email: 'agent@fthtex.com', status: 'Ativo' };

  const handleSubmit = (data) => {
    console.log('Usuário Editado:', data);
    navigate('/');
  };

  return (
    <div>
      <UserForm initialData={initialData} onSubmit={handleSubmit}/>
    </div>
  );
}
