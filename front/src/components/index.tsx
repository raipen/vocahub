import styled,{css} from 'styled-components';

const FlexRowCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexRowSpaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexColumnStart = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MainColorBackground = css`
  background-color: var(--main-color);
  color: white;
  border: 1px solid var(--main-color);
  border-radius: 5px;
`;

const ReverseMainColorBackground = css`
  background-color: white;
  color: var(--main-color);
  border: 1px solid var(--main-color);
  border-radius: 5px;
`;

const clickable = css`
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
`;

const ButtonCss = css`
  ${FlexRowCenter};
  ${clickable};
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
`;

export const HeaderButton = styled.button`
  ${ButtonCss};
  ${ReverseMainColorBackground};
  &:hover {
    ${MainColorBackground};
  }
`;

export const ReverseButton = styled.div`
  ${ButtonCss};
  ${MainColorBackground};
  &:hover {
    ${ReverseMainColorBackground};
  }
`;

export const NewButton = styled.div`
  ${ButtonCss};
  ${MainColorBackground};
  padding: 5px 20px;
  gap: 10px;
  >span:first-child {
    font-size: 1rem;
  }
`;

export const CancelButton = styled.div`
  ${ButtonCss};
  ${ReverseMainColorBackground};
  padding: 5px 20px;
  >span:first-child {
    font-size: 1rem;
  }
`;

export const MainContainer = styled.main<{ $background?: string, $flexdirection?: string }>`
  padding: 20px max(30px, calc(50% - 590px));
  width: 100%;
  display: flex;
  flex-direction: ${props => props.$flexdirection || 'column'};
  background-color: ${props => props.$background || 'white'};
  gap: 20px;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  margin: 10px 0;
  &:focus {
    outline: none;
    border: 1px solid var(--main-color);
  }
`;

export const WordbookListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 220px);
  padding: 10px 15px;
  height: 100%;
  margin-left: auto;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const WordbookListTitle = styled.div`
  ${FlexRowSpaceBetween};
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 10px;
`;

export const Expend = styled.span`
  ${clickable};
  color: var(--main-color);
  padding: 5px 20px;
  font-size: 2rem;
`;

export const WordbookContainer = styled.div`
  ${FlexRowSpaceBetween};
  margin-bottom: 10px;
  border-top: 1px solid var(--main-color);
  padding: 10px;
`;

export const WordbookMenu = styled.div`
  ${FlexColumnCenter};
  ${clickable};
  color: var(--muted-text-color);
  font-weight: 300;
  gap: 10px;
`;

export const WordbookInfo = styled.div`
  ${FlexColumnStart};
  font-size: 1rem;
  font-weight: 300;
  color: var(--muted-text-color);
`;

export const WordbookName = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  &>a:last-child {
    color: var(--main-color);
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  &>input{
    font-weight: 600;
  }
  &>.material-icons-sharp{
    font-size: 1rem;
    margin-right: 5px;
  }
`;
