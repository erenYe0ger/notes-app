import { useState } from "react";
import api from "../services/api";

const CreateNote = ({ onNoteCreated }) => {
    const [noteData, setNoteData] = useState({
        title: "",
        content: "",
    });

    const handleChange = (e) => {
        setNoteData({ ...noteData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/notes", noteData);
            setNoteData({ title: "", content: "" });
            onNoteCreated();
        } catch (err) {
            console.error("Error creating notes: ", err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Title"
                name="title"
                type="text"
                value={noteData.title}
                onChange={handleChange}
            />

            <textarea
                name="content"
                placeholder="Content"
                type="text"
                value={noteData.content}
                onChange={handleChange}
            />

            <button type="submit">Add Note</button>
        </form>
    );
};

export default CreateNote;
