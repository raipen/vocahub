import { ExpiredAccessTokenError } from "@utils/errors";

const data = {
  user: [
    { id: 1, name: "user1", password: "1234" },
    { id: 2, name: "user2", password: "1234" },
  ],
  wordbook: [
    { id: 1, userId: 1, name: "wordbook1", createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 72 + 1000 * 60 * 60 * 9).toISOString(), isHidden: false },
    { id: 2, userId: 1, name: "wordbook2", createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 + 1000 * 60 * 60 * 9).toISOString(), isHidden: false },
    { id: 3, userId: 1, name: "wordbook3", createdAt: new Date(new Date().getTime() - 1000 * 60 * 10 + 1000 * 60 * 60 * 9).toISOString(), isHidden: false },
    { id: 4, userId: 2, name: "day1", createdAt: new Date(new Date().getTime() - 1000 * 60 * 5).toISOString(), isHidden: false },
    { id: 5, userId: 2, name: "day2", createdAt: new Date(new Date().getTime() - 1000 * 60 * 2).toISOString(), isHidden: false },
    { id: 6, userId: 2, name: "day3", createdAt: new Date(new Date().getTime() - 1000 * 60).toISOString(), isHidden: false },
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
export const getDatasWhenWordbookRender = async (accessToken: string): Promise<[Awaited<ReturnType<typeof getProfile>>, Awaited<ReturnType<typeof getWordbookList>>]> => {
  const [profile, wordbooks] = await Promise.all([getProfile(accessToken), getWordbookList(accessToken)]);
  return [profile, wordbooks]
}

export const getProfile = async (accessToken: string) => {
  return new Promise<{ name: string, wordbookCount: number, vocaCount: number, loginDate: { date: string, count: number }[] }>((resolve, reject) => {
    setTimeout(() => {
      const wordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && !wordbook.isHidden);
      const vocaCount = data.voca.filter((voca) => wordbook.some((wordbook) => wordbook.id === voca.bookId)).length;
      const loginDate = Array.from({ length: 70 },
        (_, i) => new Date(new Date().getTime() + 1000 * 60 * 60 * 9 - 1000 * 60 * 60 * 24 * i).toISOString().slice(0, 10))
        .map((date) => ({ date: date.slice(0, 10), count: wordbook.filter((wordbook) => wordbook.createdAt.slice(0, 10) === date).length }));
      resolve({
        name: "user1",
        wordbookCount: wordbook.length,
        vocaCount: vocaCount,
        loginDate: loginDate
      });
    }, 1000);
  });
}

export const getWordbookList = async (accessToken: string) => {
  return new Promise<[(Omit<typeof data.wordbook[0],"userId"> & { vocaCount: number })[], (Omit<typeof data.wordbook[0],"userId"> & { vocaCount: number })[]]>((resolve) => {
    setTimeout(() => {
      const wordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && !wordbook.isHidden);
      const hiddenWordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && wordbook.isHidden);
      resolve([wordbook
        .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length })),
      hiddenWordbook
        .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length }))
      ]);
    }, 1000);
  });
};

export const addWordbook = async (accessToken: string, name: string) => {
  return new Promise<[(Omit<typeof data.wordbook[0],"userId"> & { vocaCount: number })[], (Omit<typeof data.wordbook[0],"userId"> & { vocaCount: number })[]]>((resolve) => {
    setTimeout(() => {
      data.wordbook.push({ id: data.wordbook.length + 1, userId: 1, name: name, createdAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString(), isHidden: false });
      const wordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && !wordbook.isHidden);
      const hiddenWordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && wordbook.isHidden);
      resolve([wordbook
        .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length })),
      hiddenWordbook
        .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length }))
      ]);
    }, 1000);
  });
};

export const getVocaList = async (accessToken: string, bookId: number) => {
  return new Promise<{ wordbook: Omit<typeof data.wordbook[0],"userId"|"isHidden">, voca: Omit<typeof data.voca[0],"bookId"|"order">[] }>((resolve, reject) => {
    if (isNaN(bookId)) {
      throw new Error("bookId is undefined");
    }
    setTimeout(() => {
      const wordbook = data.wordbook.find((wordbook) => wordbook.id === bookId);
      if (wordbook === undefined) {
        return reject(new Error("wordbook not found"));
      }
      else if (wordbook.userId !== 1) {
        return reject(new Error("permission denied"));
      }
      resolve({
        wordbook: wordbook,
        voca: data.voca.filter((voca) => voca.bookId === bookId).map(e=>({...e})).sort((a, b) => a.order - b.order)
      });
    }, 1000);
  });
};

