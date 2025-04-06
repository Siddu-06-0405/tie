import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import blogRoutes from "./routes/blog.routes.js"
import categoryRoutes from "./routes/categories.routes.js"
// import path from "path";

// import authRoutes from "./routes/auth.routes.js";

dotenv.config();
import connectToMongoDB from "./db/connectToMongoDB.js"

const PORT = process.env.PORT;
// const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api",blogRoutes);
app.use("/api",categoryRoutes);
// app.use(cookieParser());
// app.use("/api/auth",authRoutes);
// app.use("/api/messages",messageRoutes);
// app.use("/api/users",userRoutes);

// app.use(express.static(path.join(__dirname,"/frontend/dist")));

// app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// })

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
});