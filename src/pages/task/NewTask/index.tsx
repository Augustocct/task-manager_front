import { Button, Grid2, TextField } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Task {
  name: string;
  description: string;
  status: string;
  priority: number;
  startDate: Date;
  endDate: Date;
}

const NewTask = () => {
  const [tasks, setTasks] = useState<Task>({
    name: "",
    description: "",
    status: "",
    priority: 0,
    startDate: new Date(),
    endDate: new Date(),
  });

  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTasks({
      ...tasks,
      [name]: value, // Atualiza apenas o campo alterado
    });
  }

  function validateForm() {
    let isValid = true;
    if (tasks.name === "") {
      alert("Nome é obrigatório");
      isValid = false;
    }
    if (tasks.description === "") {
      alert("Descrição é obrigatória");
      isValid = false;
    }
    if (tasks.status === "") {
      alert("Status é obrigatório");
      isValid = false;
    }
    if (tasks.priority < 1 || tasks.priority > 5) {
      alert("Prioridade deve ser entre 1 e 5");
      isValid = false;
    }
    if (tasks.startDate === new Date()) {
      alert("Data de Inicio é obrigatória");
      isValid = false;
    }
    if (tasks.endDate === new Date()) {
      alert("Data Final é obrigatória");
      isValid = false;
    }
    return isValid
  }

  function handleClickSave() {
    if (!validateForm()) {
      return;
    }
    axios
      .post("http://localhost:8080/api/v1/task/new", tasks)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao salvar os dados:", error);
      });
    navigate("/task");
  }

  return (
    <Grid2 container spacing={2}>
      <Button
        variant="contained"
        endIcon={<BackIcon />}
        onClick={() => navigate("/task")}
      >
        Voltar
      </Button>
      <TextField
        fullWidth
        label="Nome"
        name="name"
        value={tasks.name}
        sx={{
          backgroundColor: "white",
        }}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Descrição"
        name="description"
        value={tasks.description}
        sx={{
          backgroundColor: "white",
        }}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Status"
        name="status"
        value={tasks.status}
        sx={{
          backgroundColor: "white",
        }}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Prioridade"
        name="priority"
        value={tasks.priority}
        sx={{
          backgroundColor: "white",
        }}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Data de Inicio"
        name="startDate"
        value={new Date(tasks.startDate).toLocaleDateString()}
        sx={{
          backgroundColor: "white",
        }}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Data Final"
        name="endDate"
        value={new Date(tasks.endDate).toLocaleDateString()}
        sx={{
          backgroundColor: "white",
        }}
        onChange={handleChange}
      />
      <button onClick={handleClickSave}>Salvar</button>
    </Grid2>
  );
};

export default NewTask;
