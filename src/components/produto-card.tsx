// Importa as dependências necessárias
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ProdutoCardProps } from '@/types/produto';

// Define o componente ProdutoCard
export default function ProdutoCard({ produto, adicionarAoCarrinho, produtoNoCarrinho }: ProdutoCardProps) {
	const isProdutoNoCarrinho = produtoNoCarrinho(produto);


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
				{isProdutoNoCarrinho ? (
					<Button className='bg-gray-500 cursor-not-allowed' disabled>
						Produto Adicionado
					</Button>
				) : (
					<Button className='bg-blue-500 hover:bg-blue-600' onClick={() => adicionarAoCarrinho(produto, 1)}>
						Adicionar ao carrinho
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};