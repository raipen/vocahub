import { Link } from 'react-router-dom';
import kakaologin from '@assets/kakaologin.png';
import googlelogin from '@assets/googlelogin.svg';
import { LoginContainer} from '@components';

function Login() {

  return (
    <LoginContainer>
      <h1>로그인</h1>
      <p>소셜 로그인 시 <a style={{color:"#7599ee", fontWeight:"500"}} href="/terms-of-service">이용약관</a> 및 <a style={{color:"#7599ee", fontWeight:"500"}} href="/privacy-policy">개인정보 처리방침</a>에 동의하는 것으로 간주합니다.</p>
      <Link
        style={{display: "block", margin: "0 auto"}}
        to={`https://kauth.kakao.com/oauth/authorize?client_id=${__KAKAO_CLIENT_ID__}&redirect_uri=${__REDIRECT_URI__}/api/v1/oauth/kakao&response_type=code`}>
          <img src={kakaologin} alt="카카오 로그인" width="200"/>
      </Link>
      <Link
        style={{display: "block", margin: "0 auto"}}
        to={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${__GOOGLE_CLIENT_ID__}&redirect_uri=${__REDIRECT_URI__}/api/v1/oauth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`}>
          <img src={googlelogin} alt="구글 로그인" width="200"/>
      </Link>
    </LoginContainer>
  );
}

export default Login;
