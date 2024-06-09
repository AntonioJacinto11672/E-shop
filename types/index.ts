import { User } from '@prisma/client';

export type safeUser = Omit<
    User, "createdAt" | "updateAt" | "emaiVerified" > & {
        createdAt: string;
        updateAt: string;
        emaiVerified: string | null
    }