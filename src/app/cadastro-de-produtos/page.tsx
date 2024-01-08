'use client';

// Importando as funções e tipos necessários das bibliotecas React, Next.js e Firebase.
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAuthentication } from '@/utils/auth'
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '@/utils/firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Componente para o cadastro de produtos.
export default function CadastroDeProdutos() {
	// Definindo o estado para cada campo do formulário e para os erros.
	const [isLoadingButton, setIsLoadingButton] = useState(false);
	const [nome, setNome] = useState('');
	const [descricao, setDescricao] = useState('');
	const [preco, setPreco] = useState('');
	const [imagem, setImagem] = useState(null);
	const [nomeError, setNomeError] = useState('');
	const [descricaoError, setDescricaoError] = useState('');
	const [precoError, setPrecoError] = useState('');
	const [imagemError, setImagemError] = useState('');

	// Usando o hook useRouter para redirecionar o usuário.
	const router = useRouter();

	// Verificando se o usuário está autenticado.
	const { isLoading, isUserAuthenticated } = useRequireAuthentication()

	// Se o usuário não estiver autenticado, redireciona para a página de login.
	useEffect(() => {
		if (!isLoading && !isUserAuthenticated) {
			router.push('/login')
		}
	}, [isLoading, isUserAuthenticated, router])

	// Função para lidar com o envio do formulário.
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Validando os campos do formulário.
		if (!nome) {
			setNomeError('Nome é obrigatório');
		}

		if (!descricao) {
			setDescricaoError('Descrição é obrigatória');
		}

		if (!preco) {
			setPrecoError('Preço é obrigatório');
		}

		if (!imagem) {
			setImagemError('Imagem é obrigatória');
		}

		// Se algum campo estiver vazio, retorna e não continua com o envio.
		if (!nome || !descricao || !preco || !imagem) {
			return;
		}

		setIsLoadingButton(true);

		// Fazendo upload da imagem para o Firebase Storage e obtendo a URL de download.
		const storage = getStorage(app);
		const imagemRef = imagem ? ref(storage, `imagens/${(imagem as File).name}`) : null;
		let url = '';

		if (imagemRef) {
			if (imagemRef && imagem) {
				await uploadBytes(imagemRef, imagem);
				url = await getDownloadURL(imagemRef);
			}
		}

		// Adicionando o produto ao Firebase Firestore.
		const db = getFirestore(app);
		const produtosCollection = collection(db, "produtos");

		// Cria um novo documento com um ID gerado automaticamente
		const novoProdutoDoc = doc(produtosCollection);

		// Agora você pode usar novoProdutoDoc.id como o ID do novo produto
		const novoProduto = {
			id: novoProdutoDoc.id,
			nome: nome,
			descricao: descricao,
			preco: preco,
			imagemUrl: url
		};

		// Adiciona o novo produto ao Firestore
		await setDoc(novoProdutoDoc, novoProduto);

		setIsLoadingButton(false);

		// Redirecionando para a lista de produtos.
		router.push('/lista-de-produtos');

	};

	// Função para lidar com a mudança no campo de preço.
	const handlePrecoChange = (e: ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		value = value.replace(/\D/g, "");
		value = value.replace(/(\d)(\d{2})$/, "$1,$2");
		value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
		setPreco(value);
	}

	// Função para lidar com a mudança no campo de imagem.
	const handleImageChange = (event: any) => {
		const file = event.target.files[0];
		const MAX_SIZE = 2 * 1024 * 1024; // 2MB
		const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/webp'];

		// Validando o tamanho e o tipo da imagem.
		if (file.size > MAX_SIZE) {
			setImagemError('O tamanho do arquivo é muito grande. O tamanho máximo permitido é 2MB.');
			return;
		}

		if (!validImageTypes.includes(file.type)) {
			setImagemError('Tipo de arquivo inválido. Apenas imagens (gif, jpeg, png, webp) são permitidas.');
			return;
		}

		setImagem(file);
		setImagemError('');
	};

	// Renderizando o formulário.
	return (
		<section className='flex justify-center items-center'>
			<div className='max-w-[1360px] w-full p-5 flex justify-between gap-5'>
				<form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full'>

					<div className='flex flex-col gap-2'>
						<Label htmlFor="nome" className="text-black">Nome</Label>
						<Input className='focus-visible:ring-transparent focus:border-blue-500 transition-colors border-black' type="text" value={nome} onChange={(e) => { setNome(e.target.value); setNomeError(''); }} />
						{nomeError && <p className="text-red-500">{nomeError}</p>}
					</div>

					<div className='flex flex-col gap-2'>
						<Label htmlFor="descricao" className="text-black">Descrição</Label>
						<Textarea className='focus-visible:ring-transparent focus:border-blue-500 transition-colors border-black' value={descricao} onChange={(e) => { setDescricao(e.target.value); setDescricaoError(''); }} />
						{descricaoError && <p className="text-red-500">{descricaoError}</p>}
					</div>

					<div className='flex flex-col gap-2'>
						<Label htmlFor="preco" className="text-black">Preço</Label>
						<Input className='focus-visible:ring-transparent focus:border-blue-500 transition-colors border-black' type="text" value={preco} onChange={handlePrecoChange} />
						{precoError && <p className="text-red-500">{precoError}</p>}
					</div>

					<div className='flex flex-col gap-2'>
						<Label htmlFor="imagem" className="text-black">Imagem</Label>
						<Input className='focus-visible:ring-transparent focus:border-blue-500 transition-colors border-black' type="file" onChange={handleImageChange} />
						{imagemError && <p className="text-red-500">{imagemError}</p>}
					</div>

					<Button className='bg-blue-500 hover:bg-blue-600' type="submit" disabled={isLoadingButton}>
						{isLoadingButton ? 'Cadastrando...' : 'Cadastrar produto'}
					</Button>

				</form>
			</div>
		</section>
	);
}