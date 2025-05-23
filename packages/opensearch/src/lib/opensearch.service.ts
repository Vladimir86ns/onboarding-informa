import { Injectable } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';

@Injectable()
export class OpenSearchService {
  private client: Client;

  constructor() {
    // TODO credentials move to config!
    this.client = new Client({
      node: 'http://localhost:9200',
      auth: {
        username: 'admin',
        password: 'VladaBreTest2024!',
      },
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async search(index: string, query: any) {
    return this.client.search({
      index,
      body: query,
    });
  }

  async indexExists(index: string): Promise<boolean> {
    const exists = await this.client.indices.exists({ index });
    return exists.body === true;
  }
  
  async bulkUploadArticles(index: string, articles: any[]): Promise<void> {
    try {
      const exists = await this.client.indices.exists({ index });
      if (exists.body === true) {
        await this.client.indices.delete({ index });
      }
    } catch (err) {
      console.log('Pukao na delete index kod upload');
    }
  
    try {
      await this.client.indices.create({ index });
    } catch (err) {
      console.log(`ne radi upisivanje indexa`);
      throw err;
    }
  
    const body = articles.flatMap((article) => {
      const { uid, title, description } = article;
      return [
        { index: { _index: index, _id: uid } },
        { uid, title, description }
      ];
    });
    
    try {
      const res = await this.client.bulk({ body });
      if (res.body.errors) {
        console.log(`ne radi upisivanje u opensearch`);
        throw new Error('Bulk insert failed with errors.');
      }
    } catch (err) {
      console.error(`Nesto je puklo kod upisivanja u bulk: ${err}`);
      throw err;
    }
  }
}
