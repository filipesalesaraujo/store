'use client';

// Importa as dependências necessárias
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ProdutoCardProps } from '@/types/produto';
import { Skeleton } from './ui/skeleton';
import { useState } from 'react';

// Define o componente ProdutoCard
export default function ProdutoCard({ produto, adicionarAoCarrinho, produtoNoCarrinho }: ProdutoCardProps) {

	const isProdutoNoCarrinho = produtoNoCarrinho(produto);

	const [isImageLoaded, setIsImageLoaded] = useState(false);

	return (
		<Card className='flex flex-col justify-between h-full lg:h-[700px]' role="region" aria-label="Produto">
			<div>
				<CardHeader className=' lg:h-[130px]'>
					<CardTitle>{produto.nome.length > 53 ? produto.nome.substring(0, 53) + '...' : produto.nome}</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-col gap-5'>

					<div className="h-64 bg-gray-200 relative rounded-md overflow-hidden">
						{!isImageLoaded && <Skeleton className="h-64 w-full rounded-md" />}
						<Image
							layout="fill"
							src={produto.imagemUrl}
							alt={produto.nome}
							objectFit="contain"
							placeholder="empty"
							onLoad={() => setIsImageLoaded(true)}
						/>
					</div>

					<CardDescription>
						{produto.descricao.length > 200 ? produto.descricao.substring(0, 200) + '...' : produto.descricao}
					</CardDescription>
					<CardDescription><strong>Preço:</strong> R$ {produto.preco}</CardDescription>
				</CardContent>
			</div>
			<CardFooter>
				{isProdutoNoCarrinho ? (
					<Button className='bg-gray-500 cursor-not-allowed' disabled aria-label="Produto já adicionado ao carrinho">
						Produto Adicionado
					</Button>
				) : (
					<Button className='bg-blue-500 hover:bg-blue-600' onClick={() => adicionarAoCarrinho(produto, 1)} aria-label="Adicionar produto ao carrinho">
						Adicionar ao carrinho
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};