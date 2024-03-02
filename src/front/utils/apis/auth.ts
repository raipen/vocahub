import axios from 'axios';
import * as User from '@DTO/user.dto';
import { ErrorInterface } from '@DTO/index.dto';
import * as E from '@errors/index';
type login = {
  name: string;
  password: string;
}

export const requestLogin = async ({name, password}: login) => {
  try{
    const response = await axios.post<User.signInInterface['Reply']['200']>('/api/v1/user/signIn', {name, password});
    return response.data.accessToken;
  }catch(e: unknown){
    if(!axios.isAxiosError(e)||!e.response){
      throw new E.NetworkError('NetworkError');
    }
    const data = e.response.data as ErrorInterface;
    throw new E.ErrorWithToast(data.message);
  }
}

export const requestRefresh = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return "access_token";
}

export const requestLogout = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
