import { NotFoundError } from '@errors';
import * as WordbookDTO from '@DTO/wordbook.dto';
import * as WordbookRepo from '@repository/wordbook.repo';

export async function getWrodbookList({userId}: WordbookDTO.getWordbookListInterface['Body'])
: Promise<WordbookDTO.getWordbookListInterface['Reply']['200']> {
    const [nonHiddenWordbookList, hiddenWordbookList] = (await Promise.all([
        WordbookRepo.getNonHiddenWordbookList,
        WordbookRepo.getHiddenWordbookList
    ].map((getWordbookList) => getWordbookList(userId))))
    .map((wordbookList) => wordbookList.map((wordbook) => ({
        uuid: wordbook.uuid,
        title: wordbook.title,
        createdAt: wordbook.createdAt.toISOString(),
        isHidden: wordbook.isHidden,
        vocaCount: wordbook._count.voca
    })));
    return {
        wordbookList: nonHiddenWordbookList,
        hiddenWordbookList:hiddenWordbookList
    };
}

export async function createWordbook({userId, title}: WordbookDTO.createWordbookInterface['Body'])
: Promise<WordbookDTO.createWordbookInterface['Reply']['201']> {
    await WordbookRepo.createWordbook(userId, title);
    return getWrodbookList({userId});
}

export async function hideWordbook({userId, bookId}: WordbookDTO.hideWordbookInterface['Body'])
: Promise<WordbookDTO.hideWordbookInterface['Reply']['200']> {
    await WordbookRepo.hideWordbook(userId, bookId);
    return getWrodbookList({userId});
}

export async function showWordbook({userId, bookId}: WordbookDTO.showWordbookInterface['Body'])
: Promise<WordbookDTO.showWordbookInterface['Reply']['200']> {
    await WordbookRepo.showWordbook(userId, bookId);
    return getWrodbookList({userId});
}
