import styled from 'styled-components';

const WordbookListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100% - 220px);
  padding: 10px 15px;
  height: 100%;
  margin-left: auto;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const MyWordbook = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 10px;
`;

const Wordbook = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
    align-items: center;
  margin-bottom: 10px;
  border-top: 1px solid var(--main-color);
  padding: 10px;
  
  &>div:first-child{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 1rem;
    font-weight: 300;
    color: var(--muted-text-color);
    &>div:first-child {
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
    }
    &>div:nth-child(2) {
        display: flex;
        align-items: center;
        font-size: 1rem;
        font-weight: 300;
        gap: 20px;
        .material-icons-sharp{
            font-size: 1rem;
            margin-right: 5px;
        }
    }
  }
  &>div:last-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 300;
    color: var(--muted-text-color);
    user-select: none;
    cursor: pointer;
    gap: 10px;
  }
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

const CancelButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  font-weight: 300;
  background-color: white;
  color: var(--main-color);
  border: 1px solid var(--main-color);
  padding: 5px 20px;
  font-weight: 600;
  border-radius: 5px;
    cursor: pointer;
    >span:first-child {
        font-size: 1rem;
    }
`;

const Expend = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  font-weight: 300;
  color: var(--main-color);
  padding: 5px 20px;
  font-weight: 600;
  user-select: none;
  border-radius: 5px;
    cursor: pointer;
    >span:first-child {
        font-size: 2rem;
    }
`;

export { WordbookListContainer, MyWordbook, Wordbook, NewButton, CancelButton, Expend };