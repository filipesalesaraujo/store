// Importa o hook useSession do next-auth/react
import { useSession } from 'next-auth/react'

// Define o hook personalizado useRequireAuthentication
export function useRequireAuthentication() {
    // Usa o hook useSession para obter a sessão atual e o status da sessão
    const { data: session, status } = useSession()

    // Define isLoading como verdadeiro se o status da sessão for 'loading'
    const isLoading = status === 'loading'

    // Define isUserAuthenticated como verdadeiro se a sessão existir
    const isUserAuthenticated = !!session

    // Retorna um objeto com isLoading e isUserAuthenticated
    return { isLoading, isUserAuthenticated }
}