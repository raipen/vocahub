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
      Footer
    </FooterContainer>
  );
}

export default Footer;
