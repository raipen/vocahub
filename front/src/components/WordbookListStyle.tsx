import styled from 'styled-components';

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  font-weight: 300;
  padding: 5px 20px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  >span:first-child {
    font-size: 1rem;
  }
`;

const NewButton = styled(Button)`
  background-color: var(--main-color);
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: white;
  color: var(--main-color);
  border: 1px solid var(--main-color);
`;

export { NewButton, CancelButton };
