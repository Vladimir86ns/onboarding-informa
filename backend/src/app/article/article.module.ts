import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleResolver } from './article.resolver';
import { ContentstackModule } from '@contentstack';
import { OpenSearchModule } from '@opensearch';


@Module({
  imports: [ContentstackModule, OpenSearchModule],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleResolver],
})
export class ArticleModule {}
