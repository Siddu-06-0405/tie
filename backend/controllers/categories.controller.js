import Branch from "../models/categories.model.js";

// 1. ➕ Create a new Branch
export const createBranch = async (req, res) => {
  const { name } = req.body;
  try {
    const existing = await Branch.findOne({ name });
    if (existing) return res.status(400).json({ message: "Branch already exists" });

    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const branch = new Branch({ name,slug, Schemes: [] });
    await branch.save();
    res.status(201).json(branch);
  } catch (error) {
    res.status(500).json({ message: "Server error creating branch", error });
  }
};

// 2. ➕ Add a new Scheme to a Branch
export const addSchemeToBranch = async (req, res) => {
  const { branchName } = req.params;
  const { schemeName } = req.body;
  try {
    const branch = await Branch.findOne({ name: branchName });
    if (!branch) return res.status(404).json({ message: "Branch not found" });
    const slug = schemeName.toLowerCase().replace(/\s+/g, "-").replace(/-+/g,'-');
    branch.Schemes.push({ name: schemeName,slug, subjects: [] });
    await branch.save();
    res.json(branch);
  } catch (error) {
    res.status(500).json({ message: "Server error adding scheme", error });
  }
};

// 3. ➕ Add a Subject to a Scheme in a Branch
export const addSubjectToScheme = async (req, res) => {
  const { branchName, schemeName } = req.params;
  const { subjectName } = req.body;
  try {
    const branch = await Branch.findOne({ name: branchName });
    const scheme = branch?.Schemes.find(s => s.name === schemeName);
    if (!scheme) return res.status(404).json({ message: "Scheme not found" });

    const slug = subjectName.toLowerCase().replace(/\s+/g, "-").replace(/-+/g,'-');
    scheme.subjects.push({ name: subjectName, slug, posts: [] });
    await branch.save();
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: "Server error adding subject", error });
    console.log(error);
  }
};

// 4. ➕ Add a Post to a Subject in a Scheme
export const addPostToSubject = async (req, res) => {
  const { branchSlug, schemeSlug, subjectSlug } = req.params;
  const { title, pdfUrl } = req.body;
  try {
    const branch = await Branch.findOne({ slug: branchSlug });
    const scheme = branch?.Schemes.find(s => s.slug === schemeSlug);
    const subject = scheme?.subjects.find(sub => sub.slug === subjectSlug);
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/-+/g,'-');
    subject.posts.push({ title, slug, pdfUrl });
    await branch.save();
    res.json(subject.posts);
  } catch (error) {
    res.status(500).json({ message: "Server error adding post", error });
  }
};

export const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find(); 
    res.json(branches);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch branches" });
  }
};