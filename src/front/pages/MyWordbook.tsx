import { MainContainer } from "@components";
import WordbookListContext from "@context/WordbookListContext";
import useWordbookData from "@hooks/useWordbookData";
import { Navigate } from "react-router-dom";
import Profile from "@components/Profile";
import MyWordbookTitle from "@components/MyWordbookTitle";
import HiddenWordbookTitle from "@components/HiddenWordbookTitle";
import WordbookElement from "@components/WordbookElement";
import { WordbookListContainer } from "@components";
import ErrorConfigs from "@errors/config";

function MyWordbook() {
  const { profile, wordbookList, hiddenWordbookList, onClickWordbookElement, Error } = useWordbookData();
  if(Error) {
    const errorConfig = ErrorConfigs[Error.name];
    if(errorConfig)
      return <Navigate to="/error" state={{message: errorConfig.toast(Error)}} />
    return <Navigate to="/error" state={{message: "알 수 없는 오류가 발생했습니다."}} />
  }
  return (
    <WordbookListContext.Provider value={{profile, onClickWordbookElement}}>
      <MainContainer $flexdirection="row">
        <Profile/>
        <WordbookListContainer>
          <MyWordbookTitle/>
          {wordbookList.map((wordbook, index) =><WordbookElement key={index} wordbook={wordbook}/>)}
        </WordbookListContainer>
        <WordbookListContainer>
          <HiddenWordbookTitle/>
          {hiddenWordbookList.map((wordbook, index) =><WordbookElement key={index} wordbook={wordbook}/>)}
        </WordbookListContainer>
      </MainContainer>
    </WordbookListContext.Provider>
  );
}

export default MyWordbook;
