'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation'
import Image from 'next/image';

import { useRequireAuthentication } from '@/utils/auth'
import { app } from '@/utils/firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

import { useCarrinho } from '@/context/carrinho-provider';

import { Produto } from '@/types/produto';

// Definindo o componente ListaDeProdutos.
export default function ListaDeProdutos() {
	// Definindo o estado para armazenar a lista de produtos.
	const [produtos, setProdutos] = useState<Produto[]>([]);
	// Obtendo a função adicionarAoCarrinho do contexto do carrinho.
	const { adicionarAoCarrinho } = useCarrinho();

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
			const produtosList = produtosSnapshot.docs.map(doc => doc.data() as Produto);
			setProdutos(produtosList);
		};

		fetchProdutos();
	}, [router]);

	// Renderizando a lista de produtos.
	return (
		<section className='flex justify-center items-center'>
			<div className='max-w-[1360px] w-full p-5 grid md:grid-cols-3 grid-cols-1 gap-5'>
				{produtos.map((produto, index) => (
					<Card key={index} className='flex flex-col justify-between'>
						<div>
							<CardHeader>
								<CardTitle>{produto.nome}</CardTitle>
							</CardHeader>
							<CardContent className='flex flex-col gap-5'>
								<Image width={500} height={500} src={produto.imagemUrl} alt={produto.nome} />
								<CardDescription >{produto.descricao}</CardDescription>
								<CardDescription><strong>Preço:</strong> R$ {produto.preco}</CardDescription>
							</CardContent>
						</div>
						<CardFooter>
							<Button className='bg-blue-500 hover:bg-blue-600' onClick={() => adicionarAoCarrinho(produto, 1)}>Adicionar ao carrinho</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</section>
	);
}