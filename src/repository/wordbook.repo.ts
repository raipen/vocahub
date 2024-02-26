import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getWordbookList = (isHidden:boolean) => async (userId: string) => {
    return await prisma.wordbook.findMany({
        where: {
            userId,
            isHidden
        },
        include: {
            _count: {
                select: {
                    voca: true
                }
            }
        }
    });
}

export const getNonHiddenWordbookList = getWordbookList(false);
export const getHiddenWordbookList = getWordbookList(true);
export const createWordbook = async (userId: string, title: string) => {
    await prisma.wordbook.create({
        data: {
            title,
            userId
        }
    });
}

const changeWordbookHidden = (isHidden:boolean) => async (userId: string, wordbookId: number) => {
    await prisma.wordbook.update({
        where: {
            id: wordbookId,
            userId
        },
        data: {
            isHidden
        }
    });
}

export const hideWordbook = changeWordbookHidden(true);
export const showWordbook = changeWordbookHidden(false);
