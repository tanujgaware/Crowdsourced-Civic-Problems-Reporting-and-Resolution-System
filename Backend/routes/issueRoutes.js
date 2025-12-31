import { Router } from "express";
import wrapAsync, { authenticate, restrictTo } from "../utils/utils.js";
import { deleteIssue, getMyIssues, getNearbyIssue, postIssue, updateStatus } from "../controllers/issueController.js";
import upload from "../utils/cloudConfig.js";
const router=Router();

router.route("/api/issues").get(authenticate,wrapAsync(getMyIssues));
router.route("/api/issues/nearme").get(authenticate,wrapAsync(getNearbyIssue));
router.route("/api/issue").post(authenticate,restrictTo("Citizen"),upload.array("files",5),wrapAsync(postIssue));
router.route("/api/issue").put(authenticate,updateStatus); 
router.route("/api/issue").delete(authenticate,restrictTo("Citizen","Official"),deleteIssue);

export {router}