import { LoginToken } from '@serverUtils/jwt';
import * as OauthDTO from '@DTO/oauth.dto';
import * as UserRepo from '@repository/user.repo';
import { NotFoundError, NotCorrectTypeError, ExistError } from '@errors';
import { getKakaoAccessToken, getKakaoId, getKakaoUserInfo } from '@repository/oauth.repo';

export default {
    async kakao({code,error}: OauthDTO.kakaoInterface['Querystring']){
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
}
