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

const WordMenu = styled.div`
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  >*{
    font-size: 100%;
    line-height: 30px;
    font-weight: bold;
    color: #4e4e4e;
    cursor: pointer;
    display: inline-flex;
    padding: 10px;
    align-items: center;
    border-radius: 5px;
    margin: 0 5px;
    &:hover{
      background-color: #ff660022;
      color: var(--main-color);
    }
  }
`;

const UserMenu = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;

function Header() {
  const { isLogined,logout } = useContext(LoginContext);
  return (
    <HeaderContainer>
      <Link to="/">
        <img src={Logo} alt="로고" />
      </Link>
      <WordMenu>
        <Link to="/mywordbook">
          내 단어장
        </Link>
        <Link to="/wordbook">
          가장 최근에 본 단어장
        </Link>
      </WordMenu>
      <UserMenu>
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
      </UserMenu>
    </HeaderContainer>
  );
}

export default Header;
