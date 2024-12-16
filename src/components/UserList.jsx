import React from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

const UserTable = () => {
  const users = [
    { name: "Agost", username: "agost@teste.com", email: "agost@teste.com", active: "Ativo" },
    { name: "agost01", username: "agost01@teste.com", email: "agost01@teste.com", active: "Ativo" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ width: "70%", maxWidth: "900px", padding: 3 }}>
        {/* Título e Barra de Pesquisa */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="">
            Lista de usuários
          </Typography>
          <TextField
            size="small"
            variant="outlined"
            placeholder="Pesquisar"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: "250px" }}
          />
        </Box>

        {/* Botão Adicionar Usuário */}
        <Box display="flex" justifyContent="flex-start" mb={2}>
          <Button variant="contained" color="primary">
            Adicionar usuário
          </Button>
        </Box>

        {/* Tabela */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>Username</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "30%" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "10%" }}>Ativo</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center", width: "10%" }}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.active}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UserTable;
