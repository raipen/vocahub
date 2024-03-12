import { WordbookInfo, WordbookMenu, WordbookName, AddWordbookContainer, Input, ButtonContainingIcon, ReverseButtonContainingIcon  } from './index';
import useFetchUpdate from "@hooks/useFetchUpdate";
import { addWordbook } from '@utils/apis/wordbook';
import { useContext,useRef } from 'react';
import { WordbookListContext } from '@context/WordbookListContext';
import WordbookDetailInfo from './WordbookDetailInfo';

function AddWordbookList({setNewWordbook}: {setNewWordbook: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [loadingWordbook, fetchWordbook] = useFetchUpdate(addWordbook);
  const { setData } = useContext(WordbookListContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickAdd = async () => {
    const name = inputRef.current?.value;
    if (name) {
      const wordbookData = await fetchWordbook(name);
      setData(([profile]) => [profile, wordbookData]);
      setNewWordbook(false);
    }
  }
  return (
    <AddWordbookContainer>
      <WordbookInfo>
        <WordbookName>
          <span className="material-icons-sharp">
            menu_book
          </span>
          <Input placeholder="단어장 이름(ex. 토익 day1)" ref={inputRef} style={{marginBottom: '10px'}}/>
        </WordbookName>
        <WordbookDetailInfo createdAt={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString()} vocaCount={0} />
      </WordbookInfo>
      <WordbookMenu>
        {!loadingWordbook && (
          <>
            <ButtonContainingIcon onClick={onClickAdd}>
              <span>생성</span>
            </ButtonContainingIcon>
            <ReverseButtonContainingIcon onClick={() => setNewWordbook(false)}>
              <span>취소</span>
            </ReverseButtonContainingIcon>
          </>
        )}
        {loadingWordbook && <span className="material-icons-sharp">hourglass_bottom</span>}
        {loadingWordbook && <span>단어장 생성중</span>}
      </WordbookMenu>
    </AddWordbookContainer>
  )
}

export default AddWordbookList;
