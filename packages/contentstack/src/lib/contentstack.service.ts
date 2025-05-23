import { Injectable } from '@nestjs/common';
import Contentstack from 'contentstack';

@Injectable()
export class ContentstackService {
  private stack;

  constructor() {
    // TODO remove this data to read from ENV or Config!
    this.stack = Contentstack.Stack({
      api_key: 'blt0286a4740dba279f',
      delivery_token: 'csf5582bfa1654cc32e31aafbe',
      environment: 'production',
      region: Contentstack.Region.EU,
    });
  }

  async getEntries(contentType: string): Promise<any[]> {
    const [entries] = await this.stack.ContentType(contentType).Query().toJSON().find();
    return entries || [];
  }
}
