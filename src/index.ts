import express from "express";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.send({
    status: "oke",
    message: "Hello World!!",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
