import { MainContainer } from "@components";
import { getDatasWhenWordbookRender } from "@utils/apis/wordbook";
import useFetchWithRendering from "@hooks/useFetchWithRendering";
import Profile from "@components/Profile";
import WordbookList from "@components/WordbookList";
import HiddenWordbookList from "@components/HiddenWordbookList";

function MyWordbook() {
  let [datas, Error] = useFetchWithRendering(getDatasWhenWordbookRender);
  if(Error) return <div>Error</div>;
  if(!datas) datas = [{name: 'Loading', wordbookCount: 0, vocaCount: 0, loginDate: []}, [], []];
  const [profile, wordbooks, hiddenWordbooks] = datas;
  console.log("MyWordbook", profile, wordbooks, hiddenWordbooks);
  return (
    <MainContainer flexdirection="row">
      <Profile profile={profile} />
      <WordbookList wordbooks={wordbooks} />
      <HiddenWordbookList wordbooks={hiddenWordbooks} />
    </MainContainer>
  );
}

export default MyWordbook;
