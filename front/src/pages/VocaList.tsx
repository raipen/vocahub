import { MainContainer } from "@components";
import { useParams,Navigate } from "react-router-dom";
import { getVocaList } from "@apis/wordbook";
import useFetchWithRendering from "@hooks/useFetchWithRendering";

function MyWordbook() {
  const { wordbookId } = useParams();
  const [vocaList, vocaListError] = useFetchWithRendering(getVocaList, wordbookId);
  if(vocaListError) return <Navigate to="/error" state={{message:vocaListError.toast}} />;
  return (
    <MainContainer flexdirection="row">
      
    </MainContainer>
  );
}

export default MyWordbook;
