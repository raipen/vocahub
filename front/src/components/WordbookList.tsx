import { useState } from "react";
import { NewButton } from './WordbookListStyle';
import { WordbookListContainer, WordbookListTitle } from './index';
import AddWordbook from './AddWordbook';

function WordbookList({children}: {children: React.ReactNode}) {
  const [newWordbook, setNewWordbook] = useState(false);

  return (
    <WordbookListContainer>
      <WordbookListTitle>
        <span>내 단어장</span>
        {!newWordbook && <NewButton onClick={() => setNewWordbook(true)}>
          <span className="material-icons-sharp">
            menu_book
          </span>
          <span>New</span>
        </NewButton>}
      </WordbookListTitle>
      {newWordbook && <AddWordbook setNewWordbook={setNewWordbook} />}
      {children}
    </WordbookListContainer>
  );
}

export default WordbookList;
