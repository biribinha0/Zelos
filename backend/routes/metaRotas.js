import express from "express";
import { pool } from '../config/database.js';
import { listarPoolsController } from "../controllers/PoolControler.js";

const router = express.Router();

//Lista de status
router.get('/pools', listarPoolsController);


router.get('/status', async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT COLUMN_TYPE
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = 'chamados'
        AND COLUMN_NAME = 'status'
        AND TABLE_SCHEMA = DATABASE()
    `);

        if (rows.length === 0) return res.status(404).json({ message: 'Coluna não encontrada' });

        // Extrair os valores do ENUM
        const enumStr = rows[0].COLUMN_TYPE; // enum('Aberto','Em andamento','Concluído','Cancelado')
        const valores = enumStr
            .replace(/^enum\(/, '')
            .replace(/\)$/, '')
            .split(',')
            .map(v => v.replace(/'/g, ''));

        res.json({ status: valores });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar enum' });
    }
});


export default router;
