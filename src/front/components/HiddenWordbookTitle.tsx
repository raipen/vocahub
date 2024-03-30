import { useState } from 'react';
import { WordbookListContainer, Title, Expend } from './index';

function HiddenWordbookTitle() {
    const [expend, setExpend] = useState(false);

    return (
        <Title onClick={() => setExpend(expend => !expend)}>
            <span>숨긴 단어장</span>
            <Expend className="material-icons-sharp">
                {expend ? 'expand_less' : 'expand_more'}
            </Expend>
        </Title>
    );
}

export default HiddenWordbookTitle;
