'use client';

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useRequireAuthentication } from '../utils/auth'

// Definindo o componente Home.
export default function Home() {
	// Obtendo o objeto router para navegação.
	const router = useRouter()
	// Usando o hook useRequireAuthentication para verificar se o usuário está autenticado.
	const { isLoading, isUserAuthenticated } = useRequireAuthentication()

	// Usando o hook useEffect para redirecionar o usuário com base em sua autenticação.
	useEffect(() => {
		// Se não estiver carregando, então podemos verificar a autenticação do usuário.
		if (!isLoading) {
			// Se o usuário não estiver autenticado, redirecionamos para a página de login.
			if (!isUserAuthenticated) {
				router.push('/login')
			} else {
				// Se o usuário estiver autenticado, redirecionamos para a página de lista de produtos.
				router.push('/lista-de-produtos')
			}
		}
	}, [isLoading, isUserAuthenticated, router])

	// Renderizando o componente. Como este componente é apenas para redirecionamento, não temos nada para renderizar.
	return (
		<></>
	)
}