import { NotFoundError } from '@errors';
import * as UserDTO from '@DTO/user.dto';
import * as UserRepo from '@repository/user.repo';
import crypto from 'crypto';
import { LoginToken } from '@serverUtils/jwt';

export default {
    async signUp({name,password}: UserDTO.signUpInterface['Body']){
        const salt = crypto.randomBytes(64).toString('hex');
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        const result = await UserRepo.createUser(name, hashedPassword, salt);
        const loginToken = new LoginToken(result.uuid);
        const accessToken = loginToken.signAccessToken();
        const refreshToken = loginToken.signRefreshToken();
        return {
            accessToken,
            refreshToken
        };
    },

    async signIn({name,password}: UserDTO.signInInterface['Body']){
        const user = await UserRepo.getUser(name);
        if (!user) {
            throw new NotFoundError('', 'User');
        }
        const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('hex');
        if (hashedPassword !== user.password) {
            throw new NotFoundError('', 'User');
        }
        const loginToken = new LoginToken(user.uuid);
        const accessToken = loginToken.signAccessToken();
        const refreshToken = loginToken.signRefreshToken();
        return {
            accessToken,
            refreshToken
        };
    },

    async refresh({userId}: UserDTO.refreshInterface['Body']){
        const loginToken = new LoginToken(userId);
        const accessToken = loginToken.signAccessToken();
        return {
            accessToken
        };
    }
}
