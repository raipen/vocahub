import config from '@config';
import qs from 'qs';
import jsonBigint from 'json-bigint';
import axios from 'axios';

export const getKakaoAccessToken = async (code: string) => {
    const {access_token: kakaoAccessToken} = (await axios<{access_token:string,scope:string}>({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        data: qs.stringify({
            grant_type: 'authorization_code',
            client_id: config.kakaoClientId,
            redirect_uri: config.kakaoRedirectUri,
            code
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })).data;
    console.log(kakaoAccessToken);
    return kakaoAccessToken;
}

export const getKakaoId = async (kakaoAccessToken: string) => {
    const { id } = (await axios.get<{id:bigint}>('https://kapi.kakao.com/v1/user/access_token_info', {
        headers: {
            Authorization: `Bearer ${kakaoAccessToken}`
        },
        transformResponse: [data=>jsonBigint.parse(data)]
    })).data;
    console.log(id);
    return id;
}

export const getKakaoUserInfo = async (kakaoAccessToken: string) => {
    const { kakao_account } = (await axios({
        method: 'post',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
            Authorization: `Bearer ${kakaoAccessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })).data;
    console.log(kakao_account);
    return {
        nickname: kakao_account.profile?.nickname,
    };
}
