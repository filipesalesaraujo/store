import { useState } from "react";

import { TbMoodEmpty } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

import { Button } from "@/components/ui/button"
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { useCarrinho } from "@/context/carrinho-provider";

import { Produto } from "@/types/produto";

export default function CarrinhoDrawer({ totalItens, botaoDestacado }: { totalItens: number, botaoDestacado: boolean }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { carrinho, increaseQuantity, decreaseQuantity, removerDoCarrinho } = useCarrinho();

    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    const total = carrinho ? carrinho.reduce((total, item) => {
        const preco = Number(String(item.preco).replace(/\./g, '').replace(',', '.'));
        const quantidade = Number(item.quantidade);
        return total + preco * quantidade;
    }, 0) : 0;

    const totalFormatado = total.toLocaleString('pt-BR');

    const handleIncrease = (item: Produto) => {
        increaseQuantity(item);
    };

    const handleDecrease = (item: Produto) => {
        if (item.quantidade > 1) {
            decreaseQuantity(item);
        }
    };

    const handleRemove = (item: Produto) => {
        removerDoCarrinho(item);
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button onClick={handleOpenDrawer} className={`transition-colors flex  items-center gap-2 font-bold hover:text-blue-600 ${botaoDestacado ? 'text-green-500' : 'text-blue-500'}`}>
                    <FaShoppingCart />
                    <span className="flex gap-1"><span className='hidden lg:flex'>Carrinho:</span> {totalItens} itens</span>
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <section className='flex justify-center items-center'>
                    <div className='max-w-[1360px] w-full px-5 flex justify-between flex-wrap'>

                        <div className="flex justify-between w-full max-w-full">
                            <DrawerTitle>Carrinho</DrawerTitle>
                            <DrawerClose asChild>
                                <Button variant="outline">Fechar</Button>
                            </DrawerClose>
                        </div>

                        {carrinho.length === 0 ? (
                            <div className="flex justify-center items-center flex-col w-full pb-5">
                                <TbMoodEmpty size={50} />
                                <p className="text-xl">Seu carrinho está vazio.</p>
                            </div>
                        ) : (
                            <>
                                <Table className="lg:table hidden">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Produto</TableHead>
                                            <TableHead>Quantidade</TableHead>
                                            <TableHead className="text-right">Preço</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {carrinho.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="font-medium">{item.nome}</TableCell>
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
                                            <TableCell colSpan={3}></TableCell>
                                            <TableCell className="text-right"><strong>Total:</strong> R$ {totalFormatado}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                                <div className="lg:hidden flex flex-col gap-5 max-w-full w-full">
                                    {carrinho.map((item, index) => (
                                        <div key={index} className="flex flex-col gap-2">
                                            <div className="font-medium">{item.nome}</div>
                                            <div className="flex gap-2 items-center">
                                                <Button className="bg-red-500 hover:bg-red-600" onClick={() => handleDecrease(item)}> - </Button>
                                                {item.quantidade}
                                                <Button className="bg-green-500 hover:bg-green-600" onClick={() => handleIncrease(item)}> + </Button>
                                            </div>
                                            <div className="">R$ {item.preco}</div>
                                            <Button variant="destructive" onClick={() => handleRemove(item)}> Remover </Button>
                                        </div>
                                    ))}
                                    <div className="text-right pb-5"><strong>Total:</strong> R$ {totalFormatado}</div>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </DrawerContent>
        </Drawer>
    );
}