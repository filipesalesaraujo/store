'use client';

import { useCarrinho } from "@/context/carrinho-provider";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { TbMoodEmpty } from "react-icons/tb";

const Carrinho = () => {
    const { carrinho, increaseQuantity, decreaseQuantity, removerDoCarrinho } = useCarrinho();

    const total = carrinho ? carrinho.reduce((total, item) => {
        const preco = Number(String(item.preco).replace(/\./g, '').replace(',', '.'));
        const quantidade = Number(item.quantidade);
        return total + preco * quantidade;
    }, 0) : 0;

    const totalFormatado = total.toLocaleString('pt-BR');

    const handleIncrease = (item: any) => {
        increaseQuantity(item);
    };

    const handleDecrease = (item: any) => {
        if (item.quantidade > 1) {
            decreaseQuantity(item);
        }
    };

    const handleRemove = (item: any) => {
        removerDoCarrinho(item);
    };

    return (
        <section className='flex justify-center items-center'>
            <div className='max-w-[1360px] w-full p-5 flex justify-between gap-5 flex-wrap'>
                {carrinho.length === 0 ? (
                    <div className="flex justify-center items-center flex-col w-full">
                        <TbMoodEmpty size={50} />
                        <p className="text-xl">Seu carrinho está vazio.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Produto</TableHead>
                                <TableHead>Descrição</TableHead>
                                <TableHead>Quantidade</TableHead>
                                <TableHead className="text-right">Preço</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {carrinho.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.nome}</TableCell>
                                    <TableCell className="max-w-[400px]">{item.descricao}</TableCell>
                                    <TableCell className="flex gap-2 items-center">
                                        <Button variant="ghost" onClick={() => handleDecrease(item)}> - </Button>
                                        {item.quantidade}
                                        <Button variant="ghost" onClick={() => handleIncrease(item)}> + </Button>
                                    </TableCell>
                                    <TableCell className="text-right">R$ {item.preco}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="destructive" onClick={() => handleRemove(item)}> Remover </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4}></TableCell>
                                <TableCell className="text-right"><strong>Total:</strong> R$ {totalFormatado}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                )}
            </div>
        </section>
    );
};

export default Carrinho;