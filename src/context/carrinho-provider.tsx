import React, { createContext, useState, useContext, useEffect } from 'react';

import { CarrinhoContextData, ItemCarrinho } from '@/types/carrinho';
import { Produto } from '@/types/produto';

const CarrinhoContext = createContext<CarrinhoContextData>({} as CarrinhoContextData);
export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
	const [carrinho, setCarrinho] = useState<ItemCarrinho[]>(function () {
		if (typeof window !== 'undefined') {
			const carrinhoSalvo = localStorage.getItem('carrinho');
			return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
		}
		return [];
	});

	useEffect(function () {
		if (typeof window !== 'undefined') {
			localStorage.setItem('carrinho', JSON.stringify(carrinho));
		}
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