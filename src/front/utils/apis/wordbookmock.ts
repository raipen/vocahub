const data = {
  user: [
    { id: 1, name: "user1", password: "1234" },
    { id: 2, name: "user2", password: "1234" },
  ],
  wordbook: [
    { id: 1, userId: 1, title: "wordbook1", createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 72 + 1000 * 60 * 60 * 9).toISOString(), isHidden: false },
    { id: 2, userId: 1, title: "wordbook2", createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 + 1000 * 60 * 60 * 9).toISOString(), isHidden: false },
    { id: 3, userId: 1, title: "wordbook3", createdAt: new Date(new Date().getTime() - 1000 * 60 * 10 + 1000 * 60 * 60 * 9).toISOString(), isHidden: false },
    { id: 4, userId: 2, title: "day1", createdAt: new Date(new Date().getTime() - 1000 * 60 * 5).toISOString(), isHidden: false },
    { id: 5, userId: 2, title: "day2", createdAt: new Date(new Date().getTime() - 1000 * 60 * 2).toISOString(), isHidden: false },
    { id: 6, userId: 2, title: "day3", createdAt: new Date(new Date().getTime() - 1000 * 60).toISOString(), isHidden: false },
  ],
  voca: [
    { id: 1, bookId: 1, word: "apple", meaning: ["사과"], checkCount: 0, testResult: null as null | boolean, order: 1 },
    { id: 2, bookId: 1, word: "banana", meaning: ["바나나"], checkCount: 0, testResult: null, order: 2 },
    { id: 3, bookId: 1, word: "cherry", meaning: ["체리"], checkCount: 0, testResult: null, order: 3 },
    { id: 4, bookId: 2, word: "dog", meaning: ["개"], checkCount: 0, testResult: null, order: 1 },
    { id: 5, bookId: 2, word: "elephant", meaning: ["코끼리"], checkCount: 0, testResult: null, order: 2 },
    { id: 6, bookId: 2, word: "fox", meaning: ["여우"], checkCount: 0, testResult: null, order: 3 },
    { id: 7, bookId: 3, word: "grape", meaning: ["포도"], checkCount: 0, testResult: null, order: 1 },
    { id: 8, bookId: 3, word: "honey", meaning: ["꿀", "테스트", "테스트2"], checkCount: 0, testResult: null, order: 2 },
    { id: 9, bookId: 3, word: "icecream", meaning: ["아이스크림", "테스트"], checkCount: 0, testResult: null, order: 3 },
  ]
}


const awaitOneSecond = () => new Promise<void>((resolve) => setTimeout(resolve, 1000));

export const getDatasWhenWordbookRender = async (accessToken: string): Promise<[Awaited<ReturnType<typeof getProfile>>, Awaited<ReturnType<typeof getWordbookList>>]> => {
  const [profile, wordbooks] = await Promise.all([getProfile(accessToken), getWordbookList(accessToken)]);
  return [profile, wordbooks]
}

export const getProfile = async (accessToken: string) => {
  await awaitOneSecond();
  const wordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && !wordbook.isHidden);
  const vocaCount = data.voca.filter((voca) => wordbook.some((wordbook) => wordbook.id === voca.bookId)).length;
  const loginDate = Array.from({ length: 70 },
    (_, i) => new Date(new Date().getTime() + 1000 * 60 * 60 * 9 - 1000 * 60 * 60 * 24 * i).toISOString().slice(0, 10))
    .map((date) => ({ date: date.slice(0, 10), count: wordbook.filter((wordbook) => wordbook.createdAt.slice(0, 10) === date).length }));
  return {
    name: "user1",
    wordbookCount: wordbook.length,
    vocaCount: vocaCount,
    loginDate: loginDate
  }
}

type wordbookList = (Omit<typeof data.wordbook[0],"userId"> & { vocaCount: number })[];
type wordbookApiReply = {wordbookList:wordbookList, hiddenWordbookList:wordbookList};

export const getWordbookList = async (accessToken: string) => {
  const wordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && !wordbook.isHidden);
  const hiddenWordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && wordbook.isHidden);
  return {
    wordbookList:wordbook
    .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
    .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length })),
    hiddenWordbookList: hiddenWordbook
    .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
    .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length }))
  }
};

export const addWordbook = async (accessToken: string, title: string) => {
  await awaitOneSecond();
  data.wordbook.push({ id: data.wordbook.length + 1, userId: 1, title: title, createdAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString(), isHidden: false });
  const wordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && !wordbook.isHidden);
  const hiddenWordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && wordbook.isHidden);
  return {
    wordbookList:wordbook
    .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
    .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length })),
    hiddenWordbookList: hiddenWordbook
    .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
    .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length }))
  }
};

