import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/register";
import Login from "./pages/Login";
import Notes from "./pages/Notes";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Notes />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
