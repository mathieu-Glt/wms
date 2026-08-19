import "./config/env";

import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import authRoutes from "./user/routes/auth.routes";
import usersRoutes from "./user/routes/user.routes";
import productRoutes from "./product/routes/product.route";
import warehouseRoutes from "./warehouse/routes/warehouse.route";

const app = express();

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    cookie: function (req) {
      var match = req.url.match(/^\/([^/]+)/);
      return {
        path: match ? "/" + match[1] : "/",
        httpOnly: true,
        secure: req.secure || false,
        maxAge: 60000,
      };
    },
  }),
);

const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productRoutes);
app.use("/api/warehouses", warehouseRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "WMS API is running ",
    version: "1.0.0",
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
