import "./config/env";

import express, { Request, Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/user.routes";

const app = express();

const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "WMS API is running ",
    version: "1.0.0",
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
