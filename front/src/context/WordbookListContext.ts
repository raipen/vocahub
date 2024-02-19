import { createContext, useState, useEffect,useMemo } from 'react';
import useFetchWithRendering from "@hooks/useFetchWithRendering";
import { getDatasWhenWordbookRender } from "@utils/apis/wordbook";

export const WordbookListContext = createContext(
  {} as {
    data: Awaited<ReturnType<typeof getDatasWhenWordbookRender>>,
    setData: React.Dispatch<React.SetStateAction<Awaited<ReturnType<typeof getDatasWhenWordbookRender>>>>
  }
);

export const useInitWordbookList = () => {
  const [dataFromRendering, Error] = useFetchWithRendering(getDatasWhenWordbookRender);
  const [data, setData] = useState<Exclude<typeof dataFromRendering, null>>([
    { name: 'Loading', wordbookCount: 0, vocaCount: 0, loginDate: [] as { date: string, count: number }[] },
    [[] as { id: number, userId: number, name: string, createdAt: string, isHidden: boolean, vocaCount: number }[],
    [] as { id: number, userId: number, name: string, createdAt: string, isHidden: boolean, vocaCount: number }[]]
  ]);
  useEffect(() => {
    if (dataFromRendering) {
      setData(dataFromRendering);
    }
  }, [dataFromRendering]);

  return useMemo(() => ({ data, setData, Error }), [data, setData, Error]);
}
