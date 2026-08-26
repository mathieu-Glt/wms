import "./config/env";

import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { Pool } from "pg";
import morgan from "morgan";

import authRoutes from "./user/routes/auth.routes";
import usersRoutes from "./user/routes/user.routes";
import productRoutes from "./product/routes/product.route";
import warehouseRoutes from "./warehouse/routes/warehouse.route";
import zoneRoutes from "./zone/routes/zone.routes";
import locationRoutes from "./location/routes/location.routes";
import stockRoutes from "./stock/routes/stock.routes";
import supplierRoutes from "./supplier/routes/supplier.routes";
import receptionRoutes from "./reception/routes/reception.routes";
import mouvementRoutes from "./mouvement/routes/mouvement.routes";
import inventaireRoutes from "./inventaire/routes/inventaire.routes";
import productSupplierRoutes from "./product/routes/product-supplier.routes";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

const pgPool = new Pool({ connectionString: process.env.DATABASE_URL });
const PgSessionStore = pgSession(session);

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(morgan("dev"));

app.use(
  session({
    store: new PgSessionStore({
      pool: pgPool,
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET_SESSION!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 8, // 8h
    },
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/receptions", receptionRoutes);
app.use("/api/mouvements", mouvementRoutes);
app.use("/api/inventaires", inventaireRoutes);
app.use("/api/product-suppliers", productSupplierRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "WMS API is running",
    version: "1.0.0",
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
