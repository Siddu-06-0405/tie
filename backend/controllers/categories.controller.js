import Branch from "../models/categories.model.js";

// 1. Create a new Branch
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

// 2. Add a new Scheme to a Branch
export const addSchemeToBranch = async (req, res) => {
  const { branchSlug } = req.params;
  const { schemeName } = req.body;
  try {
    const branch = await Branch.findOne({ slug: branchSlug });
    if (!branch) return res.status(404).json({ message: "Branch not found" });
    const slug = schemeName.toLowerCase().replace(/\s+/g, "-").replace(/-+/g,'-');
    branch.Schemes.push({ name: schemeName,slug, subjects: [] });
    await branch.save();
    res.json(branch);
  } catch (error) {
    res.status(500).json({ message: "Server error adding scheme", error });
  }
};

// 3. Add a Subject to a Scheme in a Branch
export const addSubjectToScheme = async (req, res) => {
  const { branchSlug, schemeSlug } = req.params;
  const { subjectName } = req.body;
  try {
    const branch = await Branch.findOne({ slug: branchSlug });
    const scheme = branch?.Schemes.find(s => s.slug === schemeSlug);
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

// 4. Add a Post to a Subject in a Scheme
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

export const getSchemesWithSubjects = async (req, res) => {
  const { slug } = req.params;

  try {
    const branch = await Branch.findOne({ slug }, "name Schemes.name Schemes.slug Schemes.subjects.name Schemes.subjects.slug");

    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    const response = {
      branchName: branch.name,
      schemes: branch.Schemes.map((scheme) => ({
        schemeName: scheme.name,
        schemeSlug: scheme.slug,
        subjects: scheme.subjects.map((subject) => ({
          name: subject.name,
          slug: subject.slug,
        })),
      })),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching branch details:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getSubjectWithPosts = async (req, res) => {
  const { subjectSlug } = req.params;

  try {
    const result = await Branch.aggregate([
      { $unwind: "$Schemes" },
      { $unwind: "$Schemes.subjects" },
      { $match: { "Schemes.subjects.slug": subjectSlug } },
      {
        $project: {
          _id: 0,
          branchSlug: "$slug",
          subjectName: "$Schemes.subjects.name",
          subjectSlug: "$Schemes.subjects.slug",
          posts: {
            $sortArray: {
              input: "$Schemes.subjects.posts",
              sortBy: { createdAt: -1 },
            },
          },
        },
      },
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching subject:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getSingleSubjectPost = async (req, res) => {
  try {
    const { slug } = req.params;

    const branch = await Branch.findOne({
      "Schemes.subjects.posts.slug": slug,
    });

    if (!branch) {
      return res.status(404).json({ message: "Post not found" });
    }

    let foundPost = null;

    // Traverse to locate the exact post object
    for (const scheme of branch.Schemes) {
      for (const subject of scheme.subjects) {
        const post = subject.posts.find((p) => p.slug === slug);
        if (post) {
          foundPost = post;
          break;
        }
      }
      if (foundPost) break;
    }

    if (!foundPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(foundPost);
  } catch (err) {
    console.error("Error fetching single blog:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRecentPosts = async (req, res) => {
  try {
    const branches = await Branch.find();

    let allPosts = [];

    branches.forEach((branch) => {
      branch.Schemes.forEach((scheme) => {
        scheme.subjects.forEach((subject) => {
          subject.posts.forEach((post) => {
            allPosts.push({
              subjectName: subject.name,
              title: post.title,
              slug: post.slug,
              createdAt: post.createdAt,
            });
          });
        });
      });
    });

    // Sort posts by most recent first
    allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(allPosts);
  } catch (err) {
    console.error("Error fetching recent posts:", err);
    res.status(500).json({ error: "Server error" });
  }
};