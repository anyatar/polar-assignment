import { Router } from "express";
import RunController from "../controllers/run.controller";
import { welcome } from "../controllers/home.controller";
import {splitRequest} from "../middlewares/splitRequest.validation";

const router = Router();
const controller = new RunController();

router.get("/", welcome);

// Signs the user up to the application
router.post("/signup", controller.create);

// Updates the users total running distance
router.put("/update", splitRequest, controller.update);

// Returns the users' ranking
router.get("/mystats", splitRequest, controller.myStats);

export default router;
