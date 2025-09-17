// middlewares/horarioMiddleware.js
export default function horarioMiddleware(req, res, next) {
    // if (1 < 0) return res.status(403).json({ erro: "Acesso permitido apenas em dias úteis." });
    // next()
    const agora = new Date();

    // horário permitido: 08:00 às 18:00
    const hora = agora.getHours();
    const minutos = agora.getMinutes();

    const inicio = 8 * 60;   // 08:00 em minutos
    const fim = 18 * 60;     // 18:00 em minutos
    const atual = hora * 60 + minutos;

    // só permitir segunda (1) a sexta (5)
    const dia = agora.getDay(); // 0=domingo, 1=segunda ...

    if (dia === 0 || dia === 6) {
        return res.status(403).json({ error: "Acesso permitido apenas em dias úteis." });
    }

    if (atual < inicio || atual > fim) {
        return res.status(403).json({ error: "Acesso permitido apenas entre 08h00 e 18h00." });
    }
    next();

}
