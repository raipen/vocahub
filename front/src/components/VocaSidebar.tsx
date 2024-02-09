import styled from 'styled-components';
import { VocaMode } from "@utils/vocaModeEnum";
import { ISOStringToDateString } from '@utils/index';
import { ReverseButton } from '@components';

const VocaSidebarContainer = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    position: relative;
    width: 300px;
    padding: 10px 15px;
    height: 100%;
    border: 1px solid var(--main-color);
    border-radius: 5px;
    @media (max-width: 750px) {
        width: 100%;
        padding: 10px max(15px, calc(50% - 250px));
    }
`;

const DefaultListElement = styled.div`
    counter-reset: list;
    &>div{
        margin-bottom: 10px;
        font-size: 1.1rem;
        font-weight: 600;
    }
    &>span {
        display: block;
        margin-bottom: 10px;
        word-break: keep-all;
        &::before {
            counter-increment: list;
            content: counter(list) ". ";
        }
    }
`;

const ChildListElement = styled.div`
    margin-left: 10px;
    &::before {
        content: "";
        margin-right: 5px;
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: var(--main-color);
    }
`;

const WordbookName = styled.div`
    margin-bottom: 10px;
    &>span:last-child {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--main-color);
    }
    .material-icons-sharp {
        font-size: 1rem;
        margin-right: 5px;
    }
`;

const WordbookInfo = styled.div`
    font-size: 1rem;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &>div {
        display: flex;
        align-items: center;
    }
    .material-icons-sharp {
        font-size: 1rem;
        margin-right: 5px;
    }
`;


function VocaSidebar({setVocaMode,wordbook}:{
    setVocaMode: React.Dispatch<React.SetStateAction<VocaMode>>,
    wordbook: {name: string, createdAt: string, wordCount: number}
}) {
  return (
    <VocaSidebarContainer>
        <WordbookName>
            <span className="material-icons-sharp">
                menu_book
            </span>
            <span>
                {wordbook.name}
            </span>
        </WordbookName>
        <WordbookInfo>
            <div>
                <span className="material-icons-sharp">
                    style
                </span>
                단어 {wordbook.wordCount} 개
            </div>
            <div>
                <span className="material-icons-sharp" onClick={() => setVocaMode(VocaMode.EDIT)}>
                    event
                </span>
                <span>{ISOStringToDateString(wordbook.createdAt)}</span>
            </div>
        </WordbookInfo>
        <DefaultListElement>
            <div>준비</div>
            <span>
                영어 단어와 한국어 뜻 작성
                <ChildListElement>완전 다른 뜻은 칸을 나눠 작성</ChildListElement>
                <ChildListElement>같은 칸 안에 <b>,(쉼표)</b>로 뜻이 구분된 경우 하나만 적어도 테스트 통과</ChildListElement>
            </span>
        </DefaultListElement>
        <DefaultListElement>
            <div>학습</div>
            <span>암기: 영어 단어만 보고 한국어 뜻을 떠올리고, 맞았는지 확인하기
                <ChildListElement>반복적으로 학습해도 잘 외워지지 않는 단어는 +로 체크 표시</ChildListElement>
            </span>
            <span>체크된 단어만 다시 암기
                <ChildListElement>그래도 안 외워지는 단어는 체크 표시 한 번 더</ChildListElement>
            </span>
            <span>(반복) n번 체크된 단어만 다시 암기
                <ChildListElement>안 외워지는 단어 체크 표시 추가 </ChildListElement>
            </span>
            <span>체크가 4~5개가 누적되면 학습 끝</span>
        </DefaultListElement>
        <DefaultListElement>
            <div>마무리 학습</div>
            <span>전체 단어 테스트 진행 후 틀린 단어만 모아서 한 번 더 외우기</span>
        </DefaultListElement>
        <ReverseButton onClick={() => setVocaMode(VocaMode.TEST)}>테스트 시작</ReverseButton>
    </VocaSidebarContainer>
  );
}

export default VocaSidebar;