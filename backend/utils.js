import { listarPoolsPorTecnico } from "./models/Pools.js";
import { obterPoolPorId } from "./models/Pools.js";

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