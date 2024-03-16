import { HomeContainer,NewPageLink } from '@components';
import useMainPage from '@hooks/useMainPage';
import { pageList, ContentsType } from '@utils/homeList';
import { Link } from 'react-router-dom';

function Home() {
  const page = useMainPage(pageList);
  
  return (
    <HomeContainer $background={page.background}>
      <h2>{page.title}</h2>
      {page.contents.map((content, index) => {
        switch(content.type) {
          case ContentsType.LINK:
            return <Link to={content.src} key={index}>
              <NewPageLink text={content.text}/>
              </Link>;
          case ContentsType.TEXT:
            return <p key={index}>{content.text}</p>;
          case ContentsType.IMAGE:
            return <img key={index} src={content.src} alt="main" />;
        }
      })}
    </HomeContainer>
  );
}

export default Home;
