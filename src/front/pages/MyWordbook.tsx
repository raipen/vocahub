import { MainContainer } from "@components";
import { WordbookListContext, useInitWordbookList } from "@context/WordbookListContext";
import { Navigate } from "react-router-dom";
import Profile from "@components/Profile";
import WordbookList from "@components/WordbookList";
import HiddenWordbookList from "@components/HiddenWordbookList";
import WordbookListElement from "@components/WordbookListElement";
import ErrorConfigs from "@errors/config";

function MyWordbook() {
  const { data, setData, Error } = useInitWordbookList();
  if(Error) {
    const errorConfig = ErrorConfigs[Error.name];
    if(errorConfig)
      return <Navigate to="/error" state={{message: errorConfig.toast(Error)}} />
    return <Navigate to="/error" state={{message: "알 수 없는 오류가 발생했습니다."}} />
  }
  const [profile, {wordbookList, hiddenWordbookList}] = data;
  return (
    <WordbookListContext.Provider value={{data, setData}}>
      <MainContainer $flexdirection="row">
        <Profile profile={profile} />
        <WordbookList>
          {wordbookList.map((wordbook, index) =><WordbookListElement key={index} wordbook={wordbook}/>)}
        </WordbookList>
        <HiddenWordbookList>
          {hiddenWordbookList.map((wordbook, index) =><WordbookListElement key={index} wordbook={wordbook}/>)}
        </HiddenWordbookList>
      </MainContainer>
    </WordbookListContext.Provider>
  );
}

export default MyWordbook;
