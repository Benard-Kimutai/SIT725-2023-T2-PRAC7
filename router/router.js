import express from "express";
import { postCatController, getAllCatsController } from "../controllers/catControler.js"


const router = express.Router()

router.get('/cats',getAllCatsController );


router.post('/cat', postCatController );

export default router