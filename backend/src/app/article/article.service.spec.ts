import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { OpenSearchService } from '@opensearch';
import { ContentstackService } from '@contentstack';

describe('ArticleService', () => {
  let service: ArticleService;
  let openSearchService: OpenSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
            provide: 'CACHE_MANAGER',
            useValue: {
              get: jest.fn(),
              set: jest.fn(),
              del: jest.fn(),
            },
        },
        {
            provide: ContentstackService,
            useValue: {
              getAll: jest.fn().mockResolvedValue([]),
            },
        },
        {
            provide: OpenSearchService,
            useValue: {
              createIndexIfNotExists: jest.fn().mockResolvedValue(undefined),
              search: jest.fn().mockResolvedValue({
                body: {
                  hits: {
                    hits: [],
                  },
                },
              }),
            },
          }
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    openSearchService = module.get<OpenSearchService>(OpenSearchService);
  });

  it('should return articles from OpenSearch', async () => {
    const mockArticles = [
      { uid: '123', title: 'test', description: 'desc' },
    ];

    (openSearchService.search as jest.Mock).mockResolvedValue({
      body: {
        hits: {
          hits: mockArticles.map((article) => ({ _source: article })),
        },
      },
    });

    const result = await service.searchArticles('test');
    expect(result).toEqual(mockArticles);
  });
});
