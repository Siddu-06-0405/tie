import express from "express";
import {
  createBranch,
  addSchemeToBranch,
  addSubjectToScheme,
  addPostToSubject,
  getAllBranches,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/branch", createBranch);
router.post("/branch/:branchName/scheme", addSchemeToBranch);
router.post("/branch/:branchName/scheme/:schemeName/subject", addSubjectToScheme);
router.post("/branch/:branchSlug/scheme/:schemeSlug/subject/:subjectSlug/post", addPostToSubject);
router.get("/branches", getAllBranches);

export default router;