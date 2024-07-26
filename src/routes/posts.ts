import express, { Express, Request, Response, NextFunction, Router } from 'express';
import { tryCatch } from '../middlewares/tryCatch';
import { createPost, deletePost, getAllPosts, getPostDetails, updatePost } from '../controllers/posts';
import { createCategory, getAllPostCategories } from '../controllers/categories';
import { createComment, getAllComments } from '../controllers/comments';
import { createPostValidator, updatePostValidator } from '../validators/postValidator';
import { createCategoryValidator } from '../validators/categoryValidator';
import { createCommentValidator } from '../validators/commentValidator';

const router: Router = express.Router();

router.post("/", createPostValidator, tryCatch(createPost));
router.get("/", tryCatch(getAllPosts));
router.get("/:postId", tryCatch(getPostDetails));
router.put("/:postId", updatePostValidator, tryCatch(updatePost));
router.delete("/:postId", tryCatch(deletePost));
router.post("/:postId/categories", createCategoryValidator, tryCatch(createCategory));
router.get("/:postId/categories", tryCatch(getAllPostCategories));
router.post("/:postId/comments", createCommentValidator, tryCatch(createComment));
router.get("/:postId/comments", tryCatch(getAllComments));

export default router;