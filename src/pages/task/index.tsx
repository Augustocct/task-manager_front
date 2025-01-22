import {
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  name: string;
  status: string;
  priority: number;
  startDate: Date;
  endDate: Date;
}

const Task = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  function searchTasks() {
    axios
      .post("http://localhost:8080/api/v1/task/list", {
        params: {
          // Adicione os parâmetros necessários aqui, se houver
        },
      })
      .then((response) => {
        setTasks(response.data.data.content); // Ajuste conforme a estrutura da sua resposta
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
      });
  }

  const handleEditClick = (id: number) => {
    navigate(`/edit-task/${id}`);
  };

  useEffect(() => {
    searchTasks();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>NOME</TableCell>
            <TableCell>STATUS</TableCell>
            <TableCell>PRIORIDADE</TableCell>
            <TableCell>DATA DE INICIO</TableCell>
            <TableCell>DATA FINAL</TableCell>
            <TableCell>AÇÔES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                {new Date(task.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(task.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Fab
                  color="primary"
                  size="small"
                  sx={{ width: 30, height: 30, minHeight: "unset" }}
                  aria-label="edit"
                  onClick={() => handleEditClick(task.id)}
                >
                  <EditIcon sx={{ fontSize: 16 }} />
                </Fab>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Task;
