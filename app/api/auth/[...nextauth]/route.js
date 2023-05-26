import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
// import User from '@/models/user'
// import { connectToDB } from "@/utils/database";

let handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, //1day
        updateAge: 60 * 60 //1hour
      },
      name: "Credentials",
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials

        if (email === 'john@gmail.com' || password === '1234') {
          return { id: '1234', name: 'john', email: 'john@gmail.com', data: 'extra' };
        }

        return null;
      }
    })
  ],
  // pages: {
  //   signIn: '/signin'
  // },
  callbacks: {
    session({ session, token }) {
      // const sessionUser = await User.findOne({
      //   email: session.user.email
      // })
      console.log('session', session);
      if (token) {
        session.id = token.id
      }

      return session;
    },

    // async signIn({ profile }) {
    //   try {
    //     await connectToDB()
    //     //check if a user already exists
    //     const userExists = await User.findOne({
    //       email: profile.email
    //     })
    //     //create new user
    //     if (!userExists) {
    //       await User.create({
    //         email: profile.email,
    //         username: profile.name.toLowerCase(),
    //         image: profile.picture
    //       })
    //     }

    //     return true
    //   } catch (error) {
    //     console.log(error);
    //     return false
    //   }
    // },
    jwt({ token, user }) {
      //first time jwt callback execute, use is available
      console.log('jwt', token, user);
      if (user) {
        token.name = user.name
      }

      return token
    }
  },
  // secret: 'test',
  // jwt: {
  //   maxAge: 60 * 60 * 24 * 30,
  //   async encode() { },
  //   async decode() { }
  // },
  // pages: {
  //   signIn: '/signin'
  // },
  // session: {
  //   strategy: 'jwt'
  // }
})

export { handler as GET, handler as POST }