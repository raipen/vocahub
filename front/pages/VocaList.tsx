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
  const { isLoading, wordbook, vocaList, setVocaList, vocaListError } = useInitVocaList(parseInt(wordbookId!));
  const [ vocaMode, setVocaMode ] = useState(VocaMode.EDIT);
  useEffect(() => {
    if(vocaList.length > 0) setVocaMode(VocaMode.VIEW);
    // eslint-disable-next-line
  }, [isLoading]);
  if(vocaListError) return <Navigate to="/error" state={{message:vocaListError.toast}} />;

  return (
    <VocaListContext.Provider value={{vocaList, setVocaList, wordbookId:wordbook.id}}>
      <MainContainer $flexdirection="row">
        <VocaSidebar vocaMode={vocaMode} setVocaMode={setVocaMode} wordbook={{...wordbook, wordCount:vocaList.length}} />
        {isLoading && <div></div>}
        {!isLoading &&
          VocaModeWithComponent.map(([mode, Component], i) =>
            vocaMode === mode && <Component key={i} setVocaMode={setVocaMode} />
          )
        }
      </MainContainer>
    </VocaListContext.Provider>
  );
}

export default VocaList;
