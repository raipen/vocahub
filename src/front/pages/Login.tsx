import { Link } from 'react-router-dom';
import kakaologin from '@assets/kakaologin.png';
import { LoginContainer} from '@components';

function Login() {

  return (
    <LoginContainer>
      <h1>로그인</h1>
      <Link
        style={{display: "block", margin: "0 auto"}}
        to={`https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.KAKAO_REDIRECT_URI}&response_type=code`}>
          <img src={kakaologin} alt="카카오 로그인" width="200"/>
      </Link>
    </LoginContainer>
  );
}

export default Login;
