import styled from 'styled-components';
import Logo from '@assets/Title.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '@context/LoginContext';
import { HeaderButton } from '@components';

const HeaderContainer = styled.header`
  background-color: #f8f9fa;
  padding: 20px max(calc(50% - 600px), 20px);
  width: 100%;
  display: flex;
  user-select: none;
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
  @media (max-width: 600px) {
    display: none;
  }
`;

const IconMenu = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: block;
  }
`;

const UserMenu = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;

function Header() {
  const { isLogined, loading, logout } = useContext(LoginContext);
  return (
    <HeaderContainer>
      <Link to="/">
        <img src={Logo} alt="로고" />
      </Link>
      <WordMenu>
        <Link to="/mywordbook">
          내 단어장
        </Link>
        <Link to="/vocalist">
          가장 최근에 본 단어장
        </Link>
      </WordMenu>
      <UserMenu>
        <IconMenu>
          <Link to="/mywordbook">
            <HeaderButton className="material-icons">menu_book</HeaderButton>
          </Link>
        </IconMenu>
        { !loading && isLogined && [
          <HeaderButton className="material-icons" onClick={logout} key="logout">logout</HeaderButton>,
          <Link to="/setting" key="setting">
            <HeaderButton className="material-icons">settings</HeaderButton>
          </Link>
        ]}
        { !loading && !isLogined && 
          <Link to="/login">
            <HeaderButton className="material-icons">login</HeaderButton>
          </Link>
        }
        { loading && <HeaderButton className="material-icons">hourglass_top</HeaderButton>}
      </UserMenu>
    </HeaderContainer>
  );
}

export default Header;
