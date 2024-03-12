import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getWordbook = async (wordbookId: string, userId: string) => await prisma.wordbook.findFirst({
    where: {
        uuid: wordbookId,
        userId
    }
});


const getWordbookList = (isHidden:boolean) => async (userId: string) => await prisma.wordbook.findMany({
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
    },
    orderBy: {
        createdAt: 'desc'
    }
});

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

const changeWordbookHidden = (isHidden:boolean) => async (userId: string, wordbookId: string) => {
    await prisma.wordbook.update({
        where: {
            uuid: wordbookId,
            userId
        },
        data: {
            isHidden
        }
    });
}

export const hideWordbook = changeWordbookHidden(true);
export const showWordbook = changeWordbookHidden(false);
