import useSignUp from '@hooks/useSignUp';
import { LoginContainer, Input, InputWithLabelContainer, ButtonContainingIcon } from '@components';

function Signup() {
  const { name, password, onChage, onSignUp } = useSignUp();

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
