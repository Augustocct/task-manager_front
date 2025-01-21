import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Task {
  id: number;
  name: string;
  status: string;
  priority: number;
  startDate: string;
  endDate: string;
}

const EditTask = () => {
  const { id } = useParams();
  const taskId = Number(id);

  const [tasks, setTasks] = useState<Task>({
    id: taskId,
    name: "",
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
        setTasks(response.data); // Ajuste conforme a estrutura da sua resposta
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }

  useEffect(() => {
    searchTasks();
  }, []);

  return (
    <div>
      <TextField
        fullWidth
        label="Nome"
        name="name"
        required
        value={tasks.name}
        sx={{
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
    </div>
  );
};

export default EditTask;
