import { Link } from 'react-router-dom';
import { LoginContainer, Input, InputWithLabelContainer, ReverseButtonContainingIcon, ButtonContainingIcon } from '@components';
import useSignIn from '@hooks/useSignIn';

function Login() {
  const { name, password, onChage, onSignIn } = useSignIn();

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
      <ButtonContainingIcon $margin="20px 0 0" onClick={onSignIn} type="submit">
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
