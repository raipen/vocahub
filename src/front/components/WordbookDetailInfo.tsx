import { ISOStringToDateString } from '@utils';
import { styled } from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 300;
  gap: 20px;
  .material-icons-sharp{
    font-size: 1rem;
    margin-right: 5px;
  }
`;

function WordbookDetailInfo({createdAt, vocaCount }: {
    createdAt: string;
    vocaCount: number;
}) {
  return (
    <Container>
      <div>
        <span className="material-icons-sharp">
          style
        </span>
        <span>단어 <b>{vocaCount}</b>개</span>
      </div>
      <div>
        <span className="material-icons-sharp">
          event
        </span>
        <span>{ISOStringToDateString(createdAt)}</span>
      </div>
    </Container>
  )
}

export default WordbookDetailInfo;
