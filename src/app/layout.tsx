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
		<html lang="pt-br">
			<head>
				<title>Store</title>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="A melhor loja online para suas necessidades de compras" />
				<meta name="keywords" content="loja, ecommerce, produtos, online" />
				<meta property="og:title" content="Loja Online" />
				<meta property="og:description" content="A melhor loja online para suas necessidades de compras" />
				<meta name="twitter:card" content="summary_large_image" />
				<link rel="icon" href="/favicon.ico" />
			</head>
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