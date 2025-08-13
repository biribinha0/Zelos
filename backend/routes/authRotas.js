import express from 'express';
import passport from '../config/ldap.js';
import { loginController } from '../controllers/AuthController.js';
import { criarUsuario, verificarCadastro, obterUsuarioPorId } from "../models/Usuarios.js";
import { generateHashedPassword } from "../hashPassword.js";
import { JWT_SECRET } from '../config/jwt.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/entrar', loginController);

// Rota de Login própria
router.post('/login', (req, res, next) => {

  // const { username, password } = req.body;
  // if (username === 'bernardo') return res.status(200).json({
  //   message: 'Autenticado com sucesso',
  //   user: {
  //     username: 'Bernardo de Souza Madureira',
  //     displayName: 'Bernardo',
  //     email: 'bernardomadureira.souza@gmail.com'
  //   }
  // });

  // Middleware de autenticação com tratamento de erros
  passport.authenticate('ldapauth', { session: true }, (err, user, info) => {
    try {
      if (err) {
        console.error('Erro na autenticação:', err);
        return res.status(500).json({ error: 'Erro interno no servidor' });
      }

      if (!user) {
        console.warn('Falha na autenticação:', info?.message || 'Credenciais inválidas');
        return res.status(401).json({ error: info?.message || 'Autenticação falhou' });
      }

      // Loga o usuário manualmente para garantir a sessão
      req.logIn(user, async (loginErr) => {
        if (loginErr) {
          console.error('Erro ao criar sessão:', loginErr);
          return res.status(500).json({ error: 'Erro ao criar sessão' });
        }


        // Verifica se há registro no banco local
        const usuarioCadastrado = await verificarCadastro(user.sAMAccountName, user.userPrincipalName);
        console.log(usuarioCadastrado)
        if (usuarioCadastrado === null) {
          const { password } = req.body;
          const senhaHasheada = await generateHashedPassword(password)
          const usuarioData = {
            id: user.sAMAccountName,
            email: user.userPrincipalName,
            nome: user.displayName,
            senha: senhaHasheada,
            funcao: 'usuario'
          }
          console.log(usuarioData)
          await criarUsuario(usuarioData);
        }

        const usuario = await obterUsuarioPorId(user.sAMAccountName, 'usuario');

        // Gerar o token JWT
        const token = jwt.sign({
          id: usuario.id,
          funcao: usuario.funcao,
          displayName: user.displayName,
          givenName: user.givenName,
          email: user.userPrincipalName,
        }, JWT_SECRET, {
          expiresIn: '1h',
        });


        console.log('Usuário autenticado:', user.displayName);
        return res.json({ message: 'Autenticado com sucesso', token });
      });
    } catch (error) {
      console.error('Erro inesperado:', error);
      res.status(500).json({ error: 'Erro inesperado no servidor' });
    }
  })(req, res, next);
});

// Rota de Logout
router.post('/logout', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Nenhum usuário autenticado' });
  }

  console.log('Usuário deslogando:', req.user?.username);

  req.logout((err) => {
    if (err) {
      console.error('Erro no logout:', err);
      return res.status(500).json({ error: 'Erro ao realizar logout' });
    }

    // Destrói a sessão completamente
    req.session.destroy((destroyErr) => {
      if (destroyErr) {
        console.error('Erro ao destruir sessão:', destroyErr);
        return res.status(500).json({ error: 'Erro ao encerrar sessão' });
      }

      res.clearCookie('connect.sid'); // Remove o cookie de sessão
      res.json({ message: 'Logout realizado com sucesso' });
    });
  });
});

// Rota para verificar autenticação
router.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      authenticated: true,
      user: {
        username: req.user.username,
        displayName: req.user.displayName
      }
    });
  }
  res.status(401).json({ authenticated: false });
});

export default router;