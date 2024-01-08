'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useSession, signOut } from 'next-auth/react'

import { Button } from './ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './ui/menubar';

import { useCarrinho } from '@/context/carrinho-provider';

import CarrinhoDrawer from './carrinho-drawer';

// Define o componente Header
export default function Header() {
	// Define o estado para destacar o botão do carrinho quando há itens no carrinho
	const [botaoDestacado, setBotaoDestacado] = useState(false);
	// Usa a sessão do usuário
	const { data: session } = useSession();
	// Usa o carrinho do usuário
	const { carrinho } = useCarrinho();
	// Calcula o total de itens no carrinho
	const totalItens = carrinho.reduce((total, produto) => total + produto.quantidade, 0);

	// Efeito para destacar o botão do carrinho quando há itens no carrinho
	useEffect(() => {
		if (totalItens > 0) {
			setBotaoDestacado(true);
			const timer = setTimeout(() => {
				setBotaoDestacado(false);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [totalItens]);

	// Renderiza o cabeçalho
	return (
		<header className='flex justify-center items-center border-b-[1px] border-gray-200'>
			<div className='max-w-[1360px] w-full p-5 flex justify-between gap-5'>
				{/* Renderiza o menu de navegação */}
				<NavigationMenu className='hidden lg:flex'>
					<NavigationMenuList className='flex gap-5'>
						<NavigationMenuItem>
							<Link className='transition-colors hover:bg-blue-200 flex p-2 rounded-sm justify-center items-center' href='/lista-de-produtos'>Lista de Produtos</Link>
						</NavigationMenuItem>
						<NavigationMenuItem >
							<Link className='transition-colors hover:bg-blue-200 flex p-2 rounded-sm justify-center items-center' href='/cadastro-de-produtos'>Cadastro de Produtos</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				{/* Renderiza o menu para dispositivos móveis */}
				<Menubar className='flex lg:hidden'>
					<MenubarMenu>
						<MenubarTrigger>Menu</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								<Link className='transition-colors hover:bg-blue-200 flex p-2 rounded-sm justify-center items-center' href='/cadastro-de-produtos'>Cadastro de Produtos</Link>
							</MenubarItem>
							<MenubarItem>
								<Link className='transition-colors hover:bg-blue-200 flex p-2 rounded-sm justify-center items-center' href='/lista-de-produtos'>Lista de Produtos</Link>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
				{/* Renderiza a saudação ao usuário, o carrinho e o botão de logout */}
				<div className='flex gap-5 items-center'>
					<p className='hidden lg:flex gap-1'>Olá,<strong>{session?.user?.name}</strong></p>
					<CarrinhoDrawer totalItens={totalItens} botaoDestacado={botaoDestacado} />
					<Button className='bg-blue-500 hover:bg-blue-600' onClick={() => signOut()}>Logout</Button>
				</div>
			</div>
		</header>
	);
}