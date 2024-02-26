import { NotFoundError } from '@errors';
import * as Wordbook from '@DTO/wordbook.dto';
import * as WordbookRepo from '@repository/wordbook.repo';

export async function getWrodbookList({userId}: Wordbook.getWordbookListInterface['Body'])
: Promise<Wordbook.getWordbookListInterface['Reply']['200']> {
    const [nonHiddenWordbookList, hiddenWordbookList] = (await Promise.all([
        WordbookRepo.getNonHiddenWordbookList,
        WordbookRepo.getHiddenWordbookList
    ].map((getWordbookList) => getWordbookList(userId))))
    .map((wordbookList) => wordbookList.map((wordbook) => ({
        id: wordbook.id,
        title: wordbook.title,
        createdAt: wordbook.createdAt.toISOString(),
        isHidden: wordbook.isHidden,
        vocaCount: wordbook._count.voca
    })));
    return [nonHiddenWordbookList, hiddenWordbookList];
}

export async function createWordbook({userId, title}: Wordbook.createWordbookInterface['Body'])
: Promise<Wordbook.createWordbookInterface['Reply']['201']> {
    await WordbookRepo.createWordbook(userId, title);
    return getWrodbookList({userId});
}

export async function hideWordbook({userId, bookId}: Wordbook.hideWordbookInterface['Body'])
: Promise<Wordbook.hideWordbookInterface['Reply']['200']> {
    await WordbookRepo.hideWordbook(userId, bookId);
    return getWrodbookList({userId});
}

export async function showWordbook({userId, bookId}: Wordbook.showWordbookInterface['Body'])
: Promise<Wordbook.showWordbookInterface['Reply']['200']> {
    await WordbookRepo.showWordbook(userId, bookId);
    return getWrodbookList({userId});
}
