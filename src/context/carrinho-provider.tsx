import React, { createContext, useState, useContext, useEffect } from 'react';
import { CarrinhoContextData, ItemCarrinho } from '@/types/carrinho';
import { Produto } from '@/types/produto';

// Cria um contexto para o carrinho de compras
const CarrinhoContext = createContext<CarrinhoContextData>({} as CarrinhoContextData);

// Define o provedor do contexto do carrinho de compras
export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
	// Define o estado do carrinho de compras e um estado para rastrear se o cliente está pronto
	const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
	const [isClient, setIsClient] = useState(false);

	// Atualiza o estado do carrinho com os dados do localStorage quando o cliente estiver pronto
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const carrinhoSalvo = localStorage.getItem('carrinho');
			setCarrinho(carrinhoSalvo ? JSON.parse(carrinhoSalvo) : []);
			setIsClient(true);
		}
	}, []);

	// Atualiza o armazenamento local sempre que o carrinho de compras é atualizado
	useEffect(function () {
		if (isClient) {
			localStorage.setItem('carrinho', JSON.stringify(carrinho));
		}
	}, [carrinho, isClient]);

	// Define várias funções para manipular o carrinho de compras
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

	// Retorna o provedor do contexto do carrinho de compras, mas apenas se o cliente estiver pronto
	return isClient ? (
		<CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, increaseQuantity, decreaseQuantity, removerDoCarrinho, produtoNoCarrinho }}>
			{children}
		</CarrinhoContext.Provider>
	) : null;
};

// Define um hook personalizado para usar o contexto do carrinho de compras
export function useCarrinho(): CarrinhoContextData {
	const context = useContext(CarrinhoContext);
	if (!context) {
		throw new Error('useCarrinho must be used within a CarrinhoProvider');
	}
	return context;
}