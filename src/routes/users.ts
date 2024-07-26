import express, {Express, Request,Response, NextFunction,Router} from 'express';
import { tryCatch } from '../middlewares/tryCatch';
import { createUser, deleteUser, getAllUsers, getUserDetails, updateUser } from '../controllers/users';
import { createUserValidator, updateUserValidator } from '../validators/userValidator';

const router:Router = express.Router();

router.post("/",createUserValidator,tryCatch(createUser));
router.get("/",tryCatch(getAllUsers));
router.get("/:userId",tryCatch(getUserDetails));
router.put("/:userId",updateUserValidator,tryCatch(updateUser));
router.delete("/:userId",tryCatch(deleteUser));

export default router;