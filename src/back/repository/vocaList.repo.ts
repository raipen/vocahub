import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getVocaList = async (bookId: string) => await prisma.voca.findMany({
    where: {
        wordbookId: bookId,
    },
    include: {
        meaning: {
            select: {
                meaning: true
            }
        }
    }
});

export const deleteVocas = async (bookId: string) => await prisma.voca.deleteMany({
    where: {
        wordbookId: bookId
    }
});

export const getCheckCounts = async (bookId: string) => await prisma.voca.findMany({
    where: {
        wordbookId: bookId
    },
    select: {
        id: true,
        checkCount: true
    }
});

/**
 * 
 * @param bookId 
 * @param voca should be ordered by order
 */
export const createVocas = async (bookId: string, voca: {
    id?: number,
    word: string,
    meaning: string[],
    order: number,
    checkCount: number
}[]) => {
    await prisma.voca.createMany({
        data: voca.map(v => ({
            id: v.id,
            word: v.word,
            order: v.order,
            wordbookId: bookId,
            checkCount: v.checkCount,
        }))
    });
    const vocaInDB = await prisma.voca.findMany({
        where: {
            wordbookId: bookId
        },
        orderBy: {
            order: 'asc'
        }
    });
    const meaning = voca.flatMap(({meaning},i) => meaning.map(m => ({
        meaning: m,
        vocaId: vocaInDB[i].id,
    })));
    await prisma.meaning.createMany({
        data: meaning
    });
}

const updateCheckCount = (increaseOrDecrease: 'increase' | 'decrease') => async (vocaId: number, userId: string) => {
    const vocaUser = await prisma.voca.findFirst({
        where: {
            id: vocaId,
        }
    }).wordbook().user();
    if (!vocaUser) {
        throw new Error('Not found');
    }
    if (vocaUser.uuid !== userId) {
        throw new Error('Not authorized');
    }
    await prisma.voca.update({
        where: {
            id: vocaId
        },
        data: {
            checkCount: {
                [increaseOrDecrease === 'increase' ? 'increment' : 'decrement']: 1
            }
        }
    });
}

export const increaseCheckCount = updateCheckCount('increase');
export const decreaseCheckCount = updateCheckCount('decrease');

export const deleteVoca = async (vocaId: number, userId: string) => {
    const vocaUser = await prisma.voca.findFirst({
        where: {
            id: vocaId,
        }
    }).wordbook().user();
    if (!vocaUser) {
        throw new Error('Not found');
    }
    if (vocaUser.uuid !== userId) {
        throw new Error('Not authorized');
    }
    await prisma.voca.delete({
        where: {
            id: vocaId
        }
    });
}
