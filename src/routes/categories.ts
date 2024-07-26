import express, { Router } from "express";
import { tryCatch } from "../middlewares/tryCatch";
import { createNewCategory, getAllCategories } from "../controllers/categories";
import { createNewCategoryValidator } from "../validators/categoryValidator";

const router: Router = express.Router();

router.post("/", createNewCategoryValidator, tryCatch(createNewCategory));
router.get("/", tryCatch(getAllCategories));

export default router;