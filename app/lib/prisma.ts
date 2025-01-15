// Import the Prisma Client which provides the database connection and operations
import { PrismaClient } from "@prisma/client";

// Define a singleton function that creates a new PrismaClient instance
// This ensures we don't create multiple database connections unnecessarily
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Type declaration for globalThis to include our Prisma instance
// This extends the global object type to include our prismaGlobal property
// ReturnType<typeof prismaClientSingleton> ensures type safety for the Prisma instance
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Create or reuse the Prisma instance
// The nullish coalescing operator (??) checks if an instance exists in globalThis
// If it doesn't exist, creates a new instance using prismaClientSingleton()
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Export the Prisma instance to be used throughout the application
export default prisma;

// In production environment only:
// Store the Prisma instance on the global object
// This prevents creating multiple instances during hot reloading in development
if (process.env.NODE_ENV === "production") globalThis.prismaGlobal = prisma;
