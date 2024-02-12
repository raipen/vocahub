import { createContext, useState, useEffect,useMemo } from 'react';
import useFetchWithRendering from "@hooks/useFetchWithRendering";
import { getVocaList } from "@utils/apis/wordbook";

export const VocaListContext = createContext(
  {} as {
    vocaList: Awaited<ReturnType<typeof getVocaList>>['voca'],
    setVocaList: React.Dispatch<React.SetStateAction<Awaited<ReturnType<typeof getVocaList>>['voca']>>,
    wordbookId: number
  }
);

export const useInitVocaList = (wordbookId:number) => {
  const [data, vocaListError] = useFetchWithRendering(getVocaList, wordbookId);
  const [wordbook, setWordbook] = useState<Exclude<typeof data, null>['wordbook']&{wordCount: number}>({
    name: '', createdAt: '', id: 0, userId: 0, isHidden: false, wordCount: 0
  });
  const [vocaList, setVocaList] = useState<Exclude<typeof data, null>['voca']>([]);
  useEffect(() => {
    if (data) {
      setWordbook({...data.wordbook, wordCount: data.voca.length});
      setVocaList(data.voca);
    }
  }, [data]);

  return useMemo(() => ({ wordbook, vocaList, setVocaList, vocaListError }), [wordbook, vocaList, setVocaList, vocaListError]);
}
