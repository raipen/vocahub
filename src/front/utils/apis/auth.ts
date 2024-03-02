import axios from 'axios';
import * as User from '@DTO/user.dto';
import { ErrorInterface } from '@DTO/index.dto';
import { NetworkError,ErrorWithToast } from '@errors/index';
import ErrorConfigs from '@errors/config';
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
      throw new NetworkError('NetworkError');
    }
    const {error:name, message} = e.response.data as ErrorInterface;
    throw new ErrorConfigs[name].error(message);
  }
}

export const requestRefresh = async () => {
  try{
    const response = await axios.post<User.refreshInterface['Reply']['200']>('/api/v1/user/refresh');
    return response.data.accessToken;
  }catch(e: unknown){
    if(!axios.isAxiosError(e)||!e.response){
      throw new NetworkError('NetworkError');
    }
    const {error:name, message} = e.response.data as ErrorInterface;
    throw new ErrorConfigs[name].error(message);
  }
}

export const requestLogout = async () => {
  try{
    await axios.post('/api/v1/user/signOut');
  }catch(e: unknown){
    if(!axios.isAxiosError(e)||!e.response){
      throw new NetworkError('NetworkError');
    }
    const {error:name, message} = e.response.data as ErrorInterface;
    throw new ErrorConfigs[name].error(message);
  }
}
