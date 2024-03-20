import express, { Application } from "express";
import runRoutes from "./run.routes";

const router = express.Router();
router.use("/", runRoutes);

export default router;