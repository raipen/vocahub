import styled from 'styled-components';

const VocaListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: fit-content;
  max-width: calc(100% - 320px);
  padding: 10px 15px;
  height: 100%;
  margin-left: auto;
  @media (max-width: 750px) {
    width: 100%;
    max-width: none;
    padding: 0;
  }
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 10px;
`;

const NewButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  font-weight: 300;
  background-color: var(--main-color);
  color: white;
  padding: 5px 20px;
  font-weight: 600;
  border-radius: 5px;
    cursor: pointer;
    >span:first-child {
        font-size: 1rem;
    }
`;

export { VocaListContainer, Title, NewButton };