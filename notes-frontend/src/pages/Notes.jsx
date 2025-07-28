import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import CreateNote from "../component/createNote";
import NoteItem from "../component/NoteItem";
import Footer from "../component/Footer";

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
        document.title = "Dashboard | notes-app";
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
        <div className="min-h-screen flex flex-col">
            <div className="bg-green-50 p-4 flex flex-col flex-1">
                {/* Navbar */}
                <div className="flex max-md:flex-col gap-3 justify-between items-center bg-white p-4 rounded-3xl shadow-xl mb-5">
                    <h1 className="font-bold text-blue-900 ml-5 text-xl">
                        Welcome, {user?.name.toUpperCase()} !
                    </h1>
                    <button
                        className="bg-red-500 text-white px-3 py-2 rounded-xl text-sm hover:bg-orange-500 cursor-pointer flex gap-2 items-center"
                        onClick={handleLogout}
                    >
                        <img className="h-4" src="/logout.png" />
                        Logout
                    </button>
                </div>

                {/* Add Note */}
                <div>
                    <CreateNote onNoteCreated={fetchNotes} />
                </div>

                {/* Notes List */}
                <div className="p-4">
                    {notes.length ? (
                        <h2 className="text-xl font-medium text-center text-blue-900 bg-white p-4 w-[50%] mx-auto rounded-xl border-2 border-blue-400">
                            Your Notes
                        </h2>
                    ) : null}

                    <ul className="flex justify-center gap-10 my-5 flex-wrap">
                        {notes.map((note) => (
                            <NoteItem
                                key={note._id}
                                noteData={note}
                                onNoteChanged={fetchNotes}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Notes;
