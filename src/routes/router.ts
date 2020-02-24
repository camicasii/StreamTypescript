import { Router  } from "express";
import { getTrack, uploadTrack } from "../controllers/tracksControllers";


const router:Router =Router();

router.get("/tracks/:trackID",getTrack);

router.post("/tracks/:trackID",uploadTrack);

export default router;