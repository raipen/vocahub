import tosText from '@assets/terms_of_service';
import { MainContainer } from '@components';
import Markdown from 'react-markdown';

export default function TermsOfService() {
    return (
        <MainContainer>
            <h1>vocahub 이용약관</h1>
            <Markdown>{tosText}</Markdown>
        </MainContainer>
    );
}
