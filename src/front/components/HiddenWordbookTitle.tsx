import { useContext } from 'react';
import WordbookListContext from '@context/WordbookListContext';
import { Title, Expend } from './index';

function HiddenWordbookTitle() {
    const {expend, expendOnClick} = useContext(WordbookListContext);

    return (
        <Title onClick={expendOnClick}>
            <span>숨긴 단어장</span>
            <Expend className="material-icons-sharp">
                {expend ? 'expand_less' : 'expand_more'}
            </Expend>
        </Title>
    );
}

export default HiddenWordbookTitle;
