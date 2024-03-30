import { createContext } from 'react';
import { getDatasWhenWordbookRender } from "@utils/apis/wordbook";

const WordbookListContext = createContext(
  {} as {
    data: Awaited<ReturnType<typeof getDatasWhenWordbookRender>>,
    setData: React.Dispatch<React.SetStateAction<Awaited<ReturnType<typeof getDatasWhenWordbookRender>>>>
  }
);

export default WordbookListContext;
