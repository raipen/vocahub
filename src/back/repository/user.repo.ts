import { PrismaClient,SocialType } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = async ({name,socialId,socialType}:{name: string, socialId: string, socialType: SocialType}) => {
    return await prisma.user.create({
        data: {
            name,
            socialId,
            socialType
        }
    });
}

export const getUser = async (socialType: SocialType, socialId: string) => {
    return prisma.user.findFirst({
        where: {
            socialId,
            socialType
        }
    });
}

export const getUserById = async (uuid: string) => {
    return prisma.user.findUnique({
        where: {
            uuid
        }
    });
}

export const changeUserName = async (uuid: string, name: string) => {
    return prisma.user.update({
        where: {
            uuid
        },
        data: {
            name
        }
    });
}
