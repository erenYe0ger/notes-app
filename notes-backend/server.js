const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const noteRoutes = require("./routes/noteRoutes");

app.get("/", (req, res) => {
  res.send("API is running fine...");
});

app.use("/api/notes", noteRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(`DB Connection error: ${err}`);
  });
