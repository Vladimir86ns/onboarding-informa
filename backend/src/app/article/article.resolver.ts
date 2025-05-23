import { Resolver, Query, Args } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './models/article.model';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService
  ) {}

  @Query(() => [Article])
  async getArticles(): Promise<Article[]> {
    return this.articleService.getAll();
  }

  @Query(() => [Article])
  async searchArticles(@Args('term') term: string): Promise<Article[]> {
    return this.articleService.searchArticles(term);
  }

  @Query(() => Article, { nullable: true })
  async getArticleById(@Args('uid') uid: string): Promise<Article | null> {
    return this.articleService.getById(uid);
  }
}
