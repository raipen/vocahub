import { MainContainer } from "@components";
import { WordbookListContext, useInitWordbookList } from "@context/WordbookListContext";
import { Navigate } from "react-router-dom";
import Profile from "@components/Profile";
import WordbookList from "@components/WordbookList";
import HiddenWordbookList from "@components/HiddenWordbookList";
import WordbookListElement from "@components/WordbookListElement";

function MyWordbook() {
  const { data, setData, Error } = useInitWordbookList();
  if(Error) return <Navigate to="/error" state={{message:Error.toast}} />;
  const [profile, [wordbooks, hiddenWordbooks]] = data;
  return (
    <WordbookListContext.Provider value={{data, setData}}>
      <MainContainer $flexdirection="row">
        <Profile profile={profile} />
        <WordbookList>
          {wordbooks.map((wordbook, index) =><WordbookListElement key={index} wordbook={wordbook}/>)}
        </WordbookList>
        <HiddenWordbookList>
          {hiddenWordbooks.map((wordbook, index) =><WordbookListElement key={index} wordbook={wordbook}/>)}
        </HiddenWordbookList>
      </MainContainer>
    </WordbookListContext.Provider>
  );
}

export default MyWordbook;
