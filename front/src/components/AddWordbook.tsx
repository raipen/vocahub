import { WordbookInfo, WordbookMenu, WordbookName, WordbookContainer, Input, NewButton, CancelButton  } from './index';
import useFetchUpdate from "@hooks/useFetchUpdate";
import { addWordbook } from '@utils/apis/wordbookmock';
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
    <WordbookContainer>
      <WordbookInfo>
        <WordbookName>
          <span className="material-icons-sharp">
            menu_book
          </span>
          <Input placeholder="단어장 이름(ex. 토익 day1)" ref={inputRef} />
        </WordbookName>
        <WordbookDetailInfo createdAt={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString()} vocaCount={0} />
      </WordbookInfo>
      <WordbookMenu>
        {!loadingWordbook && (
          <>
            <NewButton onClick={onClickAdd}>
              <span>생성</span>
            </NewButton>
            <CancelButton onClick={() => setNewWordbook(false)}>
              <span>취소</span>
            </CancelButton>
          </>
        )}
        {loadingWordbook && <span className="material-icons-sharp">hourglass_bottom</span>}
        {loadingWordbook && <span>단어장 생성중</span>}
      </WordbookMenu>
    </WordbookContainer>
  )
}

export default AddWordbookList;
