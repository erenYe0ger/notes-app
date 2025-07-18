import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchNotes = async () => {
            try {
                const res = await api.get("/notes");
                setNotes(res.data);
            } catch (err) {
                console.error("Error fetching notes: ", err.message);
            }
        };

        fetchNotes();
    }, []);

    return (
        <div>
            <h2>Your Notes</h2>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>{note.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;
