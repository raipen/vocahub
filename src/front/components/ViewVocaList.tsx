import { VocaMode } from "@utils/vocaModeEnum";
import { useState, useEffect,useContext } from 'react';
import { VocaListContext } from '@context/VocaListContext';
import useFetchUpdate from '@hooks/useFetchUpdate';
import { getVocaList, increaseCheckCount, decreaseCheckCount } from "@utils/apis/voca";
import { 
  VocaListElement,
  VocaListContainer,
  Title,
  ButtonContainingIcon,
  SeparateLine,
  Icon,
  UnactivatableIcon,
  ActivatableIcon,
  Meaning,
  MeaningCount,
  FilpCardContainer,
  FilpCard,
  MeaningHeader,
  SelectButton
} from './index';

const handleWord = (
  id: number,
  fetchFunction: (id: number) => Promise<null>,
  setVocaList: React.Dispatch<React.SetStateAction<Awaited<ReturnType<typeof getVocaList>>['voca']>>,
  callback: (vocaCount: number) => number
) => async () => {
  await fetchFunction(id);
  setVocaList((prev) => {
    const newVocaList = prev.map(voca => {
      if (voca.id === id) {
        return { ...voca, checkCount: callback(voca.checkCount) };
      }
      return voca;
    });
    return newVocaList;
  });
}

function CheckableWord({word,checkCount,id}: {word: string, checkCount: number, id: number}) {
  const [loadingIncrease, fetchIncrease]= useFetchUpdate(increaseCheckCount);
  const [loadingDecrease, fetchDecrease] = useFetchUpdate(decreaseCheckCount);
  const { setVocaList } = useContext(VocaListContext);

  const handleIncrease = handleWord(id, fetchIncrease, setVocaList, (vocaCount) => vocaCount+1);
  const handleDecrease = handleWord(id, fetchDecrease, setVocaList, (vocaCount) => vocaCount-1);
  return (
    <div style={{padding: '10px'}}>
      <span>{word}</span>
      {checkCount>1&& new Array(checkCount-1).fill(0).map((_,i) => <Icon key={i} className="material-icons-sharp">done</Icon>)}
      {loadingIncrease&&<Icon className="material-icons-sharp">done</Icon>}
      {!loadingDecrease&&checkCount>0&& <UnactivatableIcon onClick={handleDecrease} className="material-icons-sharp">done</UnactivatableIcon>}
      {!loadingIncrease&&checkCount<5&& <ActivatableIcon onClick={handleIncrease} className="material-icons-sharp">add</ActivatableIcon>}
    </div>
  );
}

function FlippableMeaning({children, reversed, refresh}: {children: string, reversed?: boolean, refresh: object}) {
  const [isReversed, setIsReversed] = useState(reversed);
  useEffect(() => {
    setIsReversed(reversed);
  },[reversed, refresh]);
  return (
    <FilpCardContainer onClick={() => setIsReversed(!isReversed)}>
      <FilpCard $reversed={isReversed}>{children}</FilpCard>
    </FilpCardContainer>
  );
}

function ViewVocaList({setVocaMode}: {setVocaMode: React.Dispatch<React.SetStateAction<VocaMode>>}) {
  const { vocaList } = useContext(VocaListContext);
  const [defaultVisible, setDefaultVisible] = useState(false);
  const [showCount, setShowCount] = useState(0);
  const [refresh, setRefresh] = useState({});
  const vocaListGreaterThanShowCount = vocaList.filter(voca=>voca.checkCount>=showCount);

  return (
    <VocaListContainer style={{marginLeft: 0}}>
      <Title>
        <span>단어 목록</span>
        <ButtonContainingIcon onClick={() => setVocaMode(VocaMode.EDIT)}>수정</ButtonContainingIcon>
      </Title>
      <div style={{display: 'flex', gap: '5px', marginBottom: '10px', justifyContent: 'center'}}>
        <SelectButton onClick={() => setShowCount(0)} $active={showCount===0}>All</SelectButton>
        {new Array(5).fill(0).map((_,i) => <SelectButton key={i} onClick={() => setShowCount(i+1)} $active={showCount===i+1}>
          <span className="material-icons-sharp">done</span>{i+1}
          </SelectButton>)}
      </div>
      <VocaListElement>
        <div style={{padding: '10px'}}>
          영단어
        </div>
        <SeparateLine/>
        <MeaningHeader>
          모두
          <div onClick={() => {setDefaultVisible(true); setRefresh({})}}>보기</div>
          /
          <div onClick={() => {setDefaultVisible(false); setRefresh({})}}>숨기기</div>
        </MeaningHeader>
        {vocaListGreaterThanShowCount.length===0&&[<div key="1" style={{padding: '10px'}}>단어가 없습니다.</div>,<SeparateLine key="2"/>,<Meaning key="3"></Meaning>]}
        {vocaListGreaterThanShowCount.flatMap((voca,i) => [
            <CheckableWord word={voca.word} id={voca.id} checkCount={voca.checkCount} key={3*i}/>,
            <SeparateLine key={3*i+1}/>,
            <Meaning key={3*i+2}>
              {voca.meaning.length===1&&<FlippableMeaning reversed={!defaultVisible} refresh={refresh}>{voca.meaning[0]}</FlippableMeaning>}
              {voca.meaning.length>1&&voca.meaning.map((m,j) => (<MeaningCount key={j}><FlippableMeaning reversed={!defaultVisible} refresh={refresh}>{m}</FlippableMeaning></MeaningCount>))}
            </Meaning>
        ])}
      </VocaListElement>
    </VocaListContainer>
  );
}

export default ViewVocaList;
