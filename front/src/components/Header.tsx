import styled from 'styled-components';
import Logo from '@assets/Title.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '@context/LoginContext';
import { Button } from '@components/Button';

const HeaderContainer = styled.div`
  background-color: #f8f9fa;
  padding: 20px max(calc(50% - 600px), 20px);
  width: 100%;
  display: flex;
  *{
    height: 30px;
  }
`;

function Header() {
  const { isLogined,logout } = useContext(LoginContext);
  return (
    <HeaderContainer>
      <Link to="/">
        <img src={Logo} alt="로고" />
      </Link>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
        {
          isLogined === true ? (
            <>
              <Button className="material-icons" onClick={logout}>logout</Button>
              <Link to="/setting">
                <Button className="material-icons">settings</Button>
              </Link>
            </>
          ) :
            isLogined === false ? (
              <Link to="/login">
                <Button className="material-icons">login</Button>
              </Link>
            ) :
              <Button className="material-icons">hourglass_top</Button>
        }
      </div>
    </HeaderContainer>
  );
}

export default Header;
