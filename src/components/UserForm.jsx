import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Switch,
  FormControlLabel,
  Grid,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./UserForm.css";

const UserForm = ({ isEditMode }) => {
  const { id } = useParams(); // Pega o ID da URL para edição
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    username: "",
    senha: "",
    role: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  // Atualiza os dados do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Envia os dados do formulário para a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = {
        id: formData.id,
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email,
        username: formData.username,
        senha: formData.senha,
        role: formData.role,
        isActive: formData.isActive,
      };

      if (id) {
        // Se for edição, usa o método PUT com o ID da URL
        await axios.put(`http://localhost:8080/api/user/update/${id}`, dataToSend);
      } else {
        // Se for criação, usa o método POST
        await axios.post("http://localhost:8080/api/user/create", dataToSend);
      }

      setLoading(false);
      alert("Usuário salvo com sucesso!");
    } catch (error) {
      setLoading(false);
      console.error("Erro ao salvar usuário:", error);
      alert("Ocorreu um erro ao salvar o usuário.");
    }
  };

  // Preenche os dados caso seja para editar
  useEffect(() => {
    if (id) {

        isEditMode = true;
        axios.get(`http://localhost:8080/api/user/${id}`)
        .then((response) => {
          const user = response.data;
          setFormData({
            id: user.id,
            nome: user.nome || "",
            telefone: user.telefone || "",
            email: user.email || "",
            username: user.username || "",
            senha: user.senha || "",
            role: user.role || "",
            isActive: user.isActive || true,
          });
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário:", error);
          alert("Erro ao carregar dados do usuário.");
        });
    }
  }, [isEditMode, id]);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h5" component="h1" gutterBottom mb={3}>
        {id ? "Editar Usuário" : "Novo Usuário"}
      </Typography>

      {/* Cabeçalho com ícone e status ativo */}
      <Box display="flex" alignItems="center" mb={3}>
        <Box
          sx={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: 3,
          }}
        >
          <AddAPhotoIcon fontSize="large" color="disabled" />
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
            />
          }
          label="Ativo"
        />
      </Box>

      {/* Formulário de informações do usuário */}
      <Grid container spacing={3}>
        {/* Nome */}
        <Grid item xs={12}>
          <TextField
            label="Nome"
            fullWidth
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="input"
          />
        </Grid>

        {/* Telefone e Email */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Telefone"
            fullWidth
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="input"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
        </Grid>

        {/* Username */}
        <Grid item xs={12} sm={8}>
          <TextField
            label="Username"
            fullWidth
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input"
          />
        </Grid>

        {/* Senha */}
        <Grid item xs={12} sm={7}>
          <TextField
            label="Senha"
            type="password"
            fullWidth
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className="input"
          />
        </Grid>

        {/* Nível de Permissão */}
        <Grid item xs={11} sm={7}>
          <FormControl fullWidth className="input">
            <InputLabel>Nível de Permissão</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="USER">User</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Botões */}
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => window.location.href = '/'}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </Box>
    </Paper>
  );
};

export default UserForm;
