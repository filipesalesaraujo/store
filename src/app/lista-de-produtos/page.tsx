'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation'
import Image from 'next/image';

import { useRequireAuthentication } from '@/utils/auth'
import { app } from '@/utils/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { useCarrinho } from '@/context/carrinho-provider';

import { Produto } from '@/types/produto';
import ProdutoCard from '@/components/produto-card';

// Definindo o componente ListaDeProdutos.
export default function ListaDeProdutos() {
	// Definindo o estado para armazenar a lista de produtos.
	const [produtos, setProdutos] = useState<Produto[]>([]);
	// Obtendo a função adicionarAoCarrinho do contexto do carrinho.
	const { adicionarAoCarrinho } = useCarrinho();

	// Obtenha o estado atual do carrinho
	const { carrinho } = useCarrinho();

	// Defina a função produtoNoCarrinho
	const produtoNoCarrinho = (produto: Produto) => {
		return carrinho.some(item => item.id === produto.id);
	};

	// Obtendo o objeto router e o estado de autenticação do usuário.
	const router = useRouter()
	const { isLoading, isUserAuthenticated } = useRequireAuthentication()

	// Verificando se o usuário está autenticado. Se não estiver, redireciona para a página de login.
	useEffect(() => {
		if (!isLoading && !isUserAuthenticated) {
			router.push('/login')
		}
	}, [isLoading, isUserAuthenticated, router])

	// Buscando a lista de produtos do Firestore quando o componente é montado.
	useEffect(() => {
		const fetchProdutos = async () => {
			const db = getFirestore(app);
			const produtosCollection = collection(db, 'produtos');
			const produtosSnapshot = await getDocs(produtosCollection);
			const produtosList = produtosSnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}) as Produto);
			setProdutos(produtosList);
		};

		fetchProdutos();
	}, [router]);

	// Renderizando a lista de produtos.
	return (
		<section className='flex justify-center items-center'>
			<div role="list" className='max-w-[1360px] w-full p-5 flex flex-col gap-5 '>

				<div>
					<h1 className="text-2xl font-bold">Lista de Produto</h1>
					<p className="text-gray-600">Aqui estão todos os nossos produtos disponíveis:</p>
				</div>

				<div className='grid md:grid-cols-3 grid-cols-1 gap-5 h-full'>
					{produtos.map((produto, index) => (
						<div role="listitem" key={index} className="h-full">
							<ProdutoCard produto={produto} adicionarAoCarrinho={adicionarAoCarrinho} produtoNoCarrinho={produtoNoCarrinho} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}