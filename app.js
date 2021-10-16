const express = require("express");
const app = express();
app.use(express.json());

const todos = [
  { id: 1, title: "こんにちは", completed: true },
  { id: 2, title: "さようなら", completed: false },
];
app.get("/api/todos", (req, res) => {
  if (!req.query.completed) {
    return res.json(todos);
  }
  const completed = req.query.completed === "true";
  res.json(todos.filter((todo) => todo.completed === completed));
});

let id = 3;
app.post("/api/todos", (req, res, next) => {
  const { title } = req.body;
  if (typeof title !== "string" || !title) {
    const err = new Error("titele is required");
    err.statusCode = 400;
    return next(err);
  }
  const todo = { id: (id += 1), title, completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({ error: err.massage });
});

app.listen(process.env.PORT || 3000);

const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });

nextApp.prepare().then(
  () => app.get("*", nextApp.getRequestHandler()),
  (err) => {
    console.error(eer);
    process.exit(1);
  }
);
