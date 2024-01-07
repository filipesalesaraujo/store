'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from '@/components/ui/alert';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            router.push('/lista-de-produtos');
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn('credentials', { username, password, redirect: false });

        if (result && result.error) {
            setErrorMessage(result.error);
        } else {
            router.push('/');
        }
    };

    return (
        <section className="flex items-center justify-center bg-black h-screen">
            <Card className="w-[350px] bg-white rounded-xl border-[1px] border-black">
                <CardHeader>
                    <CardTitle className="text-black">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2.5">
                            <Label htmlFor="username" className="text-black">Username</Label>
                            <Input type="text" id="username" placeholder="" className="focus-visible:ring-transparent border-black rounded-xl text-black transition-colors focus:border-blue-300" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <Label htmlFor="password" className="text-black">Password</Label>
                            <Input type="password" id="password" placeholder="" className="focus-visible:ring-transparent border-black rounded-xl text-black transition-colors focus:border-blue-300" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded-xl border-black" disabled={!username || !password}>Sign in</Button>
                        {errorMessage && <Alert variant="destructive" className='flex justify-center p-2'><AlertTitle className='m-0'>{errorMessage}</AlertTitle></Alert>}
                    </form>
                </CardContent>
            </Card>
        </section>
    )
}