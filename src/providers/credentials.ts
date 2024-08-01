import { User } from "@auth/express";
import Credentials from "@auth/express/providers/credentials";

const users: Record<string, { pwHash: string, user: User }> = {
  "user@test.com": {
    pwHash: "123abc",
    user: {
      id: "123",
      email: "user@test.com",
      name: "Test User",
    },
  },
};

const saltAndHashPassword = (password: string) => {
  //FIXME: Implement salt and hash password logic
  return password
};

const getUserFromDb = async (email: string, pwHash: string): Promise<User | null> => {
  //FIXME: Implement logic to get user from database
  return (users[email]?.pwHash === pwHash) ?  users[email].user : null;
};

const authorize = async (credentials: Partial<Record<"email" | "password", unknown>>, request: Request): Promise<User | null> => {
    let user = null

    // logic to salt and hash password
    const pwHash = saltAndHashPassword(credentials?.password as string)

    // logic to verify if the user exists
    user = await getUserFromDb(credentials?.email as string, pwHash)

    if (!user) {
      // No user found, so this is their first attempt to login
      // meaning this is also the place you could do registration
      // throw new Error("User not found.")
      return null;
    }

    // return user object with the their profile data
    return user
};

export default Credentials({
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  credentials: {
    email: {},
    password: {},
  },
  authorize,
});
