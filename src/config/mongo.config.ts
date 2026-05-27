import { registerAs } from '@nestjs/config';

export interface MongoConfig {
    uri: string;
}

export const mongoConfig = registerAs(
    'mongo',
    (): MongoConfig => ({
        uri: process.env.MONGO_URI!,
    }),
);
