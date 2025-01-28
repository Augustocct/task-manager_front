import PlusIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Container,
  Fab,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Task.css";

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
      .post(`http://localhost:8080/api/v1/task/list`, {
        params: {},
      })
      .then((response) => {
        setTasks(response.data.data.content); // Ajuste conforme a estrutura da sua resposta
        console.log(response.data);
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
    <Container style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <h1>Lista de Tarefas</h1>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
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
                  <TableCell>{task.startDate.toString()}</TableCell>
                  <TableCell>{task.endDate.toString()}</TableCell>
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
          <Box display={"flex"} gap={2}>
            <Button
              variant="contained"
              endIcon={<PlusIcon />}
              onClick={() => navigate("/new-task")}
            >
              Novo
            </Button>
            <Stack spacing={2}>
              <Pagination />
            </Stack>
          </Box>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Task;
