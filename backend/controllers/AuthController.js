import jwt from 'jsonwebtoken';
import { read, compare } from '../config/database.js';
import { JWT_SECRET } from '../config/jwt.js'; // Importar a chave secreta
import { formatarNome, primeiroNome } from '../utils.js';

const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    let query = null
    if (isNaN(username)) {
      query = `email = '${username}'`
    } else {
      query = `id = ${username}`
    }
    const usuario = await read('usuarios', query);

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    // Verificar se a senha está correta (comparar a senha enviada com o hash armazenado)
    const senhaCorreta = await compare(password, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    // Gerar o token JWT
    const token = jwt.sign({
      id: usuario.id,
      funcao: usuario.funcao,
      email: usuario.email,
      nomeCompleto: formatarNome(usuario.nome),
      nome: primeiroNome(usuario.nome)
    }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ mensagem: 'Login realizado com sucesso', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ mensagem: 'Erro ao fazer login' });
  }
};

export { loginController };