import { useState } from "react";
import api from "../services/api";

const NoteItem = ({ noteData, onNoteChanged }) => {
    const [isEditing, setIsEditing] = useState(false);

    const [editData, setEditData] = useState({
        title: noteData.title,
        content: noteData.content,
    });

    const handleDelete = async () => {
        try {
            await api.delete(`/notes/${noteData._id}`);
            onNoteChanged();
        } catch (err) {
            console.error("Error deleting the note: ", err.message);
        }
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        setEditData({
            title: noteData.title,
            content: noteData.content,
        });
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            const cleanedData = {
                title: editData.title.trim(),
                content: editData.content.trim(),
            };

            await api.put(`/notes/${noteData._id}`, cleanedData);
            setIsEditing(false);
            onNoteChanged();
        } catch (err) {
            console.error("Error updating note: ", err.message);
        }
    };

    return (
        <li>
            {isEditing ? (
                <>
                    <input
                        autoFocus
                        placeholder="Title"
                        name="title"
                        value={editData.title}
                        onChange={handleChange}
                    />

                    <textarea
                        placeholder="Content"
                        name="content"
                        value={editData.content}
                        onChange={handleChange}
                    />

                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <h3>{noteData.title}</h3>
                    <p>{noteData.content}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </li>
    );
};

export default NoteItem;
