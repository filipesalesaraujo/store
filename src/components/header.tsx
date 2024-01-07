import { useSession, signOut } from 'next-auth/react'
import { Button } from './ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu';
import Link from 'next/link';
import { useCarrinho } from '@/context/carrinho-provider';
import { useEffect, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";

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

                <NavigationMenu>
                    <NavigationMenuList className='flex gap-5'>

                        <NavigationMenuItem >
                            <Link className='transition-colors hover:bg-blue-200 flex p-2 rounded-sm justify-center items-center' href='/cadastro-de-produtos'>Cadastro de Produtos</Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link className='transition-colors hover:bg-blue-200 flex p-2 rounded-sm justify-center items-center' href='/lista-de-produtos'>Lista de Produtos</Link>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>

                <div className='flex gap-5 items-center'>
                    <p>Olá, <strong>{session?.user?.name}</strong></p>
                    <Link href='/carrinho' className={`transition-colors flex  items-center gap-2 font-bold hover:text-blue-600 ${botaoDestacado ? 'text-green-500' : 'text-blue-500'}`}>
                        <FaShoppingCart />
                        <span>Carrinho: {totalItens} itens</span>
                    </Link>
                    <Button className='bg-blue-500 hover:bg-blue-600' onClick={() => signOut()}>Logout</Button>
                </div>

            </div>
        </header>
    );
}