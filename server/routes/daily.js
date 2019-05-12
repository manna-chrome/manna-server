import express from "express";
import controller from "./../controller/daily";

const router = express.Router();

router.get("/verse", (req, res) => {
  controller.getVerse(req, res);
});

router.get("/image", (req, res) => {
  controller.getImage(req, res);
});

export default router;
