import { MainContainer } from "@components";
import VocaListContext from "@context/VocaListContext";
import useVocaListData from "@hooks/useVocaListData";
import { useParams,Navigate } from "react-router-dom";
import { VocaMode } from "@utils/vocaModeEnum";
import ViewVocaList from "@components/vocaList/ViewVocaList";
import EditVocaList from "@components/vocaList/EditVocaList";
import TestVocaList from "@components/vocaList/TestVocaList";
import VocaSidebar from "@components/vocaList/VocaSidebar";
import ErrorConfigs from "@errors/config";

const VocaModeWithComponent = [
  [VocaMode.VIEW, ViewVocaList],
  [VocaMode.EDIT, EditVocaList],
  [VocaMode.TEST, TestVocaList]
] as const;

function VocaList() {
  const { wordbookId } = useParams();
  const { isLoading, vocaListError, ...rest} = useVocaListData(wordbookId!);
  if(vocaListError) {
    const errorConfig = ErrorConfigs[vocaListError.name];
    if(errorConfig)
      return <Navigate to="/error" state={{message: errorConfig.toast(vocaListError)}} />
    return <Navigate to="/error" state={{message: "알 수 없는 오류가 발생했습니다."}} />
  }

  return (
    <VocaListContext.Provider value={rest}>
      <MainContainer $flexdirection="row">
        <VocaSidebar/>
        {isLoading && <div></div>}
        {!isLoading &&
          VocaModeWithComponent.map(([mode, Component], i) =>
            rest.vocaMode === mode && <Component key={i}/>
          )
        }
      </MainContainer>
    </VocaListContext.Provider>
  );
}

export default VocaList;
