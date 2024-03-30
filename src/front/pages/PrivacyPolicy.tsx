import policyText from '@assets/privacy_policy';
import { MainContainer } from '@components';
import Markdown from 'react-markdown';

export default function PrivacyPolicy() {
    return (
        <MainContainer>
            <h1>vocahub 개인정보 처리방침</h1>
            <Markdown>{policyText}</Markdown>
        </MainContainer>
    );
}
