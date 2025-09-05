import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import authRotas from './routes/authRotas.js';
import adminRotas from "./routes/adminRotas.js";
import publicoRotas from "./routes/publicoRotas.js";
import tecnicoRotas from "./routes/tecnicoRotas.js";
import usuarioRotas from "./routes/usuarioRotas.js";
import metaRotas from "./routes/metaRotas.js"
import passport from './config/ldap.js';
import authMiddleware from './middlewares/authMiddleware.js';
import horarioMiddleware from './middlewares/horarioMiddleware.js';

// 1. Carrega variáveis de ambiente PRIMEIRO
dotenv.config();

// 2. Configuração básica do Express
const app = express();
const porta = process.env.PORT || 8080;

// 3. Middlewares essenciais com tratamento de erros
try {
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }));
  app.use(express.json());

  app.use(session({
    secret: 'sJYMmuCB2Z187XneUuaOVYTVUlxEOb2K94tFZy370HjOY7T7aiCKvwhNQpQBYL9e',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

  // 4. Inicialização segura do Passport
  if (!passport) {
    throw new Error('Passport não foi importado corretamente');
  }
  app.use(passport.initialize());
  app.use(passport.session());

} catch (err) {
  console.error('Erro na configuração inicial:', err);
  process.exit(1);
}

// 5. Rotas
app.use('/auth', horarioMiddleware, authRotas);

// app.get('/api/equipamentos/filtrar', (req, res) => {
//   const { query } = req.query;

//   // if (!query || query.length < 4) {
//   //   return res.status(400).json({ error: 'Query deve ter pelo menos 4 caracteres' });
//   // }

//   const sql = `SELECT * FROM equipamentos WHERE CAST(patrimonio AS CHAR) LIKE ?`;
//   const values = [`${query}%`];

//   db.query(sql, values, (err, results) => {
//     if (err) {
//       console.error('Erro ao buscar equipamentos:', err);
//       return res.status(500).json({ error: 'Erro ao buscar equipamentos' });
//     }

//     res.json(results);
//   });
// });


app.get('/health', (req, res) => {
  res.status(200).json({ status: 'online' });
});

app.use('/admin', authMiddleware(["admin"]), horarioMiddleware, adminRotas);

app.use('/publico', publicoRotas);

app.use('/tecnico', authMiddleware(["tecnico"]), horarioMiddleware, tecnicoRotas);

app.use('/usuario', authMiddleware(["usuario"]), horarioMiddleware, usuarioRotas);

app.use('/meta', authMiddleware(["admin", "usuario", "tecnico"]), horarioMiddleware, metaRotas)

// 6. Tratamento de erros robusto
process.on('unhandledRejection', (reason, promise) => {
  console.error('Rejeição não tratada em:', promise, 'motivo:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Exceção não capturada:', err);
  process.exit(1);
});

// 7. Inicialização do servidor com verificação
const server = app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
}).on('error', (err) => {
  console.error('Erro ao iniciar:', err);
});

// 8. Encerramento elegante
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Servidor encerrado');
  });
});