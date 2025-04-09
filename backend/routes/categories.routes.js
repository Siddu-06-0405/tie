import express from "express";
import {
  createBranch,
  addSchemeToBranch,
  addSubjectToScheme,
  addPostToSubject,
  getAllBranches,
  getSchemesWithSubjects,
  getSubjectWithPosts,
  getSingleSubjectPost,
  getRecentPosts
} from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/branch", createBranch);
router.post("/branch/:branchSlug/scheme", addSchemeToBranch);
router.post("/branch/:branchSlug/scheme/:schemeSlug/subject", addSubjectToScheme);
router.post("/branch/:branchSlug/scheme/:schemeSlug/subject/:subjectSlug/post", addPostToSubject);
router.get("/branches", getAllBranches);
router.get("/branch/:slug",getSchemesWithSubjects);
router.get("/get-subject-with-posts/:subjectSlug",getSubjectWithPosts);
router.get("/single-subject-post/:slug",getSingleSubjectPost);
router.get("/get-recent-posts/",getRecentPosts);

export default router;