import { Route, Routes } from "react-router-dom"
import Task from "../pages/task"
import EditTask from "../pages/task/EditTask"

const Rotas = () => {
    return (
        <Routes>
            <Route path="/task" element={<Task />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
    )
}

export default Rotas