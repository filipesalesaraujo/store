import NextAuth, { RequestInternal, User } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

// Definindo as opções para a configuração do NextAuth.
const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
        CredentialsProvider({
            // Nome do provedor de autenticação.
            name: 'Credentials',
            // Campos de credenciais necessários para este provedor.
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            // Função para validar as credenciais do usuário.
            async authorize(credentials: Record<"username" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">): Promise<User | null> {
                // Definindo o usuário com base nas variáveis de ambiente.
                const user = {
                    id: process.env.USER_ID || '',
                    username: process.env.USER_USERNAME || '',
                    password: process.env.USER_PASSWORD || '',
                    name: process.env.USER_NAME || ''
                }

                // Verificando se as credenciais fornecidas correspondem às do usuário.
                // Se corresponderem, retorna o usuário. Se não, lança um erro.
                if (credentials && credentials.username === user.username && credentials.password === user.password) {
                    return user
                } else {
                    throw new Error("Nome de usuário ou senha inválidos")
                }
            }
        })
    ],
    // Definindo as rotas para as páginas de autenticação.
    pages: {
        signIn: '/login',
    },
    // Definindo funções de callback que são chamadas em vários pontos do ciclo de vida da autenticação.
    callbacks: {
        // Função para redirecionar o usuário após a autenticação.
				async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
					return url.startsWith('/login') ? '/lista-de-produtos' : url
			}
    },
    // Definindo o segredo para a sessão de autenticação.
    secret: process.env.NEXTAUTH_SECRET,
}

// Criando o manipulador NextAuth com as opções definidas.
const handler = NextAuth(options)

// Exportando o manipulador para ser usado como GET e POST.
export { handler as GET, handler as POST }