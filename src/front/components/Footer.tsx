import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const FooterMenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const FooterMenu = styled(Link)`
`;

const PrivacyPolicy = styled(FooterMenu)`
  font-weight: 600;
`;

const Separator = styled.div`
  width: 1px;
  height: 1rem;
  background-color: #ced4da;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterMenuContainer>
        <PrivacyPolicy to="/privacy-policy">
          개인정보 처리방침
        </PrivacyPolicy>
        <Separator />
        <FooterMenu to="/">이용약관</FooterMenu>
      </FooterMenuContainer>
      <div>
        © 2024. <a href="https://github.com/raipen" target="_blank" style={{color:"#8e8bf9",fontWeight:"600"}}>Raipen</a> all rights reserved.
        <br/>
        <i>contact: raipendalk@gmail.com</i>
      </div>
    </FooterContainer>
  );
}

export default Footer;
