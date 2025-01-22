import { Button, Grid2, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  priority: number;
  startDate: string;
  endDate: string;
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
    startDate: "",
    endDate: "",
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

  const handleEditTask = async (id: number, taskEditData: Task) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/task/edit/${id}`, taskEditData);
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
        value={tasks.startDate}
        sx={{
          backgroundColor: "white",
        }}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Data Final"
        name="endDate"
        value={tasks.endDate}
        sx={{
          backgroundColor: "white",
        }}
        onChange={handleChange}
      />
      <Button 
      variant="contained" 
      endIcon={<SendIcon />}
      onClick={() => handleEditTask(taskId, tasks)}>
        Send
      </Button>
    </Grid2>
  );
};

export default EditTask;
