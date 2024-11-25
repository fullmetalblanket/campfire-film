// app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import bcrypt from 'bcryptjs'

const databaseName = process.env.MONGODB_DB;

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise, { databaseName }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Authorize function called');
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          const client = await clientPromise;
          const db = client.db(process.env.MONGODB_DB);
          
          // Check database connection
          await db.command({ ping: 1 });
          console.log("Connected successfully to database");
          console.log(`Using database: ${databaseName}`);
          console.log(`Using collection: users`);

          const trimmedEmail = credentials.email.trim().toLowerCase();
          console.log(`Searching for email: ${trimmedEmail}`);

          const user = await db.collection("users").findOne({ 
            email: { $regex: new RegExp(`^${trimmedEmail}$`, 'i') } 
          });
          
          if (!user || !user.password) {
            console.log(`No user found with email: ${trimmedEmail}`);
            // For debugging only, remove in production
            // const allUsers = await db.collection("users").find({}, { projection: { email: 1 } }).toArray();
            const allUsers = await db.collection("users").find({}).toArray();
            console.log("All user emails:", allUsers.map(u => u.email));
            throw new Error(`No user found with email: ${trimmedEmail} - all users: ${allUsers.length}`);
          }

          console.log("User found, attempting password comparison");

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }

          console.log(`Successful login for email: ${trimmedEmail}`);
          return { id: user._id.toString(), email: user.email, role: user.role };
        } catch (error) {
          console.error('Error in authorize function:', error);
          throw error; // Re-throw the error for NextAuth to handle
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: { signIn: '/auth/login' },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error: (code, metadata) => {
      console.error(code, metadata);
    },
    warn: (code) => {
      console.warn(code);
    },
    debug: (code, metadata) => {
      console.debug(code, metadata);
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };