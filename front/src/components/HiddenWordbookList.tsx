import { useState } from 'react';
import useFetchUpdate from "@hooks/useFetchUpdate";
import { showWordbook } from '@utils/apis/wordbookmock';
import { Link } from 'react-router-dom';
import { WordbookListContainer, MyWordbook, Wordbook, Expend } from './WordbookListStyle';

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
    const [expend, setExpend] = useState(false);
    const [showingWordbook, setShowingWordbook] = useState([] as number[]);
    const [loadingShowWordbook, fetchShowWordbook, errorShowWordbook] = useFetchUpdate(showWordbook);
    return (
        <WordbookListContainer>
            <MyWordbook onClick={() => setExpend(expend => !expend)}>
                <span>숨긴 단어장</span>
                <Expend>
                    <span className="material-icons-sharp">
                        {expend ? 'expand_less' : 'expand_more'}
                    </span>
                </Expend>
            </MyWordbook>
            {expend&&wordbooks.map((wordbook, index) => (
                <Wordbook key={index}>
                    <div>
                        <div>
                            <span className="material-icons-sharp">
                                menu_book
                            </span>
                            <Link to={`/wordbook/${wordbook.id}`}>{wordbook.name}</Link>
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
                        {!showingWordbook.some((id) => id === wordbook.id) && <span className="material-icons-sharp" onClick={async () => {
                            setShowingWordbook(showingWordbook=>[...showingWordbook, wordbook.id]);
                            await fetchShowWordbook(wordbook.id);
                            setShowingWordbook(showingWordbook=>showingWordbook.filter((id) => id !== wordbook.id));
                            wordbooks.splice(index, 1);
                        }}>
                            visibility
                        </span>}
                        {loadingShowWordbook && showingWordbook.some((id) => id === wordbook.id) && (
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