import { createContext, useState, useEffect,useMemo } from 'react';
import useFetchWithRendering from "@hooks/useFetchWithRendering";
import { getVocaList } from "@utils/apis/wordbook";

export const VocaListContext = createContext(
  {} as {
    vocaList: Awaited<ReturnType<typeof getVocaList>>,
    setVocaList: React.Dispatch<React.SetStateAction<Awaited<ReturnType<typeof getVocaList>>>>
  }
);

export const useInitVocaList = (wordbookId:number) => {
  const [vocaList, vocaListError] = useFetchWithRendering(getVocaList, wordbookId);
  const [data, setData] = useState<Exclude<typeof vocaList, null>>({
    wordbook:{name: '', createdAt: '', id: 0, userId: 0, isHidden: false},
    voca: []
  });
  useEffect(() => {
    if (vocaList) {
      setData(vocaList);
    }
  }, [vocaList]);

  return useMemo(() => ({ vocaList: data, setVocaList: setData, vocaListError }), [data, setData, vocaListError]);
}
