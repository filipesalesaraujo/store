'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useRequireAuthentication } from '@/utils/auth'

import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '@/utils/firebase';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function CadastroDeProdutos() {
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState(null);
    const [nomeError, setNomeError] = useState('');
    const [descricaoError, setDescricaoError] = useState('');
    const [precoError, setPrecoError] = useState('');
    const [imagemError, setImagemError] = useState('');

    const router = useRouter();

    const { isLoading, isUserAuthenticated } = useRequireAuthentication()

    useEffect(() => {
        if (!isLoading && !isUserAuthenticated) {
            router.push('/login')
        }
    }, [isLoading, isUserAuthenticated])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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

        if (!nome || !descricao || !preco || !imagem) {
            return;
        }

        setIsLoadingButton(true);


        const storage = getStorage(app);
        const imagemRef = imagem ? ref(storage, `imagens/${(imagem as File).name}`) : null;
        let url = '';

        if (imagemRef) {
            if (imagemRef && imagem) {
                await uploadBytes(imagemRef, imagem);
                url = await getDownloadURL(imagemRef);
            }
        }

        const db = getFirestore(app);
        const docRef = await addDoc(collection(db, "produtos"), {
            nome: nome,
            descricao: descricao,
            preco: preco,
            imagemUrl: url
        });

        setIsLoadingButton(false);

        router.push('/lista-de-produtos');

    };

    const handlePrecoChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d)(\d{2})$/, "$1,$2");
        value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
        setPreco(value);
    }

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        const MAX_SIZE = 2 * 1024 * 1024; // 2MB

        if (file.type.split('/')[0] !== 'image') {
            setImagemError('O arquivo deve ser uma imagem');
        } else if (file.size > MAX_SIZE) {
            setImagemError('O arquivo é muito grande');
        } else {
            setImagemError('');
        }
    }

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