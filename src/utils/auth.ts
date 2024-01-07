// utils/auth.ts
import { useSession } from 'next-auth/react'

export function useRequireAuthentication() {
    const { data: session, status } = useSession()
    const isLoading = status === 'loading'
    const isUserAuthenticated = !!session

    return { isLoading, isUserAuthenticated }
}