import { Produto } from "./produto";

export interface ItemCarrinho extends Produto {
	quantidade: number;
}

export interface CarrinhoContextData {
	carrinho: ItemCarrinho[];
	adicionarAoCarrinho: (produto: Produto, quantidade: number) => void;
	increaseQuantity: (produto: Produto) => void;
	decreaseQuantity: (produto: Produto) => void;
	removerDoCarrinho: (produto: Produto) => void;
	produtoNoCarrinho: (produto: Produto) => boolean;
}