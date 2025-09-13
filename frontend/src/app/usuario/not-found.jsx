import Error404 from '@/components/404/Error404.jsx';

export default function NotFoundUsuario() {
    return (
        <div className="p-6">
            <Error404
                mensagem="Caminho não encontrada no manual de rotas do usuário"
                textoBotao="Voltar"
                linkHref='/usuario'
            />
        </div>
    );
}
