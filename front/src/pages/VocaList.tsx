import { MainContainer } from "@components";
import { VocaListContext, useInitVocaList } from "@context/VocaListContext";
import { useState,useEffect } from "react";
import { useParams,Navigate } from "react-router-dom";
import { VocaMode } from "@utils/vocaModeEnum";
import ViewVocaList from "@components/ViewVocaList";
import EditVocaList from "@components/EditVocaList";
import TestVocaList from "@components/TestVocaList";
import VocaSidebar from "@components/VocaSidebar";

function VocaList() {
  const { wordbookId } = useParams();
  const { vocaList, setVocaList, vocaListError } = useInitVocaList(parseInt(wordbookId!));
  const [ vocaMode, setVocaMode ] = useState(VocaMode.EDIT);
  useEffect(() => {
    if(vocaList.voca.length > 0) setVocaMode(VocaMode.VIEW);
  }, [vocaList]);
  if(vocaListError) return <Navigate to="/error" state={{message:vocaListError.toast}} />;

  console.log(vocaList);
  const wordbook = {...vocaList.wordbook, wordCount:vocaList.voca.length};

  return (
    <VocaListContext.Provider value={{vocaList, setVocaList}}>
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
    </VocaListContext.Provider>
  );
}

export default VocaList;
