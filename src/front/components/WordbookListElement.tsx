import { WordbookInfo, WordbookMenu, WordbookName, WordbookContainer } from './index';
import { Link } from 'react-router-dom';
import useFetchUpdate from "@hooks/useFetchUpdate";
import { hideWordbook,showWordbook } from '@utils/apis/wordbook';
import { useContext } from 'react';
import { WordbookListContext } from '@context/WordbookListContext';
import WordbookDetailInfo from './WordbookDetailInfo';

function WordbookListElement({ wordbook: { id, title, isHidden, createdAt, vocaCount } }: {
  wordbook: {
    id: number;
    title: string;
    isHidden: boolean;
    createdAt: string;
    vocaCount: number;
  }
}) {
  const [loadingWordbook, fetchWordbook] = useFetchUpdate(isHidden ? showWordbook : hideWordbook);
  const { setData } = useContext(WordbookListContext);

  const onClick = async () => {
    const data = await fetchWordbook(id);
    setData(([profile])=>[profile, data]);
  }
  return (
    <WordbookContainer>
      <WordbookInfo>
        <WordbookName>
          <span className="material-icons-sharp">
            menu_book
          </span>
          <Link to={`/vocalist/${id}`}>{title}</Link>
        </WordbookName>
        <WordbookDetailInfo createdAt={createdAt} vocaCount={vocaCount} />
      </WordbookInfo>
      <WordbookMenu>
        {!loadingWordbook && <span className="material-icons-sharp" onClick={onClick}>{isHidden ? "visibility" : "visibility_off"}</span>}
        {loadingWordbook && <span className="material-icons-sharp">hourglass_bottom</span>}
        {loadingWordbook && <span>이동 중</span>}
      </WordbookMenu>
    </WordbookContainer>
  )
}

export default WordbookListElement;
