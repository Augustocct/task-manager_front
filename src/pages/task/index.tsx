import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlusIcon from "@mui/icons-material/Add";
import {
  Button,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
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

  const handleDeleteClick = (id: number) => {
    axios
      .delete(`http://localhost:8080/api/v1/task/${id}`, {
        params: {},
      })
      .then((response) => {
        console.log(response.data);
        searchTasks();
      })
      .catch((error) => {
        console.error("Erro ao deletar os dados:", error);
      });
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
              <TableCell sx={{ display: "flex", gap: 1 }}>
                <Fab
                  color="primary"
                  size="small"
                  sx={{ width: 30, height: 30, minHeight: "unset" }}
                  aria-label="edit"
                  onClick={() => handleEditClick(task.id)}
                >
                  <EditIcon sx={{ fontSize: 16 }} />
                </Fab>
                <Fab
                  color="primary"
                  size="small"
                  sx={{ width: 30, height: 30, minHeight: "unset" }}
                  aria-label="edit"
                  onClick={() => handleDeleteClick(task.id)}
                >
                  <DeleteIcon sx={{ fontSize: 16 }} />
                </Fab>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        endIcon={<PlusIcon />}
        onClick={() => navigate("/new-task")}
      >
        Send
      </Button>
    </TableContainer>
  );
};

export default Task;
