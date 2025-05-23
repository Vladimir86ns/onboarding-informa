import { Module } from '@nestjs/common';
import { ContentstackService } from './contentstack.service';

@Module({
  providers: [ContentstackService],
  exports: [ContentstackService],
})
export class ContentstackModule {}