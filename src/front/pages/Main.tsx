import { MainContainer } from '@components';
import useMainPage from '@hooks/useMainPage';
import { Link } from 'react-router-dom';

function Main() {
  const pageList = [
    {
      background: 'linear-gradient(180deg, #FFF 0%, #FFD6E0 100%)',
      title: 'VOCA HUB는 가장 효율적인 영단어 암기 서비스입니다',
      description: '흠',
    }
  ];
  const page = useMainPage(pageList);
  
  return (
    <MainContainer $background={page.background} style={{flexGrow:1}}>
      <h2>{page.title}</h2>
      <p>{page.description}</p>
    </MainContainer>
  );
}

export default Main;
