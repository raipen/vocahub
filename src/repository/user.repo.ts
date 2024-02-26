import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = async (name: string, hashedPassword: string, salt: string) => {
    return await prisma.user.create({
        data: {
            name,
            password: hashedPassword,
            salt
        }
    });
}
export const getUser = async (name: string) => {
    return prisma.user.findUnique({
        where: {
            name
        }
    });
}
