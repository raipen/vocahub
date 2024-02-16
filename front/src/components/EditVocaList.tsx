import { VocaMode } from "@utils/vocaModeEnum";
import useEditVocaList from "@hooks/useEditVocaList";
import { 
  VocaListElement,
  VocaListContainer,
  Title,
  ButtonContainingIcon,
  SeparateLine,
  Meaning,
  MeaningCount,
  Input
} from './index';

function ViewVocaList({setVocaMode}: {setVocaMode: React.Dispatch<React.SetStateAction<VocaMode>>}) {
  const { vocaList,
    loadingSaveVocaList, loadingDeleteVoca,
    onChangeWord, onChangeMeans,
    reset, save, deleteExistingVoca, deleteNewVoca } = useEditVocaList();

  return (
    <VocaListContainer style={{marginLeft: 0}}>
      <Title>
        <span>단어 목록</span>
        <ButtonContainingIcon onClick={()=>reset(()=>setVocaMode(VocaMode.VIEW))}>취소</ButtonContainingIcon>
        <ButtonContainingIcon onClick={()=>save(()=>setVocaMode(VocaMode.VIEW))}>저장</ButtonContainingIcon>
      </Title>
      <VocaListElement>
        {vocaList.flatMap((voca,i) => [
            <Input key={3*i} value={voca.word} onChange={onChangeWord(i)} disabled={loadingSaveVocaList}/>,
            <SeparateLine key={3*i+1}/>,
            <Meaning key={3*i+2}>
              {voca.meaning.map((m,j) => (<MeaningCount key={j}><Input value={m} onChange={onChangeMeans(i,j)} disabled={loadingSaveVocaList}/></MeaningCount>))}
            </Meaning>
        ])}
      </VocaListElement>
    </VocaListContainer>
  );
}

export default ViewVocaList;
