import { createContext } from 'react';
import useWordbookData from '@hooks/useWordbookData';

type returnData = ReturnType<typeof useWordbookData>;

const WordbookListContext = createContext(
  {} as {
    profile: returnData['profile'],
    onClickWordbookElement: returnData['onClickWordbookElement'],
    expend: returnData['expend'],
    expendOnClick: returnData['expendOnClick'],
  }
);

export default WordbookListContext;
