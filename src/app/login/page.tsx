'use client';

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { signIn, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from '@/components/ui/alert';

// Definindo o componente Login.
export default function Login() {
	// Definindo o estado para armazenar o nome de usuário, senha e mensagem de erro.
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isEntrando, setIsEntrando] = useState(false);

	const router = useRouter();

	// Obtendo a sessão do usuário.
	const { data: session } = useSession();

	// Verificando se o usuário já está logado. Se estiver, redireciona para a página de lista de produtos.
	useEffect(() => {
		if (session) {
			router.push('/lista-de-produtos');
		}
	}, [session, router]);

	// Definindo a função para lidar com o envio do formulário.
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsEntrando(true);

		const result = await signIn('credentials', { username, password, redirect: false });

		// Adicione um atraso artificial de 2 segundos (2000 milissegundos)
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Verificando se ocorreu um erro durante o login.
		if (result && result.error) {
			setErrorMessage(result.error);
		} else {
			router.push('/');
		}
		setIsEntrando(false);

	};

	// Renderizando o formulário de login.
	return (
		<section className="flex items-center justify-center h-screen p-5 flex-col gap-5">
			<h1 className='text-3xl font-bold'>Store</h1>
			<Card className="w-full max-w-[350px] bg-white rounded-xl border-[1px]  ">
				<CardHeader>
					<CardTitle className="text-black">Login</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="flex flex-col gap-5" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
						<div className="flex flex-col gap-2.5">
							<Label htmlFor="username" className="text-black">Username</Label>
							<Input type="text" id="username" placeholder="" className="focus-visible:ring-transparent  rounded-xl text-black transition-colors focus:border-blue-300" value={username} onChange={(e) => setUsername(e.target.value)} />
						</div>
						<div className="flex flex-col gap-2.5">
							<Label htmlFor="password" className="text-black">Password</Label>
							<Input type="password" id="password" placeholder="" className="focus-visible:ring-transparent rounded-xl text-black transition-colors focus:border-blue-300" value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
						<Button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded-xl border-black" disabled={!username || !password || isEntrando}>
							{isEntrando ? 'Entrando...' : 'Sign in'}
						</Button>
						{errorMessage && <Alert variant="destructive" className='flex justify-center p-2'><AlertTitle className='m-0'>{errorMessage}</AlertTitle></Alert>}
					</form>
				</CardContent>
			</Card>
		</section>
	)
}