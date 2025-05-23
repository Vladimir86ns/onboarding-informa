import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { ContentstackService } from '@contentstack';
import { OpenSearchService } from '@opensearch';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('ArticleService', () => {
  let service: ArticleService;
  let contentstackService: ContentstackService;
  let openSearchService: OpenSearchService;
  let cacheManager: any;

  const mockArticles = [
    { uid: '1', title: 'Title 1', description: 'Desc 1' },
    { uid: '2', title: 'Title 2', description: 'Desc 2' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
        {
          provide: ContentstackService,
          useValue: {
            getEntries: jest.fn().mockResolvedValue(mockArticles),
          },
        },
        {
          provide: OpenSearchService,
          useValue: {
            indexExists: jest.fn().mockResolvedValue(true),
            search: jest.fn().mockResolvedValue({
              body: {
                hits: {
                  hits: mockArticles.map((a) => ({ _source: a })),
                },
              },
            }),
            bulkUploadArticles: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    contentstackService = module.get<ContentstackService>(ContentstackService);
    openSearchService = module.get<OpenSearchService>(OpenSearchService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should return cached articles if present', async () => {
    cacheManager.get.mockResolvedValue(mockArticles);

    const result = await service.getAll();
    expect(result).toEqual(mockArticles);
    expect(contentstackService.getEntries).not.toHaveBeenCalled();
  });

  it('should fetch, cache and upload articles if not cached', async () => {
    cacheManager.get.mockResolvedValue(null);

    const result = await service.getAll();
    expect(result).toEqual(mockArticles);
    expect(contentstackService.getEntries).toHaveBeenCalled();
    expect(cacheManager.set).toHaveBeenCalled();
    expect(openSearchService.bulkUploadArticles).toHaveBeenCalled();
  });

  it('should return search results from OpenSearch', async () => {
    const result = await service.searchArticles('Title');
    expect(result).toEqual(mockArticles);
    expect(openSearchService.search).toHaveBeenCalled();
  });

  it('should return article by uid', async () => {
    jest.spyOn(service, 'getAll').mockResolvedValue(mockArticles);

    const article = await service.getById('2');
    expect(article).toEqual(mockArticles[1]);
  });

  it('should return null if uid not found', async () => {
    jest.spyOn(service, 'getAll').mockResolvedValue(mockArticles);

    const article = await service.getById('999');
    expect(article).toBeNull();
  });
});
