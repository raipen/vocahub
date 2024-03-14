import { styled } from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 20px;
  margin-top: auto;
  text-align: center;
  width: 100%;
`;

function Footer() {
  return (
    <FooterContainer>
      © 2024. <a href="https://github.com/raipen" target="_blank" style={{color:"#8e8bf9",fontWeight:"600"}}>Raipen</a> all rights reserved.
      <br/>
      <i>contact: raipendalk@gmail.com</i>
    </FooterContainer>
  );
}

export default Footer;
