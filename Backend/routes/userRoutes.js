import { Router } from "express";
import wrapAsync, { authenticate } from "../utils/utils.js";
import { getProfile, isAuthenticated, login, logout, signup } from "../controllers/userController.js";
const router=Router();

router.route("/signup").post(wrapAsync(signup));
router.route("/login").post(wrapAsync(login));
router.route("/logout").post(wrapAsync(logout));
router.route("/isAuth").get(wrapAsync(isAuthenticated));
router.route("/me").get(authenticate,wrapAsync(getProfile));

export {router}