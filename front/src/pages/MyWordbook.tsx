import { MainContainer } from "@components";
import { getProfile } from "@utils/apis/wordbook";
import useFetchWithRendering from "@hooks/useFetchWithRendering";

function MyWordbook() {
  const [profile, profileLoading, profileError] = useFetchWithRendering(getProfile);
  console.log(profile, profileLoading, profileError);
  return (
    <MainContainer>
      MyWordbook
    </MainContainer>
  );
}

export default MyWordbook;
