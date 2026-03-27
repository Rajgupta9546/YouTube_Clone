import express from "express";
import {
addComment,
getComments,
deleteComment,
updateComment
} from "../controllers/comment.controller.js";
import { verifyToken } from "../middleware/jwt.middleware.js";

const router = express.Router();

router.get("/:videoId",getComments);

//  PROTECTED
router.post("/",verifyToken,addComment);
router.put("/:id",verifyToken,updateComment);
router.delete("/:id",verifyToken,deleteComment);
export default router;