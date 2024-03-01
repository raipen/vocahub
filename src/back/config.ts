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
            port: parseInt(process.env.NODE_ENV == 'test' ? '3001' : process.env.PORT || '8080'),
            devFrontPort: parseInt(process.env.DEV_FRONT_PORT || '3000'),
            jwtAccessKey: process.env.JWT_ACCESS_KEY || 'secretKey',
            jwtRefreshKey: process.env.JWT_REFRESH_KEY || 'refresh',
            salt: process.env.SALT || 'salt',
            nodeEnv: process.env.NODE_ENV,
        } as const;
    }

}

export default Config.of().config();
