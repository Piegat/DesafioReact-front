import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados dos usuários da API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/user/all"); // Supondo que sua API esteja no caminho /api/users
      setUsers(response.data); // Armazena os dados no estado
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao buscar usuários:", error);
      alert("Erro ao buscar usuários.");
    }
  };

  // Chama a função de busca ao carregar o componente
  useEffect(() => {
    fetchUsers();
  }, []); // O array vazio garante que a função só será chamada uma vez após o primeiro render

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: "80%", margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Lista de Usuários
      </Typography>

      {/* Se estiver carregando, exibe um carregamento */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "30%" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>Username</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "30%" }}>Nível</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>Ativo</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "10%" }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.nome}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.isActive ? "Sim" : "Não"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ marginRight: 1 }}
                      onClick={() => window.location.href = `/edit-user/${user.id}`}
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Botão para adicionar novo usuário */}
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.href = "/new-user"}
        >
          Novo Usuário
        </Button>
      </Box>
    </Paper>
  );

};

export default UserList;
