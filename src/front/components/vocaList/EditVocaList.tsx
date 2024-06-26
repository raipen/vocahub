import useEditVocaList from "@hooks/useEditVocaList";
import { 
  VocaListElement,
  VocaListContainer,
  Title,
  ButtonContainingIcon,
  SeparateLine,
  Meaning,
  MeaningCount,
  MiniInput,
  UnactivatableIcon,
  WarningClickableIcon,
  ReverseButtonContainingIcon,
  ActivatableIcon,
  ButtonWithHoverAnimation
} from '../index';
import useFetchUpdate from '@hooks/useFetchUpdate';
import { deleteVoca } from '@utils/apis/voca';

function WordInputWithMenu({word, onChange, disabled, moveWordUp, moveWordDown, deleteWord}:{
  word: string,
  disabled: boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  moveWordUp: () => void,
  moveWordDown: () => void,
  deleteWord: (fetchDeleteVoca: (id: number) => Promise<null>) => () => Promise<void>
}) {
  const [loadingDeleteVoca, fetchDeleteVoca] = useFetchUpdate(deleteVoca);

  const disable = disabled || loadingDeleteVoca;

  return (
    <div style={{display: 'flex', padding: '10px', alignItems: 'center'}}>
      <ActivatableIcon onClick={moveWordUp} className="material-icons-sharp" tabIndex={-1} disabled={disable}>arrow_upward</ActivatableIcon>
      <ActivatableIcon onClick={moveWordDown} className="material-icons-sharp" tabIndex={-1} disabled={disable}>arrow_downward</ActivatableIcon>
      <MiniInput value={loadingDeleteVoca ? "삭제중" : word} onChange={onChange} disabled={disable} placeholder="ex) apple"/>
      <WarningClickableIcon disabled={disable} onClick={deleteWord(fetchDeleteVoca)} className="material-icons-sharp" tabIndex={-1} style={{fontSize:"1.5rem"}}>delete_forever</WarningClickableIcon>
    </div>
  );
}

function EditVocaList() {
  const { vocaList, loadingSaveVocaList,
    onChangeWord, onChangeMeans, reset, save,
    deleteWord, deleteMean,
    moveWordUp, moveWordDown } = useEditVocaList();

  return (
    <VocaListContainer style={{marginLeft: 0}}>
      <Title>
        <span>단어 편집</span>
        <div style={{display: 'flex', gap: '10px'}}>
          <ReverseButtonContainingIcon onClick={reset}>취소</ReverseButtonContainingIcon>
          <ButtonContainingIcon onClick={save}>저장</ButtonContainingIcon>
        </div>
      </Title>
      <VocaListElement>
        <div style={{padding: '10px 20px'}}>
          영단어
        </div>
        <SeparateLine/>
        <div style={{padding: '10px 20px'}}>
          뜻
        </div>
        {vocaList.flatMap((voca,i) => [
            <WordInputWithMenu key={3*i} word={voca.word} onChange={onChangeWord(i)} disabled={loadingSaveVocaList} moveWordUp={moveWordUp(i)} moveWordDown={moveWordDown(i)} deleteWord={deleteWord(i,voca.id)}/>,
            <SeparateLine key={3*i+1}/>,
            <Meaning key={3*i+2}>
              {voca.meaning.map((m,j) =>(
                <MeaningCount key={j}>
                  <MiniInput value={m} onChange={onChangeMeans(i,j)} disabled={loadingSaveVocaList} placeholder={j===0?"ex) 사과":"ex) 뜻"+(j+1)}/>
                  <UnactivatableIcon onClick={deleteMean(i,j)} className="material-icons-sharp" tabIndex={-1}>remove_circle_outline</UnactivatableIcon>
                </MeaningCount>
              ))}
            </Meaning>
        ])}
      </VocaListElement>
      <ButtonWithHoverAnimation onClick={save}>저장</ButtonWithHoverAnimation>
    </VocaListContainer>
  );
}

export default EditVocaList;
