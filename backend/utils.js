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

export function formatarNome(nomeCompleto) {
  if (!nomeCompleto) return "";

  // Coloca tudo em minúsculo e depois capitaliza cada palavra
  const nomeFormatado = nomeCompleto
    .toLowerCase()
    .split(" ")
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(" ");

  return nomeFormatado;
}

export function primeiroNome(nomeCompleto) {
  if (!nomeCompleto) return "";

  return nomeCompleto.split(" ")[0].charAt(0).toUpperCase() + 
         nomeCompleto.split(" ")[0].slice(1).toLowerCase();
}

export function primeiroNomeInicial(nomeCompleto){
  if (!nomeCompleto) return "";
  const nomeFormatado = formatarNome(nomeCompleto);
  return nomeFormatado.split(' ')[0] + " " +
        nomeFormatado.split(' ')[1].charAt(0).toUpperCase() + '.'
}