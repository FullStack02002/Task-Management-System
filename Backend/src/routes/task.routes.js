import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTask,deleteTask,getTaskById,updateTask,updateStatus, getUserTask,filterTask } from "../controllers/task.controller.js";


const router=Router();


router.route("/create").post(verifyJWT,createTask);
router.route("/getById/:id").get(verifyJWT,getTaskById);
router.route("/delete/:id").delete(verifyJWT,deleteTask)
router.route("/update/:id").patch(verifyJWT,updateTask);
router.route("/updateStatus/:id").patch(verifyJWT,updateStatus);
router.route("/getall/:userId").get(verifyJWT,getUserTask);
router.route("/filter").get(verifyJWT,filterTask);



export default router;