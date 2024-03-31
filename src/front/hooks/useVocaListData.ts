import { useState, useEffect, useMemo,useCallback } from 'react';
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

  const editMode = useCallback(() => setVocaMode(VocaMode.EDIT), []);
  const viewMode = useCallback(() => setVocaMode(VocaMode.VIEW), []);
  const testMode = useCallback(() => setVocaMode(VocaMode.TEST), []);

  return useMemo(() => ({ isLoading, wordbook, vocaList, setVocaList, vocaListError, vocaMode, editMode, viewMode, testMode }), [isLoading, wordbook, vocaList, setVocaList, vocaListError, vocaMode]);
}
