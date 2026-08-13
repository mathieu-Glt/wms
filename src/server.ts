import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "WMS API is running ",
    version: "1.0.0",
  });
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    msg: "Process successfully",
    uptime: process.uptime(),
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
