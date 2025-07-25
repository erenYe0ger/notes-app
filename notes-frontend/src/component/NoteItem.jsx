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
        <li className="bg-white px-4 py-2 rounded-xl mt-4 w-[25%] h-full shadow-[0_0_20px_12px_rgba(34,197,94,0.7)] hover:shadow-[0_0_20px_15px_rgba(59,130,246,0.6)]">
            {isEditing ? (
                <>
                    <input
                        className="w-full mb-2 px-2 py-1 bg-white outline-none rounded border-2 transition-colors duration-500 border-gray-400 text-sm focus:border-t-red-500 focus:border-b-blue-500"
                        autoFocus
                        placeholder="Title"
                        name="title"
                        value={editData.title}
                        onChange={handleChange}
                    />

                    <textarea
                        className="w-full px-2 py-1 bg-white outline-none rounded resize-none border-2 transition-colors duration-500 border-gray-400 text-sm focus:border-t-red-500 focus:border-b-blue-500"
                        placeholder="Content"
                        name="content"
                        value={editData.content}
                        onChange={handleChange}
                    />

                    <button
                        className="mr-2 mt-2 mb-1 outline-none border-2 px-2 py-1 rounded-md text-sm text-green-700 cursor-pointer"
                        onClick={handleSave}
                    >
                        ✔️ Save
                    </button>
                    <button
                        className="mt-2 mb-1 outline-none border-3 px-2 py-1 rounded-md bg-white text-red-400 cursor-pointer text-sm"
                        onClick={handleCancel}
                    >
                        ❌ Cancel
                    </button>
                </>
            ) : (
                <>
                    <h3 className="font-semibold text-md">{noteData.title}</h3>
                    <p className="text-sm my-2">➡️ {noteData.content}</p>

                    <button
                        className="mr-2 mt-2 mb-1 outline-none border-2 px-2 py-1 rounded-md text-sm text-green-700 cursor-pointer"
                        onClick={() => setIsEditing(true)}
                    >
                        ✏️ Edit
                    </button>
                    <button
                        className="mt-2 mb-1 outline-none border-3 px-2 py-1 rounded-md bg-black text-red-400 cursor-pointer text-sm"
                        onClick={handleDelete}
                    >
                        <img className="h-5 inline" src="/delete.png" /> Delete
                    </button>
                </>
            )}
        </li>
    );
};

export default NoteItem;
