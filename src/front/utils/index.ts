import { ErrorInterface } from '@DTO/index.dto';
import { NetworkError,ErrorWithToast } from '@errors/index';
import ErrorConfigs from '@errors/config';
import axios from 'axios';

export function ISOStringToDateString(isoString: string) {
    const localDate = new Date(new Date(isoString).getTime() + 1000 * 60 * 60 * 9);
    const date = localDate.toISOString().split('T')[0];
    return date.split('-').join('.');
}

export const apiErrorCatchWrapper = <T extends Array<any>,U>(api: (...a:T) => Promise<U>) => async (...a:T) => {
    try {
        return await api(...a);
    } catch (e: unknown) {
        if (!axios.isAxiosError(e) || !e.response) {
            throw new NetworkError('NetworkError');
        }
        const { error: name, message } = e.response.data as ErrorInterface;
        throw new ErrorConfigs[name].error(message);
    }
}
