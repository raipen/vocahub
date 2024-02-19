import { useState } from "react";
import { ButtonContainingIcon, WordbookListContainer, Title } from './index';
import AddWordbook from './AddWordbook';

function WordbookList({children}: {children: React.ReactNode}) {
  const [newWordbook, setNewWordbook] = useState(false);

  return (
    <WordbookListContainer>
      <Title>
        <span>내 단어장</span>
        {!newWordbook && <ButtonContainingIcon onClick={() => setNewWordbook(true)}>
          <span className="material-icons-sharp">
            menu_book
          </span>
          <span>New</span>
        </ButtonContainingIcon>}
      </Title>
      {newWordbook && <AddWordbook setNewWordbook={setNewWordbook} />}
      {children}
    </WordbookListContainer>
  );
}

export default WordbookList;
