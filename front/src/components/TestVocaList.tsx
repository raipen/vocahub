import styled from 'styled-components';
import { VocaMode } from "@utils/vocaModeEnum";

function TestVocaList({vocaList, setVocaMode}: {vocaList: {
    id: number;
    bookId: number;
    word: string;
    meaning: string[];
    checkCount: number;
    testResult: boolean | null;
    order: number;
}[], setVocaMode: React.Dispatch<React.SetStateAction<VocaMode>>}) {
  return (
    <div>
    </div>
  );
}

export default TestVocaList;