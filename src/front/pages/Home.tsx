import { HomeContainer, NewPageLink, MainContainer, ImageContainer, ButtonContainingIcon } from '@components';
import { useMemo } from 'react';
import useMainPage from '@hooks/useHomePage';
import { pageList, ContentsType } from '@utils/homeList';
import { Link } from 'react-router-dom';

function Home() {
  const { containerRef } = useMainPage();
  return (
    <MainContainer style={{gap: "100px"}} ref={containerRef} $background={"linear-gradient(to bottom, #f8f9fa, #FFD6E0)"}>
        {pageList.map((page,i) =>
          <HomeContainer key={i}>
            {page.contents.map((content, index) => {
              switch (content.type) {
                case ContentsType.TITLE:
                  return <h2 key={index}>{content.text}</h2>;
                case ContentsType.LINK:
                  return (
                    <Link to={content.src!} key={index} target="_blank" style={{ width: "fit-content" }}>
                      <NewPageLink text={content.text} />
                    </Link>
                  );
                case ContentsType.TEXT:
                  return <p key={index} style={{ whiteSpace: "pre-line" }}>{content.text}</p>;
                case ContentsType.IMAGE:
                  return <ImageContainer key={index} src={content.src} alt="main" style={{ maxWidth: "600px" }} />;
                case ContentsType.BUTTON:
                  return (
                    <Link to={content.link!} key={index} style={{ width: "100%", maxWidth: "350px" }}>
                      <ButtonContainingIcon style={{ width: "100%", padding: "10px", fontSize: "1.5rem" }}>
                        {content.text}
                      </ButtonContainingIcon>
                    </Link>
                  );
              }
            })}
          </HomeContainer>
        )}
    </MainContainer>
  );
}

export default Home;
