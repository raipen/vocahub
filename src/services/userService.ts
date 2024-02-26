import { Prisma,PrismaClient } from '@prisma/client';
import { NotFoundError } from '@errors';
import * as User from '@DTO/user.dto';
import crypto from 'crypto';
import { LoginToken } from '@utils/jwt';
const prisma = new PrismaClient();

export default {
    async signUp({name,password}: User.signUpInterface['Body']){
        const salt = crypto.randomBytes(64).toString('hex');
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        const result = await prisma.user.create({
            data: {
                name,
                password: hashedPassword,
                salt
            }
        });
        const loginToken = new LoginToken(result.uuid);
        const accessToken = loginToken.signAccessToken();
        const refreshToken = loginToken.signRefreshToken();
        return {
            accessToken,
            refreshToken
        };
    },

    async signIn({name,password}: User.signInInterface['Body']){
        const user = await prisma.user.findUnique({
            where: {
                name
            }
        });
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

    async refresh({userId}: User.refreshInterface['Body']){
        const loginToken = new LoginToken(userId);
        const accessToken = loginToken.signAccessToken();
        return {
            accessToken
        };
    }
}
