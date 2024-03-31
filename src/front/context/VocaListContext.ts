import { createContext } from 'react';
import useVocaListData from '@hooks/useVocaListData';

const VocaListContext = createContext(
  {} as Omit<ReturnType<typeof useVocaListData>,  "isLoading" | "vocaListError">
);

export default VocaListContext;
