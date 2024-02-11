import styled from 'styled-components';

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    background-color: white;
    color: var(--main-color);
    border: 1px solid var(--main-color);
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    text-decoration: none;
    &:hover {
        background-color: var(--main-color);
        color: white;
    }
`;

export const ReverseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  background-color: var(--main-color);
  color: white;
  border: 1px solid var(--main-color);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
  &:hover {
      background-color: white;
      color: var(--main-color);
  }
`;

export const MainContainer = styled.main<{ background?: string, flexdirection?: string }>`
  padding: 20px max(30px, calc(50% - 590px));
  width: 100%;
  display: flex;
  flex-direction: ${props => props.flexdirection || 'column'};
  background-color: ${props => props.background || 'white'};
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 10px;
`;

export const Expend = styled.span`
  color: var(--main-color);
  padding: 5px 20px;
  user-select: none;
  cursor: pointer;
  font-size: 2rem;
`;

export const WordbookContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-top: 1px solid var(--main-color);
  padding: 10px;
`;

export const WordbookMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 300;
  color: var(--muted-text-color);
  user-select: none;
  cursor: pointer;
  gap: 10px;
`;

export const WordbookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
