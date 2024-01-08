import { useState } from "react";

import { TbMoodEmpty } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";

import { Button } from "@/components/ui/button"
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { useCarrinho } from "@/context/carrinho-provider";

import { Produto } from "@/types/produto";

// Definindo o componente CarrinhoDrawer.
export default function CarrinhoDrawer({ totalItens, botaoDestacado }: { totalItens: number, botaoDestacado: boolean }) {
	// Usando o hook useState para gerenciar o estado de abertura/fechamento do carrinho.
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	// Usando o hook useCarrinho para acessar o estado do carrinho e as funções para manipulá-lo.
	const { carrinho, increaseQuantity, decreaseQuantity, removerDoCarrinho } = useCarrinho();

	// Função para abrir a gaveta do carrinho.
	const handleOpenDrawer = () => {
		setIsDrawerOpen(true);
	};

	// Calculando o total do carrinho.
	const total = carrinho ? carrinho.reduce((total, item) => {
		const preco = Number(String(item.preco).replace(/\./g, '').replace(',', '.'));
		const quantidade = Number(item.quantidade);
		return total + preco * quantidade;
	}, 0) : 0;

	// Formatando o total para o formato brasileiro.
	const totalFormatado = total.toLocaleString('pt-BR');

	// Função para aumentar a quantidade de um item no carrinho.
	const handleIncrease = (item: Produto) => {
		increaseQuantity(item);
	};

	// Função para diminuir a quantidade de um item no carrinho.
	const handleDecrease = (item: Produto) => {
		if (item.quantidade > 1) {
			decreaseQuantity(item);
		}
	};

	// Função para remover um item do carrinho.
	const handleRemove = (item: Produto) => {
		removerDoCarrinho(item);
	};

	// O componente retorna um Drawer, que é um tipo de modal que desliza da borda da tela.
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<button onClick={handleOpenDrawer} className={`transition-colors flex  items-center gap-2 font-bold hover:text-blue-600 p-2 ${botaoDestacado ? ' rounded-md bg-green-500 text-white' : 'text-blue-500'}`}>
					<FaShoppingCart />
					<span className="flex gap-1"><span className='hidden lg:flex'>Carrinho:</span> {totalItens} itens</span>
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<section className='flex justify-center items-center'>
					<div className='max-w-[1360px] w-full px-5 flex justify-between flex-wrap'>
						<div className="flex justify-between w-full max-w-full">
							<DrawerTitle>Carrinho</DrawerTitle>
							<DrawerClose asChild>
								<Button variant="outline">Fechar</Button>
							</DrawerClose>
						</div>
						{/* Se o carrinho estiver vazio, mostra uma mensagem informando isso. */}
						{carrinho.length === 0 ? (
							<div className="flex justify-center items-center flex-col w-full pb-5">
								<TbMoodEmpty size={50} />
								<p className="text-xl">Seu carrinho está vazio.</p>
							</div>
						) : (
							<>
								{/* Se o carrinho não estiver vazio, mostra uma tabela com os itens do carrinho. */}
								<Table className="lg:table hidden">
									<TableHeader>
										<TableRow>
											<TableHead>Produto</TableHead>
											<TableHead>Quantidade</TableHead>
											<TableHead className="text-right">Preço</TableHead>
											<TableHead></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{/* Para cada item no carrinho, cria uma linha na tabela com o nome do produto, a quantidade e o preço. */}
										{carrinho.map((item, index) => (
											<TableRow key={index}>
												<TableCell className="font-medium">{item.nome}</TableCell>
												<TableCell className="flex gap-2 items-center">
													<Button variant="ghost" onClick={() => handleDecrease(item as Produto)}> - </Button>
													{item.quantidade}
													<Button variant="ghost" onClick={() => handleIncrease(item as Produto)}> + </Button>
												</TableCell>
												<TableCell className="text-right">R$ {item.preco}</TableCell>
												<TableCell className="text-right">
													<Button variant="destructive" onClick={() => handleRemove(item as Produto)}> Remover </Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
									<TableFooter>
										<TableRow>
											<TableCell colSpan={3}></TableCell>
											{/* Mostra o total do carrinho. */}
											<TableCell className="text-right"><strong>Total:</strong> R$ {totalFormatado}</TableCell>
										</TableRow>
									</TableFooter>
								</Table>
								{/* A mesma tabela, mas em um formato responsivo para telas menores. */}
								<div className="lg:hidden flex flex-col gap-5 max-w-full w-full">
									{carrinho.map((item, index) => (
										<div key={index} className="flex flex-col gap-2">
											<div className="font-medium">{item.nome}</div>
											<div className="flex gap-2 items-center">
												<Button className="bg-red-500 hover:bg-red-600" onClick={() => handleDecrease(item as Produto)}> - </Button>
												{item.quantidade}
												<Button className="bg-green-500 hover:bg-green-600" onClick={() => handleIncrease(item as Produto)}> + </Button>
											</div>
											<div className="">R$ {item.preco}</div>
											<Button variant="destructive" onClick={() => handleRemove(item as Produto)}> Remover </Button>
										</div>
									))}
									<div className="text-right pb-5"><strong>Total:</strong> R$ {totalFormatado}</div>
								</div>
							</>
						)}
					</div>
				</section>
			</DrawerContent>
		</Drawer>
	)
};