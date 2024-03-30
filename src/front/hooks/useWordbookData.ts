import { useState, useEffect,useMemo } from 'react';
import useFetchWithRendering from "@hooks/useFetchWithRendering";
import { getDatasWhenWordbookRender } from "@utils/apis/wordbook";
import { getWordbookListInterface } from '@DTO/wordbook.dto';

export default () => {
    const [dataFromRendering, Error] = useFetchWithRendering(getDatasWhenWordbookRender);
    const [data, setData] = useState<Exclude<typeof dataFromRendering, null>>([
      { name: 'Loading', wordbookCount: 0, vocaCount: 0, loginDate: [] as { date: string, count: number }[] },
      {
        wordbookList: [],
        hiddenWordbookList: []      
      } as getWordbookListInterface['Reply']['200']
    ]);
    useEffect(() => {
      if (dataFromRendering) {
        setData(dataFromRendering);
      }
    }, [dataFromRendering]);
  
    return useMemo(() => ({ data, setData, Error }), [data, setData, Error]);
  }
