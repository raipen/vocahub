import { useState, useRef } from "react";
import useFetchUpdate from "@hooks/useFetchUpdate";
import { Input } from "@components";
import { addWordbook, hideWordbook } from '@utils/apis/wordbookmock';
import { Link,Navigate } from 'react-router-dom';
import { WordbookListContainer, Title, Wordbook, NewButton, CancelButton } from './WordbookListStyle';
import { ISOStringToDateString } from '@utils/index';

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
    const [newWordbook, setNewWordbook] = useState(false);
    const [hiddingWordbook, setHiddingWordbook] = useState([] as number[]);
    const [loadingAddWordbook, fetchAddWordbook, errorAddWordbook] = useFetchUpdate(addWordbook);
    const [loadingHideWordbook, fetchHideWordbook, errorHideWordbook] = useFetchUpdate(hideWordbook);
    const inputRef = useRef<HTMLInputElement>(null);
    if(errorAddWordbook) return <Navigate to="/error" state={{message: errorAddWordbook.toast}} />
    if(errorHideWordbook) return <Navigate to="/error" state={{message: errorHideWordbook.toast}} />

    return (
        <WordbookListContainer>
            <Title>
                <span>내 단어장</span>
                { newWordbook === false && <NewButton onClick={() => setNewWordbook(true)}>
                    <span className="material-icons-sharp">
                        menu_book
                    </span>
                    <span>New</span>
                </NewButton> }
            </Title>
            { newWordbook && (
            <Wordbook >
                <div>
                    <div>
                        <span className="material-icons-sharp">
                            menu_book
                        </span>
                        <Input placeholder="단어장 이름(ex. 토익 day1)" ref={inputRef} />
                    </div>
                    <div>
                        <div>
                            <span className="material-icons-sharp">
                                style
                            </span>
                            <span>단어 <b>0</b>개</span>
                        </div>
                        <div>
                            <span className="material-icons-sharp">
                                event
                            </span>
                            <span>{ISOStringToDateString(new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString())}</span>
                        </div>
                    </div>
                </div>
                <div>
                    {loadingAddWordbook && (
                        <>
                            <span className="material-icons-sharp">
                                hourglass_bottom
                            </span>
                            <span>
                                단어장 생성중
                            </span>
                        </>
                    )}
                    {loadingAddWordbook === false && (
                        <>
                            <NewButton onClick={async () => {
                                const name = inputRef.current?.value;
                                if (name) {
                                    await fetchAddWordbook(name);
                                    setNewWordbook(false);
                                }
                            }}>
                                <span className="material-icons-sharp">
                                    add_circle_outline
                                </span>
                                <span>추가</span>
                            </NewButton>
                            <CancelButton onClick={() => setNewWordbook(false)}>
                                <span className="material-icons-sharp">
                                    cancel
                                </span>
                                <span>취소</span>
                            </CancelButton>
                        </>
                    )}
                </div>
            </Wordbook>
            )}
            {wordbooks.map((wordbook, index) => (
                <Wordbook key={index}>
                    <div>
                        <div>
                            <span className="material-icons-sharp">
                                menu_book
                            </span>
                            <Link to={`/vocalist/${wordbook.id}`}>{wordbook.name}</Link>
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
                        {!newWordbook&&!hiddingWordbook.some((id) => id === wordbook.id)&&<span className="material-icons-sharp" onClick={async () => {
                            setHiddingWordbook(hiddingWordbook=>[...hiddingWordbook, wordbook.id]);
                            await fetchHideWordbook(wordbook.id);
                            setHiddingWordbook(hiddingWordbook=>hiddingWordbook.filter((id) => id !== wordbook.id));
                            wordbooks.splice(index, 1);
                        }}>
                            visibility_off
                        </span>}
                        {loadingHideWordbook && hiddingWordbook.some((id) => id === wordbook.id) && (
                        <>
                            <span className="material-icons-sharp">
                                hourglass_bottom
                            </span>
                            <span>
                                이동 중
                            </span>
                        </>
                        )}
                    </div>
                </Wordbook>
            ))}
        </WordbookListContainer>
    );
}

export default WordbookList;