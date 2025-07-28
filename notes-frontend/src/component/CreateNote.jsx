import { useState } from "react";
import api from "../services/api";

const CreateNote = ({ onNoteCreated }) => {
    const [noteData, setNoteData] = useState({
        title: "",
        content: "",
    });
    const [addMode, setAddMode] = useState(false);

    const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

    const handleChange = (e) => {
        setNoteData({
            ...noteData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        noteData.title = capitalize(noteData.title);
        noteData.content = capitalize(noteData.content);

        try {
            await api.post("/notes", noteData);
            setNoteData({ title: "", content: "" });
            onNoteCreated();
        } catch (err) {
            console.error("Error creating notes: ", err.message);
        } finally {
            setAddMode(false);
            setNoteData({ title: "", content: "" });
        }
    };

    return (
        <div className="flex m-8 mb-4 items-center h-full justify-center xl:justify-self-start">
            {addMode ? (
                <form
                    className="m-4 flex items-center flex-wrap flex-col xl:flex-row justify-center gap-3"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="w-60 px-4 py-2 bg-white outline-none rounded border-3 shadow-xl transition-colors duration-500 border-gray-400 text-sm focus:border-t-red-500 focus:border-b-blue-500 hover:border-t-red-500 hover:border-b-blue-500"
                        placeholder="Title"
                        name="title"
                        type="text"
                        value={noteData.title}
                        onChange={handleChange}
                    />

                    <textarea
                        className="w-60 px-4 py-2 bg-white outline-none rounded resize-none border-3 shadow-xl transition-colors duration-500 border-gray-400 text-sm focus:border-t-red-500 focus:border-b-blue-500 hover:border-t-red-500 hover:border-b-blue-500"
                        name="content"
                        placeholder="Content"
                        type="text"
                        value={noteData.content}
                        onChange={handleChange}
                    />
                    <div>
                        <button
                            disabled={
                                !noteData.title.trim() ||
                                !noteData.content.trim()
                            }
                            className="h-full font-medium bg-white px-4 py-2 rounded-2xl cursor-pointer shadow-xl outline-none hover:border-t-3 hover:border-b-3 hover:border-t-blue-500 hover:border-b-red-500 focus:border-t-3 focus:border-b-3 focus:border-t-blue-500 focus:border-b-red-500 mr-4 text-sm transition-colors duration-200"
                            type="submit"
                        >
                            ✔️ Save
                        </button>
                        <button
                            className="h-full font-medium bg-white px-4 py-2 rounded-2xl cursor-pointer shadow-xl outline-none hover:border-t-3 hover:border-b-3 hover:border-t-blue-500 hover:border-b-red-500 focus:border-t-3 focus:border-b-3 focus:border-t-blue-500 focus:border-b-red-500 text-sm transition-colors duration-200"
                            onClick={() => {
                                setAddMode(!addMode);
                                setNoteData({ title: "", content: "" });
                            }}
                            type="button"
                        >
                            ❌ Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    className="h-full font-medium bg-white px-4 py-2 rounded-2xl cursor-pointer shadow-xl outline-none hover:border-t-3 hover:border-b-3 hover:border-t-blue-500 hover:border-b-red-500"
                    onClick={() => setAddMode(!addMode)}
                >
                    ➕ Add Note
                </button>
            )}
        </div>
    );
};

export default CreateNote;
