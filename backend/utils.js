export function formatarTituloPool(titulo) {

    switch (pool.titulo) {
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