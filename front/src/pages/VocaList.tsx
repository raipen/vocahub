import { MainContainer } from "@components";
import { VocaListContext, useInitVocaList } from "@context/VocaListContext";
import { useState,useEffect } from "react";
import { useParams,Navigate } from "react-router-dom";
import { VocaMode } from "@utils/vocaModeEnum";
import ViewVocaList from "@components/ViewVocaList";
import EditVocaList from "@components/EditVocaList";
import TestVocaList from "@components/TestVocaList";
import VocaSidebar from "@components/VocaSidebar";

const VocaModeWithComponent = [
  [VocaMode.VIEW, ViewVocaList],
  [VocaMode.EDIT, EditVocaList],
  [VocaMode.TEST, TestVocaList]
] as const;

function VocaList() {
  const { wordbookId } = useParams();
  const { wordbook, vocaList, setVocaList, vocaListError } = useInitVocaList(parseInt(wordbookId!));
  const [ vocaMode, setVocaMode ] = useState(VocaMode.EDIT);
  useEffect(() => {
    if(vocaList.length > 0) setVocaMode(VocaMode.VIEW);
  }, [vocaList]);
  if(vocaListError) return <Navigate to="/error" state={{message:vocaListError.toast}} />;

  return (
    <VocaListContext.Provider value={{vocaList, setVocaList, wordbookId:wordbook.id}}>
      <MainContainer $flexdirection="row">
        <VocaSidebar setVocaMode={setVocaMode} wordbook={{...wordbook, wordCount:vocaList.length}} />
        {vocaList === null && <div></div>}
        {vocaList !== null &&
          VocaModeWithComponent.map(([mode, Component], i) =>
            vocaMode === mode && <Component key={i} setVocaMode={setVocaMode} />
          )
        }
      </MainContainer>
    </VocaListContext.Provider>
  );
}

export default VocaList;
