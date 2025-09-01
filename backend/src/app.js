import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import db from "./db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

db.getConnection()
  .then((conn) => {
    console.log("✅ MySQL connected!");
    conn.release(); // release back to pool
  })
  .catch((err) => {
    console.error("❌ MySQL connection failed:", err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
