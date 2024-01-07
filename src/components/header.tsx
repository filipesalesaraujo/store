import { useSession, signOut } from 'next-auth/react'
import { Button } from './ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu';
import Link from 'next/link';
import { useCarrinho } from '@/context/carrinho-provider';
import { useEffect, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";

import CarrinhoDrawer from './carrinho-drawer';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './ui/menubar';

export default function Header() {
    const [botaoDestacado, setBotaoDestacado] = useState(false);
    const { data: session } = useSession();
    const { carrinho } = useCarrinho();
    const totalItens = carrinho.reduce((total, produto) => total + produto.quantidade, 0);

    useEffect(() => {
        if (totalItens > 0) {
            setBotaoDestacado(true);
            const timer = setTimeout(() => {
                setBotaoDestacado(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [totalItens]);

    return (
        <header className='flex justify-center items-center border-b-[1px] border-gray-200'>
            <div className='max-w-[1360px] w-full p-5 flex justify-between gap-5'>

                <NavigationMenu className='hidden lg:flex'>
                    <NavigationMenuList className='flex gap-5'>

                        <NavigationMenuItem >
                            <Link className='transition-colors hover:bg-blue-200 flex p-2 rounded-sm justify-center items-center' href='/cadastro-de-produtos'>Cadastro de Produtos</Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link className='transition-colors hover:bg-blue-200 flex p-2 rounded-sm justify-center items-center' href='/lista-de-produtos'>Lista de Produtos</Link>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>

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

                <div className='flex gap-5 items-center'>
                    <p className='hidden lg:flex'>Olá, <strong>{session?.user?.name}</strong></p>
                    <CarrinhoDrawer totalItens={totalItens} botaoDestacado={botaoDestacado} />
                    <Button className='bg-blue-500 hover:bg-blue-600' onClick={() => signOut()}>Logout</Button>
                </div>

            </div>
        </header>
    );
}