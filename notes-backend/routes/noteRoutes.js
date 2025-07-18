const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.get("/", async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.userId });
        res.status(200).json(notes);
    } catch (err) {
        console.error(`Error fetching notes: ${err}`);
        res.status(500).json({ error: "Internal Server Error !" });
    }
});

router.post("/", async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res
            .status(400)
            .json({ error: "Both title and content are required.." });
    }

    try {
        const newNote = await Note.create({
            title,
            content,
            user: req.user.userId,
        });
        res.status(200).json({
            msg: "Note added successfully...",
            note: newNote,
        });
    } catch (err) {
        console.error("Error creating note: ", err);
        res.status(500).json({ error: "Internal Server Error !" });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ error: "Note not found !!" });
        }
        if (note.user.toString() !== req.user.userId) {
            return res
                .status(403)
                .json({ error: "Forbidden: Not your note !!" });
        }

        await Note.findByIdAndDelete(id);

        res.status(200).json({ msg: "Note deleted successfully..." });
    } catch (err) {
        console.error("Error deleting note: ", err);
        res.status(500).json({ error: "Internal Server Error !" });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;

    try {
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ error: "Note not found.." });
        }
        if (note.user.toString() !== req.user.userId) {
            return res
                .status(403)
                .json({ error: "Forbidden: Not your note !!" });
        }

        if (title) note.title = title;
        if (content) note.content = content;

        await note.save();

        res.status(200).json({ msg: "Note updated successfully..." });
    } catch (err) {
        console.error("Error updating note: ", err);
        res.status(500).json({ error: "Internal Server Error !" });
    }
});

module.exports = router;
