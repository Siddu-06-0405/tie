import express from "express";
import {
  createBranch,
  addSchemeToBranch,
  addSubjectToScheme,
  addPostToSubject,
  getAllBranches,
  getSchemesWithSubjects
} from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/branch", createBranch);
router.post("/branch/:branchSlug/scheme", addSchemeToBranch);
router.post("/branch/:branchSlug/scheme/:schemeSlug/subject", addSubjectToScheme);
router.post("/branch/:branchSlug/scheme/:schemeSlug/subject/:subjectSlug/post", addPostToSubject);
router.get("/branches", getAllBranches);
router.get("/branch/:slug",getSchemesWithSubjects);

export default router;