import styled from 'styled-components';

export const Button = styled.button`
    background-color: white;
    color: var(--main-color);
    border: 1px solid var(--main-color);
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    font-weight: bold;
    font-size: 1rem;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    &:hover {
        background-color: var(--main-color);
        color: white;
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