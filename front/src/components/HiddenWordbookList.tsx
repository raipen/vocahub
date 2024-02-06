import styled from 'styled-components';
import { useState } from 'react';

const WordbookListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: calc(100% - 220px);
  margin-left: auto;
  padding: 10px 15px 0;
  height: 100%;
  border-bottom: 1px solid var(--main-color);
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

  &:first-child {
    border-top: none;
  }
  
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
        &>span:last-child {
            color: var(--main-color);
            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
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
    align-items: center;
    font-weight: 300;
    color: var(--muted-text-color);
    user-select: none;
    cursor: pointer;
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
  border-radius: 5px;
    cursor: pointer;
    >span:first-child {
        font-size: 2rem;
    }
`;

function ISOStringToDateString(isoString: string) {
    const date = isoString.split('T')[0];
    return date.split('-').join('.');
}

function WordbookList({ wordbooks }: {
    wordbooks: {
        id: number;
        userId: number;
        name: string;
        createdAt: string;
        isHidden: boolean;
        vocaCount: number;
    }[]
}) {
    return (
        <WordbookListContainer>
            <MyWordbook>
                <span>숨긴 단어장</span>
                <Expend>
                    <span className="material-icons-sharp">
                        expand_more
                    </span>
                </Expend>
            </MyWordbook>
            {wordbooks.map((wordbook, index) => (
                <Wordbook key={index}>
                    <div>
                        <div>
                            <span className="material-icons-sharp">
                                menu_book
                            </span>
                            <span>{wordbook.name}</span>
                        </div>
                        <div>
                            <div>
                                <span className="material-icons-sharp">
                                    style
                                </span>
                                <span>단어 <b>{wordbook.vocaCount}</b>개</span>
                            </div>
                            <div>
                                <span className="material-icons-sharp">
                                    event
                                </span>
                                <span>{ISOStringToDateString(wordbook.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="material-icons-sharp">
                            visibility_off
                        </span>
                    </div>
                </Wordbook>
            ))}
        </WordbookListContainer>
    );
}

export default WordbookList;