'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation'
import Image from 'next/image';

import { useRequireAuthentication } from '@/utils/auth'
import { app } from '@/utils/firebase';
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';

import { useCarrinho } from '@/context/carrinho-provider';

import { Produto } from '@/types/produto';
import ProdutoCard from '@/components/produto-card';
import { Input } from '@/components/ui/input';

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

	const [busca, setBusca] = useState('');

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
			const q = query(produtosCollection, orderBy('dataPublicacao', 'desc'));
			const produtosSnapshot = await getDocs(q);
			let produtosList = produtosSnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}) as Produto);

			// Filtrar produtos com base no valor da busca.
			if (busca) {
				produtosList = produtosList.filter(produto =>
					produto.nome.toLowerCase().includes(busca.toLowerCase())
				);
			}

			setProdutos(produtosList);
		};

		fetchProdutos();
	}, [router, busca]);
	
	// Renderizando a lista de produtos.
	return (
		<section className='flex justify-center items-center'>
			<div role="list" className='max-w-[1360px] w-full p-5 flex flex-col gap-5 '>

				<div className='flex gap-5 justify-between items-center'>
					<div>
						<h1 className="text-2xl font-bold">Lista de Produto</h1>
						<p className="text-gray-600">Aqui estão todos os nossos produtos disponíveis:</p>
					</div>
					<Input className='max-w-[250px] w-full focus-visible:ring-transparent focus:border-blue-500 transition-colors' type="text" value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar produtos..." />
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