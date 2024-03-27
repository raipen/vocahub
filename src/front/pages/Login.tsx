import { Link } from 'react-router-dom';
import kakaologin from '@assets/kakaologin.png';
import { LoginContainer} from '@components';

function Login() {

  return (
    <LoginContainer>
      <h1>로그인</h1>
      <Link
        style={{display: "block", margin: "0 auto"}}
        to={`https://kauth.kakao.com/oauth/authorize?client_id=${__KAKAO_CLIENT_ID__}&redirect_uri=${__REDIRECT_URI__}/api/v1/oauth/kakao&response_type=code`}>
          <img src={kakaologin} alt="카카오 로그인" width="200"/>
      </Link>
      <Link
        style={{display: "block", margin: "0 auto"}}
        to={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${__GOOGLE_CLIENT_ID__}&redirect_uri=${__REDIRECT_URI__}/api/v1/oauth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`}>
          <img src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png" alt="구글 로그인" width="200"/>
      </Link>
    </LoginContainer>
  );
}

export default Login;
