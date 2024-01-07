import { useSession, signOut } from 'next-auth/react'
import { Button } from './ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu';
import Link from 'next/link';

export default function Header() {
    const { data: session } = useSession();
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
                    <Button className='bg-blue-500 hover:bg-blue-600' onClick={() => signOut()}>Logout</Button>
                </div>

            </div>
        </header>
    );
}