import express, {Express, Request,Response, NextFunction,Router} from 'express';
import { tryCatch } from '../middlewares/tryCatch';
import { createUser, deleteUser, getAllUsers, getUserDetails } from '../controllers/users';

const router:Router = express.Router();

router.post("/",tryCatch(createUser));
router.get("/",tryCatch(getAllUsers));
router.get("/:userId",tryCatch(getAllUsers));
router.put("/:userId",tryCatch(getUserDetails));
router.delete("/:userId",tryCatch(deleteUser));

export default router;