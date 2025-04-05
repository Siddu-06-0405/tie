import Blog from "../models/blog.model.js";

// Create a new blog (admin only)
export const createBlog = async (req, res) => {
  try {
    const { title, description, pdfUrl,slug } = req.body;

    const blog = new Blog({ title, description,slug, pdfUrl });
    await blog.save();

    res.status(201).json({ message: "Blog created", blog });
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog" });
    console.error(err)
  }
};

// Get all blogs (public)
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const getBySlug = async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  res.json(blog);
};