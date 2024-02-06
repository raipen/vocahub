import { MainContainer } from "@components";
import { getProfile,getWordbookList,getHiddenWordbookList } from "@utils/apis/wordbook";
import useFetchWithRendering from "@hooks/useFetchWithRendering";
import Profile from "@components/Profile";
import WordbookList from "@components/WordbookList";
import HiddenWordbookList from "@components/HiddenWordbookList";

function MyWordbook() {
  const [profile, profileError] = useFetchWithRendering(getProfile);
  const [wordbooks, wordbooksError] = useFetchWithRendering(getWordbookList);
  const [hiddenWordbooks, hiddenWordbooksError] = useFetchWithRendering(getHiddenWordbookList);
  return (
    <MainContainer flexdirection="row">
      <Profile profile={profile || {name: 'Loading', wordbookCount: 0, vocaCount: 0, loginDate: []}} />
      <WordbookList wordbooks={wordbooks || []} />
      <HiddenWordbookList wordbooks={hiddenWordbooks || []} />
    </MainContainer>
  );
}

export default MyWordbook;
