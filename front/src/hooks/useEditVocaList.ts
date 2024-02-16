import { useState, useContext, useCallback, useMemo } from 'react';
import { VocaListContext } from '@context/VocaListContext';
import useFetchUpdate from '@hooks/useFetchUpdate';
import { saveVocaList, deleteVoca } from '@utils/apis/wordbookmock';

type Voca = { word: string, meaning: string[], id: number | null };

const useEditVocaList = () => {
  const { vocaList, setVocaList, wordbookId } = useContext(VocaListContext);
  const newVocaList = vocaList.map(voca => ({ ...voca, meaning: [...voca.meaning, ''] })) as Voca[];
  newVocaList.push({ word: '', meaning: [''], id: null });

  const [editingVocaList, setEditingVocaList] = useState(newVocaList);
  const [loadingSaveVocaList, fetchSaveVocaList] = useFetchUpdate(saveVocaList);
  const [loadingDeleteVoca, fetchDeleteVoca] = useFetchUpdate(deleteVoca);

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

  const deleteExistingVoca = useCallback(async (id: number) => {
    await fetchDeleteVoca(id);
    setVocaList(vocaList.filter(voca => voca.id !== id));
  }, [fetchDeleteVoca, setVocaList]);

  const deleteNewVoca = useCallback((i: number) => {
    setEditingVocaList(editingVocaList.filter((_, index) => index !== i));
  }, [editingVocaList]);

  return useMemo(() => ({
    vocaList: editingVocaList,
    loadingSaveVocaList,
    loadingDeleteVoca,
    onChangeWord,
    onChangeMeans,
    reset,
    save,
    deleteExistingVoca,
    deleteNewVoca
  }), [editingVocaList, loadingSaveVocaList, loadingDeleteVoca, onChangeWord, onChangeMeans, reset, save, deleteExistingVoca, deleteNewVoca]);
}

export default useEditVocaList;
