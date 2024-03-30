import { createContext } from 'react';
import useWordbookData from '@hooks/useWordbookData';

type returnData = ReturnType<typeof useWordbookData>;

const WordbookListContext = createContext(
  {} as {
    profile: returnData['profile'],
    onClickWordbookElement: returnData['onClickWordbookElement'],
  }
);

export default WordbookListContext;
