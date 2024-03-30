import { VocaMode } from "@utils/vocaModeEnum";
import VocaListContext from '@context/VocaListContext';
import useFetchUpdate from '@hooks/useFetchUpdate';
import { useContext,useState } from 'react';
import { 
  VocaListElement,
  VocaListContainer,
  Title,
  SeparateLine,
  Meaning,
  MeaningCount,
  Input,
  MeaningWithAnswer,
  ButtonWithHoverAnimation,
  ReverseButtonWithHoverAnimation
} from './index';

const marking = (input: string[][], answer: {id:number,meaning: string[]}[]) => {
  const commaSeparatedAnswer = answer.map(a => ({...a,meaning:a.meaning.map(b=>b.split(',').map(c=>c.trim()))}));
  const inputMeaning = input.map(voca => voca.map(m=>m.trim()));
  const detailMarking =  commaSeparatedAnswer.map(({id,meaning}, i) => {
    const missingMeaning = meaning.filter(m => !m.some(v => inputMeaning[i].includes(v)));
    const inputMeaningMatched = inputMeaning[i].map(m => meaning.findIndex(v => v.includes(m)));
    const duplicated = inputMeaningMatched.map((m, i, arr) => arr.indexOf(m) !== i ? -1 : m);
    const result = duplicated.map((m, i) => m === -1
      ? {meaning: missingMeaning.shift()!, correct: false}
      : {meaning: meaning[m], correct: true});
    return {id, result};
  });
  const markingResult = detailMarking.map(({id,result}) => ({id, result: result.every(m => m.correct)}));
  return {detailMarking: detailMarking.map(({result}) => result), markingResult};
}

function TestVocaList({setVocaMode}: {setVocaMode: React.Dispatch<React.SetStateAction<VocaMode>>}) {
  const { vocaList } = useContext(VocaListContext);
  const emptyVocaList = vocaList.map(voca => new Array(voca.meaning.length).fill(""));
  const [inputList, setInputList] = useState(emptyVocaList);
  const [result, setResult] = useState<{meaning: string[],correct: boolean}[][]|null>(null);
  const onChangeInput = (i: number, j: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputList = [...inputList];
    newInputList[i][j] = e.target.value;
    setInputList(newInputList);
  }

  const onClickSaveResult = async () => {
    const {detailMarking} = marking(inputList, vocaList);
    setResult(detailMarking);
  }

  return (
    <VocaListContainer style={{marginLeft: 0}}>
      <Title>
        <span>단어 테스트</span>
      </Title>
      <VocaListElement>
        <div style={{padding: '10px'}}>
          영단어
        </div>
        <SeparateLine/>
        <div style={{padding: '10px 20px'}}>
          뜻
        </div>
        {vocaList.flatMap((voca,i) => [
            <div style={{padding:"18px 10px"}} key={3*i}>{voca.word}</div>,
            <SeparateLine key={3*i+1}/>,
            <Meaning key={3*i+2}>
              {voca.meaning.map((m,j) =>(
                <MeaningCount key={j} style={{alignItems: result===null?'center':'flex-start'}}>
                  {result===null&&<Input value={inputList[i][j]} onChange={onChangeInput(i,j)}/>}
                  {result!==null&&<MeaningWithAnswer $correct={result[i][j].correct}><span>{'\u00A0'+inputList[i][j]+'\u00A0'}</span><span>{result[i][j].meaning.join(', ')}</span></MeaningWithAnswer>}
                </MeaningCount>
              ))}
            </Meaning>
        ])}
      </VocaListElement>
      {result===null&&<ButtonWithHoverAnimation onClick={onClickSaveResult}>채점</ButtonWithHoverAnimation>}
      {result!==null&&
          <div style={{display: 'flex', gap: '5px', marginBottom: '10px', justifyContent: 'center'}}>
            <span className="material-icons-sharp" style={{color:"var(--main-color)"}}>check_circle</span>
            {result.filter(voca => voca.every(m => m.correct)).length}/{vocaList.length}
          </div>}
      {result!==null&&
        <ReverseButtonWithHoverAnimation onClick={()=>setVocaMode(VocaMode.VIEW)}>
          돌아가기
        </ReverseButtonWithHoverAnimation>}
    </VocaListContainer>
  );
}

export default TestVocaList;
