import { useState } from "react";
import { ButtonContainingIcon, Title } from './index';
import AddWordbook from './AddWordbook';

function MyWordbookTitle() {
  const [newWordbook, setNewWordbook] = useState(false);
  
  return [<Title key="title">
        <span>내 단어장</span>
        {!newWordbook && <ButtonContainingIcon onClick={() => setNewWordbook(true)}>
          <span className="material-icons-sharp">
            menu_book
          </span>
          <span>New</span>
        </ButtonContainingIcon>}
      </Title>, newWordbook && <AddWordbook key="add" setNewWordbook={setNewWordbook} />]
}

export default MyWordbookTitle;
