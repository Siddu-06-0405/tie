import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import blogRoutes from "./routes/blog.routes.js";
import categoryRoutes from "./routes/categories.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.join(__dirname, ".."); // Go up one level to project root

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api", blogRoutes);
app.use("/api", categoryRoutes);

// Serve static frontend in production
if (NODE_ENV === "production") {
  const distPath = path.join(rootPath, "dist");
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
