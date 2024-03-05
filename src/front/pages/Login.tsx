import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LoginContext } from '@context/LoginContext';
import { LoginContainer, Input, InputWithLabelContainer, ReverseButtonContainingIcon, ButtonContainingIcon } from '@components';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const [loginInfo, setLoginInfo] = useState({ name: '', password: '' });
  const { name, password } = loginInfo;
  const onChage = (type: 'name' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [type]: e.target.value });
  }
  const onLogin = async () => {
    try {
      await login({ name, password });
      navigate("/mywordbook");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <LoginContainer>
      <h1>로그인</h1>
      <InputWithLabelContainer>
        <label>아이디</label>
        <Input value={name} onChange={onChage('name')} />
      </InputWithLabelContainer>
      <InputWithLabelContainer>
        <label>비밀번호</label>
        <Input type="password" value={password} onChange={onChage('password')} />
      </InputWithLabelContainer>
      <ButtonContainingIcon $margin="20px 0 0" onClick={onLogin} type="submit">
        <span>로그인</span>
      </ButtonContainingIcon>
      <Link to="/signup">
        <ReverseButtonContainingIcon style={{ width: '100%' }}>
          <span>회원가입</span>
        </ReverseButtonContainingIcon>
      </Link>
    </LoginContainer>
  );
}

export default Login;
