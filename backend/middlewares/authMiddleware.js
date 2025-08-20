import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js"; // Importar a chave secreta

// Middleware genérico que recebe funções permitidas como parâmetro
const authMiddleware = (funcoesPermitidas = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ mensagem: "Não autorizado: Token não fornecido" });
    }

    const [, token] = authHeader.split(" ");

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.usuarioId = decoded.id;
      req.usuarioFuncao = decoded.funcao;

      // Se funções foram passadas, valida
      if (
        funcoesPermitidas.length > 0 &&
        !funcoesPermitidas.includes(decoded.funcao)
      ) {
        return res
          .status(403)
          .json({ mensagem: "Não autorizado: Permissão insuficiente" });
      }

      next();
    } catch (error) {
      return res
        .status(403)
        .json({ mensagem: "Não autorizado: Token inválido" });
    }
  };
};

export default authMiddleware;
