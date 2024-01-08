'use client';

import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ProdutoCardProps } from '@/types/produto';

export default function ProdutoCard({ produto, adicionarAoCarrinho, produtoNoCarrinho }: ProdutoCardProps) {
	return (
		<Card className='flex flex-col justify-between'>
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
				<Button className='bg-blue-500 hover:bg-blue-600' onClick={() => adicionarAoCarrinho(produto, 1)} >
					{produtoNoCarrinho(produto) ? 'Produto Adicionado' : 'Adicionar ao carrinho'}
				</Button>
			</CardFooter>
		</Card>
	);
};
