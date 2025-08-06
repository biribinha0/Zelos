import express from "express";
import { criarApontamentoController } from "../controllers/ApontamentoController.js";
const router = express.Router();

router.post('/', criarApontamentoController);

export default router;