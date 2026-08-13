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

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
