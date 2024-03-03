import { useState, useContext, useCallback, useMemo } from 'react';
import { VocaListContext } from '@context/VocaListContext';
import useFetchUpdate from '@hooks/useFetchUpdate';
import { saveVocaList } from '@utils/apis/voca';

type Voca = { word: string, meaning: string[], id: number | null };

const useEditVocaList = () => {
  const { vocaList, setVocaList, wordbookId } = useContext(VocaListContext);
  const newVocaList = vocaList.map(voca => ({ ...voca, meaning: [...voca.meaning, ''] })) as Voca[];
  newVocaList.push({ word: '', meaning: [''], id: null });

  const [editingVocaList, setEditingVocaList] = useState(newVocaList);
  const [loadingSaveVocaList, fetchSaveVocaList] = useFetchUpdate(saveVocaList);

  const onChangeWord = useCallback((i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVocaList = [...editingVocaList];
    newVocaList[i].word = e.target.value;
    if (i === editingVocaList.length - 1) {
      newVocaList.push({ word: '', meaning: [''], id: null });
    }
    setEditingVocaList(newVocaList);
  }, [editingVocaList]);

  const onChangeMeans = useCallback((i: number, j: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVocaList = [...editingVocaList];
    newVocaList[i].meaning[j] = e.target.value;
    if (j === editingVocaList[i].meaning.length - 1) {
      newVocaList[i].meaning.push('');
    }
    setEditingVocaList(newVocaList);
  }, [editingVocaList]);

  const reset = useCallback((callback:Function) => {
    setEditingVocaList(vocaList);
    callback();
  }, [vocaList]);

  const save = useCallback(async (callback:Function) => {
    const removeEmptyList = editingVocaList.filter(voca => voca.word !== '').map(voca => ({...voca, meaning: voca.meaning.filter(m => m !== '')}));
    if (removeEmptyList.some(voca => voca.meaning.length === 0)) {
      alert('뜻이 없는 단어가 있습니다.');
      return;
    }
    const newVocaList = await fetchSaveVocaList(wordbookId, removeEmptyList);
    setVocaList(newVocaList);
    callback();
  }, [editingVocaList, wordbookId, fetchSaveVocaList, setVocaList]);

  const deleteNewVoca = useCallback(
    (i: number, id: number | null) =>
    (fetchDeleteVoca: (id: number) => Promise<null>) =>
    async () => {
      if(id !== null) {
        await fetchDeleteVoca(id);
        setVocaList(vocaList.filter(voca => voca.id !== id));
      }
      setEditingVocaList(editingVocaList.filter((_, index) => index !== i));
    },
    [editingVocaList, setVocaList, vocaList]
  );

  const deleteMean = useCallback((i: number, j: number) => ()=> {
    const newVocaList = [...editingVocaList];
    newVocaList[i].meaning = newVocaList[i].meaning.filter((_, index) => index !== j);
    setEditingVocaList(newVocaList);
  }, [editingVocaList]);

  const moveWordUp = useCallback((i: number) => () => {
    if (i === 0) return;
    const newVocaList = [...editingVocaList];
    [newVocaList[i], newVocaList[i - 1]] = [newVocaList[i - 1], newVocaList[i]];
    setEditingVocaList(newVocaList);
  }, [editingVocaList]);

  const moveWordDown = useCallback((i: number) => () => {
    if (i === editingVocaList.length - 1) return;
    const newVocaList = [...editingVocaList];
    [newVocaList[i], newVocaList[i + 1]] = [newVocaList[i + 1], newVocaList[i]];
    setEditingVocaList(newVocaList);
  }, [editingVocaList]);

  return useMemo(() => ({
    vocaList: editingVocaList,
    loadingSaveVocaList,
    onChangeWord,
    onChangeMeans,
    reset,
    save,
    deleteNewVoca,
    deleteMean,
    moveWordUp,
    moveWordDown
  }), [editingVocaList, loadingSaveVocaList, onChangeWord, onChangeMeans, reset, save, deleteNewVoca, deleteMean, moveWordUp, moveWordDown]);
}

export default useEditVocaList;
