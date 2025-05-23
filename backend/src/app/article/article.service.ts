import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';
import { ContentstackService } from '@contentstack';
import { OpenSearchService } from '@opensearch';
import { Article } from './models/article.model';

@Injectable()
export class ArticleService {
  private readonly ARTICLE_KEY_CACHE = 'article';
  private readonly CACHE_TTL = 60000 * 5;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private contentstackService: ContentstackService,
    private readonly openSearchService: OpenSearchService,
  ) {}

  async getAll(): Promise<any[]> {
    const cached = await this.cacheManager.get<Article[]>(this.ARTICLE_KEY_CACHE);
    if (cached) {
      return cached
    };

    const entries = await this.contentstackService.getEntries(this.ARTICLE_KEY_CACHE);
    await this.cacheManager.set(this.ARTICLE_KEY_CACHE, entries, this.CACHE_TTL);
    await this.openSearchService.bulkUploadArticles(this.ARTICLE_KEY_CACHE, entries);
    
    return entries || [];
  }

  async searchArticles(term: string): Promise<Article[]> {
    const exists = await this.openSearchService.indexExists(this.ARTICLE_KEY_CACHE);
    if (!exists) {
      return [];
    }

    const result = await this.openSearchService.search(this.ARTICLE_KEY_CACHE, {
      query: {
        multi_match: {
          query: term,
          type: 'phrase_prefix',
          fields: ['title', 'description'],
        },
      },
    });    

    return result.body.hits.hits.map((hit: any) => hit._source);
  }

  async getById(uid: string): Promise<Article | null> {
    const articles = await this.getAll();
    return articles.find((article) => article.uid === uid) || null;
  }
}
