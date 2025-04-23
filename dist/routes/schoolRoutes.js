import { addSchool, getSchools } from "../controllers/schoolControllers.js";
import { Router } from "express";
const router = Router();
router.post("/addSchool", addSchool);
router.get("/listSchools", getSchools);
export default router;
