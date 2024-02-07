import { MainContainer } from "@components";
import { getDatasWhenWordbookRender } from "@utils/apis/wordbook";
import { Navigate } from "react-router-dom";
import useFetchWithRendering from "@hooks/useFetchWithRendering";
import Profile from "@components/Profile";
import WordbookList from "@components/WordbookList";
import HiddenWordbookList from "@components/HiddenWordbookList";

function MyWordbook() {
  let [datas, Error] = useFetchWithRendering(getDatasWhenWordbookRender);
  if(Error) return <Navigate to="/error" state={{message:Error.toast}} />;
  if(!datas) datas = [{name: 'Loading', wordbookCount: 0, vocaCount: 0, loginDate: []}, [], []];
  const [profile, wordbooks, hiddenWordbooks] = datas;
  return (
    <MainContainer flexdirection="row">
      <Profile profile={profile} />
      <WordbookList wordbooks={wordbooks} />
      <HiddenWordbookList wordbooks={hiddenWordbooks} />
    </MainContainer>
  );
}

export default MyWordbook;
