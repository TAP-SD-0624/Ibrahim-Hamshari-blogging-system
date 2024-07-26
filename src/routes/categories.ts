import express, { Router } from "express";
import { tryCatch } from "../middlewares/tryCatch";
import { createNewCategory, deleteCategory, getAllCategories } from "../controllers/categories";
import { createNewCategoryValidator } from "../validators/categoryValidator";

const router: Router = express.Router();

router.post("/", createNewCategoryValidator, tryCatch(createNewCategory));
router.get("/", tryCatch(getAllCategories));
router.delete("/:categoryId",tryCatch(deleteCategory))
export default router;