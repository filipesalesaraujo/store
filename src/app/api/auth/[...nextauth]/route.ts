import NextAuth, { RequestInternal } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"username" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) {
        console.log('Credentials:', credentials);
        const user = { id: "1", username: "jsmith", password: "securepassword", name: "J Smith" }

        if (credentials && credentials.username === user.username && credentials.password === user.password) {
          console.log('User found:', user);
          return user
        } else {
          console.log('User not found or invalid credentials');
          throw new Error("Invalid username or password")
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