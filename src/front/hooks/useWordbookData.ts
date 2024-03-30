import { useState, useEffect,useMemo,useCallback } from 'react';
import { getProfile } from '@utils/apis/wordbook';
import useFetchWithRendering from "@hooks/useFetchWithRendering";
import useFetchUpdate from './useFetchUpdate';
import { getDatasWhenWordbookRender } from "@utils/apis/wordbook";
import { getWordbookListInterface } from '@DTO/wordbook.dto';

export default () => {
    const [dataFromRendering, Error] = useFetchWithRendering(getDatasWhenWordbookRender);
    const [_, fetchGetProfile] = useFetchUpdate(getProfile);
    const [expend, setExpend] = useState(false);
    const [profile, setProfile] = useState({
      name: 'Loading', wordbookCount: 0, vocaCount: 0, loginDate: [] as { date: string, count: number }[]
    });
    const [wordbook, setWordbook] = useState(
      {
        wordbookList: [],
        hiddenWordbookList: []      
      } as getWordbookListInterface['Reply']['200']);
    useEffect(() => {
      if (!dataFromRendering) return;

      setProfile(dataFromRendering[0]);
      setWordbook(dataFromRendering[1]);
    }, [dataFromRendering]);

    const {wordbookList, hiddenWordbookList} = wordbook;

    const onClickWordbookElement = useCallback(
      <T>(fetchFunction: (args:T) => Promise<getWordbookListInterface['Reply']['200']>, args: T) =>
      async () => {
        const wordbook = await fetchFunction(args);
        const newProfile = await fetchGetProfile();
        setWordbook(wordbook);
        setProfile(newProfile);
      }, []);

    const expendOnClick = useCallback(() => setExpend(!expend), [expend]);
  
    return useMemo(() => ({ profile, wordbookList, hiddenWordbookList, expend, onClickWordbookElement, expendOnClick, Error }), [profile, wordbook, expend, Error]);
  }
