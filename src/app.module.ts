import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import {
    appConfig,
    databaseConfig,
    mongoConfig,
    validationSchema,
} from './config';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig, mongoConfig],
            validationSchema,
            validationOptions: {
                abortEarly: true,
                allowUnknown: true,
            },
            envFilePath: [
                `.env.${process.env.NODE_ENV}.local`,
                `.env.${process.env.NODE_ENV}`,
                '.env.local',
                '.env',
            ],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres' as const,
                host: config.get<string>('database.host'),
                port: config.get<number>('database.port'),
                username: config.get<string>('database.username'),
                password: config.get<string>('database.password'),
                database: config.get<string>('database.database'),
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                uri: config.get<string>('mongo.uri'),
            }),
        }),
        PostsModule,
        CommentsModule,
    ],
})
export class AppModule {}
