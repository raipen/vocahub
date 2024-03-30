import { createContext } from 'react';
import { getVocaList } from "@utils/apis/voca";

const VocaListContext = createContext(
  {} as {
    vocaList: Awaited<ReturnType<typeof getVocaList>>['voca'],
    setVocaList: React.Dispatch<React.SetStateAction<Awaited<ReturnType<typeof getVocaList>>['voca']>>,
    wordbookId: string
  }
);

export default VocaListContext;
