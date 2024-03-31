import { createContext } from 'react';
import useVocaListData from '@hooks/useVocaListData';

const VocaListContext = createContext(
  {} as {
    vocaList: ReturnType<typeof useVocaListData>['vocaList'],
    wordbook: ReturnType<typeof useVocaListData>['wordbook'],
    vocaMode: ReturnType<typeof useVocaListData>['vocaMode'],
    editMode: () => void,
    viewMode: () => void,
    testMode: () => void,
    loadingSaveVocaList: ReturnType<typeof useVocaListData>['loadingSaveVocaList'],
    saveEditedVocaList: ReturnType<typeof useVocaListData>['saveEditedVocaList'],
    excludeVoca: ReturnType<typeof useVocaListData>['excludeVoca'],
    updateCheckCount: ReturnType<typeof useVocaListData>['updateCheckCount']
  }
);

export default VocaListContext;
