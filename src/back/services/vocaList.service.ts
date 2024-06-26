import { NotFoundError } from '@errors';
import * as VocaListDTO from '@DTO/vocaList.dto';
import * as VocaListRepo from '@repository/vocaList.repo';
import * as WordbookRepo from '@repository/wordbook.repo';

export async function getVocaList({userId}: VocaListDTO.getVocaListInterface['Body'], {bookId}: VocaListDTO.getVocaListInterface['Params'])
: Promise<VocaListDTO.getVocaListInterface['Reply']['200']> {
    const wordbook = await WordbookRepo.getWordbook(bookId, userId);
    if (!wordbook) {
        throw new NotFoundError('Wordbook not found');
    }
    const voca = (await VocaListRepo.getVocaList(bookId)).map(v => ({
        ...v,
        meaning: v.meaning.map(m => m.meaning)
    }));
    return {
        wordbook: {
            ...wordbook,
            createdAt: wordbook.createdAt.toISOString(),
        },
        voca
    };
}

export async function updateVocas({userId, bookId, voca}: VocaListDTO.saveVocaListInterface['Body'])
: Promise<VocaListDTO.saveVocaListInterface['Reply']['200']> {
    const wordbook = await WordbookRepo.getWordbook(bookId, userId);
    if (!wordbook) {
        throw new NotFoundError('Wordbook not found');
    }
    const orderdVoca = voca.map((v, i) => ({...v, order: i}));
    const checkCounts = await VocaListRepo.getCheckCounts(bookId);
    const vocaWithCheckCount = orderdVoca.map(v => ({
        ...v,
        id: v.id ?? undefined,
        checkCount: checkCounts.find(c => c.id === v.id)?.checkCount ?? 0
    }))
    await VocaListRepo.deleteVocas(bookId);
    await VocaListRepo.createVocas(bookId, vocaWithCheckCount);
    return (await VocaListRepo.getVocaList(bookId)).map(v => ({
        ...v,
        meaning: v.meaning.map(m => m.meaning)
    }));
}

export async function increaseCheckCount({vocaId, userId}: VocaListDTO.increaseCheckCountInterface['Body'])
{
    await VocaListRepo.increaseCheckCount(vocaId, userId);
}

export async function decreaseCheckCount({vocaId, userId}: VocaListDTO.decreaseCheckCountInterface['Body'])
{
    await VocaListRepo.decreaseCheckCount(vocaId, userId);
}

export async function deleteVoca({userId}: VocaListDTO.deleteVocaInterface['Body'], {vocaId}: VocaListDTO.deleteVocaInterface['Params'])
{
    await VocaListRepo.deleteVoca(vocaId, userId);
}
