import express from "express";

const app = express();
const PORT = 3333;

app.use(express.json());

app.get("/test", (_req, res) => {
  res.json({ test: "test message" });
});

app.listen(PORT, () =>
  console.log(`Server is running at: http://localhost:${PORT}`)
);
