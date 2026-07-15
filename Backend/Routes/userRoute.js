import express from 'express';

import { getUsers, createUser, getUser, updateUser, deleteUser } from '../Controllers/UserController.js';
import userAuth from '../Middleware/UserAuth.js';
import authorize from '../Middleware/authorize.js';

const router = express.Router();

router.get("/", userAuth, getUsers)
router.post("/",userAuth, createUser,)
router.get("/:id", userAuth, getUser)
router.put("/:id",userAuth, authorize("admin"), updateUser, )
router.delete("/:id", userAuth, authorize("admin"),  deleteUser)


export default router;