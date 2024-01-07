'use client';

import { useRouter } from 'next/navigation'
import { useRequireAuthentication } from '@/utils/auth'

import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { app } from '@/utils/firebase';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCarrinho } from '@/context/carrinho-provider';
import { Produto } from '@/types/produto';

export default function ListaDeProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const { adicionarAoCarrinho } = useCarrinho();

    const router = useRouter()
    const { isLoading, isUserAuthenticated } = useRequireAuthentication()

    useEffect(() => {
        if (!isLoading && !isUserAuthenticated) {
            router.push('/login')
        }
    }, [isLoading, isUserAuthenticated])

    useEffect(() => {
        const fetchProdutos = async () => {
            const db = getFirestore(app);
            const produtosCollection = collection(db, 'produtos');
            const produtosSnapshot = await getDocs(produtosCollection);
            const produtosList = produtosSnapshot.docs.map(doc => doc.data() as Produto);
            setProdutos(produtosList);
        };

        fetchProdutos();
    }, []);

    return (
        <section className='flex justify-center items-center'>
            <div className='max-w-[1360px] w-full p-5 grid md:grid-cols-3 grid-cols-1 gap-5'>

                {produtos.map((produto, index) => (
                    <Card key={index} className='flex flex-col justify-between'>
                        <div>
                            <CardHeader>
                                <CardTitle>{produto.nome}</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-5'>
                                <Image width={500} height={500} src={produto.imagemUrl} alt={produto.nome} />
                                <CardDescription >{produto.descricao}</CardDescription>
                                <CardDescription><strong>Preço:</strong> R$ {produto.preco}</CardDescription>
                            </CardContent>
                        </div>
                        <CardFooter>
                            <Button className='bg-blue-500 hover:bg-blue-600' onClick={() => adicionarAoCarrinho(produto, 1)}>Adicionar ao carrinho</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}