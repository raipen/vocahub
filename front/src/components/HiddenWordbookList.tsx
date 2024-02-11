import { useState } from 'react';
import { WordbookListContainer, WordbookListTitle, Expend } from './index';

function WordbookList({ children }: { children: React.ReactNode }) {
    const [expend, setExpend] = useState(false);

    return (
        <WordbookListContainer>
            <WordbookListTitle onClick={() => setExpend(expend => !expend)}>
                <span>숨긴 단어장</span>
                <Expend className="material-icons-sharp">
                    {expend ? 'expand_less' : 'expand_more'}
                </Expend>
            </WordbookListTitle>
            {expend&&children}
        </WordbookListContainer>
    );
}

export default WordbookList;
