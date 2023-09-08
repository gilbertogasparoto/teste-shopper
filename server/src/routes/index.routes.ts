import { Router } from "express";
import productsController from "../controllers/productsController";
require("express-async-errors");

const router = Router();

router.get("/products", productsController.getAll);

router.post("/products", productsController.validateProducts);

router.patch("/products", productsController.updatePrice);

export default router;
