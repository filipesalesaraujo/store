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

export const CarrinhoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [carrinho, setCarrinho] = useState<ItemCarrinho[]>(() => {
        const carrinhoSalvo = localStorage.getItem('carrinho');
        return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
    });

    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }, [carrinho]);

    const adicionarAoCarrinho = (produto: Produto, quantidade: number) => {
        setCarrinho(carrinhoAtual => {
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

    const increaseQuantity = (produto: Produto) => {
        setCarrinho(carrinhoAtual => {
            return carrinhoAtual.map(item =>
                item.nome === produto.nome
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            );
        });
    };

    const decreaseQuantity = (produto: Produto) => {
        setCarrinho(carrinhoAtual => {
            return carrinhoAtual.map(item =>
                item.nome === produto.nome
                    ? { ...item, quantidade: item.quantidade > 1 ? item.quantidade - 1 : 1 }
                    : item
            );
        });
    };

    const removerDoCarrinho = (produto: Produto) => {
        setCarrinho(carrinhoAtual => {
            return carrinhoAtual.filter(item => item.nome !== produto.nome);
        });
    };

    const produtoNoCarrinho = (produto: Produto) => {
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