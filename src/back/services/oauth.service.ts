import { LoginToken } from '@serverUtils/jwt';
import * as OauthDTO from '@DTO/oauth.dto';
import * as UserRepo from '@repository/user.repo';
import { NotFoundError, NotCorrectTypeError, ExistError } from '@errors';
import { getKakaoAccessToken, getKakaoId, getKakaoUserInfo, getGoogleAccessToken, getGoogleUserInfo } from '@repository/oauth.repo';

export default {
    async kakao({code,error}: OauthDTO.oauthRedirctInterface['Querystring']){
        if(error) throw new NotCorrectTypeError("", "code");
        if(!code) throw new NotFoundError("", "code");
        const kakaoAccessToken = await getKakaoAccessToken(code);
        const kakaoId = await getKakaoId(kakaoAccessToken);
        let user = await UserRepo.getUser('KAKAO', kakaoId.toString());
        if(!user) {
            const kakaoUserInfo = await getKakaoUserInfo(kakaoAccessToken);
            let name = kakaoUserInfo.nickname;
            if(!name) name = "KakaoUser";
            user = await UserRepo.createUser({name,socialId: kakaoId.toString(), socialType: 'KAKAO'});
        }
        const loginToken = new LoginToken(user.uuid);
        const accessToken = loginToken.signAccessToken();
        const refreshToken = loginToken.signRefreshToken();
        return {
            accessToken,
            refreshToken
        };
    },
    async google({code,error}: OauthDTO.oauthRedirctInterface['Querystring']){
        if(error) throw new NotCorrectTypeError("", "code");
        if(!code) throw new NotFoundError("", "code");
        const googleAccessToken = await getGoogleAccessToken(code);
        const googleUserInfo = await getGoogleUserInfo(googleAccessToken);
        if(!googleUserInfo.id) throw new NotFoundError("", "id");
        if(!googleUserInfo.name) throw new NotFoundError("", "name");
        let user = await UserRepo.getUser('GOOGLE', googleUserInfo.id);
        if(!user) {
            user = await UserRepo.createUser({name: googleUserInfo.name, socialId: googleUserInfo.id, socialType: 'GOOGLE'});
        }
        const loginToken = new LoginToken(user.uuid);
        const accessToken = loginToken.signAccessToken();
        const refreshToken = loginToken.signRefreshToken();
        return {
            accessToken,
            refreshToken
        };
    }
}
