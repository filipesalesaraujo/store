export interface Produto {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    imagemUrl: string;
    quantidade: number;
}

export interface ProdutoCardProps {
    produto: Produto;
    adicionarAoCarrinho: (produto: Produto, quantidade: number) => void;
    produtoNoCarrinho: (produto: Produto) => boolean;
}