'use client';

import { Inter } from 'next/font/google'
import './globals.css'

import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation';
import Header from '@/components/header';
import { CarrinhoProvider } from '@/context/carrinho-provider';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const showHeader = pathname !== '/login';

	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionProvider>
					<CarrinhoProvider>
						{showHeader && <Header />}
						{children}
					</CarrinhoProvider>

				</SessionProvider>
			</body>
		</html>
	)
}