import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Article = {
  __typename?: 'Article';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
  uid: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getArticleById?: Maybe<Article>;
  getArticles: Array<Article>;
  searchArticles: Array<Article>;
};


export type QueryGetArticleByIdArgs = {
  uid: Scalars['String']['input'];
};


export type QuerySearchArticlesArgs = {
  term: Scalars['String']['input'];
};

export type GetArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticlesQuery = { __typename?: 'Query', getArticles: Array<{ __typename?: 'Article', uid: string, title: string, description: string }> };

export type SearchArticlesQueryVariables = Exact<{
  term: Scalars['String']['input'];
}>;


export type SearchArticlesQuery = { __typename?: 'Query', searchArticles: Array<{ __typename?: 'Article', uid: string, title: string, description: string }> };

export type GetArticleByIdQueryVariables = Exact<{
  uid: Scalars['String']['input'];
}>;


export type GetArticleByIdQuery = { __typename?: 'Query', getArticleById?: { __typename?: 'Article', uid: string, title: string, description: string } | null };


export const GetArticlesDocument = gql`
    query GetArticles {
  getArticles {
    uid
    title
    description
  }
}
    `;

/**
 * __useGetArticlesQuery__
 *
 * To run a query within a React component, call `useGetArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetArticlesQuery(baseOptions?: Apollo.QueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
      }
export function useGetArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
        }
export function useGetArticlesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetArticlesQuery, GetArticlesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetArticlesQuery, GetArticlesQueryVariables>(GetArticlesDocument, options);
        }
export type GetArticlesQueryHookResult = ReturnType<typeof useGetArticlesQuery>;
export type GetArticlesLazyQueryHookResult = ReturnType<typeof useGetArticlesLazyQuery>;
export type GetArticlesSuspenseQueryHookResult = ReturnType<typeof useGetArticlesSuspenseQuery>;
export type GetArticlesQueryResult = Apollo.QueryResult<GetArticlesQuery, GetArticlesQueryVariables>;
export const SearchArticlesDocument = gql`
    query SearchArticles($term: String!) {
  searchArticles(term: $term) {
    uid
    title
    description
  }
}
    `;

/**
 * __useSearchArticlesQuery__
 *
 * To run a query within a React component, call `useSearchArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchArticlesQuery({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useSearchArticlesQuery(baseOptions: Apollo.QueryHookOptions<SearchArticlesQuery, SearchArticlesQueryVariables> & ({ variables: SearchArticlesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchArticlesQuery, SearchArticlesQueryVariables>(SearchArticlesDocument, options);
      }
export function useSearchArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchArticlesQuery, SearchArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchArticlesQuery, SearchArticlesQueryVariables>(SearchArticlesDocument, options);
        }
export function useSearchArticlesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchArticlesQuery, SearchArticlesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchArticlesQuery, SearchArticlesQueryVariables>(SearchArticlesDocument, options);
        }
export type SearchArticlesQueryHookResult = ReturnType<typeof useSearchArticlesQuery>;
export type SearchArticlesLazyQueryHookResult = ReturnType<typeof useSearchArticlesLazyQuery>;
export type SearchArticlesSuspenseQueryHookResult = ReturnType<typeof useSearchArticlesSuspenseQuery>;
export type SearchArticlesQueryResult = Apollo.QueryResult<SearchArticlesQuery, SearchArticlesQueryVariables>;
export const GetArticleByIdDocument = gql`
    query GetArticleById($uid: String!) {
  getArticleById(uid: $uid) {
    uid
    title
    description
  }
}
    `;

/**
 * __useGetArticleByIdQuery__
 *
 * To run a query within a React component, call `useGetArticleByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleByIdQuery({
 *   variables: {
 *      uid: // value for 'uid'
 *   },
 * });
 */
export function useGetArticleByIdQuery(baseOptions: Apollo.QueryHookOptions<GetArticleByIdQuery, GetArticleByIdQueryVariables> & ({ variables: GetArticleByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetArticleByIdQuery, GetArticleByIdQueryVariables>(GetArticleByIdDocument, options);
      }
export function useGetArticleByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetArticleByIdQuery, GetArticleByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetArticleByIdQuery, GetArticleByIdQueryVariables>(GetArticleByIdDocument, options);
        }
export function useGetArticleByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetArticleByIdQuery, GetArticleByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetArticleByIdQuery, GetArticleByIdQueryVariables>(GetArticleByIdDocument, options);
        }
export type GetArticleByIdQueryHookResult = ReturnType<typeof useGetArticleByIdQuery>;
export type GetArticleByIdLazyQueryHookResult = ReturnType<typeof useGetArticleByIdLazyQuery>;
export type GetArticleByIdSuspenseQueryHookResult = ReturnType<typeof useGetArticleByIdSuspenseQuery>;
export type GetArticleByIdQueryResult = Apollo.QueryResult<GetArticleByIdQuery, GetArticleByIdQueryVariables>;