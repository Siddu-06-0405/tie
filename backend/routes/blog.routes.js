import express from "express";
import { createBlog, getAllBlogs, getBySlug } from "../controllers/blog.controller.js";

const router = express.Router();

// Admin route
router.post("/blogs", createBlog); 

// Public route
router.get("/blogs", getAllBlogs);

// Get by slug
router.get('/blogs/:slug', getBySlug);

export default router;