import { LoginToken } from '@serverUtils/jwt';
import * as UserDTO from '@DTO/user.dto';
import * as UserRepo from '@repository/user.repo';
import * as WordbookRepo from '@repository/wordbook.repo';
import { NotFoundError, NotCorrectTypeError, ExistError } from '@errors';
import crypto from 'crypto';

export default {
    async signUp({name,password}: UserDTO.signUpInterface['Body']){
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|<>?{}\-~]).{8,16}$/;
        if (!passwordRegex.test(password)) {
            throw new NotCorrectTypeError("", "password");
        }
        const salt = crypto.randomBytes(64).toString('hex');
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        let result: any;
        try{
            result = await UserRepo.createUser(name, hashedPassword, salt);
        } catch(e: any){
            if(e.code === 'P2002') throw new ExistError('', 'User');
            throw e;
        }
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
    },

    async getProfile({userId}: UserDTO.profileInterface['Body']): Promise<UserDTO.profileInterface['Reply']['200']> {
        const { name } = (await UserRepo.getUserById(userId))!;
        const wordbook = await WordbookRepo.getNonHiddenWordbookList(userId);
        const wordbookCount = wordbook.length;
        const vocaCount = wordbook.reduce((acc, cur) => acc + cur._count.voca, 0);
        const loginDate = Array.from({ length: 70 },
            (_, i) => new Date(new Date().getTime() + 1000 * 60 * 60 * 9 - 1000 * 60 * 60 * 24 * i).toISOString().slice(0, 10))
                .map((date) => ({ date: date.slice(0, 10), count: wordbook.filter((wordbook) => wordbook.createdAt.toISOString().slice(0, 10) === date).length }));

        return {
            name,
            wordbookCount,
            vocaCount,
            loginDate
        };
    }
}
