import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import CreateNote from "../component/createNote";
import NoteItem from "../component/NoteItem";

const Notes = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const res = await api.get("/notes");
            setNotes(res.data);
        } catch (err) {
            console.error("Error fetching notes: ", err.message);

            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
                return;
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetchNotes();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>

            <h1>Welcome, {user.name} !</h1>

            <h2>Your Notes</h2>
            <CreateNote onNoteCreated={fetchNotes} />
            <ul>
                {notes.map((note) => (
                    <NoteItem
                        key={note._id}
                        noteData={note}
                        onNoteChanged={fetchNotes}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Notes;
