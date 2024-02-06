import { MainContainer } from "@components";
import { getProfile } from "@utils/apis/wordbook";
import useFetchWithRendering from "@hooks/useFetchWithRendering";
import Profile from "@components/Profile";

function MyWordbook() {
  const [profile, profileLoading, profileError] = useFetchWithRendering(getProfile);
  console.log(profile, profileLoading, profileError);
  return (
    <MainContainer flexdirection="row">
      <Profile profile={profile || {name: 'Loading', wordbookCount: 0, vocaCount: 0, loginDate: []}} />
    </MainContainer>
  );
}

export default MyWordbook;
