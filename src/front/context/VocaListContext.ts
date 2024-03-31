import { createContext } from 'react';
import useVocaListData from '@hooks/useVocaListData';

const VocaListContext = createContext(
  {} as {
    vocaList: ReturnType<typeof useVocaListData>['vocaList'],
    setVocaList: ReturnType<typeof useVocaListData>['setVocaList'],
    wordbookId: string,
    wordbook: ReturnType<typeof useVocaListData>['wordbook'],
    vocaMode: ReturnType<typeof useVocaListData>['vocaMode'],
    editMode: () => void,
    viewMode: () => void,
    testMode: () => void
  }
);

export default VocaListContext;
