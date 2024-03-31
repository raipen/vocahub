import { WordbookInfo, WordbookMenu, WordbookName, WordbookContainer, Input, ButtonContainingIcon, ReverseButtonContainingIcon } from '../index';
import { Link } from 'react-router-dom';
import useFetchUpdate from "@hooks/useFetchUpdate";
import { hideWordbook,showWordbook, deleteWordbook, renameWordbook } from '@utils/apis/wordbook';
import { useContext,useState } from 'react';
import WordbookListContext from '@context/WordbookListContext';
import WordbookDetailInfo from './WordbookDetailInfo';

function WordbookElement({ wordbook: { uuid, title, isHidden, createdAt, vocaCount } }: {
  wordbook: {
    uuid: string;
    title: string;
    isHidden: boolean;
    createdAt: string;
    vocaCount: number;
  }
}) {
  const [loadingWordbook, fetchWordbook] = useFetchUpdate(isHidden ? showWordbook : hideWordbook);
  const [loadingDelete, fetchDelete] = useFetchUpdate(deleteWordbook);
  const [loadingRename, fetchRename] = useFetchUpdate(renameWordbook);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const { onClickWordbookElement } = useContext(WordbookListContext);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  }

  const onClickDelete = async () => {
    if (!window.confirm('정말로 삭제하시겠습니까? 단어장 내부의 단어들도 모두 삭제됩니다.')) return;
    await onClickWordbookElement(fetchDelete, uuid)();
  }

  const startRename = () => {
    setIsEditing(true);
    setNewTitle(title);
  }
  const cancelRename = () => {
    setIsEditing(false);
    setNewTitle(title);
  }
  const onClickRename = async () => {
    await onClickWordbookElement(fetchRename, uuid, newTitle)();
    setIsEditing(false);
  }
  const onClickVisibility = onClickWordbookElement(fetchWordbook, uuid);

  const isLoading = loadingWordbook || loadingDelete || loadingRename;
  return (
    <WordbookContainer>
      <WordbookInfo>
        <WordbookName>
          <span className="material-icons-sharp">
            menu_book
          </span>
          {!isEditing&&<Link to={`/vocalist/${uuid}`}>{title}</Link>}
          {isEditing&&<Input type="text" value={newTitle} onChange={onChangeTitle} />}
        </WordbookName>
        <WordbookDetailInfo createdAt={createdAt} vocaCount={vocaCount} />
      </WordbookInfo>
      <WordbookMenu>
        {!isLoading && !isEditing && [
          !isHidden&&<span key="edit" className="material-icons-sharp" onClick={startRename}>edit</span>,
          <span key="visibility" className="material-icons-sharp" onClick={onClickVisibility}>{isHidden ? "visibility" : "visibility_off"}</span>,
          isHidden&&<span key="delete" className="material-icons-sharp" onClick={onClickDelete}>delete</span>,
        ]}
        {loadingWordbook && [<span key="icon" className="material-icons-sharp">hourglass_bottom</span>, <span key="text">이동 중</span>]}
        {loadingDelete && [<span key="icon" className="material-icons-sharp">hourglass_bottom</span>, <span key="text">삭제 중</span>]}
        {isEditing && !loadingRename && [
          <ButtonContainingIcon key="rename" onClick={onClickRename}><span>변경</span></ButtonContainingIcon>,
          <ReverseButtonContainingIcon key="cancel" onClick={cancelRename}><span>취소</span></ReverseButtonContainingIcon>
        ]}
        {loadingRename && [<span key="icon" className="material-icons-sharp">hourglass_bottom</span>, <span key="text">변경 중</span>]}

      </WordbookMenu>
    </WordbookContainer>
  )
}

export default WordbookElement;
