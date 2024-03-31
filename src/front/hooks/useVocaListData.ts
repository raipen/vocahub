import { useState, useEffect, useMemo } from 'react';
import useFetchWithRendering from "@hooks/useFetchWithRendering";
import { getVocaList } from "@utils/apis/voca";
import { VocaMode } from "@utils/vocaModeEnum";

export default (wordbookId: string) => {
  const [data, vocaListError] = useFetchWithRendering(getVocaList, wordbookId);
  const [isLoading, setIsLoading] = useState(true);
  const [wordbook, setWordbook] = useState<Exclude<typeof data, null>['wordbook'] & { wordCount: number }>({
    title: '', createdAt: '', uuid: "", wordCount: 0
  });
  const [vocaList, setVocaList] = useState<Exclude<typeof data, null>['voca']>([]);
  const [vocaMode, setVocaMode] = useState(VocaMode.EDIT);
  useEffect(() => {
    if (data) {
      setWordbook({ ...data.wordbook, wordCount: data.voca.length });
      setVocaList(data.voca);
      setIsLoading(false);
      if(data.voca.length > 0) setVocaMode(VocaMode.VIEW);
    }
  }, [data]);

  return useMemo(() => ({ isLoading, wordbook, vocaList, setVocaList, vocaListError, vocaMode, setVocaMode }), [isLoading, wordbook, vocaList, setVocaList, vocaListError, vocaMode]);
}
