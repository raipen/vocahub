import { useState, useContext, useCallback, useMemo } from 'react';
import VocaListContext from '@context/VocaListContext';

type Voca = { word: string, meaning: string[], id: number | null };

const useEditVocaList = () => {
  const { vocaList, loadingSaveVocaList, saveEditedVocaList, excludeVoca, viewMode } = useContext(VocaListContext);
  const newVocaList = vocaList.map(voca => ({ ...voca, meaning: [...voca.meaning, ''] })) as Voca[];
  newVocaList.push({ word: '', meaning: [''], id: null });

  const [editingVocaList, setEditingVocaList] = useState(newVocaList);

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

  const reset = useCallback(() => {
    setEditingVocaList(vocaList);
    viewMode();
  }, [vocaList]);

  const save = async () => {
    await saveEditedVocaList(editingVocaList);
  };

  const deleteWord = useCallback(
    (i: number, id: number | null) =>
    (fetchDeleteVoca: (id: number) => Promise<null>) =>
    async () => {
      if(id !== null) {
        await fetchDeleteVoca(id);
        excludeVoca(id);
      }
      setEditingVocaList(editingVocaList.filter((_, index) => index !== i));
    },
    [editingVocaList, vocaList]
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

  return {
    vocaList: editingVocaList,
    loadingSaveVocaList,
    onChangeWord,
    onChangeMeans,
    reset,
    save,
    deleteWord,
    deleteMean,
    moveWordUp,
    moveWordDown
  };
}

export default useEditVocaList;
