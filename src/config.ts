import { config } from 'dotenv';

class Config{
    static instance: Config|null=null;
    constructor() {}

    static of(): Config {
        if (!Config.instance) {
            config();
            process.env.NODE_ENV = process.env.NODE_ENV || 'development';
            Config.instance = new Config();
        }
        return Config.instance;
    }

    config() {
        return {
            port: parseInt(process.env.NODE_ENV == 'test' ? '3001' : process.env.PORT || '3000'),
            jwtSecretKey: process.env.JWT_SECRET_KEY || 'secretKey',
            salt: process.env.SALT || 'salt',
            nodeEnv: process.env.NODE_ENV,
        } as const;
    }

}

export default Config.of().config();
