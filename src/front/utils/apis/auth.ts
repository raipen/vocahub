import axios from 'axios';
import * as User from '@DTO/user.dto';
import { apiErrorCatchWrapper } from '@utils';

export const requestRefresh = apiErrorCatchWrapper(async () => {
    const response = await axios.post<User.refreshInterface['Reply']['200']>('/api/v1/user/refresh');
    return response.data.accessToken;
});

export const requestLogout = apiErrorCatchWrapper(async () => {
    await axios.post('/api/v1/user/logout');
});

export const getUserName = apiErrorCatchWrapper(async (accessToken: string) => {
    const response = await axios.get<User.getUserNameInterface['Reply']['200']>(
        '/api/v1/user/name',
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data.name;
});

export const changeUserName = apiErrorCatchWrapper(async (accessToken: string,name: string) => {
    await axios.patch('/api/v1/user/name', { name }, { headers: { Authorization: `Bearer ${accessToken}` } });
});
