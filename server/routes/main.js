import express from "express";
import controller from "./../controller/main";

const router = express.Router();

router.get("/api-status", (req, res) => {
  controller.getStatus(req, res);
});

export default router;
