import express from "express";
import {
  createCategories,
  deleteCategories,
  getAllCategories,
  getCategoryById,
  updateCategories,
} from "../controllers/categoriesControllers.js";

const router = express.Router();

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.post("/", createCategories);

router.put("/:id", updateCategories);

router.delete("/:id", deleteCategories);

export default router;
