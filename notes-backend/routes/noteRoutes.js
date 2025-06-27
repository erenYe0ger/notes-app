const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    console.error(`Error fetching notes: ${err}`);
    res.json({ error: "Internal Server Error !" });
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
    const newNote = await Note.create({ title, content });
    res.json({ msg: "Note added successfully..." });
  } catch (err) {
    console.error("Error creating note: ", err);
    res.status(500).json({ error: "Internal Server Error !" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteNote = await Note.findByIdAndDelete(id);
    if (!deleteNote) {
      return res.status(404).json({ error: "Note not found.." });
    }
    res.json({ msg: "Note deleted successfully..." });
  } catch (err) {
    console.error("Error deleting note: ", err);
    res.status(500).json({ error: "Internal Server Error !" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content });
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found.." });
    }
    res.json({ msg: "Note updated successfully..." });
  } catch (err) {
    console.error("Error updating note: ", err);
    res.status(500).json({ error: "Internal Server Error !" });
  }
});

module.exports = router;
