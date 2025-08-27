import { listarPoolsPorTecnico } from "./models/Pools.js";
import { obterPoolPorId } from "./models/Pools.js";

const particulas = ["de", "da", "do", "dos", "das"];

export function formatarTituloPool(titulo) {
    switch (titulo) {
        case 'externo':
            return 'Externo';

        case 'manutencao':
            return 'Manutenção';

        case 'apoio_tecnico':
            return 'Apoio Técnico';

        case 'limpeza':
            return 'Limpeza';

        default:
            return null
    }
}

export async function carregarPoolsParaTecnico(idTecnico) {
    const relacoesPoolTecnico = await listarPoolsPorTecnico(idTecnico);
    const poolsCompletos = await Promise.all(
        relacoesPoolTecnico.map(async ({ id_pool }) => {
            const pool = await obterPoolPorId(id_pool);
            return {
                ...pool,
                nome_formatado: formatarTituloPool(pool.titulo)
            };
        })
    );
    return poolsCompletos
}

export function formatarFuncao(funcao) {
    switch (funcao) {
        case 'usuario':
            return 'Usuário';

        case 'tecnico':
            return 'Técnico';

        case 'admin':
            return 'Administrador';
        default:
            return null
    }
}

export function formatarNome(nomeCompleto) {
    if (!nomeCompleto) return "";

    // Coloca tudo em minúsculo e depois capitaliza cada palavra
    const nomeFormatado = nomeCompleto
        .toLowerCase()
        .split(" ")
        .filter(p => p.trim() !== "")
        .map((palavra) => {
            if (particulas.includes(palavra)) return palavra
            return palavra.charAt(0).toUpperCase() + palavra.slice(1);
        })
        .join(" ");

    return nomeFormatado;
}

export function primeiroNome(nomeCompleto) {
    if (!nomeCompleto) return "";
    const nomeFormatado = formatarNome(nomeCompleto);
    const partes = nomeFormatado.split(" ");

    return partes[0];
}

export function primeiroNomeInicial(nomeCompleto) {
    if (!nomeCompleto) return "";
    const nomeFormatado = formatarNome(nomeCompleto);
    const partes = nomeFormatado.split(" ");

    const primeiroNome = partes[0];
    const sobrenomeValido = partes.find((p, i) => i > 0 && !particulas.includes(p))

    if (!sobrenomeValido) return primeiroNome;
    return `${primeiroNome} ${sobrenomeValido.charAt(0)}.`;
}