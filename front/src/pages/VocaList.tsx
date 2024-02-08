import { MainContainer } from "@components";
import { useState,useEffect } from "react";
import { useParams,Navigate } from "react-router-dom";
import { getVocaList } from "@apis/wordbook";
import { VocaMode } from "@utils/vocaModeEnum";
import useFetchWithRendering from "@hooks/useFetchWithRendering";
import ViewVocaList from "@components/ViewVocaList";
import EditVocaList from "@components/EditVocaList";
import TestVocaList from "@components/TestVocaList";
import VocaSidebar from "@components/VocaSidebar";

function MyWordbook() {
  const { wordbookId } = useParams();
  const [vocaList, vocaListError] = useFetchWithRendering(getVocaList, wordbookId);
  const [vocaMode, setVocaMode] = useState(VocaMode.VIEW);
  useEffect(() => {
    if(vocaList !== null && vocaList.voca.length === 0) setVocaMode(VocaMode.EDIT);
  }, [vocaList]);

  if(vocaListError) return <Navigate to="/error" state={{message:vocaListError.toast}} />;

  const wordbook = vocaList ? {...vocaList.wordbook, wordCount:vocaList.voca.length} : {name: '', createdAt: '', wordCount: 0};

  return (
    <MainContainer flexdirection="row">
      <VocaSidebar setVocaMode={setVocaMode} wordbook={wordbook} />
      {vocaList === null && <div></div>}
      {vocaList !== null && (
        <>
          {vocaMode === VocaMode.VIEW && <ViewVocaList vocaList={vocaList.voca} setVocaMode={setVocaMode} />}
          {vocaMode === VocaMode.EDIT && <EditVocaList vocaList={vocaList.voca} wordbookId={parseInt(wordbookId!)} setVocaMode={setVocaMode} />}
          {vocaMode === VocaMode.TEST && <TestVocaList vocaList={vocaList.voca} setVocaMode={setVocaMode} />}
        </>
      )}
    </MainContainer>
  );
}

export default MyWordbook;
