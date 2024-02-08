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