import { useState, useEffect, useMemo,useCallback } from 'react';
import useFetchWithRendering from "@hooks/useFetchWithRendering";
import { getVocaList } from "@utils/apis/voca";
import { VocaMode } from "@utils/vocaModeEnum";
import useFetchUpdate from '@hooks/useFetchUpdate';
import { saveVocaList } from '@utils/apis/voca';

type Voca = { word: string, meaning: string[], id: number | null };

export default (wordbookId: string) => {
  const [data, vocaListError] = useFetchWithRendering(getVocaList, wordbookId);
  const [isLoading, setIsLoading] = useState(true);
  const [wordbook, setWordbook] = useState<Exclude<typeof data, null>['wordbook'] & { wordCount: number }>({
    title: '', createdAt: '', uuid: "", wordCount: 0
  });
  const [vocaList, setVocaList] = useState<Exclude<typeof data, null>['voca']>([]);
  const [vocaMode, setVocaMode] = useState(VocaMode.EDIT);
  const [loadingSaveVocaList, fetchSaveVocaList] = useFetchUpdate(saveVocaList);

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
  const saveEditedVocaList = useCallback(async (editingVocaList: Voca[]) => {
    const removeEmptyList = editingVocaList.filter(voca => voca.word !== '').map(voca => ({...voca, meaning: voca.meaning.filter(m => m !== '')}));
    if (removeEmptyList.some(voca => voca.meaning.length === 0)) {
      alert('뜻이 없는 단어가 있습니다.');
      return;
    }
    
    const newVocaList = await fetchSaveVocaList(wordbookId, removeEmptyList);
    setVocaList(newVocaList);
    setWordbook({ ...wordbook, wordCount: newVocaList.length });
    viewMode();
  }, [fetchSaveVocaList, wordbookId]);

  const excludeVoca = useCallback((id: number) => {
    setVocaList(list => list.filter(voca => voca.id !== id));
    setWordbook({ ...wordbook, wordCount: wordbook.wordCount - 1 });
  } , [vocaList]);

  const updateCheckCount = useCallback((id: number, callback: Function) => {
    setVocaList((prev) => {
      const newVocaList = prev.map(voca => {
        if (voca.id === id) {
          return { ...voca, checkCount: callback(voca.checkCount) };
        }
        return voca;
      });
      return newVocaList;
    });
  }, []);

  return useMemo(() => ({ isLoading, wordbook, vocaList,
    vocaListError, vocaMode,  loadingSaveVocaList, saveEditedVocaList, updateCheckCount,
    editMode, viewMode, testMode, excludeVoca }),
    [isLoading, wordbook, vocaList, vocaListError, vocaMode, loadingSaveVocaList, saveEditedVocaList, updateCheckCount, editMode, viewMode, testMode]);
}
