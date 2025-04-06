import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  slug: String,
  pdfUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const subjectSchema = new mongoose.Schema({
  name: String,
  slug: String,
  posts: [postSchema],
});

const schemeSchema = new mongoose.Schema({
  name: String,
  slug: String,
  subjects: [subjectSchema],
});

const branchSchema = new mongoose.Schema({
    name: String,
    slug: String,
    Schemes : [schemeSchema]
})

export default mongoose.model("Branch", branchSchema);