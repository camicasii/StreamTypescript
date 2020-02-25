import { Router, Response } from "express";
import { getTrack, uploadTrack } from "../controllers/tracksControllers";


const router: Router = Router();

router.get("/tracks/:trackID", getTrack);
router.post("/tracks/", uploadTrack);

export default router;