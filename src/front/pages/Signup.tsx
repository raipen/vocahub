import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { LoginContext } from '@context/LoginContext';
import { LoginContainer, Input, InputWithLabelContainer, ReverseButtonContainingIcon, ButtonContainingIcon } from '@components';

function Signup() {
  const navigate = useNavigate();
  const { signUp } = useContext(LoginContext);
  const [loginInfo, setLoginInfo] = useState({ name: '', password: '' });
  const { name, password } = loginInfo;
  const onChage = (type: 'name' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [type]: e.target.value });
  }
  const onSignUp = async () => {
    try {
      await signUp({ name, password });
      navigate("/mywordbook");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <LoginContainer>
      <h1>회원가입</h1>
      <InputWithLabelContainer>
        <label>아이디</label>
        <Input value={name} onChange={onChage('name')} />
      </InputWithLabelContainer>
      <InputWithLabelContainer>
        <label>비밀번호</label>
        <Input type="password" value={password} onChange={onChage('password')} />
      </InputWithLabelContainer>
      <ButtonContainingIcon $margin="20px 0 0" onClick={onSignUp} type="submit">
        <span>가입하기</span>
      </ButtonContainingIcon>
    </LoginContainer>
  );
}

export default Signup;
