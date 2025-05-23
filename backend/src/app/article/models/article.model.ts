import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Article {
  @Field()
  uid!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;
}
