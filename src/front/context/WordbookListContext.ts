import { createContext } from 'react';
import useWordbookData from '@hooks/useWordbookData';

const WordbookListContext = createContext(
  {} as Omit<ReturnType<typeof useWordbookData>, 'Error'|'wordbookList'|'hiddenWordbookList'>
);

export default WordbookListContext;
