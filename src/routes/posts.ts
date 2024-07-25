import express, {Express, Request,Response, NextFunction,Router} from 'express';
import { tryCatch } from '../middlewares/tryCatch';
import { createPost, deletePost, getAllPosts, getPostDetails, updatePost } from '../controllers/posts';
import { createCategory, getAllCategories } from '../controllers/categories';
import { createComment, getAllComments } from '../controllers/comments';

const router:Router = express.Router();

router.post("/",tryCatch(createPost));
router.get("/",tryCatch(getAllPosts));
router.get("/:postId",tryCatch(getPostDetails));
router.put("/:postId",tryCatch(updatePost));
router.delete("/:postId",tryCatch(deletePost));
router.post("/:postId/categories",tryCatch(createCategory));
router.get("/:postId/categories",tryCatch(getAllCategories));
router.post("/:postId/comments",tryCatch(createComment));
router.get("/:postIdv/comments",tryCatch(getAllComments));

export default router;