export const getVocaList = async (accessToken: string, bookId: number) => {
  await awaitOneSecond();
  if (isNaN(bookId)) throw new Error("bookId is undefined");
  const wordbook = data.wordbook.find((wordbook) => wordbook.id === bookId);
  if (wordbook === undefined) throw new Error("wordbook not found");
  if (wordbook.userId !== 1) throw new Error("permission denied");
  return {
    wordbook: wordbook,
    voca: data.voca.filter((voca) => voca.bookId === bookId).map(e=>({...e})).sort((a, b) => a.order - b.order)
  };
};

export const saveVocaList = async (accessToken: string, bookId: number, words: { id: number | null, word: string, meaning: string[] }[]) => {
  await awaitOneSecond();
  const wordbook = data.wordbook.find((wordbook) => wordbook.id === bookId);
  if (wordbook === undefined) throw new Error("wordbook not found");
  if (wordbook.userId !== 1) throw new Error("permission denied");
  words.forEach((word, index) => {
    if (word.id === null) {
      data.voca.push({
        id: data.voca.length + 1,
        bookId: bookId,
        word: word.word,
        meaning: word.meaning,
        checkCount: 0,
        testResult: null,
        order: index + 1
      });
    }
    else {
      const voca = data.voca.find((voca) => voca.id === word.id);
      if (voca === undefined) throw new Error("voca not found");
      if (voca.bookId !== bookId) throw new Error("permission denied");
      voca.word = word.word;
      voca.meaning = [...word.meaning];
      voca.order = index + 1;
    }
  });
  return data.voca.filter((voca) => voca.bookId === bookId).map(e=>({...e})).sort((a, b) => a.order - b.order);
};

export const increaseCheckCount = async (accessToken: string, vocaId: number) => {
  await awaitOneSecond();
  const voca = data.voca.find((voca) => voca.id === vocaId);
  if (voca === undefined) throw new Error("voca not found");
  if (data.wordbook.some((wordbook) => wordbook.id === voca.bookId && wordbook.userId !== 1)) throw new Error("permission denied")
  if (voca.checkCount === 5) throw new Error("check count is already 5")
  voca.checkCount++;
};

export const decreaseCheckCount = async (accessToken: string, vocaId: number) => {
  await awaitOneSecond();
  const voca = data.voca.find((voca) => voca.id === vocaId);
  if (voca === undefined) throw new Error("voca not found")
  if (data.wordbook.some((wordbook) => wordbook.id === voca.bookId && wordbook.userId !== 1)) throw new Error("permission denied")
  if (voca.checkCount === 0) throw new Error("check count is already 0")
  voca.checkCount--;
};

export const deleteVoca = async (accessToken: string, vocaId: number) => {
  await awaitOneSecond();
  const index = data.voca.findIndex((voca) => voca.id === vocaId);
  if (index === -1) throw new Error("voca not found")
  const voca = data.voca[index];
  if (data.wordbook.some((wordbook) => wordbook.id === voca.bookId && wordbook.userId !== 1)) throw new Error("permission denied")
  data.voca.splice(index, 1);
};

export const hideWordbook = async (accessToken: string, bookId: number) => {
  await awaitOneSecond();
  const index = data.wordbook.findIndex((wordbook) => wordbook.id === bookId);
  if (index === -1) throw new Error("wordbook not found")
  if (data.wordbook[index].userId !== 1) throw new Error("permission denied")
  data.wordbook[index].isHidden = true;
  const wordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && !wordbook.isHidden);
  const hiddenWordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && wordbook.isHidden);
  return {
    wordbookList:wordbook
    .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
    .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length })),
    hiddenWordbookList: hiddenWordbook
    .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
    .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length }))
  }
}

export const showWordbook = async (accessToken: string, bookId: number) => {
  await awaitOneSecond();
      const index = data.wordbook.findIndex((wordbook) => wordbook.id === bookId);
      if (index === -1) throw new Error("wordbook not found")
      if (data.wordbook[index].userId !== 1) throw new Error("permission denied")
      data.wordbook[index].isHidden = false;
      const wordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && !wordbook.isHidden);
      const hiddenWordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && wordbook.isHidden);
      return {
        wordbookList:wordbook
        .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length })),
        hiddenWordbookList: hiddenWordbook
        .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length }))
      }
}

export const saveResult = async (accessToken: string, bookId: number, testResult: { id: number, result: boolean }[]) => {
  await awaitOneSecond();
  testResult.forEach((result) => {
    const voca = data.voca.find((voca) => voca.id === result.id);
    if (voca === undefined) throw new Error("voca not found");
    if (data.wordbook.some((wordbook) => wordbook.id === voca.bookId && wordbook.userId !== 1)) throw new Error("permission denied")
    voca.testResult = result.result;
  });
}
