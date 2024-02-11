import styled from 'styled-components';
import { VocaMode } from "@utils/vocaModeEnum";

function EditVocaList({vocaList, setVocaMode,wordbookId}: {vocaList: {
    id: number;
    bookId: number;
    word: string;
    meaning: string[];
    checkCount: number;
    testResult: boolean | null;
    order: number;
}[], setVocaMode: React.Dispatch<React.SetStateAction<VocaMode>>, wordbookId: number}) {
  return (
    <div>
    </div>
  );
}

export default EditVocaList;
