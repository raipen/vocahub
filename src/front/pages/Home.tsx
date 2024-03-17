import { HomeContainer,NewPageLink, ScrollBottom,ImageContainer, ButtonContainingIcon } from '@components';
import useMainPage from '@hooks/useMainPage';
import { pageList, ContentsType } from '@utils/homeList';
import { Link } from 'react-router-dom';

function Home() {
  const {page,info,pageUp} = useMainPage(pageList);
  
  const a = (
    <>
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
          case ContentsType.BUTTON:
            return (
              <Link to={content.link!} key={index} style={{width:"100%", maxWidth:"350px"}}>
                <ButtonContainingIcon style={{width:"100%", padding:"10px", fontSize:"1.5rem"}}>
                  {content.text}
                </ButtonContainingIcon>
              </Link>
            );
        }
      })}
      <ScrollBottom onClick={pageUp} className="material-icons-sharp">
        keyboard_double_arrow_down
      </ScrollBottom>
    </>
  )

  if(page%2 === 0) return (
    <HomeContainer $background={info.background}>
      <input type="hidden" value="home"/>
      {a}
    </HomeContainer>
  );

  return (
    <HomeContainer $background={info.background}>
    {a}
    </HomeContainer>
  );
}

export default Home;
