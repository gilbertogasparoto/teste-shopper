import { Router } from "express";
import productsController from "../controllers/productsController";

const router = Router();

router.get("/", (req, res) => res.json("ola mundo"));

router.get("/products", productsController.getAll);

router.post("/products", productsController.validateProducts);

router.patch("/products", productsController.updatePrice);

export default router;
