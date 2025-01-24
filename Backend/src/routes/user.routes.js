import {Router} from "express";
import { verifyAdmin,verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser,loginUser,logoutUser,getCurrentUser, getAllUsers} from "../controllers/user.controller.js";



const router=Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/getcurrentuser").get(verifyJWT,getCurrentUser);
router.route("/admin/getall").get(verifyJWT,verifyAdmin,getAllUsers);





export default router;