import express from "express";
import {
  getProducts,
  getLiveProducts,
  createProduct,
  updateProduct,
  softDeleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/live", getLiveProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", softDeleteProduct);

export default router;
