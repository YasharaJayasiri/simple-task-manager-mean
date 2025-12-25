const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((error) => console.log(error));

const TaskSchema = new mongoose.Schema({
  title: String
});

const Task = mongoose.model("Task", TaskSchema);

app.get("/tasks", async (request, response) => {
  const tasks = await Task.find();
  response.json(tasks);
});

app.post("/tasks", async (request, response) => {
  const newTask = new Task({
    title: request.body.title
  });
  await newTask.save();
  response.json(newTask);
});

app.put("/tasks/:id", async (request, response) => {
  await Task.findByIdAndUpdate(request.params.id, {
    title: request.body.title
  });
  response.json({ message: "Task updated" });
});

app.delete("/tasks/:id", async (request, response) => {
  await Task.findByIdAndDelete(request.params.id);
  response.json({ message: "Task deleted" });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});
