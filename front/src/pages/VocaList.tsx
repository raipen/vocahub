import { MainContainer } from "@components";
import { useParams,Navigate } from "react-router-dom";
import { getVocaList } from "@apis/wordbook";
import useFetchWithRendering from "@hooks/useFetchWithRendering";

function MyWordbook() {
  const { wordbookId } = useParams();
  const [vocaList, vocaListError] = useFetchWithRendering(getVocaList, wordbookId);
  if(vocaListError) return <Navigate to="/error" state={vocaListError} />;
  console.log("vocaList", vocaList);
  return (
    <MainContainer flexdirection="row">
      
    </MainContainer>
  );
}

export default MyWordbook;
