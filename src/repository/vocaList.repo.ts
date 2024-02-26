import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getVocaList = async (bookId: number) => await prisma.voca.findMany({
    where: {
        wordbookId: bookId
    }
});

export const updateVocas = async (bookId: number, voca: { id: number, word: string, meaning: string[], order: number }[]) => {
    const checkCounts = await prisma.voca.findMany({
        where: {
            wordbookId: bookId
        },
        select: {
            id: true,
            checkCount: true
        }
    });
    await prisma.voca.deleteMany({
        where: {
            wordbookId: bookId
        }
    });
    await prisma.voca.createMany({
        data: voca.map(v => ({
            id: v.id,
            word: v.word,
            meaning: v.meaning,
            order: v.order,
            wordbookId: bookId,
            checkCount: checkCounts.find(c => c.id === v.id)?.checkCount || 0
        }))
    });
}

export const createVocas = async (bookId: number, voca: { word: string, meaning: string[], order: number }[]) => {
    await prisma.voca.createMany({
        data: voca.map(v => ({
            word: v.word,
            meaning: v.meaning,
            order: v.order,
            wordbookId: bookId
        }))
    });
}

const updateCheckCount = (increaseOrDecrease: 'increase' | 'decrease') => async (vocaId: number) => {
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

export const deleteVoca = async (vocaId: number) => {
    await prisma.voca.delete({
        where: {
            id: vocaId
        }
    });
}
