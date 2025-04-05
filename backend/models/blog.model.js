// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  slug: { type: String, unique: true },
  pdfUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;