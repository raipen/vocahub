import styled from 'styled-components';
import { VocaMode } from "@utils/vocaModeEnum";
import { VocaListContainer, Title, NewButton } from './VocaListStyle';
import { useState, useEffect,useContext } from 'react';
import { VocaListContext } from '@context/VocaListContext';
import useFetchUpdate from '@hooks/useFetchUpdate';
import { increaseCheckCount,decreaseCheckCount } from '@utils/apis/wordbookmock';
import { getVocaList } from "@utils/apis/wordbook";

const WordContainer = styled.div`
  display: grid;
  width: auto;
  max-width: calc(100vw - 320px);
  min-width: 300px;
  grid-template-columns: auto 1px auto;
  margin-bottom: 10px;
  align-items: start;
  overflow-wrap: anywhere;
  &>div {
    border-top: 1px solid var(--main-color);
  }
  @media (max-width: 750px) {
    width: 100%;
    max-width: none;
    min-width: 0;
  }
`;

const SeparateLine = styled.div`
  padding: 0;
  background: linear-gradient(0, white 10%, #ccc 20%, #ccc 80%, white 90% );
  width: 100%;
  height: 100%;
`;

const Check = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: var(--main-color);
`;

const WhiteCheck = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const RemoveCheck = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: var(--main-color);
  cursor: pointer;
  &:hover {
    color: #ccc;
  }
`;

const AddCheck = styled.span`
  font-size: 1rem;
  cursor: pointer;
  color: #ccc;
  &:hover {
    color: var(--main-color);
  }
`;

const Meaning = styled.div`
  counter-reset: meaning;
  height: 100%;
  padding: 10px;
`;

const CountMeaning = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  &::before {
    counter-increment: meaning;
    content: counter(meaning) ". ";
    padding: 5px 0;
    flex-shrink: 0;
  }
`;

const Card = styled.div<{reversed?: boolean}>`
  display: inline-block;
  width:100%;
  padding-left: 5px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  transition: box-shadow 0.3s ease-in-out;
  &:hover{
    border-radius: 5px;
    box-shadow: 0 0 10px 0 #ccc;
  }
  &>div {
    width: fit-content;
    transition: all 0.3s ease-in-out;
    transform-style: preserve-3d;
    border-radius: 5px;
    transform: perspective(1500px) rotateX(${props => props.reversed?180:0}deg);
    backface-visibility: hidden;
    overflow: auto;
    background-color: white;
  }
`;

const MeaningHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  >div {
    cursor: pointer;
    padding: 5px 10px;
    margin: 0 5px;
    border-radius: 5px;
    background-color: #f0f0f0;
    &:hover {
      background-color: #ccc;
    }
  }
`;

