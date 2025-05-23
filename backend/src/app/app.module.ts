import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ArticleModule } from './article/article.module';
import { CacheModule } from '@nestjs/cache-manager';
const redisStore = require('cache-manager-ioredis') as any;

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 60000 * 5,
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema/backend/schema.gql'),
      playground: true,
    }),
    ArticleModule,
  ],
})
export class AppModule {}
