'use client';

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useRequireAuthentication } from '../utils/auth'

export default function Home() {
    const router = useRouter()
    const { isLoading, isUserAuthenticated } = useRequireAuthentication()

    useEffect(() => {
        if (!isLoading && !isUserAuthenticated) {
            router.push('/login')
        }
    }, [isLoading, isUserAuthenticated])

    return (
        <p></p>
    )
}