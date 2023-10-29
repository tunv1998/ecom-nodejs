import express from "express";

import adminAuthRoute from "./modules/admin/auth/routes";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.send({
    status: "oke",
    message: "Hello World!!",
  });
});

app.use("/api/v1/admin/auth", adminAuthRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
