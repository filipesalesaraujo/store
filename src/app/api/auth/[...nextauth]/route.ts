import NextAuth, { RequestInternal, User } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"username" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">): Promise<User | null> {
        const user = { 
          id: process.env.USER_ID || '', 
          username: process.env.USER_USERNAME || '', 
          password: process.env.USER_PASSWORD || '', 
          name: process.env.USER_NAME || '' 
        }

        if (credentials && credentials.username === user.username && credentials.password === user.password) {
          return user
        } else {
          throw new Error("Nome de usuário ou senha inválidos")
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      return baseUrl
    }
  },
  secret: process.env.SECRET,
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }