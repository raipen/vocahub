import { HomeContainer,NewPageLink, ScrollBottom,ImageContainer } from '@components';
import useMainPage from '@hooks/useMainPage';
import { pageList, ContentsType } from '@utils/homeList';
import { Link } from 'react-router-dom';

function Home() {
  const {info,pageUp} = useMainPage(pageList);
  
  return (
    <HomeContainer $background={info.background}>
      <h2>{info.title}</h2>
      {info.contents.map((content, index) => {
        switch(content.type) {
          case ContentsType.LINK:
            return (
              <Link to={content.src!} key={index} target="_blank" style={{width:"fit-content"}}>
                <NewPageLink text={content.text}/>
              </Link>
            );
          case ContentsType.TEXT:
            return <p key={index} style={{whiteSpace:"pre-line"}}>{content.text}</p>;
          case ContentsType.IMAGE:
            return <ImageContainer key={index} src={content.src} alt="main" style={{maxWidth: "600px"}}/>;
        }
      })}
      <ScrollBottom onClick={pageUp} className="material-icons-sharp">
        keyboard_double_arrow_down
      </ScrollBottom>
    </HomeContainer>
  );
}

export default Home;
