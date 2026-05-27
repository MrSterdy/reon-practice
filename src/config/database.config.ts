import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export const databaseConfig = registerAs(
    'database',
    (): DatabaseConfig => ({
        host: process.env.POSTGRES_HOST!,
        port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
        username: process.env.POSTGRES_USER!,
        password: process.env.POSTGRES_PASSWORD!,
        database: process.env.POSTGRES_DB!,
    }),
);
