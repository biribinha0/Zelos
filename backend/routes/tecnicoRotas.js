import express from "express";

const router = express.Router();

//Lista de chamados disponíveis para autoatribuição
router.post('/pool-chamadas')

//Atribui chamado ao técnico logado
router.post('/chamados/:id/atribuir/')

// Lista de Chamados do Usuário
router.get('/chamados')

// Detalhes de um chamado específico (com status, histórico de apontamentos etc)
router.get('/chamados/:id')

// Cria novo apontamento
router.post('/chamados/:id/apontamento')


export default router;