export const saveVocaList = async (accessToken: string, bookId: number, words: { id: number | null, word: string, meaning: string[] }[]) => {
  return new Promise<Omit<typeof data.voca[0],"bookId"|"order">[]>((resolve, reject) => {
    setTimeout(() => {
      const wordbook = data.wordbook.find((wordbook) => wordbook.id === bookId);
      if (wordbook === undefined) {
        reject(new Error("wordbook not found"));
      }
      else if (wordbook.userId !== 1) {
        reject(new Error("permission denied"));
      }
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
          if (voca === undefined) {
            return reject(new Error("voca not found"));
          }
          if (voca.bookId !== bookId) {
            return reject(new Error("permission denied"));
          }
          voca.word = word.word;
          voca.meaning = [...word.meaning];
          voca.order = index + 1;
        }
      });
      resolve(data.voca.filter((voca) => voca.bookId === bookId).map(e=>({...e})).sort((a, b) => a.order - b.order));
    }, 1000);
  });
};

export const increaseCheckCount = async (accessToken: string, vocaId: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const voca = data.voca.find((voca) => voca.id === vocaId);
      if (voca === undefined) {
        return reject(new Error("voca not found"));
      }
      if (data.wordbook.some((wordbook) => wordbook.id === voca.bookId && wordbook.userId !== 1)) {
        return reject(new Error("permission denied"));
      }
      if (voca.checkCount === 5) {
        return reject(new Error("check count is already 5"));
      }
      voca.checkCount++;
      resolve();
    }, 1000);
  });
};

export const decreaseCheckCount = async (accessToken: string, vocaId: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const voca = data.voca.find((voca) => voca.id === vocaId);
      if (voca === undefined) {
        return reject(new Error("voca not found"));
      }
      if (data.wordbook.some((wordbook) => wordbook.id === voca.bookId && wordbook.userId !== 1)) {
        return reject(new Error("permission denied"));
      }
      if (voca.checkCount === 0) {
        return reject(new Error("check count is already 0"));
      }
      voca.checkCount--;
      resolve();
    }, 1000);
  });
};

export const deleteVoca = async (accessToken: string, vocaId: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const index = data.voca.findIndex((voca) => voca.id === vocaId);
      if (index === -1) {
        return reject(new Error("voca not found"));
      }
      const voca = data.voca[index];
      if (data.wordbook.some((wordbook) => wordbook.id === voca.bookId && wordbook.userId !== 1)) {
        return reject(new Error("permission denied"));
      }
      data.voca.splice(index, 1);
      resolve();
    }, 1000);
  });
};

export const hideWordbook = async (accessToken: string, bookId: number) => {
  return new Promise<[(Omit<typeof data.wordbook[0],"userId"> & { vocaCount: number })[], (Omit<typeof data.wordbook[0],"userId"> & { vocaCount: number })[]]>((resolve, reject) => {
    setTimeout(() => {
      const index = data.wordbook.findIndex((wordbook) => wordbook.id === bookId);
      if (index === -1) {
        return reject(new Error("wordbook not found"));
      }
      if (data.wordbook[index].userId !== 1) {
        return reject(new Error("permission denied"));
      }
      data.wordbook[index].isHidden = true;
      const wordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && !wordbook.isHidden);
      const hiddenWordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && wordbook.isHidden);
      resolve([wordbook
        .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length })),
      hiddenWordbook
        .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length }))
      ]);
    }, 1000);
  });
}

export const showWordbook = async (accessToken: string, bookId: number) => {
  return new Promise<[(Omit<typeof data.wordbook[0],"userId"> & { vocaCount: number })[], (Omit<typeof data.wordbook[0],"userId"> & { vocaCount: number })[]]>((resolve, reject) => {
    setTimeout(() => {
      const index = data.wordbook.findIndex((wordbook) => wordbook.id === bookId);
      if (index === -1) {
        return reject(new Error("wordbook not found"));
      }
      if (data.wordbook[index].userId !== 1) {
        return reject(new Error("permission denied"));
      }
      data.wordbook[index].isHidden = false;
      const wordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && !wordbook.isHidden);
      const hiddenWordbook = data.wordbook.filter((wordbook) => wordbook.userId === 1 && wordbook.isHidden);
      resolve([wordbook
        .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length })),
      hiddenWordbook
        .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
        .map((wordbook) => ({ ...wordbook, vocaCount: data.voca.filter((voca) => voca.bookId === wordbook.id).length }))
      ]);
    }, 1000);
  });
}

export const saveResult = async (accessToken: string, bookId: number, testResult: { id: number, result: boolean }[]) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      testResult.forEach((result) => {
        const voca = data.voca.find((voca) => voca.id === result.id);
        if (voca === undefined) {
          return reject(new Error("voca not found"));
        }
        if (data.wordbook.some((wordbook) => wordbook.id === voca.bookId && wordbook.userId !== 1)) {
          return reject(new Error("permission denied"));
        }
        voca.testResult = result.result;
      });
      resolve();
    }, 1000);
  });
}
