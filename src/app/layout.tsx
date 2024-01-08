'use client';

import { usePathname } from 'next/navigation';

import { Inter } from 'next/font/google'

import './globals.css'

import { SessionProvider } from 'next-auth/react'
import Header from '@/components/header';
import { CarrinhoProvider } from '@/context/carrinho-provider';

// Definindo a fonte Inter com o subconjunto 'latin'.
const inter = Inter({ subsets: ['latin'] })

// Definindo o componente RootLayout.
export default function RootLayout({ children, }: { children: React.ReactNode }) {
	// Obtendo o caminho atual.
	const pathname = usePathname();
	// Verificando se o cabeçalho deve ser mostrado. O cabeçalho não é mostrado na página de login.
	const showHeader = pathname !== '/login';

	// Renderizando o layout.
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
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className={inter.className}>
				{/* Fornecendo a sessão e o contexto do carrinho para os componentes filhos. */}
				<SessionProvider>
					<CarrinhoProvider>
						{/* Renderizando o cabeçalho se necessário. */}
						{showHeader && <Header />}
						{/* Renderizando os componentes filhos. */}
						{children}
					</CarrinhoProvider>
				</SessionProvider>
			</body>
		</html>
	)
}