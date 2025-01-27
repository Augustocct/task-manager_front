import SendIcon from "@mui/icons-material/Send";
import BackIcon from "@mui/icons-material/ArrowBack";
import { Button, Grid2, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  priority: number;
  startDate: Date;
  endDate: Date;
}

const EditTask = () => {
  const { id } = useParams();
  const taskId = Number(id);

  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task>({
    id: taskId,
    name: "",
    description: "",
    status: "",
    priority: 0,
    startDate: new Date(),
    endDate: new Date(),
  });

  function searchTasks() {
    axios
      .get(`http://localhost:8080/api/v1/task/${taskId}`, {
        params: {},
      })
      .then((response) => {
        const taskData = response.data.data;
        // Ajuste conforme a estrutura da sua resposta
        setTasks(response.data.data);
        // Ajuste conforme a estrutura da sua resposta
        taskData.startDate = taskData.startDate.split("T")[0];
        taskData.endDate = taskData.endDate.split("T")[0];
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTasks({
      ...tasks,
      [name]: value, // Atualiza apenas o campo alterado
    });
  };

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

  const handleEditTask = async (id: number, taskEditData: Task) => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/task/edit/${id}`,
        taskEditData
      );
      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      console.error("Erro ao editar a tarefa:", error);
    }
    navigate("/task");
  };

  useEffect(() => {
    searchTasks();
  }, []);

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
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={() => handleEditTask(taskId, tasks)}
      >
        Send
      </Button>
    </Grid2>
  );
};

export default EditTask;
