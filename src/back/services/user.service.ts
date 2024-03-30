import { LoginToken } from '@serverUtils/jwt';
import * as UserDTO from '@DTO/user.dto';
import * as UserRepo from '@repository/user.repo';
import * as WordbookRepo from '@repository/wordbook.repo';

export default {
    async refresh({userId}: UserDTO.refreshInterface['Body']){
        const loginToken = new LoginToken(userId);
        const accessToken = loginToken.signAccessToken();
        return {
            accessToken
        };
    },

    async getUserName({userId}: UserDTO.getUserNameInterface['Body']){
        const { name } = (await UserRepo.getUserById(userId))!;
        return { name };
    },

    async changeUserName({userId, name}: UserDTO.changeUserNameInterface['Body']){
        await UserRepo.changeUserName(userId, name);
    },

    async getProfile({userId}: UserDTO.profileInterface['Body']): Promise<UserDTO.profileInterface['Reply']['200']> {
        const { name } = (await UserRepo.getUserById(userId))!;
        const wordbook = (await WordbookRepo.getNonHiddenWordbookList(userId)).map((wordbook) => {
            const { _count, createdAt } = wordbook;
            return {
                createdAt: new Date(new Date(createdAt).getTime() + 1000 * 60 * 60 * 9),
                count : _count.voca
            };
        });
        const wordbookCount = wordbook.length;
        const vocaCount = wordbook.reduce((acc, cur) => acc + cur.count, 0);
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
