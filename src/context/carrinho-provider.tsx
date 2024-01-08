import React, { createContext, useState, useContext, useEffect } from 'react';

interface Produto {
	nome: string;
	descricao: string;
	preco: number;
	imagemUrl: string;
}

interface ItemCarrinho extends Produto {
	quantidade: number;
}

interface CarrinhoContextData {
	carrinho: ItemCarrinho[];
	adicionarAoCarrinho: (produto: Produto, quantidade: number) => void;
	increaseQuantity: (produto: Produto) => void;
	decreaseQuantity: (produto: Produto) => void;
	removerDoCarrinho: (produto: Produto) => void;
	produtoNoCarrinho: (produto: Produto) => boolean; // Adicionado aqui
}

const CarrinhoContext = createContext<CarrinhoContextData>({} as CarrinhoContextData);
export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
	const [carrinho, setCarrinho] = useState<ItemCarrinho[]>(function () {
		const carrinhoSalvo = localStorage.getItem('carrinho');
		return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
	});

	useEffect(function () {
		localStorage.setItem('carrinho', JSON.stringify(carrinho));
	}, [carrinho]);

	function adicionarAoCarrinho(produto: Produto, quantidade: number) {
		setCarrinho(function (carrinhoAtual) {
			const itemExistente = carrinhoAtual.find(item => item.nome === produto.nome);
			if (itemExistente) {
				return carrinhoAtual.map(item =>
					item.nome === produto.nome
						? { ...item, quantidade: item.quantidade + quantidade }
						: item
				);
			} else {
				return [...carrinhoAtual, { ...produto, quantidade }];
			}
		});
	};

	function increaseQuantity(produto: Produto) {
		setCarrinho(function (carrinhoAtual) {
			return carrinhoAtual.map(item =>
				item.nome === produto.nome
					? { ...item, quantidade: item.quantidade + 1 }
					: item
			);
		});
	};

	function decreaseQuantity(produto: Produto) {
		setCarrinho(function (carrinhoAtual) {
			return carrinhoAtual.map(item =>
				item.nome === produto.nome
					? { ...item, quantidade: item.quantidade > 1 ? item.quantidade - 1 : 1 }
					: item
			);
		});
	};

	function removerDoCarrinho(produto: Produto) {
		setCarrinho(function (carrinhoAtual) {
			return carrinhoAtual.filter(item => item.nome !== produto.nome);
		});
	};

	function produtoNoCarrinho(produto: Produto) {
		return carrinho.some(item => item.nome === produto.nome);
	};

	return (
		<CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, increaseQuantity, decreaseQuantity, removerDoCarrinho, produtoNoCarrinho }}>
			{children}
		</CarrinhoContext.Provider>
	);
};

export function useCarrinho(): CarrinhoContextData {
	const context = useContext(CarrinhoContext);
	if (!context) {
		throw new Error('useCarrinho must be used within a CarrinhoProvider');
	}
	return context;
}