const SelectButton = styled.div<{$active: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 300;
  background-color: ${props => props.$active?'var(--main-color)':'#f0f0f0'};
  color: ${props => props.$active?'white':'black'};
  padding: 5px 10px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  >span:first-child {
    font-size: 1rem;
  }
  &:hover {
    background-color: ${props => props.$active?'var(--main-color)':'#ccc'};
  }
`;

function ReversibleMeaning({children, reversed, refresh}: {children: string, reversed?: boolean, refresh: object}) {
  const [isReversed, setIsReversed] = useState(reversed);
  useEffect(() => {
    setIsReversed(reversed);
  },[reversed, refresh]);
  return (
    <Card reversed={isReversed} onClick={() => setIsReversed(!isReversed)}>
      <div>{children}</div>
    </Card>
  );
}

const handleWord = (
  id: number,
  fetchFunction: (id: number) => Promise<void>,
  setVocaList: React.Dispatch<React.SetStateAction<Awaited<ReturnType<typeof getVocaList>>>>,
  callback: (vocaCount: number) => number
) => async () => {
  await fetchFunction(id);
  setVocaList((prev) => {
    const newVocaList = prev.voca.map(voca => {
      if (voca.id === id) {
        return { ...voca, checkCount: callback(voca.checkCount) };
      }
      return voca;
    });
    return { ...prev, voca: newVocaList };
  });
}

function Word({word,checkCount,id}: {word: string, checkCount: number, id: number}) {
  const [loadingIncrease, fetchIncrease]= useFetchUpdate(increaseCheckCount);
  const [loadingDecrease, fetchDecrease] = useFetchUpdate(decreaseCheckCount);
  const { setVocaList } = useContext(VocaListContext);

  const handleIncrease = handleWord(id, fetchIncrease, setVocaList, (vocaCount) => vocaCount+1);
  const handleDecrease = handleWord(id, fetchDecrease, setVocaList, (vocaCount) => vocaCount-1);
  return (
    <div style={{padding: '10px'}}>
      <span>{word}</span>
      {checkCount>1&& new Array(checkCount-1).fill(0).map((_,i) => <Check key={i} className="material-icons-sharp">done</Check>)}
      {loadingIncrease&&<Check className="material-icons-sharp">done</Check>}
      {!loadingDecrease&&checkCount>0&& <RemoveCheck onClick={handleDecrease} className="material-icons-sharp">done</RemoveCheck>}
      {!loadingIncrease&&checkCount<5&& <AddCheck onClick={handleIncrease} className="material-icons-sharp">add</AddCheck>}
    </div>
  );
}

function ViewVocaList({vocaList, setVocaMode}: {vocaList: {
    id: number;
    bookId: number;
    word: string;
    meaning: string[];
    checkCount: number;
    testResult: boolean | null;
    order: number;
}[], setVocaMode: React.Dispatch<React.SetStateAction<VocaMode>>}) {
  const [defaultVisible, setDefaultVisible] = useState(false);
  const [showCount, setShowCount] = useState(0);
  const [refresh, setRefresh] = useState({});
  
  const vocaListGreaterThanShowCount = vocaList.filter(voca=>voca.checkCount>=showCount);

  return (
    <VocaListContainer style={{marginLeft: 0}}>
      <Title>
        <span>단어 목록</span>
        <NewButton onClick={() => setVocaMode(VocaMode.EDIT)}>수정</NewButton>
      </Title>
      <div style={{display: 'flex', gap: '5px', marginBottom: '10px', justifyContent: 'center'}}>
        <SelectButton onClick={() => setShowCount(0)} $active={showCount===0}>All</SelectButton>
        {new Array(5).fill(0).map((_,i) => <SelectButton key={i} onClick={() => setShowCount(i+1)} $active={showCount===i+1}>
          <span className="material-icons-sharp">done</span>{i+1}
          </SelectButton>)}
      </div>
      <WordContainer>
        <div></div>
        <SeparateLine/>
        <MeaningHeader>
          모두
          <div onClick={() => {setDefaultVisible(true); setRefresh({})}}>보기</div>
          /
          <div onClick={() => {setDefaultVisible(false); setRefresh({})}}>숨기기</div>
        </MeaningHeader>
        {vocaListGreaterThanShowCount.flatMap((voca,i) => [
            <Word word={voca.word} id={voca.id} checkCount={voca.checkCount} key={3*i}/>,
            <SeparateLine key={3*i+1}/>,
            <Meaning key={3*i+2}>
              {voca.meaning.length===1&&<ReversibleMeaning reversed={!defaultVisible} refresh={refresh}>{voca.meaning[0]}</ReversibleMeaning>}
              {voca.meaning.length>1&&voca.meaning.map((m,j) => (<CountMeaning key={j}><ReversibleMeaning reversed={!defaultVisible} refresh={refresh}>{m}</ReversibleMeaning></CountMeaning>))}
            </Meaning>
        ])}
        {vocaListGreaterThanShowCount.length===0&&<div style={{padding: '10px'}}>단어가 없습니다.</div>}
      </WordContainer>
    </VocaListContainer>
  );
}

export default ViewVocaList;
