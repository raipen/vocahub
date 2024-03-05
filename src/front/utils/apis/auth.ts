import axios from 'axios';
import * as User from '@DTO/user.dto';
import { apiErrorCatchWrapper } from '@utils';
type login = {
  name: string;
  password: string;
}

export const requestLogin = apiErrorCatchWrapper(async ({name, password}: login)=>{
  const response = await axios.post<User.signInInterface['Reply']['200']>('/api/v1/user/signIn', {name, password});
  return response.data.accessToken;
});

export const requestRefresh = apiErrorCatchWrapper(async () => {
    const response = await axios.post<User.refreshInterface['Reply']['200']>('/api/v1/user/refresh');
    return response.data.accessToken;
});

export const requestLogout = apiErrorCatchWrapper(async () => {
    await axios.post('/api/v1/user/signOut');
});

export const requestSignUp = apiErrorCatchWrapper(async ({name, password}: login)=>{
    const response = await axios.post<User.signUpInterface['Reply']['201']>('/api/v1/user/signUp', {name, password});
    return response.data.accessToken;
});
