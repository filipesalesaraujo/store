export interface Produto {
    nome: string;
    descricao: string;
    preco: number;
    imagemUrl: string;
}

export interface ProdutoCardProps {
    produto: Produto;
    adicionarAoCarrinho: (produto: Produto, quantidade: number) => void;
    produtoNoCarrinho: (produto: Produto) => boolean;
}