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
  bpchar: { input: any; output: any; }
  date: { input: any; output: any; }
  float8: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamp: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "bpchar". All fields are combined with logical 'AND'. */
export type BpcharComparisonExp = {
  _eq?: InputMaybe<Scalars['bpchar']['input']>;
  _gt?: InputMaybe<Scalars['bpchar']['input']>;
  _gte?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['bpchar']['input']>;
  _in?: InputMaybe<Array<Scalars['bpchar']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['bpchar']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['bpchar']['input']>;
  _lt?: InputMaybe<Scalars['bpchar']['input']>;
  _lte?: InputMaybe<Scalars['bpchar']['input']>;
  _neq?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['bpchar']['input']>;
  _nin?: InputMaybe<Array<Scalars['bpchar']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['bpchar']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['bpchar']['input']>;
};

/** columns and relationships of "catalog.attributes" */
export type CatalogAttributes = {
  __typename?: 'catalog_attributes';
  description?: Maybe<Scalars['String']['output']>;
  id?: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

/** aggregated selection of "catalog.attributes" */
export type CatalogAttributesAggregate = {
  __typename?: 'catalog_attributes_aggregate';
  aggregate?: Maybe<CatalogAttributesAggregateFields>;
  nodes: Array<CatalogAttributes>;
};

/** aggregate fields of "catalog.attributes" */
export type CatalogAttributesAggregateFields = {
  __typename?: 'catalog_attributes_aggregate_fields';
  avg?: Maybe<CatalogAttributesAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CatalogAttributesMaxFields>;
  min?: Maybe<CatalogAttributesMinFields>;
  stddev?: Maybe<CatalogAttributesStddevFields>;
  stddev_pop?: Maybe<CatalogAttributesStddevPopFields>;
  stddev_samp?: Maybe<CatalogAttributesStddevSampFields>;
  sum?: Maybe<CatalogAttributesSumFields>;
  var_pop?: Maybe<CatalogAttributesVarPopFields>;
  var_samp?: Maybe<CatalogAttributesVarSampFields>;
  variance?: Maybe<CatalogAttributesVarianceFields>;
};


/** aggregate fields of "catalog.attributes" */
export type CatalogAttributesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CatalogAttributesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type CatalogAttributesAvgFields = {
  __typename?: 'catalog_attributes_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "catalog.attributes". All fields are combined with a logical 'AND'. */
export type CatalogAttributesBoolExp = {
  _and?: InputMaybe<Array<CatalogAttributesBoolExp>>;
  _not?: InputMaybe<CatalogAttributesBoolExp>;
  _or?: InputMaybe<Array<CatalogAttributesBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "catalog.attributes" */
export enum CatalogAttributesConstraint {
  /** unique or primary key constraint on columns "id" */
  AttributesPkey = 'attributes_pkey'
}

/** input type for incrementing numeric columns in table "catalog.attributes" */
export type CatalogAttributesIncInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "catalog.attributes" */
export type CatalogAttributesInsertInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type CatalogAttributesMaxFields = {
  __typename?: 'catalog_attributes_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type CatalogAttributesMinFields = {
  __typename?: 'catalog_attributes_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "catalog.attributes" */
export type CatalogAttributesMutationResponse = {
  __typename?: 'catalog_attributes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CatalogAttributes>;
};

/** on_conflict condition type for table "catalog.attributes" */
export type CatalogAttributesOnConflict = {
  constraint: CatalogAttributesConstraint;
  update_columns?: Array<CatalogAttributesUpdateColumn>;
  where?: InputMaybe<CatalogAttributesBoolExp>;
};

/** Ordering options when selecting data from "catalog.attributes". */
export type CatalogAttributesOrderBy = {
  description?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: catalog.attributes */
export type CatalogAttributesPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "catalog.attributes" */
export enum CatalogAttributesSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "catalog.attributes" */
export type CatalogAttributesSetInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type CatalogAttributesStddevFields = {
  __typename?: 'catalog_attributes_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type CatalogAttributesStddevPopFields = {
  __typename?: 'catalog_attributes_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type CatalogAttributesStddevSampFields = {
  __typename?: 'catalog_attributes_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "catalog_attributes" */
export type CatalogAttributesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CatalogAttributesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CatalogAttributesStreamCursorValueInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type CatalogAttributesSumFields = {
  __typename?: 'catalog_attributes_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "catalog.attributes" */
export enum CatalogAttributesUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type CatalogAttributesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CatalogAttributesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CatalogAttributesSetInput>;
  /** filter the rows which have to be updated */
  where: CatalogAttributesBoolExp;
};

/** aggregate var_pop on columns */
export type CatalogAttributesVarPopFields = {
  __typename?: 'catalog_attributes_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type CatalogAttributesVarSampFields = {
  __typename?: 'catalog_attributes_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type CatalogAttributesVarianceFields = {
  __typename?: 'catalog_attributes_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "catalog.avatar_countries" */
export type CatalogAvatarCountries = {
  __typename?: 'catalog_avatar_countries';
  country?: CommonCountries;
  country_id: Scalars['Int']['output'];
  product_avatar_id: Scalars['Int']['output'];
};

/** aggregated selection of "catalog.avatar_countries" */
export type CatalogAvatarCountriesAggregate = {
  __typename?: 'catalog_avatar_countries_aggregate';
  aggregate?: Maybe<CatalogAvatarCountriesAggregateFields>;
  nodes: Array<CatalogAvatarCountries>;
};

export type CatalogAvatarCountriesAggregateBoolExp = {
  count?: InputMaybe<CatalogAvatarCountriesAggregateBoolExpCount>;
};

export type CatalogAvatarCountriesAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<CatalogAvatarCountriesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogAvatarCountriesBoolExp>;
  predicate: IntComparisonExp;
};

/** aggregate fields of "catalog.avatar_countries" */
export type CatalogAvatarCountriesAggregateFields = {
  __typename?: 'catalog_avatar_countries_aggregate_fields';
  avg?: Maybe<CatalogAvatarCountriesAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CatalogAvatarCountriesMaxFields>;
  min?: Maybe<CatalogAvatarCountriesMinFields>;
  stddev?: Maybe<CatalogAvatarCountriesStddevFields>;
  stddev_pop?: Maybe<CatalogAvatarCountriesStddevPopFields>;
  stddev_samp?: Maybe<CatalogAvatarCountriesStddevSampFields>;
  sum?: Maybe<CatalogAvatarCountriesSumFields>;
  var_pop?: Maybe<CatalogAvatarCountriesVarPopFields>;
  var_samp?: Maybe<CatalogAvatarCountriesVarSampFields>;
  variance?: Maybe<CatalogAvatarCountriesVarianceFields>;
};


/** aggregate fields of "catalog.avatar_countries" */
export type CatalogAvatarCountriesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CatalogAvatarCountriesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "catalog.avatar_countries" */
export type CatalogAvatarCountriesAggregateOrderBy = {
  avg?: InputMaybe<CatalogAvatarCountriesAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CatalogAvatarCountriesMaxOrderBy>;
  min?: InputMaybe<CatalogAvatarCountriesMinOrderBy>;
  stddev?: InputMaybe<CatalogAvatarCountriesStddevOrderBy>;
  stddev_pop?: InputMaybe<CatalogAvatarCountriesStddevPopOrderBy>;
  stddev_samp?: InputMaybe<CatalogAvatarCountriesStddevSampOrderBy>;
  sum?: InputMaybe<CatalogAvatarCountriesSumOrderBy>;
  var_pop?: InputMaybe<CatalogAvatarCountriesVarPopOrderBy>;
  var_samp?: InputMaybe<CatalogAvatarCountriesVarSampOrderBy>;
  variance?: InputMaybe<CatalogAvatarCountriesVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "catalog.avatar_countries" */
export type CatalogAvatarCountriesArrRelInsertInput = {
  data: Array<CatalogAvatarCountriesInsertInput>;
  /** upsert condition */
  on_conflict?: InputMaybe<CatalogAvatarCountriesOnConflict>;
};

/** aggregate avg on columns */
export type CatalogAvatarCountriesAvgFields = {
  __typename?: 'catalog_avatar_countries_avg_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  product_avatar_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "catalog.avatar_countries" */
export type CatalogAvatarCountriesAvgOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  product_avatar_id?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "catalog.avatar_countries". All fields are combined with a logical 'AND'. */
export type CatalogAvatarCountriesBoolExp = {
  _and?: InputMaybe<Array<CatalogAvatarCountriesBoolExp>>;
  _not?: InputMaybe<CatalogAvatarCountriesBoolExp>;
  _or?: InputMaybe<Array<CatalogAvatarCountriesBoolExp>>;
  country?: InputMaybe<CommonCountriesBoolExp>;
  country_id?: InputMaybe<IntComparisonExp>;
  product_avatar_id?: InputMaybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "catalog.avatar_countries" */
export enum CatalogAvatarCountriesConstraint {
  /** unique or primary key constraint on columns "product_avatar_id", "country_id" */
  ProductAvatarCountriesPkey = 'product_avatar_countries_pkey'
}

/** input type for incrementing numeric columns in table "catalog.avatar_countries" */
export type CatalogAvatarCountriesIncInput = {
  country_id?: InputMaybe<Scalars['Int']['input']>;
  product_avatar_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "catalog.avatar_countries" */
export type CatalogAvatarCountriesInsertInput = {
  country?: InputMaybe<CommonCountriesObjRelInsertInput>;
  country_id?: InputMaybe<Scalars['Int']['input']>;
  product_avatar_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type CatalogAvatarCountriesMaxFields = {
  __typename?: 'catalog_avatar_countries_max_fields';
  country_id?: Maybe<Scalars['Int']['output']>;
  product_avatar_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "catalog.avatar_countries" */
export type CatalogAvatarCountriesMaxOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  product_avatar_id?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CatalogAvatarCountriesMinFields = {
  __typename?: 'catalog_avatar_countries_min_fields';
  country_id?: Maybe<Scalars['Int']['output']>;
  product_avatar_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "catalog.avatar_countries" */
export type CatalogAvatarCountriesMinOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  product_avatar_id?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "catalog.avatar_countries" */
export type CatalogAvatarCountriesMutationResponse = {
  __typename?: 'catalog_avatar_countries_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CatalogAvatarCountries>;
};

/** on_conflict condition type for table "catalog.avatar_countries" */
export type CatalogAvatarCountriesOnConflict = {
  constraint: CatalogAvatarCountriesConstraint;
  update_columns?: Array<CatalogAvatarCountriesUpdateColumn>;
  where?: InputMaybe<CatalogAvatarCountriesBoolExp>;
};

/** Ordering options when selecting data from "catalog.avatar_countries". */
export type CatalogAvatarCountriesOrderBy = {
  country?: InputMaybe<CommonCountriesOrderBy>;
  country_id?: InputMaybe<OrderBy>;
  product_avatar_id?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: catalog.avatar_countries */
export type CatalogAvatarCountriesPkColumnsInput = {
  country_id: Scalars['Int']['input'];
  product_avatar_id: Scalars['Int']['input'];
};

/** select columns of table "catalog.avatar_countries" */
export enum CatalogAvatarCountriesSelectColumn {
  /** column name */
  CountryId = 'country_id',
  /** column name */
  ProductAvatarId = 'product_avatar_id'
}

/** input type for updating data in table "catalog.avatar_countries" */
export type CatalogAvatarCountriesSetInput = {
  country_id?: InputMaybe<Scalars['Int']['input']>;
  product_avatar_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type CatalogAvatarCountriesStddevFields = {
  __typename?: 'catalog_avatar_countries_stddev_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  product_avatar_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "catalog.avatar_countries" */
export type CatalogAvatarCountriesStddevOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  product_avatar_id?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type CatalogAvatarCountriesStddevPopFields = {
  __typename?: 'catalog_avatar_countries_stddev_pop_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  product_avatar_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "catalog.avatar_countries" */
export type CatalogAvatarCountriesStddevPopOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  product_avatar_id?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type CatalogAvatarCountriesStddevSampFields = {
  __typename?: 'catalog_avatar_countries_stddev_samp_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  product_avatar_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "catalog.avatar_countries" */
export type CatalogAvatarCountriesStddevSampOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  product_avatar_id?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "catalog_avatar_countries" */
export type CatalogAvatarCountriesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CatalogAvatarCountriesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CatalogAvatarCountriesStreamCursorValueInput = {
  country_id?: InputMaybe<Scalars['Int']['input']>;
  product_avatar_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type CatalogAvatarCountriesSumFields = {
  __typename?: 'catalog_avatar_countries_sum_fields';
  country_id?: Maybe<Scalars['Int']['output']>;
  product_avatar_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "catalog.avatar_countries" */
export type CatalogAvatarCountriesSumOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  product_avatar_id?: InputMaybe<OrderBy>;
};

/** update columns of table "catalog.avatar_countries" */
export enum CatalogAvatarCountriesUpdateColumn {
  /** column name */
  CountryId = 'country_id',
  /** column name */
  ProductAvatarId = 'product_avatar_id'
}

export type CatalogAvatarCountriesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CatalogAvatarCountriesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CatalogAvatarCountriesSetInput>;
  /** filter the rows which have to be updated */
  where: CatalogAvatarCountriesBoolExp;
};

/** aggregate var_pop on columns */
export type CatalogAvatarCountriesVarPopFields = {
  __typename?: 'catalog_avatar_countries_var_pop_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  product_avatar_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "catalog.avatar_countries" */
export type CatalogAvatarCountriesVarPopOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  product_avatar_id?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type CatalogAvatarCountriesVarSampFields = {
  __typename?: 'catalog_avatar_countries_var_samp_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  product_avatar_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "catalog.avatar_countries" */
export type CatalogAvatarCountriesVarSampOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  product_avatar_id?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type CatalogAvatarCountriesVarianceFields = {
  __typename?: 'catalog_avatar_countries_variance_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  product_avatar_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "catalog.avatar_countries" */
export type CatalogAvatarCountriesVarianceOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  product_avatar_id?: InputMaybe<OrderBy>;
};

/** columns and relationships of "catalog.avatars" */
export type CatalogAvatars = {
  __typename?: 'catalog_avatars';
  couple?: Maybe<Scalars['Boolean']['output']>;
  height: Scalars['float8']['output'];
  id?: Scalars['Int']['output'];
  left_margin?: Maybe<Scalars['float8']['output']>;
  product_avatar_countries?: Array<CatalogAvatarCountries>;
    product_id: Scalars['Int']['output'];
  top_margin?: Maybe<Scalars['float8']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['float8']['output']>;
};


/** columns and relationships of "catalog.avatars" */
export type CatalogAvatarsProductAvatarCountriesArgs = {
  distinct_on?: InputMaybe<Array<CatalogAvatarCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAvatarCountriesOrderBy>>;
  where?: InputMaybe<CatalogAvatarCountriesBoolExp>;
};


/** columns and relationships of "catalog.avatars" */
export type CatalogAvatarsProductAvatarCountriesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogAvatarCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAvatarCountriesOrderBy>>;
  where?: InputMaybe<CatalogAvatarCountriesBoolExp>;
};

/** aggregated selection of "catalog.avatars" */
export type CatalogAvatarsAggregate = {
  __typename?: 'catalog_avatars_aggregate';
  aggregate?: Maybe<CatalogAvatarsAggregateFields>;
  nodes: Array<CatalogAvatars>;
};

export type CatalogAvatarsAggregateBoolExp = {
  avg?: InputMaybe<CatalogAvatarsAggregateBoolExpAvg>;
  bool_and?: InputMaybe<CatalogAvatarsAggregateBoolExpBoolAnd>;
  bool_or?: InputMaybe<CatalogAvatarsAggregateBoolExpBoolOr>;
  corr?: InputMaybe<CatalogAvatarsAggregateBoolExpCorr>;
  count?: InputMaybe<CatalogAvatarsAggregateBoolExpCount>;
  covar_samp?: InputMaybe<CatalogAvatarsAggregateBoolExpCovarSamp>;
  max?: InputMaybe<CatalogAvatarsAggregateBoolExpMax>;
  min?: InputMaybe<CatalogAvatarsAggregateBoolExpMin>;
  stddev_samp?: InputMaybe<CatalogAvatarsAggregateBoolExpStddevSamp>;
  sum?: InputMaybe<CatalogAvatarsAggregateBoolExpSum>;
  var_samp?: InputMaybe<CatalogAvatarsAggregateBoolExpVarSamp>;
};

export type CatalogAvatarsAggregateBoolExpAvg = {
  arguments: CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpAvgArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogAvatarsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogAvatarsAggregateBoolExpBoolAnd = {
  arguments: CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpBoolAndArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogAvatarsBoolExp>;
  predicate: BooleanComparisonExp;
};

export type CatalogAvatarsAggregateBoolExpBoolOr = {
  arguments: CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpBoolOrArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogAvatarsBoolExp>;
  predicate: BooleanComparisonExp;
};

export type CatalogAvatarsAggregateBoolExpCorr = {
  arguments: CatalogAvatarsAggregateBoolExpCorrArguments;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogAvatarsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogAvatarsAggregateBoolExpCorrArguments = {
  X: CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpCorrArgumentsColumns;
  Y: CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpCorrArgumentsColumns;
};

export type CatalogAvatarsAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<CatalogAvatarsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogAvatarsBoolExp>;
  predicate: IntComparisonExp;
};

export type CatalogAvatarsAggregateBoolExpCovarSamp = {
  arguments: CatalogAvatarsAggregateBoolExpCovarSampArguments;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogAvatarsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogAvatarsAggregateBoolExpCovarSampArguments = {
  X: CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpCovarSampArgumentsColumns;
  Y: CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpCovarSampArgumentsColumns;
};

export type CatalogAvatarsAggregateBoolExpMax = {
  arguments: CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpMaxArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogAvatarsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogAvatarsAggregateBoolExpMin = {
  arguments: CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpMinArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogAvatarsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogAvatarsAggregateBoolExpStddevSamp = {
  arguments: CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpStddevSampArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogAvatarsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogAvatarsAggregateBoolExpSum = {
  arguments: CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpSumArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogAvatarsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogAvatarsAggregateBoolExpVarSamp = {
  arguments: CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpVarSampArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogAvatarsBoolExp>;
  predicate: Float8ComparisonExp;
};

/** aggregate fields of "catalog.avatars" */
export type CatalogAvatarsAggregateFields = {
  __typename?: 'catalog_avatars_aggregate_fields';
  avg?: Maybe<CatalogAvatarsAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CatalogAvatarsMaxFields>;
  min?: Maybe<CatalogAvatarsMinFields>;
  stddev?: Maybe<CatalogAvatarsStddevFields>;
  stddev_pop?: Maybe<CatalogAvatarsStddevPopFields>;
  stddev_samp?: Maybe<CatalogAvatarsStddevSampFields>;
  sum?: Maybe<CatalogAvatarsSumFields>;
  var_pop?: Maybe<CatalogAvatarsVarPopFields>;
  var_samp?: Maybe<CatalogAvatarsVarSampFields>;
  variance?: Maybe<CatalogAvatarsVarianceFields>;
};


/** aggregate fields of "catalog.avatars" */
export type CatalogAvatarsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CatalogAvatarsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "catalog.avatars" */
export type CatalogAvatarsAggregateOrderBy = {
  avg?: InputMaybe<CatalogAvatarsAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CatalogAvatarsMaxOrderBy>;
  min?: InputMaybe<CatalogAvatarsMinOrderBy>;
  stddev?: InputMaybe<CatalogAvatarsStddevOrderBy>;
  stddev_pop?: InputMaybe<CatalogAvatarsStddevPopOrderBy>;
  stddev_samp?: InputMaybe<CatalogAvatarsStddevSampOrderBy>;
  sum?: InputMaybe<CatalogAvatarsSumOrderBy>;
  var_pop?: InputMaybe<CatalogAvatarsVarPopOrderBy>;
  var_samp?: InputMaybe<CatalogAvatarsVarSampOrderBy>;
  variance?: InputMaybe<CatalogAvatarsVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "catalog.avatars" */
export type CatalogAvatarsArrRelInsertInput = {
  data: Array<CatalogAvatarsInsertInput>;
  /** upsert condition */
  on_conflict?: InputMaybe<CatalogAvatarsOnConflict>;
};

/** aggregate avg on columns */
export type CatalogAvatarsAvgFields = {
  __typename?: 'catalog_avatars_avg_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "catalog.avatars" */
export type CatalogAvatarsAvgOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "catalog.avatars". All fields are combined with a logical 'AND'. */
export type CatalogAvatarsBoolExp = {
  _and?: InputMaybe<Array<CatalogAvatarsBoolExp>>;
  _not?: InputMaybe<CatalogAvatarsBoolExp>;
  _or?: InputMaybe<Array<CatalogAvatarsBoolExp>>;
  couple?: InputMaybe<BooleanComparisonExp>;
  height?: InputMaybe<Float8ComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  left_margin?: InputMaybe<Float8ComparisonExp>;
  product_avatar_countries?: InputMaybe<CatalogAvatarCountriesBoolExp>;
  product_avatar_countries_aggregate?: InputMaybe<CatalogAvatarCountriesAggregateBoolExp>;
  product_id?: InputMaybe<IntComparisonExp>;
  top_margin?: InputMaybe<Float8ComparisonExp>;
  url?: InputMaybe<StringComparisonExp>;
  width?: InputMaybe<Float8ComparisonExp>;
};

/** unique or primary key constraints on table "catalog.avatars" */
export enum CatalogAvatarsConstraint {
  /** unique or primary key constraint on columns "id" */
  ProductAvatarsPkey = 'product_avatars_pkey'
}

/** input type for incrementing numeric columns in table "catalog.avatars" */
export type CatalogAvatarsIncInput = {
  height?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  left_margin?: InputMaybe<Scalars['float8']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  top_margin?: InputMaybe<Scalars['float8']['input']>;
  width?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "catalog.avatars" */
export type CatalogAvatarsInsertInput = {
  couple?: InputMaybe<Scalars['Boolean']['input']>;
  height?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  left_margin?: InputMaybe<Scalars['float8']['input']>;
  product_avatar_countries?: InputMaybe<CatalogAvatarCountriesArrRelInsertInput>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  top_margin?: InputMaybe<Scalars['float8']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate max on columns */
export type CatalogAvatarsMaxFields = {
  __typename?: 'catalog_avatars_max_fields';
  height?: Maybe<Scalars['float8']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  left_margin?: Maybe<Scalars['float8']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  top_margin?: Maybe<Scalars['float8']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['float8']['output']>;
};

/** order by max() on columns of table "catalog.avatars" */
export type CatalogAvatarsMaxOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CatalogAvatarsMinFields = {
  __typename?: 'catalog_avatars_min_fields';
  height?: Maybe<Scalars['float8']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  left_margin?: Maybe<Scalars['float8']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  top_margin?: Maybe<Scalars['float8']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['float8']['output']>;
};

/** order by min() on columns of table "catalog.avatars" */
export type CatalogAvatarsMinOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "catalog.avatars" */
export type CatalogAvatarsMutationResponse = {
  __typename?: 'catalog_avatars_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CatalogAvatars>;
};

/** on_conflict condition type for table "catalog.avatars" */
export type CatalogAvatarsOnConflict = {
  constraint: CatalogAvatarsConstraint;
  update_columns?: Array<CatalogAvatarsUpdateColumn>;
  where?: InputMaybe<CatalogAvatarsBoolExp>;
};

/** Ordering options when selecting data from "catalog.avatars". */
export type CatalogAvatarsOrderBy = {
  couple?: InputMaybe<OrderBy>;
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_avatar_countries_aggregate?: InputMaybe<CatalogAvatarCountriesAggregateOrderBy>;
  product_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: catalog.avatars */
export type CatalogAvatarsPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "catalog.avatars" */
export enum CatalogAvatarsSelectColumn {
  /** column name */
  Couple = 'couple',
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  LeftMargin = 'left_margin',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  TopMargin = 'top_margin',
  /** column name */
  Url = 'url',
  /** column name */
  Width = 'width'
}

/** select "catalog_avatars_aggregate_bool_exp_avg_arguments_columns" columns of table "catalog.avatars" */
export enum CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpAvgArgumentsColumns {
  /** column name */
  Height = 'height',
  /** column name */
  LeftMargin = 'left_margin',
  /** column name */
  TopMargin = 'top_margin',
  /** column name */
  Width = 'width'
}

/** select "catalog_avatars_aggregate_bool_exp_bool_and_arguments_columns" columns of table "catalog.avatars" */
export enum CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpBoolAndArgumentsColumns {
  /** column name */
  Couple = 'couple'
}

/** select "catalog_avatars_aggregate_bool_exp_bool_or_arguments_columns" columns of table "catalog.avatars" */
export enum CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpBoolOrArgumentsColumns {
  /** column name */
  Couple = 'couple'
}

/** select "catalog_avatars_aggregate_bool_exp_corr_arguments_columns" columns of table "catalog.avatars" */
export enum CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpCorrArgumentsColumns {
  /** column name */
  Height = 'height',
  /** column name */
  LeftMargin = 'left_margin',
  /** column name */
  TopMargin = 'top_margin',
  /** column name */
  Width = 'width'
}

/** select "catalog_avatars_aggregate_bool_exp_covar_samp_arguments_columns" columns of table "catalog.avatars" */
export enum CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpCovarSampArgumentsColumns {
  /** column name */
  Height = 'height',
  /** column name */
  LeftMargin = 'left_margin',
  /** column name */
  TopMargin = 'top_margin',
  /** column name */
  Width = 'width'
}

/** select "catalog_avatars_aggregate_bool_exp_max_arguments_columns" columns of table "catalog.avatars" */
export enum CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpMaxArgumentsColumns {
  /** column name */
  Height = 'height',
  /** column name */
  LeftMargin = 'left_margin',
  /** column name */
  TopMargin = 'top_margin',
  /** column name */
  Width = 'width'
}

/** select "catalog_avatars_aggregate_bool_exp_min_arguments_columns" columns of table "catalog.avatars" */
export enum CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpMinArgumentsColumns {
  /** column name */
  Height = 'height',
  /** column name */
  LeftMargin = 'left_margin',
  /** column name */
  TopMargin = 'top_margin',
  /** column name */
  Width = 'width'
}

/** select "catalog_avatars_aggregate_bool_exp_stddev_samp_arguments_columns" columns of table "catalog.avatars" */
export enum CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpStddevSampArgumentsColumns {
  /** column name */
  Height = 'height',
  /** column name */
  LeftMargin = 'left_margin',
  /** column name */
  TopMargin = 'top_margin',
  /** column name */
  Width = 'width'
}

/** select "catalog_avatars_aggregate_bool_exp_sum_arguments_columns" columns of table "catalog.avatars" */
export enum CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpSumArgumentsColumns {
  /** column name */
  Height = 'height',
  /** column name */
  LeftMargin = 'left_margin',
  /** column name */
  TopMargin = 'top_margin',
  /** column name */
  Width = 'width'
}

/** select "catalog_avatars_aggregate_bool_exp_var_samp_arguments_columns" columns of table "catalog.avatars" */
export enum CatalogAvatarsSelectColumnCatalogAvatarsAggregateBoolExpVarSampArgumentsColumns {
  /** column name */
  Height = 'height',
  /** column name */
  LeftMargin = 'left_margin',
  /** column name */
  TopMargin = 'top_margin',
  /** column name */
  Width = 'width'
}

/** input type for updating data in table "catalog.avatars" */
export type CatalogAvatarsSetInput = {
  couple?: InputMaybe<Scalars['Boolean']['input']>;
  height?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  left_margin?: InputMaybe<Scalars['float8']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  top_margin?: InputMaybe<Scalars['float8']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate stddev on columns */
export type CatalogAvatarsStddevFields = {
  __typename?: 'catalog_avatars_stddev_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "catalog.avatars" */
export type CatalogAvatarsStddevOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type CatalogAvatarsStddevPopFields = {
  __typename?: 'catalog_avatars_stddev_pop_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "catalog.avatars" */
export type CatalogAvatarsStddevPopOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type CatalogAvatarsStddevSampFields = {
  __typename?: 'catalog_avatars_stddev_samp_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "catalog.avatars" */
export type CatalogAvatarsStddevSampOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "catalog_avatars" */
export type CatalogAvatarsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CatalogAvatarsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CatalogAvatarsStreamCursorValueInput = {
  couple?: InputMaybe<Scalars['Boolean']['input']>;
  height?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  left_margin?: InputMaybe<Scalars['float8']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  top_margin?: InputMaybe<Scalars['float8']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate sum on columns */
export type CatalogAvatarsSumFields = {
  __typename?: 'catalog_avatars_sum_fields';
  height?: Maybe<Scalars['float8']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  left_margin?: Maybe<Scalars['float8']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  top_margin?: Maybe<Scalars['float8']['output']>;
  width?: Maybe<Scalars['float8']['output']>;
};

/** order by sum() on columns of table "catalog.avatars" */
export type CatalogAvatarsSumOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** update columns of table "catalog.avatars" */
export enum CatalogAvatarsUpdateColumn {
  /** column name */
  Couple = 'couple',
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  LeftMargin = 'left_margin',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  TopMargin = 'top_margin',
  /** column name */
  Url = 'url',
  /** column name */
  Width = 'width'
}

export type CatalogAvatarsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CatalogAvatarsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CatalogAvatarsSetInput>;
  /** filter the rows which have to be updated */
  where: CatalogAvatarsBoolExp;
};

/** aggregate var_pop on columns */
export type CatalogAvatarsVarPopFields = {
  __typename?: 'catalog_avatars_var_pop_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "catalog.avatars" */
export type CatalogAvatarsVarPopOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type CatalogAvatarsVarSampFields = {
  __typename?: 'catalog_avatars_var_samp_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "catalog.avatars" */
export type CatalogAvatarsVarSampOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type CatalogAvatarsVarianceFields = {
  __typename?: 'catalog_avatars_variance_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "catalog.avatars" */
export type CatalogAvatarsVarianceOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** columns and relationships of "catalog.background_countries" */
export type CatalogBackgroundCountries = {
  __typename?: 'catalog_background_countries';
  background_id: Scalars['Int']['output'];
  country_id: Scalars['Int']['output'];
};

/** aggregated selection of "catalog.background_countries" */
export type CatalogBackgroundCountriesAggregate = {
  __typename?: 'catalog_background_countries_aggregate';
  aggregate?: Maybe<CatalogBackgroundCountriesAggregateFields>;
  nodes: Array<CatalogBackgroundCountries>;
};

/** aggregate fields of "catalog.background_countries" */
export type CatalogBackgroundCountriesAggregateFields = {
  __typename?: 'catalog_background_countries_aggregate_fields';
  avg?: Maybe<CatalogBackgroundCountriesAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CatalogBackgroundCountriesMaxFields>;
  min?: Maybe<CatalogBackgroundCountriesMinFields>;
  stddev?: Maybe<CatalogBackgroundCountriesStddevFields>;
  stddev_pop?: Maybe<CatalogBackgroundCountriesStddevPopFields>;
  stddev_samp?: Maybe<CatalogBackgroundCountriesStddevSampFields>;
  sum?: Maybe<CatalogBackgroundCountriesSumFields>;
  var_pop?: Maybe<CatalogBackgroundCountriesVarPopFields>;
  var_samp?: Maybe<CatalogBackgroundCountriesVarSampFields>;
  variance?: Maybe<CatalogBackgroundCountriesVarianceFields>;
};


/** aggregate fields of "catalog.background_countries" */
export type CatalogBackgroundCountriesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CatalogBackgroundCountriesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type CatalogBackgroundCountriesAvgFields = {
  __typename?: 'catalog_background_countries_avg_fields';
  background_id?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "catalog.background_countries". All fields are combined with a logical 'AND'. */
export type CatalogBackgroundCountriesBoolExp = {
  _and?: InputMaybe<Array<CatalogBackgroundCountriesBoolExp>>;
  _not?: InputMaybe<CatalogBackgroundCountriesBoolExp>;
  _or?: InputMaybe<Array<CatalogBackgroundCountriesBoolExp>>;
  background_id?: InputMaybe<IntComparisonExp>;
  country_id?: InputMaybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "catalog.background_countries" */
export enum CatalogBackgroundCountriesConstraint {
  /** unique or primary key constraint on columns "background_id", "country_id" */
  BackgroundCountriesPkey = 'background_countries_pkey'
}

/** input type for incrementing numeric columns in table "catalog.background_countries" */
export type CatalogBackgroundCountriesIncInput = {
  background_id?: InputMaybe<Scalars['Int']['input']>;
  country_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "catalog.background_countries" */
export type CatalogBackgroundCountriesInsertInput = {
  background_id?: InputMaybe<Scalars['Int']['input']>;
  country_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type CatalogBackgroundCountriesMaxFields = {
  __typename?: 'catalog_background_countries_max_fields';
  background_id?: Maybe<Scalars['Int']['output']>;
  country_id?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type CatalogBackgroundCountriesMinFields = {
  __typename?: 'catalog_background_countries_min_fields';
  background_id?: Maybe<Scalars['Int']['output']>;
  country_id?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "catalog.background_countries" */
export type CatalogBackgroundCountriesMutationResponse = {
  __typename?: 'catalog_background_countries_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CatalogBackgroundCountries>;
};

/** on_conflict condition type for table "catalog.background_countries" */
export type CatalogBackgroundCountriesOnConflict = {
  constraint: CatalogBackgroundCountriesConstraint;
  update_columns?: Array<CatalogBackgroundCountriesUpdateColumn>;
  where?: InputMaybe<CatalogBackgroundCountriesBoolExp>;
};

/** Ordering options when selecting data from "catalog.background_countries". */
export type CatalogBackgroundCountriesOrderBy = {
  background_id?: InputMaybe<OrderBy>;
  country_id?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: catalog.background_countries */
export type CatalogBackgroundCountriesPkColumnsInput = {
  background_id: Scalars['Int']['input'];
  country_id: Scalars['Int']['input'];
};

/** select columns of table "catalog.background_countries" */
export enum CatalogBackgroundCountriesSelectColumn {
  /** column name */
  BackgroundId = 'background_id',
  /** column name */
  CountryId = 'country_id'
}

/** input type for updating data in table "catalog.background_countries" */
export type CatalogBackgroundCountriesSetInput = {
  background_id?: InputMaybe<Scalars['Int']['input']>;
  country_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type CatalogBackgroundCountriesStddevFields = {
  __typename?: 'catalog_background_countries_stddev_fields';
  background_id?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type CatalogBackgroundCountriesStddevPopFields = {
  __typename?: 'catalog_background_countries_stddev_pop_fields';
  background_id?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type CatalogBackgroundCountriesStddevSampFields = {
  __typename?: 'catalog_background_countries_stddev_samp_fields';
  background_id?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "catalog_background_countries" */
export type CatalogBackgroundCountriesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CatalogBackgroundCountriesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CatalogBackgroundCountriesStreamCursorValueInput = {
  background_id?: InputMaybe<Scalars['Int']['input']>;
  country_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type CatalogBackgroundCountriesSumFields = {
  __typename?: 'catalog_background_countries_sum_fields';
  background_id?: Maybe<Scalars['Int']['output']>;
  country_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "catalog.background_countries" */
export enum CatalogBackgroundCountriesUpdateColumn {
  /** column name */
  BackgroundId = 'background_id',
  /** column name */
  CountryId = 'country_id'
}

export type CatalogBackgroundCountriesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CatalogBackgroundCountriesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CatalogBackgroundCountriesSetInput>;
  /** filter the rows which have to be updated */
  where: CatalogBackgroundCountriesBoolExp;
};

/** aggregate var_pop on columns */
export type CatalogBackgroundCountriesVarPopFields = {
  __typename?: 'catalog_background_countries_var_pop_fields';
  background_id?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type CatalogBackgroundCountriesVarSampFields = {
  __typename?: 'catalog_background_countries_var_samp_fields';
  background_id?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type CatalogBackgroundCountriesVarianceFields = {
  __typename?: 'catalog_background_countries_variance_fields';
  background_id?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "catalog.backgrounds" */
export type CatalogBackgrounds = {
  __typename?: 'catalog_backgrounds';
  id?: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

/** aggregated selection of "catalog.backgrounds" */
export type CatalogBackgroundsAggregate = {
  __typename?: 'catalog_backgrounds_aggregate';
  aggregate?: Maybe<CatalogBackgroundsAggregateFields>;
  nodes: Array<CatalogBackgrounds>;
};

/** aggregate fields of "catalog.backgrounds" */
export type CatalogBackgroundsAggregateFields = {
  __typename?: 'catalog_backgrounds_aggregate_fields';
  avg?: Maybe<CatalogBackgroundsAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CatalogBackgroundsMaxFields>;
  min?: Maybe<CatalogBackgroundsMinFields>;
  stddev?: Maybe<CatalogBackgroundsStddevFields>;
  stddev_pop?: Maybe<CatalogBackgroundsStddevPopFields>;
  stddev_samp?: Maybe<CatalogBackgroundsStddevSampFields>;
  sum?: Maybe<CatalogBackgroundsSumFields>;
  var_pop?: Maybe<CatalogBackgroundsVarPopFields>;
  var_samp?: Maybe<CatalogBackgroundsVarSampFields>;
  variance?: Maybe<CatalogBackgroundsVarianceFields>;
};


/** aggregate fields of "catalog.backgrounds" */
export type CatalogBackgroundsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CatalogBackgroundsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type CatalogBackgroundsAvgFields = {
  __typename?: 'catalog_backgrounds_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "catalog.backgrounds". All fields are combined with a logical 'AND'. */
export type CatalogBackgroundsBoolExp = {
  _and?: InputMaybe<Array<CatalogBackgroundsBoolExp>>;
  _not?: InputMaybe<CatalogBackgroundsBoolExp>;
  _or?: InputMaybe<Array<CatalogBackgroundsBoolExp>>;
  id?: InputMaybe<IntComparisonExp>;
  url?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "catalog.backgrounds" */
export enum CatalogBackgroundsConstraint {
  /** unique or primary key constraint on columns "id" */
  BackgroundsPkey = 'backgrounds_pkey'
}

/** input type for incrementing numeric columns in table "catalog.backgrounds" */
export type CatalogBackgroundsIncInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "catalog.backgrounds" */
export type CatalogBackgroundsInsertInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type CatalogBackgroundsMaxFields = {
  __typename?: 'catalog_backgrounds_max_fields';
  id?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type CatalogBackgroundsMinFields = {
  __typename?: 'catalog_backgrounds_min_fields';
  id?: Maybe<Scalars['Int']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "catalog.backgrounds" */
export type CatalogBackgroundsMutationResponse = {
  __typename?: 'catalog_backgrounds_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CatalogBackgrounds>;
};

/** on_conflict condition type for table "catalog.backgrounds" */
export type CatalogBackgroundsOnConflict = {
  constraint: CatalogBackgroundsConstraint;
  update_columns?: Array<CatalogBackgroundsUpdateColumn>;
  where?: InputMaybe<CatalogBackgroundsBoolExp>;
};

/** Ordering options when selecting data from "catalog.backgrounds". */
export type CatalogBackgroundsOrderBy = {
  id?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: catalog.backgrounds */
export type CatalogBackgroundsPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "catalog.backgrounds" */
export enum CatalogBackgroundsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Url = 'url'
}

/** input type for updating data in table "catalog.backgrounds" */
export type CatalogBackgroundsSetInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type CatalogBackgroundsStddevFields = {
  __typename?: 'catalog_backgrounds_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type CatalogBackgroundsStddevPopFields = {
  __typename?: 'catalog_backgrounds_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type CatalogBackgroundsStddevSampFields = {
  __typename?: 'catalog_backgrounds_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "catalog_backgrounds" */
export type CatalogBackgroundsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CatalogBackgroundsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CatalogBackgroundsStreamCursorValueInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type CatalogBackgroundsSumFields = {
  __typename?: 'catalog_backgrounds_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "catalog.backgrounds" */
export enum CatalogBackgroundsUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Url = 'url'
}

export type CatalogBackgroundsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CatalogBackgroundsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CatalogBackgroundsSetInput>;
  /** filter the rows which have to be updated */
  where: CatalogBackgroundsBoolExp;
};

/** aggregate var_pop on columns */
export type CatalogBackgroundsVarPopFields = {
  __typename?: 'catalog_backgrounds_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type CatalogBackgroundsVarSampFields = {
  __typename?: 'catalog_backgrounds_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type CatalogBackgroundsVarianceFields = {
  __typename?: 'catalog_backgrounds_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "catalog.categories" */
export type CatalogCategories = {
  __typename?: 'catalog_categories';
  description?: Maybe<Scalars['String']['output']>;
  id?: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

/** aggregated selection of "catalog.categories" */
export type CatalogCategoriesAggregate = {
  __typename?: 'catalog_categories_aggregate';
  aggregate?: Maybe<CatalogCategoriesAggregateFields>;
  nodes: Array<CatalogCategories>;
};

/** aggregate fields of "catalog.categories" */
export type CatalogCategoriesAggregateFields = {
  __typename?: 'catalog_categories_aggregate_fields';
  avg?: Maybe<CatalogCategoriesAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CatalogCategoriesMaxFields>;
  min?: Maybe<CatalogCategoriesMinFields>;
  stddev?: Maybe<CatalogCategoriesStddevFields>;
  stddev_pop?: Maybe<CatalogCategoriesStddevPopFields>;
  stddev_samp?: Maybe<CatalogCategoriesStddevSampFields>;
  sum?: Maybe<CatalogCategoriesSumFields>;
  var_pop?: Maybe<CatalogCategoriesVarPopFields>;
  var_samp?: Maybe<CatalogCategoriesVarSampFields>;
  variance?: Maybe<CatalogCategoriesVarianceFields>;
};


/** aggregate fields of "catalog.categories" */
export type CatalogCategoriesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CatalogCategoriesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type CatalogCategoriesAvgFields = {
  __typename?: 'catalog_categories_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "catalog.categories". All fields are combined with a logical 'AND'. */
export type CatalogCategoriesBoolExp = {
  _and?: InputMaybe<Array<CatalogCategoriesBoolExp>>;
  _not?: InputMaybe<CatalogCategoriesBoolExp>;
  _or?: InputMaybe<Array<CatalogCategoriesBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "catalog.categories" */
export enum CatalogCategoriesConstraint {
  /** unique or primary key constraint on columns "id" */
  CategoriesPkey = 'categories_pkey'
}

/** input type for incrementing numeric columns in table "catalog.categories" */
export type CatalogCategoriesIncInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "catalog.categories" */
export type CatalogCategoriesInsertInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type CatalogCategoriesMaxFields = {
  __typename?: 'catalog_categories_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type CatalogCategoriesMinFields = {
  __typename?: 'catalog_categories_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "catalog.categories" */
export type CatalogCategoriesMutationResponse = {
  __typename?: 'catalog_categories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CatalogCategories>;
};

/** on_conflict condition type for table "catalog.categories" */
export type CatalogCategoriesOnConflict = {
  constraint: CatalogCategoriesConstraint;
  update_columns?: Array<CatalogCategoriesUpdateColumn>;
  where?: InputMaybe<CatalogCategoriesBoolExp>;
};

/** Ordering options when selecting data from "catalog.categories". */
export type CatalogCategoriesOrderBy = {
  description?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: catalog.categories */
export type CatalogCategoriesPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "catalog.categories" */
export enum CatalogCategoriesSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "catalog.categories" */
export type CatalogCategoriesSetInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type CatalogCategoriesStddevFields = {
  __typename?: 'catalog_categories_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type CatalogCategoriesStddevPopFields = {
  __typename?: 'catalog_categories_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type CatalogCategoriesStddevSampFields = {
  __typename?: 'catalog_categories_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "catalog_categories" */
export type CatalogCategoriesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CatalogCategoriesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CatalogCategoriesStreamCursorValueInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type CatalogCategoriesSumFields = {
  __typename?: 'catalog_categories_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "catalog.categories" */
export enum CatalogCategoriesUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type CatalogCategoriesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CatalogCategoriesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CatalogCategoriesSetInput>;
  /** filter the rows which have to be updated */
  where: CatalogCategoriesBoolExp;
};

/** aggregate var_pop on columns */
export type CatalogCategoriesVarPopFields = {
  __typename?: 'catalog_categories_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type CatalogCategoriesVarSampFields = {
  __typename?: 'catalog_categories_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type CatalogCategoriesVarianceFields = {
  __typename?: 'catalog_categories_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "catalog.images" */
export type CatalogImages = {
  __typename?: 'catalog_images';
  height?: Maybe<Scalars['numeric']['output']>;
  id?: Scalars['Int']['output'];
  left_margin?: Maybe<Scalars['numeric']['output']>;
  product_code: Scalars['String']['output'];
  size_id?: Maybe<Scalars['Int']['output']>;
  top_margin?: Maybe<Scalars['numeric']['output']>;
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['numeric']['output']>;
};

/** aggregated selection of "catalog.images" */
export type CatalogImagesAggregate = {
  __typename?: 'catalog_images_aggregate';
  aggregate?: Maybe<CatalogImagesAggregateFields>;
  nodes: Array<CatalogImages>;
};

export type CatalogImagesAggregateBoolExp = {
  count?: InputMaybe<CatalogImagesAggregateBoolExpCount>;
};

export type CatalogImagesAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<CatalogImagesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogImagesBoolExp>;
  predicate: IntComparisonExp;
};

/** aggregate fields of "catalog.images" */
export type CatalogImagesAggregateFields = {
  __typename?: 'catalog_images_aggregate_fields';
  avg?: Maybe<CatalogImagesAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CatalogImagesMaxFields>;
  min?: Maybe<CatalogImagesMinFields>;
  stddev?: Maybe<CatalogImagesStddevFields>;
  stddev_pop?: Maybe<CatalogImagesStddevPopFields>;
  stddev_samp?: Maybe<CatalogImagesStddevSampFields>;
  sum?: Maybe<CatalogImagesSumFields>;
  var_pop?: Maybe<CatalogImagesVarPopFields>;
  var_samp?: Maybe<CatalogImagesVarSampFields>;
  variance?: Maybe<CatalogImagesVarianceFields>;
};


/** aggregate fields of "catalog.images" */
export type CatalogImagesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CatalogImagesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "catalog.images" */
export type CatalogImagesAggregateOrderBy = {
  avg?: InputMaybe<CatalogImagesAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CatalogImagesMaxOrderBy>;
  min?: InputMaybe<CatalogImagesMinOrderBy>;
  stddev?: InputMaybe<CatalogImagesStddevOrderBy>;
  stddev_pop?: InputMaybe<CatalogImagesStddevPopOrderBy>;
  stddev_samp?: InputMaybe<CatalogImagesStddevSampOrderBy>;
  sum?: InputMaybe<CatalogImagesSumOrderBy>;
  var_pop?: InputMaybe<CatalogImagesVarPopOrderBy>;
  var_samp?: InputMaybe<CatalogImagesVarSampOrderBy>;
  variance?: InputMaybe<CatalogImagesVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "catalog.images" */
export type CatalogImagesArrRelInsertInput = {
  data: Array<CatalogImagesInsertInput>;
  /** upsert condition */
  on_conflict?: InputMaybe<CatalogImagesOnConflict>;
};

/** aggregate avg on columns */
export type CatalogImagesAvgFields = {
  __typename?: 'catalog_images_avg_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "catalog.images" */
export type CatalogImagesAvgOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "catalog.images". All fields are combined with a logical 'AND'. */
export type CatalogImagesBoolExp = {
  _and?: InputMaybe<Array<CatalogImagesBoolExp>>;
  _not?: InputMaybe<CatalogImagesBoolExp>;
  _or?: InputMaybe<Array<CatalogImagesBoolExp>>;
  height?: InputMaybe<NumericComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  left_margin?: InputMaybe<NumericComparisonExp>;
  product_code?: InputMaybe<StringComparisonExp>;
  size_id?: InputMaybe<IntComparisonExp>;
  top_margin?: InputMaybe<NumericComparisonExp>;
  url?: InputMaybe<StringComparisonExp>;
  width?: InputMaybe<NumericComparisonExp>;
};

/** unique or primary key constraints on table "catalog.images" */
export enum CatalogImagesConstraint {
  /** unique or primary key constraint on columns "id" */
  ProductImagesPkey = 'product_images_pkey'
}

/** input type for incrementing numeric columns in table "catalog.images" */
export type CatalogImagesIncInput = {
  height?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  left_margin?: InputMaybe<Scalars['numeric']['input']>;
  size_id?: InputMaybe<Scalars['Int']['input']>;
  top_margin?: InputMaybe<Scalars['numeric']['input']>;
  width?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "catalog.images" */
export type CatalogImagesInsertInput = {
  height?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  left_margin?: InputMaybe<Scalars['numeric']['input']>;
  product_code?: InputMaybe<Scalars['String']['input']>;
  size_id?: InputMaybe<Scalars['Int']['input']>;
  top_margin?: InputMaybe<Scalars['numeric']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate max on columns */
export type CatalogImagesMaxFields = {
  __typename?: 'catalog_images_max_fields';
  height?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  left_margin?: Maybe<Scalars['numeric']['output']>;
  product_code?: Maybe<Scalars['String']['output']>;
  size_id?: Maybe<Scalars['Int']['output']>;
  top_margin?: Maybe<Scalars['numeric']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "catalog.images" */
export type CatalogImagesMaxOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_code?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CatalogImagesMinFields = {
  __typename?: 'catalog_images_min_fields';
  height?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  left_margin?: Maybe<Scalars['numeric']['output']>;
  product_code?: Maybe<Scalars['String']['output']>;
  size_id?: Maybe<Scalars['Int']['output']>;
  top_margin?: Maybe<Scalars['numeric']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "catalog.images" */
export type CatalogImagesMinOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_code?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "catalog.images" */
export type CatalogImagesMutationResponse = {
  __typename?: 'catalog_images_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CatalogImages>;
};

/** on_conflict condition type for table "catalog.images" */
export type CatalogImagesOnConflict = {
  constraint: CatalogImagesConstraint;
  update_columns?: Array<CatalogImagesUpdateColumn>;
  where?: InputMaybe<CatalogImagesBoolExp>;
};

/** Ordering options when selecting data from "catalog.images". */
export type CatalogImagesOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  product_code?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: catalog.images */
export type CatalogImagesPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "catalog.images" */
export enum CatalogImagesSelectColumn {
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  LeftMargin = 'left_margin',
  /** column name */
  ProductCode = 'product_code',
  /** column name */
  SizeId = 'size_id',
  /** column name */
  TopMargin = 'top_margin',
  /** column name */
  Url = 'url',
  /** column name */
  Width = 'width'
}

/** input type for updating data in table "catalog.images" */
export type CatalogImagesSetInput = {
  height?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  left_margin?: InputMaybe<Scalars['numeric']['input']>;
  product_code?: InputMaybe<Scalars['String']['input']>;
  size_id?: InputMaybe<Scalars['Int']['input']>;
  top_margin?: InputMaybe<Scalars['numeric']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate stddev on columns */
export type CatalogImagesStddevFields = {
  __typename?: 'catalog_images_stddev_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "catalog.images" */
export type CatalogImagesStddevOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type CatalogImagesStddevPopFields = {
  __typename?: 'catalog_images_stddev_pop_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "catalog.images" */
export type CatalogImagesStddevPopOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type CatalogImagesStddevSampFields = {
  __typename?: 'catalog_images_stddev_samp_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "catalog.images" */
export type CatalogImagesStddevSampOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "catalog_images" */
export type CatalogImagesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CatalogImagesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CatalogImagesStreamCursorValueInput = {
  height?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  left_margin?: InputMaybe<Scalars['numeric']['input']>;
  product_code?: InputMaybe<Scalars['String']['input']>;
  size_id?: InputMaybe<Scalars['Int']['input']>;
  top_margin?: InputMaybe<Scalars['numeric']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type CatalogImagesSumFields = {
  __typename?: 'catalog_images_sum_fields';
  height?: Maybe<Scalars['numeric']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  left_margin?: Maybe<Scalars['numeric']['output']>;
  size_id?: Maybe<Scalars['Int']['output']>;
  top_margin?: Maybe<Scalars['numeric']['output']>;
  width?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "catalog.images" */
export type CatalogImagesSumOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** update columns of table "catalog.images" */
export enum CatalogImagesUpdateColumn {
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  LeftMargin = 'left_margin',
  /** column name */
  ProductCode = 'product_code',
  /** column name */
  SizeId = 'size_id',
  /** column name */
  TopMargin = 'top_margin',
  /** column name */
  Url = 'url',
  /** column name */
  Width = 'width'
}

export type CatalogImagesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CatalogImagesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CatalogImagesSetInput>;
  /** filter the rows which have to be updated */
  where: CatalogImagesBoolExp;
};

/** aggregate var_pop on columns */
export type CatalogImagesVarPopFields = {
  __typename?: 'catalog_images_var_pop_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "catalog.images" */
export type CatalogImagesVarPopOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type CatalogImagesVarSampFields = {
  __typename?: 'catalog_images_var_samp_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "catalog.images" */
export type CatalogImagesVarSampOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type CatalogImagesVarianceFields = {
  __typename?: 'catalog_images_variance_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  left_margin?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
  top_margin?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "catalog.images" */
export type CatalogImagesVarianceOrderBy = {
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  left_margin?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
  top_margin?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** columns and relationships of "catalog.prices" */
export type CatalogPrices = {
  __typename?: 'catalog_prices';
  amount: Scalars['Int']['output'];
  country?: CommonCountries;
  country_id: Scalars['Int']['output'];
  id?: Scalars['Int']['output'];
  product?: CatalogProducts;
  product_id: Scalars['Int']['output'];
  size?: CatalogSizes;
  size_id: Scalars['Int']['output'];
};

/** aggregated selection of "catalog.prices" */
export type CatalogPricesAggregate = {
  __typename?: 'catalog_prices_aggregate';
  aggregate?: Maybe<CatalogPricesAggregateFields>;
  nodes: Array<CatalogPrices>;
};

export type CatalogPricesAggregateBoolExp = {
  count?: InputMaybe<CatalogPricesAggregateBoolExpCount>;
};

export type CatalogPricesAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<CatalogPricesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogPricesBoolExp>;
  predicate: IntComparisonExp;
};

/** aggregate fields of "catalog.prices" */
export type CatalogPricesAggregateFields = {
  __typename?: 'catalog_prices_aggregate_fields';
  avg?: Maybe<CatalogPricesAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CatalogPricesMaxFields>;
  min?: Maybe<CatalogPricesMinFields>;
  stddev?: Maybe<CatalogPricesStddevFields>;
  stddev_pop?: Maybe<CatalogPricesStddevPopFields>;
  stddev_samp?: Maybe<CatalogPricesStddevSampFields>;
  sum?: Maybe<CatalogPricesSumFields>;
  var_pop?: Maybe<CatalogPricesVarPopFields>;
  var_samp?: Maybe<CatalogPricesVarSampFields>;
  variance?: Maybe<CatalogPricesVarianceFields>;
};


/** aggregate fields of "catalog.prices" */
export type CatalogPricesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CatalogPricesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "catalog.prices" */
export type CatalogPricesAggregateOrderBy = {
  avg?: InputMaybe<CatalogPricesAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CatalogPricesMaxOrderBy>;
  min?: InputMaybe<CatalogPricesMinOrderBy>;
  stddev?: InputMaybe<CatalogPricesStddevOrderBy>;
  stddev_pop?: InputMaybe<CatalogPricesStddevPopOrderBy>;
  stddev_samp?: InputMaybe<CatalogPricesStddevSampOrderBy>;
  sum?: InputMaybe<CatalogPricesSumOrderBy>;
  var_pop?: InputMaybe<CatalogPricesVarPopOrderBy>;
  var_samp?: InputMaybe<CatalogPricesVarSampOrderBy>;
  variance?: InputMaybe<CatalogPricesVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "catalog.prices" */
export type CatalogPricesArrRelInsertInput = {
  data: Array<CatalogPricesInsertInput>;
  /** upsert condition */
  on_conflict?: InputMaybe<CatalogPricesOnConflict>;
};

/** aggregate avg on columns */
export type CatalogPricesAvgFields = {
  __typename?: 'catalog_prices_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "catalog.prices" */
export type CatalogPricesAvgOrderBy = {
  amount?: InputMaybe<OrderBy>;
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "catalog.prices". All fields are combined with a logical 'AND'. */
export type CatalogPricesBoolExp = {
  _and?: InputMaybe<Array<CatalogPricesBoolExp>>;
  _not?: InputMaybe<CatalogPricesBoolExp>;
  _or?: InputMaybe<Array<CatalogPricesBoolExp>>;
  amount?: InputMaybe<IntComparisonExp>;
  country?: InputMaybe<CommonCountriesBoolExp>;
  country_id?: InputMaybe<IntComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  product?: InputMaybe<CatalogProductsBoolExp>;
  product_id?: InputMaybe<IntComparisonExp>;
  size?: InputMaybe<CatalogSizesBoolExp>;
  size_id?: InputMaybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "catalog.prices" */
export enum CatalogPricesConstraint {
  /** unique or primary key constraint on columns "id" */
  PricingLevelsPkey = 'pricing_levels_pkey',
  /** unique or primary key constraint on columns "size_id", "product_id", "country_id" */
  PricingLevelsProductIdCountryIdSizeIdKey = 'pricing_levels_product_id_country_id_size_id_key'
}

/** input type for incrementing numeric columns in table "catalog.prices" */
export type CatalogPricesIncInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  country_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  size_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "catalog.prices" */
export type CatalogPricesInsertInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  country?: InputMaybe<CommonCountriesObjRelInsertInput>;
  country_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product?: InputMaybe<CatalogProductsObjRelInsertInput>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<CatalogSizesObjRelInsertInput>;
  size_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type CatalogPricesMaxFields = {
  __typename?: 'catalog_prices_max_fields';
  amount?: Maybe<Scalars['Int']['output']>;
  country_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  size_id?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "catalog.prices" */
export type CatalogPricesMaxOrderBy = {
  amount?: InputMaybe<OrderBy>;
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CatalogPricesMinFields = {
  __typename?: 'catalog_prices_min_fields';
  amount?: Maybe<Scalars['Int']['output']>;
  country_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  size_id?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "catalog.prices" */
export type CatalogPricesMinOrderBy = {
  amount?: InputMaybe<OrderBy>;
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "catalog.prices" */
export type CatalogPricesMutationResponse = {
  __typename?: 'catalog_prices_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CatalogPrices>;
};

/** on_conflict condition type for table "catalog.prices" */
export type CatalogPricesOnConflict = {
  constraint: CatalogPricesConstraint;
  update_columns?: Array<CatalogPricesUpdateColumn>;
  where?: InputMaybe<CatalogPricesBoolExp>;
};

/** Ordering options when selecting data from "catalog.prices". */
export type CatalogPricesOrderBy = {
  amount?: InputMaybe<OrderBy>;
  country?: InputMaybe<CommonCountriesOrderBy>;
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product?: InputMaybe<CatalogProductsOrderBy>;
  product_id?: InputMaybe<OrderBy>;
  size?: InputMaybe<CatalogSizesOrderBy>;
  size_id?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: catalog.prices */
export type CatalogPricesPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "catalog.prices" */
export enum CatalogPricesSelectColumn {
  /** column name */
  Amount = 'amount',
  /** column name */
  CountryId = 'country_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  SizeId = 'size_id'
}

/** input type for updating data in table "catalog.prices" */
export type CatalogPricesSetInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  country_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  size_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type CatalogPricesStddevFields = {
  __typename?: 'catalog_prices_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "catalog.prices" */
export type CatalogPricesStddevOrderBy = {
  amount?: InputMaybe<OrderBy>;
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type CatalogPricesStddevPopFields = {
  __typename?: 'catalog_prices_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "catalog.prices" */
export type CatalogPricesStddevPopOrderBy = {
  amount?: InputMaybe<OrderBy>;
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type CatalogPricesStddevSampFields = {
  __typename?: 'catalog_prices_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "catalog.prices" */
export type CatalogPricesStddevSampOrderBy = {
  amount?: InputMaybe<OrderBy>;
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "catalog_prices" */
export type CatalogPricesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CatalogPricesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CatalogPricesStreamCursorValueInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  country_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  size_id?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type CatalogPricesSumFields = {
  __typename?: 'catalog_prices_sum_fields';
  amount?: Maybe<Scalars['Int']['output']>;
  country_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  size_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "catalog.prices" */
export type CatalogPricesSumOrderBy = {
  amount?: InputMaybe<OrderBy>;
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
};

/** update columns of table "catalog.prices" */
export enum CatalogPricesUpdateColumn {
  /** column name */
  Amount = 'amount',
  /** column name */
  CountryId = 'country_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  SizeId = 'size_id'
}

export type CatalogPricesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CatalogPricesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CatalogPricesSetInput>;
  /** filter the rows which have to be updated */
  where: CatalogPricesBoolExp;
};

/** aggregate var_pop on columns */
export type CatalogPricesVarPopFields = {
  __typename?: 'catalog_prices_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "catalog.prices" */
export type CatalogPricesVarPopOrderBy = {
  amount?: InputMaybe<OrderBy>;
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type CatalogPricesVarSampFields = {
  __typename?: 'catalog_prices_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "catalog.prices" */
export type CatalogPricesVarSampOrderBy = {
  amount?: InputMaybe<OrderBy>;
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type CatalogPricesVarianceFields = {
  __typename?: 'catalog_prices_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  size_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "catalog.prices" */
export type CatalogPricesVarianceOrderBy = {
  amount?: InputMaybe<OrderBy>;
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  size_id?: InputMaybe<OrderBy>;
};

/** columns and relationships of "catalog.product_attributes" */
export type CatalogProductAttributes = {
  __typename?: 'catalog_product_attributes';
  attribute_id: Scalars['Int']['output'];
  product_id: Scalars['Int']['output'];
  value?: Maybe<Scalars['Boolean']['output']>;
};

/** aggregated selection of "catalog.product_attributes" */
export type CatalogProductAttributesAggregate = {
  __typename?: 'catalog_product_attributes_aggregate';
  aggregate?: Maybe<CatalogProductAttributesAggregateFields>;
  nodes: Array<CatalogProductAttributes>;
};

/** aggregate fields of "catalog.product_attributes" */
export type CatalogProductAttributesAggregateFields = {
  __typename?: 'catalog_product_attributes_aggregate_fields';
  avg?: Maybe<CatalogProductAttributesAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CatalogProductAttributesMaxFields>;
  min?: Maybe<CatalogProductAttributesMinFields>;
  stddev?: Maybe<CatalogProductAttributesStddevFields>;
  stddev_pop?: Maybe<CatalogProductAttributesStddevPopFields>;
  stddev_samp?: Maybe<CatalogProductAttributesStddevSampFields>;
  sum?: Maybe<CatalogProductAttributesSumFields>;
  var_pop?: Maybe<CatalogProductAttributesVarPopFields>;
  var_samp?: Maybe<CatalogProductAttributesVarSampFields>;
  variance?: Maybe<CatalogProductAttributesVarianceFields>;
};


/** aggregate fields of "catalog.product_attributes" */
export type CatalogProductAttributesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CatalogProductAttributesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type CatalogProductAttributesAvgFields = {
  __typename?: 'catalog_product_attributes_avg_fields';
  attribute_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "catalog.product_attributes". All fields are combined with a logical 'AND'. */
export type CatalogProductAttributesBoolExp = {
  _and?: InputMaybe<Array<CatalogProductAttributesBoolExp>>;
  _not?: InputMaybe<CatalogProductAttributesBoolExp>;
  _or?: InputMaybe<Array<CatalogProductAttributesBoolExp>>;
  attribute_id?: InputMaybe<IntComparisonExp>;
  product_id?: InputMaybe<IntComparisonExp>;
  value?: InputMaybe<BooleanComparisonExp>;
};

/** unique or primary key constraints on table "catalog.product_attributes" */
export enum CatalogProductAttributesConstraint {
  /** unique or primary key constraint on columns "attribute_id", "product_id" */
  ProductAttributesPkey = 'product_attributes_pkey'
}

/** input type for incrementing numeric columns in table "catalog.product_attributes" */
export type CatalogProductAttributesIncInput = {
  attribute_id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "catalog.product_attributes" */
export type CatalogProductAttributesInsertInput = {
  attribute_id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type CatalogProductAttributesMaxFields = {
  __typename?: 'catalog_product_attributes_max_fields';
  attribute_id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type CatalogProductAttributesMinFields = {
  __typename?: 'catalog_product_attributes_min_fields';
  attribute_id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "catalog.product_attributes" */
export type CatalogProductAttributesMutationResponse = {
  __typename?: 'catalog_product_attributes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CatalogProductAttributes>;
};

/** on_conflict condition type for table "catalog.product_attributes" */
export type CatalogProductAttributesOnConflict = {
  constraint: CatalogProductAttributesConstraint;
  update_columns?: Array<CatalogProductAttributesUpdateColumn>;
  where?: InputMaybe<CatalogProductAttributesBoolExp>;
};

/** Ordering options when selecting data from "catalog.product_attributes". */
export type CatalogProductAttributesOrderBy = {
  attribute_id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: catalog.product_attributes */
export type CatalogProductAttributesPkColumnsInput = {
  attribute_id: Scalars['Int']['input'];
  product_id: Scalars['Int']['input'];
};

/** select columns of table "catalog.product_attributes" */
export enum CatalogProductAttributesSelectColumn {
  /** column name */
  AttributeId = 'attribute_id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "catalog.product_attributes" */
export type CatalogProductAttributesSetInput = {
  attribute_id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate stddev on columns */
export type CatalogProductAttributesStddevFields = {
  __typename?: 'catalog_product_attributes_stddev_fields';
  attribute_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type CatalogProductAttributesStddevPopFields = {
  __typename?: 'catalog_product_attributes_stddev_pop_fields';
  attribute_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type CatalogProductAttributesStddevSampFields = {
  __typename?: 'catalog_product_attributes_stddev_samp_fields';
  attribute_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "catalog_product_attributes" */
export type CatalogProductAttributesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CatalogProductAttributesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CatalogProductAttributesStreamCursorValueInput = {
  attribute_id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  value?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate sum on columns */
export type CatalogProductAttributesSumFields = {
  __typename?: 'catalog_product_attributes_sum_fields';
  attribute_id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "catalog.product_attributes" */
export enum CatalogProductAttributesUpdateColumn {
  /** column name */
  AttributeId = 'attribute_id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  Value = 'value'
}

export type CatalogProductAttributesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CatalogProductAttributesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CatalogProductAttributesSetInput>;
  /** filter the rows which have to be updated */
  where: CatalogProductAttributesBoolExp;
};

/** aggregate var_pop on columns */
export type CatalogProductAttributesVarPopFields = {
  __typename?: 'catalog_product_attributes_var_pop_fields';
  attribute_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type CatalogProductAttributesVarSampFields = {
  __typename?: 'catalog_product_attributes_var_samp_fields';
  attribute_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type CatalogProductAttributesVarianceFields = {
  __typename?: 'catalog_product_attributes_variance_fields';
  attribute_id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "catalog.products" */
export type CatalogProducts = {
  __typename?: 'catalog_products';
  avatars?: Array<CatalogAvatars>;
    code: Scalars['String']['output'];
  configurable: Scalars['Boolean']['output'];
  id?: Scalars['Int']['output'];
  images?: Array<CatalogImages>;
    name: Scalars['String']['output'];
  prices?: Array<CatalogPrices>;
    sizes?: Array<CatalogSizes>;
    slugs?: Array<CatalogSlugs>;
  };


/** columns and relationships of "catalog.products" */
export type CatalogProductsAvatarsArgs = {
  distinct_on?: InputMaybe<Array<CatalogAvatarsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAvatarsOrderBy>>;
  where?: InputMaybe<CatalogAvatarsBoolExp>;
};


/** columns and relationships of "catalog.products" */
export type CatalogProductsAvatarsAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogAvatarsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAvatarsOrderBy>>;
  where?: InputMaybe<CatalogAvatarsBoolExp>;
};


/** columns and relationships of "catalog.products" */
export type CatalogProductsImagesArgs = {
  distinct_on?: InputMaybe<Array<CatalogImagesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogImagesOrderBy>>;
  where?: InputMaybe<CatalogImagesBoolExp>;
};


/** columns and relationships of "catalog.products" */
export type CatalogProductsImagesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogImagesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogImagesOrderBy>>;
  where?: InputMaybe<CatalogImagesBoolExp>;
};


/** columns and relationships of "catalog.products" */
export type CatalogProductsPricesArgs = {
  distinct_on?: InputMaybe<Array<CatalogPricesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogPricesOrderBy>>;
  where?: InputMaybe<CatalogPricesBoolExp>;
};


/** columns and relationships of "catalog.products" */
export type CatalogProductsPricesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogPricesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogPricesOrderBy>>;
  where?: InputMaybe<CatalogPricesBoolExp>;
};


/** columns and relationships of "catalog.products" */
export type CatalogProductsSizesArgs = {
  distinct_on?: InputMaybe<Array<CatalogSizesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogSizesOrderBy>>;
  where?: InputMaybe<CatalogSizesBoolExp>;
};


/** columns and relationships of "catalog.products" */
export type CatalogProductsSizesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogSizesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogSizesOrderBy>>;
  where?: InputMaybe<CatalogSizesBoolExp>;
};


/** columns and relationships of "catalog.products" */
export type CatalogProductsSlugsArgs = {
  distinct_on?: InputMaybe<Array<CatalogSlugsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogSlugsOrderBy>>;
  where?: InputMaybe<CatalogSlugsBoolExp>;
};


/** columns and relationships of "catalog.products" */
export type CatalogProductsSlugsAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogSlugsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogSlugsOrderBy>>;
  where?: InputMaybe<CatalogSlugsBoolExp>;
};

/** aggregated selection of "catalog.products" */
export type CatalogProductsAggregate = {
  __typename?: 'catalog_products_aggregate';
  aggregate?: Maybe<CatalogProductsAggregateFields>;
  nodes: Array<CatalogProducts>;
};

/** aggregate fields of "catalog.products" */
export type CatalogProductsAggregateFields = {
  __typename?: 'catalog_products_aggregate_fields';
  avg?: Maybe<CatalogProductsAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CatalogProductsMaxFields>;
  min?: Maybe<CatalogProductsMinFields>;
  stddev?: Maybe<CatalogProductsStddevFields>;
  stddev_pop?: Maybe<CatalogProductsStddevPopFields>;
  stddev_samp?: Maybe<CatalogProductsStddevSampFields>;
  sum?: Maybe<CatalogProductsSumFields>;
  var_pop?: Maybe<CatalogProductsVarPopFields>;
  var_samp?: Maybe<CatalogProductsVarSampFields>;
  variance?: Maybe<CatalogProductsVarianceFields>;
};


/** aggregate fields of "catalog.products" */
export type CatalogProductsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CatalogProductsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type CatalogProductsAvgFields = {
  __typename?: 'catalog_products_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "catalog.products". All fields are combined with a logical 'AND'. */
export type CatalogProductsBoolExp = {
  _and?: InputMaybe<Array<CatalogProductsBoolExp>>;
  _not?: InputMaybe<CatalogProductsBoolExp>;
  _or?: InputMaybe<Array<CatalogProductsBoolExp>>;
  avatars?: InputMaybe<CatalogAvatarsBoolExp>;
  avatars_aggregate?: InputMaybe<CatalogAvatarsAggregateBoolExp>;
  code?: InputMaybe<StringComparisonExp>;
  configurable?: InputMaybe<BooleanComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  images?: InputMaybe<CatalogImagesBoolExp>;
  images_aggregate?: InputMaybe<CatalogImagesAggregateBoolExp>;
  name?: InputMaybe<StringComparisonExp>;
  prices?: InputMaybe<CatalogPricesBoolExp>;
  prices_aggregate?: InputMaybe<CatalogPricesAggregateBoolExp>;
  sizes?: InputMaybe<CatalogSizesBoolExp>;
  sizes_aggregate?: InputMaybe<CatalogSizesAggregateBoolExp>;
  slugs?: InputMaybe<CatalogSlugsBoolExp>;
  slugs_aggregate?: InputMaybe<CatalogSlugsAggregateBoolExp>;
};

/** unique or primary key constraints on table "catalog.products" */
export enum CatalogProductsConstraint {
  /** unique or primary key constraint on columns "code" */
  ProductsCodeKey = 'products_code_key',
  /** unique or primary key constraint on columns "id" */
  ProductsPkey = 'products_pkey'
}

/** input type for incrementing numeric columns in table "catalog.products" */
export type CatalogProductsIncInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "catalog.products" */
export type CatalogProductsInsertInput = {
  avatars?: InputMaybe<CatalogAvatarsArrRelInsertInput>;
  code?: InputMaybe<Scalars['String']['input']>;
  configurable?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  images?: InputMaybe<CatalogImagesArrRelInsertInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  prices?: InputMaybe<CatalogPricesArrRelInsertInput>;
  sizes?: InputMaybe<CatalogSizesArrRelInsertInput>;
  slugs?: InputMaybe<CatalogSlugsArrRelInsertInput>;
};

/** aggregate max on columns */
export type CatalogProductsMaxFields = {
  __typename?: 'catalog_products_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type CatalogProductsMinFields = {
  __typename?: 'catalog_products_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "catalog.products" */
export type CatalogProductsMutationResponse = {
  __typename?: 'catalog_products_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CatalogProducts>;
};

/** input type for inserting object relation for remote table "catalog.products" */
export type CatalogProductsObjRelInsertInput = {
  data: CatalogProductsInsertInput;
  /** upsert condition */
  on_conflict?: InputMaybe<CatalogProductsOnConflict>;
};

/** on_conflict condition type for table "catalog.products" */
export type CatalogProductsOnConflict = {
  constraint: CatalogProductsConstraint;
  update_columns?: Array<CatalogProductsUpdateColumn>;
  where?: InputMaybe<CatalogProductsBoolExp>;
};

/** Ordering options when selecting data from "catalog.products". */
export type CatalogProductsOrderBy = {
  avatars_aggregate?: InputMaybe<CatalogAvatarsAggregateOrderBy>;
  code?: InputMaybe<OrderBy>;
  configurable?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  images_aggregate?: InputMaybe<CatalogImagesAggregateOrderBy>;
  name?: InputMaybe<OrderBy>;
  prices_aggregate?: InputMaybe<CatalogPricesAggregateOrderBy>;
  sizes_aggregate?: InputMaybe<CatalogSizesAggregateOrderBy>;
  slugs_aggregate?: InputMaybe<CatalogSlugsAggregateOrderBy>;
};

/** primary key columns input for table: catalog.products */
export type CatalogProductsPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "catalog.products" */
export enum CatalogProductsSelectColumn {
  /** column name */
  Code = 'code',
  /** column name */
  Configurable = 'configurable',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "catalog.products" */
export type CatalogProductsSetInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  configurable?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type CatalogProductsStddevFields = {
  __typename?: 'catalog_products_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type CatalogProductsStddevPopFields = {
  __typename?: 'catalog_products_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type CatalogProductsStddevSampFields = {
  __typename?: 'catalog_products_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "catalog_products" */
export type CatalogProductsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CatalogProductsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CatalogProductsStreamCursorValueInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  configurable?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type CatalogProductsSumFields = {
  __typename?: 'catalog_products_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "catalog.products" */
export enum CatalogProductsUpdateColumn {
  /** column name */
  Code = 'code',
  /** column name */
  Configurable = 'configurable',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type CatalogProductsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CatalogProductsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CatalogProductsSetInput>;
  /** filter the rows which have to be updated */
  where: CatalogProductsBoolExp;
};

/** aggregate var_pop on columns */
export type CatalogProductsVarPopFields = {
  __typename?: 'catalog_products_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type CatalogProductsVarSampFields = {
  __typename?: 'catalog_products_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type CatalogProductsVarianceFields = {
  __typename?: 'catalog_products_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "catalog.sizes" */
export type CatalogSizes = {
  __typename?: 'catalog_sizes';
  height_cm: Scalars['float8']['output'];
  height_in: Scalars['float8']['output'];
  id?: Scalars['Int']['output'];
  product_id?: Maybe<Scalars['Int']['output']>;
  width_cm: Scalars['float8']['output'];
  width_in: Scalars['float8']['output'];
};

/** aggregated selection of "catalog.sizes" */
export type CatalogSizesAggregate = {
  __typename?: 'catalog_sizes_aggregate';
  aggregate?: Maybe<CatalogSizesAggregateFields>;
  nodes: Array<CatalogSizes>;
};

export type CatalogSizesAggregateBoolExp = {
  avg?: InputMaybe<CatalogSizesAggregateBoolExpAvg>;
  corr?: InputMaybe<CatalogSizesAggregateBoolExpCorr>;
  count?: InputMaybe<CatalogSizesAggregateBoolExpCount>;
  covar_samp?: InputMaybe<CatalogSizesAggregateBoolExpCovarSamp>;
  max?: InputMaybe<CatalogSizesAggregateBoolExpMax>;
  min?: InputMaybe<CatalogSizesAggregateBoolExpMin>;
  stddev_samp?: InputMaybe<CatalogSizesAggregateBoolExpStddevSamp>;
  sum?: InputMaybe<CatalogSizesAggregateBoolExpSum>;
  var_samp?: InputMaybe<CatalogSizesAggregateBoolExpVarSamp>;
};

export type CatalogSizesAggregateBoolExpAvg = {
  arguments: CatalogSizesSelectColumnCatalogSizesAggregateBoolExpAvgArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogSizesBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogSizesAggregateBoolExpCorr = {
  arguments: CatalogSizesAggregateBoolExpCorrArguments;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogSizesBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogSizesAggregateBoolExpCorrArguments = {
  X: CatalogSizesSelectColumnCatalogSizesAggregateBoolExpCorrArgumentsColumns;
  Y: CatalogSizesSelectColumnCatalogSizesAggregateBoolExpCorrArgumentsColumns;
};

export type CatalogSizesAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<CatalogSizesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogSizesBoolExp>;
  predicate: IntComparisonExp;
};

export type CatalogSizesAggregateBoolExpCovarSamp = {
  arguments: CatalogSizesAggregateBoolExpCovarSampArguments;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogSizesBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogSizesAggregateBoolExpCovarSampArguments = {
  X: CatalogSizesSelectColumnCatalogSizesAggregateBoolExpCovarSampArgumentsColumns;
  Y: CatalogSizesSelectColumnCatalogSizesAggregateBoolExpCovarSampArgumentsColumns;
};

export type CatalogSizesAggregateBoolExpMax = {
  arguments: CatalogSizesSelectColumnCatalogSizesAggregateBoolExpMaxArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogSizesBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogSizesAggregateBoolExpMin = {
  arguments: CatalogSizesSelectColumnCatalogSizesAggregateBoolExpMinArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogSizesBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogSizesAggregateBoolExpStddevSamp = {
  arguments: CatalogSizesSelectColumnCatalogSizesAggregateBoolExpStddevSampArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogSizesBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogSizesAggregateBoolExpSum = {
  arguments: CatalogSizesSelectColumnCatalogSizesAggregateBoolExpSumArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogSizesBoolExp>;
  predicate: Float8ComparisonExp;
};

export type CatalogSizesAggregateBoolExpVarSamp = {
  arguments: CatalogSizesSelectColumnCatalogSizesAggregateBoolExpVarSampArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogSizesBoolExp>;
  predicate: Float8ComparisonExp;
};

/** aggregate fields of "catalog.sizes" */
export type CatalogSizesAggregateFields = {
  __typename?: 'catalog_sizes_aggregate_fields';
  avg?: Maybe<CatalogSizesAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CatalogSizesMaxFields>;
  min?: Maybe<CatalogSizesMinFields>;
  stddev?: Maybe<CatalogSizesStddevFields>;
  stddev_pop?: Maybe<CatalogSizesStddevPopFields>;
  stddev_samp?: Maybe<CatalogSizesStddevSampFields>;
  sum?: Maybe<CatalogSizesSumFields>;
  var_pop?: Maybe<CatalogSizesVarPopFields>;
  var_samp?: Maybe<CatalogSizesVarSampFields>;
  variance?: Maybe<CatalogSizesVarianceFields>;
};


/** aggregate fields of "catalog.sizes" */
export type CatalogSizesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CatalogSizesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "catalog.sizes" */
export type CatalogSizesAggregateOrderBy = {
  avg?: InputMaybe<CatalogSizesAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CatalogSizesMaxOrderBy>;
  min?: InputMaybe<CatalogSizesMinOrderBy>;
  stddev?: InputMaybe<CatalogSizesStddevOrderBy>;
  stddev_pop?: InputMaybe<CatalogSizesStddevPopOrderBy>;
  stddev_samp?: InputMaybe<CatalogSizesStddevSampOrderBy>;
  sum?: InputMaybe<CatalogSizesSumOrderBy>;
  var_pop?: InputMaybe<CatalogSizesVarPopOrderBy>;
  var_samp?: InputMaybe<CatalogSizesVarSampOrderBy>;
  variance?: InputMaybe<CatalogSizesVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "catalog.sizes" */
export type CatalogSizesArrRelInsertInput = {
  data: Array<CatalogSizesInsertInput>;
  /** upsert condition */
  on_conflict?: InputMaybe<CatalogSizesOnConflict>;
};

/** aggregate avg on columns */
export type CatalogSizesAvgFields = {
  __typename?: 'catalog_sizes_avg_fields';
  height_cm?: Maybe<Scalars['Float']['output']>;
  height_in?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  width_cm?: Maybe<Scalars['Float']['output']>;
  width_in?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "catalog.sizes" */
export type CatalogSizesAvgOrderBy = {
  height_cm?: InputMaybe<OrderBy>;
  height_in?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  width_cm?: InputMaybe<OrderBy>;
  width_in?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "catalog.sizes". All fields are combined with a logical 'AND'. */
export type CatalogSizesBoolExp = {
  _and?: InputMaybe<Array<CatalogSizesBoolExp>>;
  _not?: InputMaybe<CatalogSizesBoolExp>;
  _or?: InputMaybe<Array<CatalogSizesBoolExp>>;
  height_cm?: InputMaybe<Float8ComparisonExp>;
  height_in?: InputMaybe<Float8ComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  product_id?: InputMaybe<IntComparisonExp>;
  width_cm?: InputMaybe<Float8ComparisonExp>;
  width_in?: InputMaybe<Float8ComparisonExp>;
};

/** unique or primary key constraints on table "catalog.sizes" */
export enum CatalogSizesConstraint {
  /** unique or primary key constraint on columns "id" */
  SizesPkey = 'sizes_pkey'
}

/** input type for incrementing numeric columns in table "catalog.sizes" */
export type CatalogSizesIncInput = {
  height_cm?: InputMaybe<Scalars['float8']['input']>;
  height_in?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  width_cm?: InputMaybe<Scalars['float8']['input']>;
  width_in?: InputMaybe<Scalars['float8']['input']>;
};

/** input type for inserting data into table "catalog.sizes" */
export type CatalogSizesInsertInput = {
  height_cm?: InputMaybe<Scalars['float8']['input']>;
  height_in?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  width_cm?: InputMaybe<Scalars['float8']['input']>;
  width_in?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate max on columns */
export type CatalogSizesMaxFields = {
  __typename?: 'catalog_sizes_max_fields';
  height_cm?: Maybe<Scalars['float8']['output']>;
  height_in?: Maybe<Scalars['float8']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  width_cm?: Maybe<Scalars['float8']['output']>;
  width_in?: Maybe<Scalars['float8']['output']>;
};

/** order by max() on columns of table "catalog.sizes" */
export type CatalogSizesMaxOrderBy = {
  height_cm?: InputMaybe<OrderBy>;
  height_in?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  width_cm?: InputMaybe<OrderBy>;
  width_in?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CatalogSizesMinFields = {
  __typename?: 'catalog_sizes_min_fields';
  height_cm?: Maybe<Scalars['float8']['output']>;
  height_in?: Maybe<Scalars['float8']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  width_cm?: Maybe<Scalars['float8']['output']>;
  width_in?: Maybe<Scalars['float8']['output']>;
};

/** order by min() on columns of table "catalog.sizes" */
export type CatalogSizesMinOrderBy = {
  height_cm?: InputMaybe<OrderBy>;
  height_in?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  width_cm?: InputMaybe<OrderBy>;
  width_in?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "catalog.sizes" */
export type CatalogSizesMutationResponse = {
  __typename?: 'catalog_sizes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CatalogSizes>;
};

/** input type for inserting object relation for remote table "catalog.sizes" */
export type CatalogSizesObjRelInsertInput = {
  data: CatalogSizesInsertInput;
  /** upsert condition */
  on_conflict?: InputMaybe<CatalogSizesOnConflict>;
};

/** on_conflict condition type for table "catalog.sizes" */
export type CatalogSizesOnConflict = {
  constraint: CatalogSizesConstraint;
  update_columns?: Array<CatalogSizesUpdateColumn>;
  where?: InputMaybe<CatalogSizesBoolExp>;
};

/** Ordering options when selecting data from "catalog.sizes". */
export type CatalogSizesOrderBy = {
  height_cm?: InputMaybe<OrderBy>;
  height_in?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  width_cm?: InputMaybe<OrderBy>;
  width_in?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: catalog.sizes */
export type CatalogSizesPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "catalog.sizes" */
export enum CatalogSizesSelectColumn {
  /** column name */
  HeightCm = 'height_cm',
  /** column name */
  HeightIn = 'height_in',
  /** column name */
  Id = 'id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  WidthCm = 'width_cm',
  /** column name */
  WidthIn = 'width_in'
}

/** select "catalog_sizes_aggregate_bool_exp_avg_arguments_columns" columns of table "catalog.sizes" */
export enum CatalogSizesSelectColumnCatalogSizesAggregateBoolExpAvgArgumentsColumns {
  /** column name */
  HeightCm = 'height_cm',
  /** column name */
  HeightIn = 'height_in',
  /** column name */
  WidthCm = 'width_cm',
  /** column name */
  WidthIn = 'width_in'
}

/** select "catalog_sizes_aggregate_bool_exp_corr_arguments_columns" columns of table "catalog.sizes" */
export enum CatalogSizesSelectColumnCatalogSizesAggregateBoolExpCorrArgumentsColumns {
  /** column name */
  HeightCm = 'height_cm',
  /** column name */
  HeightIn = 'height_in',
  /** column name */
  WidthCm = 'width_cm',
  /** column name */
  WidthIn = 'width_in'
}

/** select "catalog_sizes_aggregate_bool_exp_covar_samp_arguments_columns" columns of table "catalog.sizes" */
export enum CatalogSizesSelectColumnCatalogSizesAggregateBoolExpCovarSampArgumentsColumns {
  /** column name */
  HeightCm = 'height_cm',
  /** column name */
  HeightIn = 'height_in',
  /** column name */
  WidthCm = 'width_cm',
  /** column name */
  WidthIn = 'width_in'
}

/** select "catalog_sizes_aggregate_bool_exp_max_arguments_columns" columns of table "catalog.sizes" */
export enum CatalogSizesSelectColumnCatalogSizesAggregateBoolExpMaxArgumentsColumns {
  /** column name */
  HeightCm = 'height_cm',
  /** column name */
  HeightIn = 'height_in',
  /** column name */
  WidthCm = 'width_cm',
  /** column name */
  WidthIn = 'width_in'
}

/** select "catalog_sizes_aggregate_bool_exp_min_arguments_columns" columns of table "catalog.sizes" */
export enum CatalogSizesSelectColumnCatalogSizesAggregateBoolExpMinArgumentsColumns {
  /** column name */
  HeightCm = 'height_cm',
  /** column name */
  HeightIn = 'height_in',
  /** column name */
  WidthCm = 'width_cm',
  /** column name */
  WidthIn = 'width_in'
}

/** select "catalog_sizes_aggregate_bool_exp_stddev_samp_arguments_columns" columns of table "catalog.sizes" */
export enum CatalogSizesSelectColumnCatalogSizesAggregateBoolExpStddevSampArgumentsColumns {
  /** column name */
  HeightCm = 'height_cm',
  /** column name */
  HeightIn = 'height_in',
  /** column name */
  WidthCm = 'width_cm',
  /** column name */
  WidthIn = 'width_in'
}

/** select "catalog_sizes_aggregate_bool_exp_sum_arguments_columns" columns of table "catalog.sizes" */
export enum CatalogSizesSelectColumnCatalogSizesAggregateBoolExpSumArgumentsColumns {
  /** column name */
  HeightCm = 'height_cm',
  /** column name */
  HeightIn = 'height_in',
  /** column name */
  WidthCm = 'width_cm',
  /** column name */
  WidthIn = 'width_in'
}

/** select "catalog_sizes_aggregate_bool_exp_var_samp_arguments_columns" columns of table "catalog.sizes" */
export enum CatalogSizesSelectColumnCatalogSizesAggregateBoolExpVarSampArgumentsColumns {
  /** column name */
  HeightCm = 'height_cm',
  /** column name */
  HeightIn = 'height_in',
  /** column name */
  WidthCm = 'width_cm',
  /** column name */
  WidthIn = 'width_in'
}

/** input type for updating data in table "catalog.sizes" */
export type CatalogSizesSetInput = {
  height_cm?: InputMaybe<Scalars['float8']['input']>;
  height_in?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  width_cm?: InputMaybe<Scalars['float8']['input']>;
  width_in?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate stddev on columns */
export type CatalogSizesStddevFields = {
  __typename?: 'catalog_sizes_stddev_fields';
  height_cm?: Maybe<Scalars['Float']['output']>;
  height_in?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  width_cm?: Maybe<Scalars['Float']['output']>;
  width_in?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "catalog.sizes" */
export type CatalogSizesStddevOrderBy = {
  height_cm?: InputMaybe<OrderBy>;
  height_in?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  width_cm?: InputMaybe<OrderBy>;
  width_in?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type CatalogSizesStddevPopFields = {
  __typename?: 'catalog_sizes_stddev_pop_fields';
  height_cm?: Maybe<Scalars['Float']['output']>;
  height_in?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  width_cm?: Maybe<Scalars['Float']['output']>;
  width_in?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "catalog.sizes" */
export type CatalogSizesStddevPopOrderBy = {
  height_cm?: InputMaybe<OrderBy>;
  height_in?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  width_cm?: InputMaybe<OrderBy>;
  width_in?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type CatalogSizesStddevSampFields = {
  __typename?: 'catalog_sizes_stddev_samp_fields';
  height_cm?: Maybe<Scalars['Float']['output']>;
  height_in?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  width_cm?: Maybe<Scalars['Float']['output']>;
  width_in?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "catalog.sizes" */
export type CatalogSizesStddevSampOrderBy = {
  height_cm?: InputMaybe<OrderBy>;
  height_in?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  width_cm?: InputMaybe<OrderBy>;
  width_in?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "catalog_sizes" */
export type CatalogSizesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CatalogSizesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CatalogSizesStreamCursorValueInput = {
  height_cm?: InputMaybe<Scalars['float8']['input']>;
  height_in?: InputMaybe<Scalars['float8']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  width_cm?: InputMaybe<Scalars['float8']['input']>;
  width_in?: InputMaybe<Scalars['float8']['input']>;
};

/** aggregate sum on columns */
export type CatalogSizesSumFields = {
  __typename?: 'catalog_sizes_sum_fields';
  height_cm?: Maybe<Scalars['float8']['output']>;
  height_in?: Maybe<Scalars['float8']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  width_cm?: Maybe<Scalars['float8']['output']>;
  width_in?: Maybe<Scalars['float8']['output']>;
};

/** order by sum() on columns of table "catalog.sizes" */
export type CatalogSizesSumOrderBy = {
  height_cm?: InputMaybe<OrderBy>;
  height_in?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  width_cm?: InputMaybe<OrderBy>;
  width_in?: InputMaybe<OrderBy>;
};

/** update columns of table "catalog.sizes" */
export enum CatalogSizesUpdateColumn {
  /** column name */
  HeightCm = 'height_cm',
  /** column name */
  HeightIn = 'height_in',
  /** column name */
  Id = 'id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  WidthCm = 'width_cm',
  /** column name */
  WidthIn = 'width_in'
}

export type CatalogSizesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CatalogSizesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CatalogSizesSetInput>;
  /** filter the rows which have to be updated */
  where: CatalogSizesBoolExp;
};

/** aggregate var_pop on columns */
export type CatalogSizesVarPopFields = {
  __typename?: 'catalog_sizes_var_pop_fields';
  height_cm?: Maybe<Scalars['Float']['output']>;
  height_in?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  width_cm?: Maybe<Scalars['Float']['output']>;
  width_in?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "catalog.sizes" */
export type CatalogSizesVarPopOrderBy = {
  height_cm?: InputMaybe<OrderBy>;
  height_in?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  width_cm?: InputMaybe<OrderBy>;
  width_in?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type CatalogSizesVarSampFields = {
  __typename?: 'catalog_sizes_var_samp_fields';
  height_cm?: Maybe<Scalars['Float']['output']>;
  height_in?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  width_cm?: Maybe<Scalars['Float']['output']>;
  width_in?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "catalog.sizes" */
export type CatalogSizesVarSampOrderBy = {
  height_cm?: InputMaybe<OrderBy>;
  height_in?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  width_cm?: InputMaybe<OrderBy>;
  width_in?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type CatalogSizesVarianceFields = {
  __typename?: 'catalog_sizes_variance_fields';
  height_cm?: Maybe<Scalars['Float']['output']>;
  height_in?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
  width_cm?: Maybe<Scalars['Float']['output']>;
  width_in?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "catalog.sizes" */
export type CatalogSizesVarianceOrderBy = {
  height_cm?: InputMaybe<OrderBy>;
  height_in?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  width_cm?: InputMaybe<OrderBy>;
  width_in?: InputMaybe<OrderBy>;
};

/** columns and relationships of "catalog.slugs" */
export type CatalogSlugs = {
  __typename?: 'catalog_slugs';
  country?: CommonCountries;
  country_id: Scalars['Int']['output'];
  id?: Scalars['Int']['output'];
  product?: CatalogProducts;
  product_id: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
};

/** aggregated selection of "catalog.slugs" */
export type CatalogSlugsAggregate = {
  __typename?: 'catalog_slugs_aggregate';
  aggregate?: Maybe<CatalogSlugsAggregateFields>;
  nodes: Array<CatalogSlugs>;
};

export type CatalogSlugsAggregateBoolExp = {
  count?: InputMaybe<CatalogSlugsAggregateBoolExpCount>;
};

export type CatalogSlugsAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<CatalogSlugsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<CatalogSlugsBoolExp>;
  predicate: IntComparisonExp;
};

/** aggregate fields of "catalog.slugs" */
export type CatalogSlugsAggregateFields = {
  __typename?: 'catalog_slugs_aggregate_fields';
  avg?: Maybe<CatalogSlugsAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CatalogSlugsMaxFields>;
  min?: Maybe<CatalogSlugsMinFields>;
  stddev?: Maybe<CatalogSlugsStddevFields>;
  stddev_pop?: Maybe<CatalogSlugsStddevPopFields>;
  stddev_samp?: Maybe<CatalogSlugsStddevSampFields>;
  sum?: Maybe<CatalogSlugsSumFields>;
  var_pop?: Maybe<CatalogSlugsVarPopFields>;
  var_samp?: Maybe<CatalogSlugsVarSampFields>;
  variance?: Maybe<CatalogSlugsVarianceFields>;
};


/** aggregate fields of "catalog.slugs" */
export type CatalogSlugsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CatalogSlugsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "catalog.slugs" */
export type CatalogSlugsAggregateOrderBy = {
  avg?: InputMaybe<CatalogSlugsAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<CatalogSlugsMaxOrderBy>;
  min?: InputMaybe<CatalogSlugsMinOrderBy>;
  stddev?: InputMaybe<CatalogSlugsStddevOrderBy>;
  stddev_pop?: InputMaybe<CatalogSlugsStddevPopOrderBy>;
  stddev_samp?: InputMaybe<CatalogSlugsStddevSampOrderBy>;
  sum?: InputMaybe<CatalogSlugsSumOrderBy>;
  var_pop?: InputMaybe<CatalogSlugsVarPopOrderBy>;
  var_samp?: InputMaybe<CatalogSlugsVarSampOrderBy>;
  variance?: InputMaybe<CatalogSlugsVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "catalog.slugs" */
export type CatalogSlugsArrRelInsertInput = {
  data: Array<CatalogSlugsInsertInput>;
  /** upsert condition */
  on_conflict?: InputMaybe<CatalogSlugsOnConflict>;
};

/** aggregate avg on columns */
export type CatalogSlugsAvgFields = {
  __typename?: 'catalog_slugs_avg_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "catalog.slugs" */
export type CatalogSlugsAvgOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "catalog.slugs". All fields are combined with a logical 'AND'. */
export type CatalogSlugsBoolExp = {
  _and?: InputMaybe<Array<CatalogSlugsBoolExp>>;
  _not?: InputMaybe<CatalogSlugsBoolExp>;
  _or?: InputMaybe<Array<CatalogSlugsBoolExp>>;
  country?: InputMaybe<CommonCountriesBoolExp>;
  country_id?: InputMaybe<IntComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  product?: InputMaybe<CatalogProductsBoolExp>;
  product_id?: InputMaybe<IntComparisonExp>;
  slug?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "catalog.slugs" */
export enum CatalogSlugsConstraint {
  /** unique or primary key constraint on columns "id" */
  ProductSlugsPkey = 'product_slugs_pkey'
}

/** input type for incrementing numeric columns in table "catalog.slugs" */
export type CatalogSlugsIncInput = {
  country_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "catalog.slugs" */
export type CatalogSlugsInsertInput = {
  country?: InputMaybe<CommonCountriesObjRelInsertInput>;
  country_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product?: InputMaybe<CatalogProductsObjRelInsertInput>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type CatalogSlugsMaxFields = {
  __typename?: 'catalog_slugs_max_fields';
  country_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "catalog.slugs" */
export type CatalogSlugsMaxOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  slug?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type CatalogSlugsMinFields = {
  __typename?: 'catalog_slugs_min_fields';
  country_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "catalog.slugs" */
export type CatalogSlugsMinOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
  slug?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "catalog.slugs" */
export type CatalogSlugsMutationResponse = {
  __typename?: 'catalog_slugs_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CatalogSlugs>;
};

/** on_conflict condition type for table "catalog.slugs" */
export type CatalogSlugsOnConflict = {
  constraint: CatalogSlugsConstraint;
  update_columns?: Array<CatalogSlugsUpdateColumn>;
  where?: InputMaybe<CatalogSlugsBoolExp>;
};

/** Ordering options when selecting data from "catalog.slugs". */
export type CatalogSlugsOrderBy = {
  country?: InputMaybe<CommonCountriesOrderBy>;
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product?: InputMaybe<CatalogProductsOrderBy>;
  product_id?: InputMaybe<OrderBy>;
  slug?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: catalog.slugs */
export type CatalogSlugsPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "catalog.slugs" */
export enum CatalogSlugsSelectColumn {
  /** column name */
  CountryId = 'country_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  Slug = 'slug'
}

/** input type for updating data in table "catalog.slugs" */
export type CatalogSlugsSetInput = {
  country_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type CatalogSlugsStddevFields = {
  __typename?: 'catalog_slugs_stddev_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "catalog.slugs" */
export type CatalogSlugsStddevOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type CatalogSlugsStddevPopFields = {
  __typename?: 'catalog_slugs_stddev_pop_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "catalog.slugs" */
export type CatalogSlugsStddevPopOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type CatalogSlugsStddevSampFields = {
  __typename?: 'catalog_slugs_stddev_samp_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "catalog.slugs" */
export type CatalogSlugsStddevSampOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "catalog_slugs" */
export type CatalogSlugsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CatalogSlugsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CatalogSlugsStreamCursorValueInput = {
  country_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  product_id?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type CatalogSlugsSumFields = {
  __typename?: 'catalog_slugs_sum_fields';
  country_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  product_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "catalog.slugs" */
export type CatalogSlugsSumOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
};

/** update columns of table "catalog.slugs" */
export enum CatalogSlugsUpdateColumn {
  /** column name */
  CountryId = 'country_id',
  /** column name */
  Id = 'id',
  /** column name */
  ProductId = 'product_id',
  /** column name */
  Slug = 'slug'
}

export type CatalogSlugsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CatalogSlugsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CatalogSlugsSetInput>;
  /** filter the rows which have to be updated */
  where: CatalogSlugsBoolExp;
};

/** aggregate var_pop on columns */
export type CatalogSlugsVarPopFields = {
  __typename?: 'catalog_slugs_var_pop_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "catalog.slugs" */
export type CatalogSlugsVarPopOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type CatalogSlugsVarSampFields = {
  __typename?: 'catalog_slugs_var_samp_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "catalog.slugs" */
export type CatalogSlugsVarSampOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type CatalogSlugsVarianceFields = {
  __typename?: 'catalog_slugs_variance_fields';
  country_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  product_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "catalog.slugs" */
export type CatalogSlugsVarianceOrderBy = {
  country_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  product_id?: InputMaybe<OrderBy>;
};

/** columns and relationships of "catalog.testimonials" */
export type CatalogTestimonials = {
  __typename?: 'catalog_testimonials';
  author: Scalars['String']['output'];
  content: Scalars['String']['output'];
  id?: Scalars['Int']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  rating: Scalars['Int']['output'];
  user_id?: Maybe<Scalars['Int']['output']>;
  video_url?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "catalog.testimonials" */
export type CatalogTestimonialsAggregate = {
  __typename?: 'catalog_testimonials_aggregate';
  aggregate?: Maybe<CatalogTestimonialsAggregateFields>;
  nodes: Array<CatalogTestimonials>;
};

/** aggregate fields of "catalog.testimonials" */
export type CatalogTestimonialsAggregateFields = {
  __typename?: 'catalog_testimonials_aggregate_fields';
  avg?: Maybe<CatalogTestimonialsAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CatalogTestimonialsMaxFields>;
  min?: Maybe<CatalogTestimonialsMinFields>;
  stddev?: Maybe<CatalogTestimonialsStddevFields>;
  stddev_pop?: Maybe<CatalogTestimonialsStddevPopFields>;
  stddev_samp?: Maybe<CatalogTestimonialsStddevSampFields>;
  sum?: Maybe<CatalogTestimonialsSumFields>;
  var_pop?: Maybe<CatalogTestimonialsVarPopFields>;
  var_samp?: Maybe<CatalogTestimonialsVarSampFields>;
  variance?: Maybe<CatalogTestimonialsVarianceFields>;
};


/** aggregate fields of "catalog.testimonials" */
export type CatalogTestimonialsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CatalogTestimonialsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type CatalogTestimonialsAvgFields = {
  __typename?: 'catalog_testimonials_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "catalog.testimonials". All fields are combined with a logical 'AND'. */
export type CatalogTestimonialsBoolExp = {
  _and?: InputMaybe<Array<CatalogTestimonialsBoolExp>>;
  _not?: InputMaybe<CatalogTestimonialsBoolExp>;
  _or?: InputMaybe<Array<CatalogTestimonialsBoolExp>>;
  author?: InputMaybe<StringComparisonExp>;
  content?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  image_url?: InputMaybe<StringComparisonExp>;
  rating?: InputMaybe<IntComparisonExp>;
  user_id?: InputMaybe<IntComparisonExp>;
  video_url?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "catalog.testimonials" */
export enum CatalogTestimonialsConstraint {
  /** unique or primary key constraint on columns "id" */
  TestimonialsPkey = 'testimonials_pkey'
}

/** input type for incrementing numeric columns in table "catalog.testimonials" */
export type CatalogTestimonialsIncInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "catalog.testimonials" */
export type CatalogTestimonialsInsertInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
  video_url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type CatalogTestimonialsMaxFields = {
  __typename?: 'catalog_testimonials_max_fields';
  author?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
  video_url?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type CatalogTestimonialsMinFields = {
  __typename?: 'catalog_testimonials_min_fields';
  author?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  image_url?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
  video_url?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "catalog.testimonials" */
export type CatalogTestimonialsMutationResponse = {
  __typename?: 'catalog_testimonials_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CatalogTestimonials>;
};

/** on_conflict condition type for table "catalog.testimonials" */
export type CatalogTestimonialsOnConflict = {
  constraint: CatalogTestimonialsConstraint;
  update_columns?: Array<CatalogTestimonialsUpdateColumn>;
  where?: InputMaybe<CatalogTestimonialsBoolExp>;
};

/** Ordering options when selecting data from "catalog.testimonials". */
export type CatalogTestimonialsOrderBy = {
  author?: InputMaybe<OrderBy>;
  content?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  image_url?: InputMaybe<OrderBy>;
  rating?: InputMaybe<OrderBy>;
  user_id?: InputMaybe<OrderBy>;
  video_url?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: catalog.testimonials */
export type CatalogTestimonialsPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "catalog.testimonials" */
export enum CatalogTestimonialsSelectColumn {
  /** column name */
  Author = 'author',
  /** column name */
  Content = 'content',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Rating = 'rating',
  /** column name */
  UserId = 'user_id',
  /** column name */
  VideoUrl = 'video_url'
}

/** input type for updating data in table "catalog.testimonials" */
export type CatalogTestimonialsSetInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
  video_url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type CatalogTestimonialsStddevFields = {
  __typename?: 'catalog_testimonials_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type CatalogTestimonialsStddevPopFields = {
  __typename?: 'catalog_testimonials_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type CatalogTestimonialsStddevSampFields = {
  __typename?: 'catalog_testimonials_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "catalog_testimonials" */
export type CatalogTestimonialsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CatalogTestimonialsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CatalogTestimonialsStreamCursorValueInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
  video_url?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type CatalogTestimonialsSumFields = {
  __typename?: 'catalog_testimonials_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  user_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "catalog.testimonials" */
export enum CatalogTestimonialsUpdateColumn {
  /** column name */
  Author = 'author',
  /** column name */
  Content = 'content',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'image_url',
  /** column name */
  Rating = 'rating',
  /** column name */
  UserId = 'user_id',
  /** column name */
  VideoUrl = 'video_url'
}

export type CatalogTestimonialsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CatalogTestimonialsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CatalogTestimonialsSetInput>;
  /** filter the rows which have to be updated */
  where: CatalogTestimonialsBoolExp;
};

/** aggregate var_pop on columns */
export type CatalogTestimonialsVarPopFields = {
  __typename?: 'catalog_testimonials_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type CatalogTestimonialsVarSampFields = {
  __typename?: 'catalog_testimonials_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type CatalogTestimonialsVarianceFields = {
  __typename?: 'catalog_testimonials_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  user_id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "common.addresses" */
export type CommonAddresses = {
  __typename?: 'common_addresses';
  billing_address_order?: Array<SalesOrders>;
    city: Scalars['String']['output'];
  country?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Scalars['Int']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  postal_code: Scalars['String']['output'];
  shipping_address_order?: Array<SalesOrders>;
    state?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};


/** columns and relationships of "common.addresses" */
export type CommonAddressesBillingAddressOrderArgs = {
  distinct_on?: InputMaybe<Array<SalesOrdersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesOrdersOrderBy>>;
  where?: InputMaybe<SalesOrdersBoolExp>;
};


/** columns and relationships of "common.addresses" */
export type CommonAddressesBillingAddressOrderAggregateArgs = {
  distinct_on?: InputMaybe<Array<SalesOrdersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesOrdersOrderBy>>;
  where?: InputMaybe<SalesOrdersBoolExp>;
};


/** columns and relationships of "common.addresses" */
export type CommonAddressesShippingAddressOrderArgs = {
  distinct_on?: InputMaybe<Array<SalesOrdersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesOrdersOrderBy>>;
  where?: InputMaybe<SalesOrdersBoolExp>;
};


/** columns and relationships of "common.addresses" */
export type CommonAddressesShippingAddressOrderAggregateArgs = {
  distinct_on?: InputMaybe<Array<SalesOrdersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesOrdersOrderBy>>;
  where?: InputMaybe<SalesOrdersBoolExp>;
};

/** aggregated selection of "common.addresses" */
export type CommonAddressesAggregate = {
  __typename?: 'common_addresses_aggregate';
  aggregate?: Maybe<CommonAddressesAggregateFields>;
  nodes: Array<CommonAddresses>;
};

/** aggregate fields of "common.addresses" */
export type CommonAddressesAggregateFields = {
  __typename?: 'common_addresses_aggregate_fields';
  avg?: Maybe<CommonAddressesAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CommonAddressesMaxFields>;
  min?: Maybe<CommonAddressesMinFields>;
  stddev?: Maybe<CommonAddressesStddevFields>;
  stddev_pop?: Maybe<CommonAddressesStddevPopFields>;
  stddev_samp?: Maybe<CommonAddressesStddevSampFields>;
  sum?: Maybe<CommonAddressesSumFields>;
  var_pop?: Maybe<CommonAddressesVarPopFields>;
  var_samp?: Maybe<CommonAddressesVarSampFields>;
  variance?: Maybe<CommonAddressesVarianceFields>;
};


/** aggregate fields of "common.addresses" */
export type CommonAddressesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CommonAddressesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type CommonAddressesAvgFields = {
  __typename?: 'common_addresses_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "common.addresses". All fields are combined with a logical 'AND'. */
export type CommonAddressesBoolExp = {
  _and?: InputMaybe<Array<CommonAddressesBoolExp>>;
  _not?: InputMaybe<CommonAddressesBoolExp>;
  _or?: InputMaybe<Array<CommonAddressesBoolExp>>;
  billing_address_order?: InputMaybe<SalesOrdersBoolExp>;
  billing_address_order_aggregate?: InputMaybe<SalesOrdersAggregateBoolExp>;
  city?: InputMaybe<StringComparisonExp>;
  country?: InputMaybe<StringComparisonExp>;
  created_at?: InputMaybe<TimestampComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  line1?: InputMaybe<StringComparisonExp>;
  line2?: InputMaybe<StringComparisonExp>;
  postal_code?: InputMaybe<StringComparisonExp>;
  shipping_address_order?: InputMaybe<SalesOrdersBoolExp>;
  shipping_address_order_aggregate?: InputMaybe<SalesOrdersAggregateBoolExp>;
  state?: InputMaybe<StringComparisonExp>;
  updated_at?: InputMaybe<TimestampComparisonExp>;
};

/** unique or primary key constraints on table "common.addresses" */
export enum CommonAddressesConstraint {
  /** unique or primary key constraint on columns "id" */
  AddressesPkey = 'addresses_pkey'
}

/** input type for incrementing numeric columns in table "common.addresses" */
export type CommonAddressesIncInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "common.addresses" */
export type CommonAddressesInsertInput = {
  billing_address_order?: InputMaybe<SalesOrdersArrRelInsertInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  postal_code?: InputMaybe<Scalars['String']['input']>;
  shipping_address_order?: InputMaybe<SalesOrdersArrRelInsertInput>;
  state?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type CommonAddressesMaxFields = {
  __typename?: 'common_addresses_max_fields';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  line1?: Maybe<Scalars['String']['output']>;
  line2?: Maybe<Scalars['String']['output']>;
  postal_code?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type CommonAddressesMinFields = {
  __typename?: 'common_addresses_min_fields';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  line1?: Maybe<Scalars['String']['output']>;
  line2?: Maybe<Scalars['String']['output']>;
  postal_code?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "common.addresses" */
export type CommonAddressesMutationResponse = {
  __typename?: 'common_addresses_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CommonAddresses>;
};

/** input type for inserting object relation for remote table "common.addresses" */
export type CommonAddressesObjRelInsertInput = {
  data: CommonAddressesInsertInput;
  /** upsert condition */
  on_conflict?: InputMaybe<CommonAddressesOnConflict>;
};

/** on_conflict condition type for table "common.addresses" */
export type CommonAddressesOnConflict = {
  constraint: CommonAddressesConstraint;
  update_columns?: Array<CommonAddressesUpdateColumn>;
  where?: InputMaybe<CommonAddressesBoolExp>;
};

/** Ordering options when selecting data from "common.addresses". */
export type CommonAddressesOrderBy = {
  billing_address_order_aggregate?: InputMaybe<SalesOrdersAggregateOrderBy>;
  city?: InputMaybe<OrderBy>;
  country?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  line1?: InputMaybe<OrderBy>;
  line2?: InputMaybe<OrderBy>;
  postal_code?: InputMaybe<OrderBy>;
  shipping_address_order_aggregate?: InputMaybe<SalesOrdersAggregateOrderBy>;
  state?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: common.addresses */
export type CommonAddressesPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "common.addresses" */
export enum CommonAddressesSelectColumn {
  /** column name */
  City = 'city',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Line1 = 'line1',
  /** column name */
  Line2 = 'line2',
  /** column name */
  PostalCode = 'postal_code',
  /** column name */
  State = 'state',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "common.addresses" */
export type CommonAddressesSetInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  postal_code?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type CommonAddressesStddevFields = {
  __typename?: 'common_addresses_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type CommonAddressesStddevPopFields = {
  __typename?: 'common_addresses_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type CommonAddressesStddevSampFields = {
  __typename?: 'common_addresses_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "common_addresses" */
export type CommonAddressesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CommonAddressesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CommonAddressesStreamCursorValueInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  postal_code?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type CommonAddressesSumFields = {
  __typename?: 'common_addresses_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "common.addresses" */
export enum CommonAddressesUpdateColumn {
  /** column name */
  City = 'city',
  /** column name */
  Country = 'country',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Line1 = 'line1',
  /** column name */
  Line2 = 'line2',
  /** column name */
  PostalCode = 'postal_code',
  /** column name */
  State = 'state',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type CommonAddressesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CommonAddressesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CommonAddressesSetInput>;
  /** filter the rows which have to be updated */
  where: CommonAddressesBoolExp;
};

/** aggregate var_pop on columns */
export type CommonAddressesVarPopFields = {
  __typename?: 'common_addresses_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type CommonAddressesVarSampFields = {
  __typename?: 'common_addresses_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type CommonAddressesVarianceFields = {
  __typename?: 'common_addresses_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "common.countries" */
export type CommonCountries = {
  __typename?: 'common_countries';
  id?: Scalars['Int']['output'];
  iso_code: Scalars['bpchar']['output'];
  name: Scalars['String']['output'];
};

/** aggregated selection of "common.countries" */
export type CommonCountriesAggregate = {
  __typename?: 'common_countries_aggregate';
  aggregate?: Maybe<CommonCountriesAggregateFields>;
  nodes: Array<CommonCountries>;
};

/** aggregate fields of "common.countries" */
export type CommonCountriesAggregateFields = {
  __typename?: 'common_countries_aggregate_fields';
  avg?: Maybe<CommonCountriesAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CommonCountriesMaxFields>;
  min?: Maybe<CommonCountriesMinFields>;
  stddev?: Maybe<CommonCountriesStddevFields>;
  stddev_pop?: Maybe<CommonCountriesStddevPopFields>;
  stddev_samp?: Maybe<CommonCountriesStddevSampFields>;
  sum?: Maybe<CommonCountriesSumFields>;
  var_pop?: Maybe<CommonCountriesVarPopFields>;
  var_samp?: Maybe<CommonCountriesVarSampFields>;
  variance?: Maybe<CommonCountriesVarianceFields>;
};


/** aggregate fields of "common.countries" */
export type CommonCountriesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CommonCountriesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type CommonCountriesAvgFields = {
  __typename?: 'common_countries_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "common.countries". All fields are combined with a logical 'AND'. */
export type CommonCountriesBoolExp = {
  _and?: InputMaybe<Array<CommonCountriesBoolExp>>;
  _not?: InputMaybe<CommonCountriesBoolExp>;
  _or?: InputMaybe<Array<CommonCountriesBoolExp>>;
  id?: InputMaybe<IntComparisonExp>;
  iso_code?: InputMaybe<BpcharComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "common.countries" */
export enum CommonCountriesConstraint {
  /** unique or primary key constraint on columns "iso_code" */
  CountriesIsoCodeKey = 'countries_iso_code_key',
  /** unique or primary key constraint on columns "name" */
  CountriesNameKey = 'countries_name_key',
  /** unique or primary key constraint on columns "id" */
  CountriesPkey = 'countries_pkey'
}

/** input type for incrementing numeric columns in table "common.countries" */
export type CommonCountriesIncInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "common.countries" */
export type CommonCountriesInsertInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  iso_code?: InputMaybe<Scalars['bpchar']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type CommonCountriesMaxFields = {
  __typename?: 'common_countries_max_fields';
  id?: Maybe<Scalars['Int']['output']>;
  iso_code?: Maybe<Scalars['bpchar']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type CommonCountriesMinFields = {
  __typename?: 'common_countries_min_fields';
  id?: Maybe<Scalars['Int']['output']>;
  iso_code?: Maybe<Scalars['bpchar']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "common.countries" */
export type CommonCountriesMutationResponse = {
  __typename?: 'common_countries_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CommonCountries>;
};

/** input type for inserting object relation for remote table "common.countries" */
export type CommonCountriesObjRelInsertInput = {
  data: CommonCountriesInsertInput;
  /** upsert condition */
  on_conflict?: InputMaybe<CommonCountriesOnConflict>;
};

/** on_conflict condition type for table "common.countries" */
export type CommonCountriesOnConflict = {
  constraint: CommonCountriesConstraint;
  update_columns?: Array<CommonCountriesUpdateColumn>;
  where?: InputMaybe<CommonCountriesBoolExp>;
};

/** Ordering options when selecting data from "common.countries". */
export type CommonCountriesOrderBy = {
  id?: InputMaybe<OrderBy>;
  iso_code?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: common.countries */
export type CommonCountriesPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "common.countries" */
export enum CommonCountriesSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  IsoCode = 'iso_code',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "common.countries" */
export type CommonCountriesSetInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  iso_code?: InputMaybe<Scalars['bpchar']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type CommonCountriesStddevFields = {
  __typename?: 'common_countries_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type CommonCountriesStddevPopFields = {
  __typename?: 'common_countries_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type CommonCountriesStddevSampFields = {
  __typename?: 'common_countries_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "common_countries" */
export type CommonCountriesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CommonCountriesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CommonCountriesStreamCursorValueInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  iso_code?: InputMaybe<Scalars['bpchar']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type CommonCountriesSumFields = {
  __typename?: 'common_countries_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "common.countries" */
export enum CommonCountriesUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  IsoCode = 'iso_code',
  /** column name */
  Name = 'name'
}

export type CommonCountriesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CommonCountriesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CommonCountriesSetInput>;
  /** filter the rows which have to be updated */
  where: CommonCountriesBoolExp;
};

/** aggregate var_pop on columns */
export type CommonCountriesVarPopFields = {
  __typename?: 'common_countries_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type CommonCountriesVarSampFields = {
  __typename?: 'common_countries_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type CommonCountriesVarianceFields = {
  __typename?: 'common_countries_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "common.email" */
export type CommonEmail = {
  __typename?: 'common_email';
  access_token: Scalars['String']['output'];
  address: Scalars['String']['output'];
  expiry_date: Scalars['timestamp']['output'];
  id?: Scalars['Int']['output'];
  refresh_token: Scalars['String']['output'];
};

/** aggregated selection of "common.email" */
export type CommonEmailAggregate = {
  __typename?: 'common_email_aggregate';
  aggregate?: Maybe<CommonEmailAggregateFields>;
  nodes: Array<CommonEmail>;
};

/** aggregate fields of "common.email" */
export type CommonEmailAggregateFields = {
  __typename?: 'common_email_aggregate_fields';
  avg?: Maybe<CommonEmailAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<CommonEmailMaxFields>;
  min?: Maybe<CommonEmailMinFields>;
  stddev?: Maybe<CommonEmailStddevFields>;
  stddev_pop?: Maybe<CommonEmailStddevPopFields>;
  stddev_samp?: Maybe<CommonEmailStddevSampFields>;
  sum?: Maybe<CommonEmailSumFields>;
  var_pop?: Maybe<CommonEmailVarPopFields>;
  var_samp?: Maybe<CommonEmailVarSampFields>;
  variance?: Maybe<CommonEmailVarianceFields>;
};


/** aggregate fields of "common.email" */
export type CommonEmailAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CommonEmailSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type CommonEmailAvgFields = {
  __typename?: 'common_email_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "common.email". All fields are combined with a logical 'AND'. */
export type CommonEmailBoolExp = {
  _and?: InputMaybe<Array<CommonEmailBoolExp>>;
  _not?: InputMaybe<CommonEmailBoolExp>;
  _or?: InputMaybe<Array<CommonEmailBoolExp>>;
  access_token?: InputMaybe<StringComparisonExp>;
  address?: InputMaybe<StringComparisonExp>;
  expiry_date?: InputMaybe<TimestampComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  refresh_token?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "common.email" */
export enum CommonEmailConstraint {
  /** unique or primary key constraint on columns "id" */
  EmailPkey = 'email_pkey'
}

/** input type for incrementing numeric columns in table "common.email" */
export type CommonEmailIncInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "common.email" */
export type CommonEmailInsertInput = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  expiry_date?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type CommonEmailMaxFields = {
  __typename?: 'common_email_max_fields';
  access_token?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  expiry_date?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type CommonEmailMinFields = {
  __typename?: 'common_email_min_fields';
  access_token?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  expiry_date?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "common.email" */
export type CommonEmailMutationResponse = {
  __typename?: 'common_email_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<CommonEmail>;
};

/** on_conflict condition type for table "common.email" */
export type CommonEmailOnConflict = {
  constraint: CommonEmailConstraint;
  update_columns?: Array<CommonEmailUpdateColumn>;
  where?: InputMaybe<CommonEmailBoolExp>;
};

/** Ordering options when selecting data from "common.email". */
export type CommonEmailOrderBy = {
  access_token?: InputMaybe<OrderBy>;
  address?: InputMaybe<OrderBy>;
  expiry_date?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  refresh_token?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: common.email */
export type CommonEmailPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "common.email" */
export enum CommonEmailSelectColumn {
  /** column name */
  AccessToken = 'access_token',
  /** column name */
  Address = 'address',
  /** column name */
  ExpiryDate = 'expiry_date',
  /** column name */
  Id = 'id',
  /** column name */
  RefreshToken = 'refresh_token'
}

/** input type for updating data in table "common.email" */
export type CommonEmailSetInput = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  expiry_date?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type CommonEmailStddevFields = {
  __typename?: 'common_email_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type CommonEmailStddevPopFields = {
  __typename?: 'common_email_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type CommonEmailStddevSampFields = {
  __typename?: 'common_email_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "common_email" */
export type CommonEmailStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: CommonEmailStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type CommonEmailStreamCursorValueInput = {
  access_token?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  expiry_date?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type CommonEmailSumFields = {
  __typename?: 'common_email_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "common.email" */
export enum CommonEmailUpdateColumn {
  /** column name */
  AccessToken = 'access_token',
  /** column name */
  Address = 'address',
  /** column name */
  ExpiryDate = 'expiry_date',
  /** column name */
  Id = 'id',
  /** column name */
  RefreshToken = 'refresh_token'
}

export type CommonEmailUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<CommonEmailIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CommonEmailSetInput>;
  /** filter the rows which have to be updated */
  where: CommonEmailBoolExp;
};

/** aggregate var_pop on columns */
export type CommonEmailVarPopFields = {
  __typename?: 'common_email_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type CommonEmailVarSampFields = {
  __typename?: 'common_email_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type CommonEmailVarianceFields = {
  __typename?: 'common_email_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type DateComparisonExp = {
  _eq?: InputMaybe<Scalars['date']['input']>;
  _gt?: InputMaybe<Scalars['date']['input']>;
  _gte?: InputMaybe<Scalars['date']['input']>;
  _in?: InputMaybe<Array<Scalars['date']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['date']['input']>;
  _lte?: InputMaybe<Scalars['date']['input']>;
  _neq?: InputMaybe<Scalars['date']['input']>;
  _nin?: InputMaybe<Array<Scalars['date']['input']>>;
};

/** columns and relationships of "enums.order_statuses" */
export type EnumsOrderStatuses = {
  __typename?: 'enums_order_statuses';
  description?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

/** aggregated selection of "enums.order_statuses" */
export type EnumsOrderStatusesAggregate = {
  __typename?: 'enums_order_statuses_aggregate';
  aggregate?: Maybe<EnumsOrderStatusesAggregateFields>;
  nodes: Array<EnumsOrderStatuses>;
};

/** aggregate fields of "enums.order_statuses" */
export type EnumsOrderStatusesAggregateFields = {
  __typename?: 'enums_order_statuses_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<EnumsOrderStatusesMaxFields>;
  min?: Maybe<EnumsOrderStatusesMinFields>;
};


/** aggregate fields of "enums.order_statuses" */
export type EnumsOrderStatusesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<EnumsOrderStatusesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "enums.order_statuses". All fields are combined with a logical 'AND'. */
export type EnumsOrderStatusesBoolExp = {
  _and?: InputMaybe<Array<EnumsOrderStatusesBoolExp>>;
  _not?: InputMaybe<EnumsOrderStatusesBoolExp>;
  _or?: InputMaybe<Array<EnumsOrderStatusesBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  status?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "enums.order_statuses" */
export enum EnumsOrderStatusesConstraint {
  /** unique or primary key constraint on columns "status" */
  OrderStatusesPkey = 'order_statuses_pkey'
}

export enum EnumsOrderStatusesEnum {
  /** The order was canceled */
  Cancelled = 'CANCELLED',
  /** Customer received package */
  Complete = 'COMPLETE',
  /** Confirmed by customer */
  Confirmed = 'CONFIRMED',
  /** The pics are being edited */
  Editing = 'EDITING',
  /** Awaiting feedback from customer */
  Feedback = 'FEEDBACK',
  /** Is in the oven */
  Kiln = 'KILN',
  /** Was packaged */
  Packaged = 'PACKAGED',
  /** The order was placed */
  Placed = 'PLACED',
  /** Was printed */
  Printed = 'PRINTED',
  /** Was shipped */
  Shipped = 'SHIPPED',
  /** Was scanned for sorting */
  Sorted = 'SORTED'
}

/** Boolean expression to compare columns of type "enums_order_statuses_enum". All fields are combined with logical 'AND'. */
export type EnumsOrderStatusesEnumComparisonExp = {
  _eq?: InputMaybe<EnumsOrderStatusesEnum>;
  _in?: InputMaybe<Array<EnumsOrderStatusesEnum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<EnumsOrderStatusesEnum>;
  _nin?: InputMaybe<Array<EnumsOrderStatusesEnum>>;
};

/** input type for inserting data into table "enums.order_statuses" */
export type EnumsOrderStatusesInsertInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type EnumsOrderStatusesMaxFields = {
  __typename?: 'enums_order_statuses_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type EnumsOrderStatusesMinFields = {
  __typename?: 'enums_order_statuses_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "enums.order_statuses" */
export type EnumsOrderStatusesMutationResponse = {
  __typename?: 'enums_order_statuses_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<EnumsOrderStatuses>;
};

/** on_conflict condition type for table "enums.order_statuses" */
export type EnumsOrderStatusesOnConflict = {
  constraint: EnumsOrderStatusesConstraint;
  update_columns?: Array<EnumsOrderStatusesUpdateColumn>;
  where?: InputMaybe<EnumsOrderStatusesBoolExp>;
};

/** Ordering options when selecting data from "enums.order_statuses". */
export type EnumsOrderStatusesOrderBy = {
  description?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: enums.order_statuses */
export type EnumsOrderStatusesPkColumnsInput = {
  status: Scalars['String']['input'];
};

/** select columns of table "enums.order_statuses" */
export enum EnumsOrderStatusesSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "enums.order_statuses" */
export type EnumsOrderStatusesSetInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "enums_order_statuses" */
export type EnumsOrderStatusesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: EnumsOrderStatusesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type EnumsOrderStatusesStreamCursorValueInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "enums.order_statuses" */
export enum EnumsOrderStatusesUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Status = 'status'
}

export type EnumsOrderStatusesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<EnumsOrderStatusesSetInput>;
  /** filter the rows which have to be updated */
  where: EnumsOrderStatusesBoolExp;
};

/** columns and relationships of "enums.task_statuses" */
export type EnumsTaskStatuses = {
  __typename?: 'enums_task_statuses';
  description: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

/** aggregated selection of "enums.task_statuses" */
export type EnumsTaskStatusesAggregate = {
  __typename?: 'enums_task_statuses_aggregate';
  aggregate?: Maybe<EnumsTaskStatusesAggregateFields>;
  nodes: Array<EnumsTaskStatuses>;
};

/** aggregate fields of "enums.task_statuses" */
export type EnumsTaskStatusesAggregateFields = {
  __typename?: 'enums_task_statuses_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<EnumsTaskStatusesMaxFields>;
  min?: Maybe<EnumsTaskStatusesMinFields>;
};


/** aggregate fields of "enums.task_statuses" */
export type EnumsTaskStatusesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<EnumsTaskStatusesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "enums.task_statuses". All fields are combined with a logical 'AND'. */
export type EnumsTaskStatusesBoolExp = {
  _and?: InputMaybe<Array<EnumsTaskStatusesBoolExp>>;
  _not?: InputMaybe<EnumsTaskStatusesBoolExp>;
  _or?: InputMaybe<Array<EnumsTaskStatusesBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  status?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "enums.task_statuses" */
export enum EnumsTaskStatusesConstraint {
  /** unique or primary key constraint on columns "status" */
  TaskStatusesPkey = 'task_statuses_pkey'
}

export enum EnumsTaskStatusesEnum {
  /** was completed */
  Complete = 'COMPLETE',
  /** worked on */
  InProgress = 'IN_PROGRESS',
  /** is pending */
  Pending = 'PENDING'
}

/** Boolean expression to compare columns of type "enums_task_statuses_enum". All fields are combined with logical 'AND'. */
export type EnumsTaskStatusesEnumComparisonExp = {
  _eq?: InputMaybe<EnumsTaskStatusesEnum>;
  _in?: InputMaybe<Array<EnumsTaskStatusesEnum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<EnumsTaskStatusesEnum>;
  _nin?: InputMaybe<Array<EnumsTaskStatusesEnum>>;
};

/** input type for inserting data into table "enums.task_statuses" */
export type EnumsTaskStatusesInsertInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type EnumsTaskStatusesMaxFields = {
  __typename?: 'enums_task_statuses_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type EnumsTaskStatusesMinFields = {
  __typename?: 'enums_task_statuses_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "enums.task_statuses" */
export type EnumsTaskStatusesMutationResponse = {
  __typename?: 'enums_task_statuses_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<EnumsTaskStatuses>;
};

/** on_conflict condition type for table "enums.task_statuses" */
export type EnumsTaskStatusesOnConflict = {
  constraint: EnumsTaskStatusesConstraint;
  update_columns?: Array<EnumsTaskStatusesUpdateColumn>;
  where?: InputMaybe<EnumsTaskStatusesBoolExp>;
};

/** Ordering options when selecting data from "enums.task_statuses". */
export type EnumsTaskStatusesOrderBy = {
  description?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: enums.task_statuses */
export type EnumsTaskStatusesPkColumnsInput = {
  status: Scalars['String']['input'];
};

/** select columns of table "enums.task_statuses" */
export enum EnumsTaskStatusesSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "enums.task_statuses" */
export type EnumsTaskStatusesSetInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "enums_task_statuses" */
export type EnumsTaskStatusesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: EnumsTaskStatusesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type EnumsTaskStatusesStreamCursorValueInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "enums.task_statuses" */
export enum EnumsTaskStatusesUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Status = 'status'
}

export type EnumsTaskStatusesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<EnumsTaskStatusesSetInput>;
  /** filter the rows which have to be updated */
  where: EnumsTaskStatusesBoolExp;
};

/** columns and relationships of "enums.task_types" */
export type EnumsTaskTypes = {
  __typename?: 'enums_task_types';
  description?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

/** aggregated selection of "enums.task_types" */
export type EnumsTaskTypesAggregate = {
  __typename?: 'enums_task_types_aggregate';
  aggregate?: Maybe<EnumsTaskTypesAggregateFields>;
  nodes: Array<EnumsTaskTypes>;
};

/** aggregate fields of "enums.task_types" */
export type EnumsTaskTypesAggregateFields = {
  __typename?: 'enums_task_types_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<EnumsTaskTypesMaxFields>;
  min?: Maybe<EnumsTaskTypesMinFields>;
};


/** aggregate fields of "enums.task_types" */
export type EnumsTaskTypesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<EnumsTaskTypesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "enums.task_types". All fields are combined with a logical 'AND'. */
export type EnumsTaskTypesBoolExp = {
  _and?: InputMaybe<Array<EnumsTaskTypesBoolExp>>;
  _not?: InputMaybe<EnumsTaskTypesBoolExp>;
  _or?: InputMaybe<Array<EnumsTaskTypesBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  type?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "enums.task_types" */
export enum EnumsTaskTypesConstraint {
  /** unique or primary key constraint on columns "type" */
  TaskTypesPkey = 'task_types_pkey'
}

export enum EnumsTaskTypesEnum {
  /** editing task */
  Edit = 'EDIT'
}

/** Boolean expression to compare columns of type "enums_task_types_enum". All fields are combined with logical 'AND'. */
export type EnumsTaskTypesEnumComparisonExp = {
  _eq?: InputMaybe<EnumsTaskTypesEnum>;
  _in?: InputMaybe<Array<EnumsTaskTypesEnum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<EnumsTaskTypesEnum>;
  _nin?: InputMaybe<Array<EnumsTaskTypesEnum>>;
};

/** input type for inserting data into table "enums.task_types" */
export type EnumsTaskTypesInsertInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type EnumsTaskTypesMaxFields = {
  __typename?: 'enums_task_types_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type EnumsTaskTypesMinFields = {
  __typename?: 'enums_task_types_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "enums.task_types" */
export type EnumsTaskTypesMutationResponse = {
  __typename?: 'enums_task_types_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<EnumsTaskTypes>;
};

/** on_conflict condition type for table "enums.task_types" */
export type EnumsTaskTypesOnConflict = {
  constraint: EnumsTaskTypesConstraint;
  update_columns?: Array<EnumsTaskTypesUpdateColumn>;
  where?: InputMaybe<EnumsTaskTypesBoolExp>;
};

/** Ordering options when selecting data from "enums.task_types". */
export type EnumsTaskTypesOrderBy = {
  description?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: enums.task_types */
export type EnumsTaskTypesPkColumnsInput = {
  type: Scalars['String']['input'];
};

/** select columns of table "enums.task_types" */
export enum EnumsTaskTypesSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "enums.task_types" */
export type EnumsTaskTypesSetInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "enums_task_types" */
export type EnumsTaskTypesStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: EnumsTaskTypesStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type EnumsTaskTypesStreamCursorValueInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "enums.task_types" */
export enum EnumsTaskTypesUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  Type = 'type'
}

export type EnumsTaskTypesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<EnumsTaskTypesSetInput>;
  /** filter the rows which have to be updated */
  where: EnumsTaskTypesBoolExp;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8ComparisonExp = {
  _eq?: InputMaybe<Scalars['float8']['input']>;
  _gt?: InputMaybe<Scalars['float8']['input']>;
  _gte?: InputMaybe<Scalars['float8']['input']>;
  _in?: InputMaybe<Array<Scalars['float8']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['float8']['input']>;
  _lte?: InputMaybe<Scalars['float8']['input']>;
  _neq?: InputMaybe<Scalars['float8']['input']>;
  _nin?: InputMaybe<Array<Scalars['float8']['input']>>;
};

export type JsonbCastExp = {
  String?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  _cast?: InputMaybe<JsonbCastExp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** columns and relationships of "logs.order_logs" */
export type LogsOrderLogs = {
  __typename?: 'logs_order_logs';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Scalars['Int']['output'];
  metadata?: Maybe<Scalars['jsonb']['output']>;
  newData: Scalars['jsonb']['output'];
  new_status?: Maybe<Scalars['String']['output']>;
  oldData: Scalars['jsonb']['output'];
  order_id: Scalars['Int']['output'];
  previous_status?: Maybe<Scalars['String']['output']>;
  triggered_by?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "logs.order_logs" */
export type LogsOrderLogsMetadataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "logs.order_logs" */
export type LogsOrderLogsNewDataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "logs.order_logs" */
export type LogsOrderLogsOldDataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "logs.order_logs" */
export type LogsOrderLogsAggregate = {
  __typename?: 'logs_order_logs_aggregate';
  aggregate?: Maybe<LogsOrderLogsAggregateFields>;
  nodes: Array<LogsOrderLogs>;
};

/** aggregate fields of "logs.order_logs" */
export type LogsOrderLogsAggregateFields = {
  __typename?: 'logs_order_logs_aggregate_fields';
  avg?: Maybe<LogsOrderLogsAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<LogsOrderLogsMaxFields>;
  min?: Maybe<LogsOrderLogsMinFields>;
  stddev?: Maybe<LogsOrderLogsStddevFields>;
  stddev_pop?: Maybe<LogsOrderLogsStddevPopFields>;
  stddev_samp?: Maybe<LogsOrderLogsStddevSampFields>;
  sum?: Maybe<LogsOrderLogsSumFields>;
  var_pop?: Maybe<LogsOrderLogsVarPopFields>;
  var_samp?: Maybe<LogsOrderLogsVarSampFields>;
  variance?: Maybe<LogsOrderLogsVarianceFields>;
};


/** aggregate fields of "logs.order_logs" */
export type LogsOrderLogsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<LogsOrderLogsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type LogsOrderLogsAppendInput = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  newData?: InputMaybe<Scalars['jsonb']['input']>;
  oldData?: InputMaybe<Scalars['jsonb']['input']>;
};

/** aggregate avg on columns */
export type LogsOrderLogsAvgFields = {
  __typename?: 'logs_order_logs_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "logs.order_logs". All fields are combined with a logical 'AND'. */
export type LogsOrderLogsBoolExp = {
  _and?: InputMaybe<Array<LogsOrderLogsBoolExp>>;
  _not?: InputMaybe<LogsOrderLogsBoolExp>;
  _or?: InputMaybe<Array<LogsOrderLogsBoolExp>>;
  created_at?: InputMaybe<TimestampComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  metadata?: InputMaybe<JsonbComparisonExp>;
  newData?: InputMaybe<JsonbComparisonExp>;
  new_status?: InputMaybe<StringComparisonExp>;
  oldData?: InputMaybe<JsonbComparisonExp>;
  order_id?: InputMaybe<IntComparisonExp>;
  previous_status?: InputMaybe<StringComparisonExp>;
  triggered_by?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "logs.order_logs" */
export enum LogsOrderLogsConstraint {
  /** unique or primary key constraint on columns "id" */
  OrderStatusPkey = 'order_status_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type LogsOrderLogsDeleteAtPathInput = {
  metadata?: InputMaybe<Array<Scalars['String']['input']>>;
  newData?: InputMaybe<Array<Scalars['String']['input']>>;
  oldData?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type LogsOrderLogsDeleteElemInput = {
  metadata?: InputMaybe<Scalars['Int']['input']>;
  newData?: InputMaybe<Scalars['Int']['input']>;
  oldData?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type LogsOrderLogsDeleteKeyInput = {
  metadata?: InputMaybe<Scalars['String']['input']>;
  newData?: InputMaybe<Scalars['String']['input']>;
  oldData?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "logs.order_logs" */
export type LogsOrderLogsIncInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  order_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "logs.order_logs" */
export type LogsOrderLogsInsertInput = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  newData?: InputMaybe<Scalars['jsonb']['input']>;
  new_status?: InputMaybe<Scalars['String']['input']>;
  oldData?: InputMaybe<Scalars['jsonb']['input']>;
  order_id?: InputMaybe<Scalars['Int']['input']>;
  previous_status?: InputMaybe<Scalars['String']['input']>;
  triggered_by?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type LogsOrderLogsMaxFields = {
  __typename?: 'logs_order_logs_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  new_status?: Maybe<Scalars['String']['output']>;
  order_id?: Maybe<Scalars['Int']['output']>;
  previous_status?: Maybe<Scalars['String']['output']>;
  triggered_by?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type LogsOrderLogsMinFields = {
  __typename?: 'logs_order_logs_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  new_status?: Maybe<Scalars['String']['output']>;
  order_id?: Maybe<Scalars['Int']['output']>;
  previous_status?: Maybe<Scalars['String']['output']>;
  triggered_by?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "logs.order_logs" */
export type LogsOrderLogsMutationResponse = {
  __typename?: 'logs_order_logs_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<LogsOrderLogs>;
};

/** on_conflict condition type for table "logs.order_logs" */
export type LogsOrderLogsOnConflict = {
  constraint: LogsOrderLogsConstraint;
  update_columns?: Array<LogsOrderLogsUpdateColumn>;
  where?: InputMaybe<LogsOrderLogsBoolExp>;
};

/** Ordering options when selecting data from "logs.order_logs". */
export type LogsOrderLogsOrderBy = {
  created_at?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  metadata?: InputMaybe<OrderBy>;
  newData?: InputMaybe<OrderBy>;
  new_status?: InputMaybe<OrderBy>;
  oldData?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  previous_status?: InputMaybe<OrderBy>;
  triggered_by?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: logs.order_logs */
export type LogsOrderLogsPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type LogsOrderLogsPrependInput = {
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  newData?: InputMaybe<Scalars['jsonb']['input']>;
  oldData?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "logs.order_logs" */
export enum LogsOrderLogsSelectColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NewData = 'newData',
  /** column name */
  NewStatus = 'new_status',
  /** column name */
  OldData = 'oldData',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  PreviousStatus = 'previous_status',
  /** column name */
  TriggeredBy = 'triggered_by'
}

/** input type for updating data in table "logs.order_logs" */
export type LogsOrderLogsSetInput = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  newData?: InputMaybe<Scalars['jsonb']['input']>;
  new_status?: InputMaybe<Scalars['String']['input']>;
  oldData?: InputMaybe<Scalars['jsonb']['input']>;
  order_id?: InputMaybe<Scalars['Int']['input']>;
  previous_status?: InputMaybe<Scalars['String']['input']>;
  triggered_by?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type LogsOrderLogsStddevFields = {
  __typename?: 'logs_order_logs_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type LogsOrderLogsStddevPopFields = {
  __typename?: 'logs_order_logs_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type LogsOrderLogsStddevSampFields = {
  __typename?: 'logs_order_logs_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "logs_order_logs" */
export type LogsOrderLogsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: LogsOrderLogsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type LogsOrderLogsStreamCursorValueInput = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  metadata?: InputMaybe<Scalars['jsonb']['input']>;
  newData?: InputMaybe<Scalars['jsonb']['input']>;
  new_status?: InputMaybe<Scalars['String']['input']>;
  oldData?: InputMaybe<Scalars['jsonb']['input']>;
  order_id?: InputMaybe<Scalars['Int']['input']>;
  previous_status?: InputMaybe<Scalars['String']['input']>;
  triggered_by?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type LogsOrderLogsSumFields = {
  __typename?: 'logs_order_logs_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  order_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "logs.order_logs" */
export enum LogsOrderLogsUpdateColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NewData = 'newData',
  /** column name */
  NewStatus = 'new_status',
  /** column name */
  OldData = 'oldData',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  PreviousStatus = 'previous_status',
  /** column name */
  TriggeredBy = 'triggered_by'
}

export type LogsOrderLogsUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<LogsOrderLogsAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<LogsOrderLogsDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<LogsOrderLogsDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<LogsOrderLogsDeleteKeyInput>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<LogsOrderLogsIncInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<LogsOrderLogsPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<LogsOrderLogsSetInput>;
  /** filter the rows which have to be updated */
  where: LogsOrderLogsBoolExp;
};

/** aggregate var_pop on columns */
export type LogsOrderLogsVarPopFields = {
  __typename?: 'logs_order_logs_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type LogsOrderLogsVarSampFields = {
  __typename?: 'logs_order_logs_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type LogsOrderLogsVarianceFields = {
  __typename?: 'logs_order_logs_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** mutation root */
export type MutationRoot = {
  __typename?: 'mutation_root';
  /** delete data from the table: "catalog.attributes" */
  delete_catalog_attributes?: Maybe<CatalogAttributesMutationResponse>;
  /** delete single row from the table: "catalog.attributes" */
  delete_catalog_attributes_by_pk?: Maybe<CatalogAttributes>;
  /** delete data from the table: "catalog.avatar_countries" */
  delete_catalog_avatar_countries?: Maybe<CatalogAvatarCountriesMutationResponse>;
  /** delete single row from the table: "catalog.avatar_countries" */
  delete_catalog_avatar_countries_by_pk?: Maybe<CatalogAvatarCountries>;
  /** delete data from the table: "catalog.avatars" */
  delete_catalog_avatars?: Maybe<CatalogAvatarsMutationResponse>;
  /** delete single row from the table: "catalog.avatars" */
  delete_catalog_avatars_by_pk?: Maybe<CatalogAvatars>;
  /** delete data from the table: "catalog.background_countries" */
  delete_catalog_background_countries?: Maybe<CatalogBackgroundCountriesMutationResponse>;
  /** delete single row from the table: "catalog.background_countries" */
  delete_catalog_background_countries_by_pk?: Maybe<CatalogBackgroundCountries>;
  /** delete data from the table: "catalog.backgrounds" */
  delete_catalog_backgrounds?: Maybe<CatalogBackgroundsMutationResponse>;
  /** delete single row from the table: "catalog.backgrounds" */
  delete_catalog_backgrounds_by_pk?: Maybe<CatalogBackgrounds>;
  /** delete data from the table: "catalog.categories" */
  delete_catalog_categories?: Maybe<CatalogCategoriesMutationResponse>;
  /** delete single row from the table: "catalog.categories" */
  delete_catalog_categories_by_pk?: Maybe<CatalogCategories>;
  /** delete data from the table: "catalog.images" */
  delete_catalog_images?: Maybe<CatalogImagesMutationResponse>;
  /** delete single row from the table: "catalog.images" */
  delete_catalog_images_by_pk?: Maybe<CatalogImages>;
  /** delete data from the table: "catalog.prices" */
  delete_catalog_prices?: Maybe<CatalogPricesMutationResponse>;
  /** delete single row from the table: "catalog.prices" */
  delete_catalog_prices_by_pk?: Maybe<CatalogPrices>;
  /** delete data from the table: "catalog.product_attributes" */
  delete_catalog_product_attributes?: Maybe<CatalogProductAttributesMutationResponse>;
  /** delete single row from the table: "catalog.product_attributes" */
  delete_catalog_product_attributes_by_pk?: Maybe<CatalogProductAttributes>;
  /** delete data from the table: "catalog.products" */
  delete_catalog_products?: Maybe<CatalogProductsMutationResponse>;
  /** delete single row from the table: "catalog.products" */
  delete_catalog_products_by_pk?: Maybe<CatalogProducts>;
  /** delete data from the table: "catalog.sizes" */
  delete_catalog_sizes?: Maybe<CatalogSizesMutationResponse>;
  /** delete single row from the table: "catalog.sizes" */
  delete_catalog_sizes_by_pk?: Maybe<CatalogSizes>;
  /** delete data from the table: "catalog.slugs" */
  delete_catalog_slugs?: Maybe<CatalogSlugsMutationResponse>;
  /** delete single row from the table: "catalog.slugs" */
  delete_catalog_slugs_by_pk?: Maybe<CatalogSlugs>;
  /** delete data from the table: "catalog.testimonials" */
  delete_catalog_testimonials?: Maybe<CatalogTestimonialsMutationResponse>;
  /** delete single row from the table: "catalog.testimonials" */
  delete_catalog_testimonials_by_pk?: Maybe<CatalogTestimonials>;
  /** delete data from the table: "common.addresses" */
  delete_common_addresses?: Maybe<CommonAddressesMutationResponse>;
  /** delete single row from the table: "common.addresses" */
  delete_common_addresses_by_pk?: Maybe<CommonAddresses>;
  /** delete data from the table: "common.countries" */
  delete_common_countries?: Maybe<CommonCountriesMutationResponse>;
  /** delete single row from the table: "common.countries" */
  delete_common_countries_by_pk?: Maybe<CommonCountries>;
  /** delete data from the table: "common.email" */
  delete_common_email?: Maybe<CommonEmailMutationResponse>;
  /** delete single row from the table: "common.email" */
  delete_common_email_by_pk?: Maybe<CommonEmail>;
  /** delete data from the table: "enums.order_statuses" */
  delete_enums_order_statuses?: Maybe<EnumsOrderStatusesMutationResponse>;
  /** delete single row from the table: "enums.order_statuses" */
  delete_enums_order_statuses_by_pk?: Maybe<EnumsOrderStatuses>;
  /** delete data from the table: "enums.task_statuses" */
  delete_enums_task_statuses?: Maybe<EnumsTaskStatusesMutationResponse>;
  /** delete single row from the table: "enums.task_statuses" */
  delete_enums_task_statuses_by_pk?: Maybe<EnumsTaskStatuses>;
  /** delete data from the table: "enums.task_types" */
  delete_enums_task_types?: Maybe<EnumsTaskTypesMutationResponse>;
  /** delete single row from the table: "enums.task_types" */
  delete_enums_task_types_by_pk?: Maybe<EnumsTaskTypes>;
  /** delete data from the table: "logs.order_logs" */
  delete_logs_order_logs?: Maybe<LogsOrderLogsMutationResponse>;
  /** delete single row from the table: "logs.order_logs" */
  delete_logs_order_logs_by_pk?: Maybe<LogsOrderLogs>;
  /** delete data from the table: "sales.item_configurations" */
  delete_sales_item_configurations?: Maybe<SalesItemConfigurationsMutationResponse>;
  /** delete single row from the table: "sales.item_configurations" */
  delete_sales_item_configurations_by_pk?: Maybe<SalesItemConfigurations>;
  /** delete data from the table: "sales.items" */
  delete_sales_items?: Maybe<SalesItemsMutationResponse>;
  /** delete single row from the table: "sales.items" */
  delete_sales_items_by_pk?: Maybe<SalesItems>;
  /** delete data from the table: "sales.orders" */
  delete_sales_orders?: Maybe<SalesOrdersMutationResponse>;
  /** delete single row from the table: "sales.orders" */
  delete_sales_orders_by_pk?: Maybe<SalesOrders>;
  /** delete data from the table: "sales.tasks" */
  delete_sales_tasks?: Maybe<SalesTasksMutationResponse>;
  /** delete single row from the table: "sales.tasks" */
  delete_sales_tasks_by_pk?: Maybe<SalesTasks>;
  /** delete data from the table: "support.conversation_threads" */
  delete_support_conversation_threads?: Maybe<SupportConversationThreadsMutationResponse>;
  /** delete single row from the table: "support.conversation_threads" */
  delete_support_conversation_threads_by_pk?: Maybe<SupportConversationThreads>;
  /** delete data from the table: "users.customers" */
  delete_users_customers?: Maybe<UsersCustomersMutationResponse>;
  /** delete single row from the table: "users.customers" */
  delete_users_customers_by_pk?: Maybe<UsersCustomers>;
  /** delete data from the table: "users.staff" */
  delete_users_staff?: Maybe<UsersStaffMutationResponse>;
  /** delete single row from the table: "users.staff" */
  delete_users_staff_by_pk?: Maybe<UsersStaff>;
  /** delete data from the table: "users.users" */
  delete_users_users?: Maybe<UsersUsersMutationResponse>;
  /** delete single row from the table: "users.users" */
  delete_users_users_by_pk?: Maybe<UsersUsers>;
  /** insert data into the table: "catalog.attributes" */
  insert_catalog_attributes?: Maybe<CatalogAttributesMutationResponse>;
  /** insert a single row into the table: "catalog.attributes" */
  insert_catalog_attributes_one?: Maybe<CatalogAttributes>;
  /** insert data into the table: "catalog.avatar_countries" */
  insert_catalog_avatar_countries?: Maybe<CatalogAvatarCountriesMutationResponse>;
  /** insert a single row into the table: "catalog.avatar_countries" */
  insert_catalog_avatar_countries_one?: Maybe<CatalogAvatarCountries>;
  /** insert data into the table: "catalog.avatars" */
  insert_catalog_avatars?: Maybe<CatalogAvatarsMutationResponse>;
  /** insert a single row into the table: "catalog.avatars" */
  insert_catalog_avatars_one?: Maybe<CatalogAvatars>;
  /** insert data into the table: "catalog.background_countries" */
  insert_catalog_background_countries?: Maybe<CatalogBackgroundCountriesMutationResponse>;
  /** insert a single row into the table: "catalog.background_countries" */
  insert_catalog_background_countries_one?: Maybe<CatalogBackgroundCountries>;
  /** insert data into the table: "catalog.backgrounds" */
  insert_catalog_backgrounds?: Maybe<CatalogBackgroundsMutationResponse>;
  /** insert a single row into the table: "catalog.backgrounds" */
  insert_catalog_backgrounds_one?: Maybe<CatalogBackgrounds>;
  /** insert data into the table: "catalog.categories" */
  insert_catalog_categories?: Maybe<CatalogCategoriesMutationResponse>;
  /** insert a single row into the table: "catalog.categories" */
  insert_catalog_categories_one?: Maybe<CatalogCategories>;
  /** insert data into the table: "catalog.images" */
  insert_catalog_images?: Maybe<CatalogImagesMutationResponse>;
  /** insert a single row into the table: "catalog.images" */
  insert_catalog_images_one?: Maybe<CatalogImages>;
  /** insert data into the table: "catalog.prices" */
  insert_catalog_prices?: Maybe<CatalogPricesMutationResponse>;
  /** insert a single row into the table: "catalog.prices" */
  insert_catalog_prices_one?: Maybe<CatalogPrices>;
  /** insert data into the table: "catalog.product_attributes" */
  insert_catalog_product_attributes?: Maybe<CatalogProductAttributesMutationResponse>;
  /** insert a single row into the table: "catalog.product_attributes" */
  insert_catalog_product_attributes_one?: Maybe<CatalogProductAttributes>;
  /** insert data into the table: "catalog.products" */
  insert_catalog_products?: Maybe<CatalogProductsMutationResponse>;
  /** insert a single row into the table: "catalog.products" */
  insert_catalog_products_one?: Maybe<CatalogProducts>;
  /** insert data into the table: "catalog.sizes" */
  insert_catalog_sizes?: Maybe<CatalogSizesMutationResponse>;
  /** insert a single row into the table: "catalog.sizes" */
  insert_catalog_sizes_one?: Maybe<CatalogSizes>;
  /** insert data into the table: "catalog.slugs" */
  insert_catalog_slugs?: Maybe<CatalogSlugsMutationResponse>;
  /** insert a single row into the table: "catalog.slugs" */
  insert_catalog_slugs_one?: Maybe<CatalogSlugs>;
  /** insert data into the table: "catalog.testimonials" */
  insert_catalog_testimonials?: Maybe<CatalogTestimonialsMutationResponse>;
  /** insert a single row into the table: "catalog.testimonials" */
  insert_catalog_testimonials_one?: Maybe<CatalogTestimonials>;
  /** insert data into the table: "common.addresses" */
  insert_common_addresses?: Maybe<CommonAddressesMutationResponse>;
  /** insert a single row into the table: "common.addresses" */
  insert_common_addresses_one?: Maybe<CommonAddresses>;
  /** insert data into the table: "common.countries" */
  insert_common_countries?: Maybe<CommonCountriesMutationResponse>;
  /** insert a single row into the table: "common.countries" */
  insert_common_countries_one?: Maybe<CommonCountries>;
  /** insert data into the table: "common.email" */
  insert_common_email?: Maybe<CommonEmailMutationResponse>;
  /** insert a single row into the table: "common.email" */
  insert_common_email_one?: Maybe<CommonEmail>;
  /** insert data into the table: "enums.order_statuses" */
  insert_enums_order_statuses?: Maybe<EnumsOrderStatusesMutationResponse>;
  /** insert a single row into the table: "enums.order_statuses" */
  insert_enums_order_statuses_one?: Maybe<EnumsOrderStatuses>;
  /** insert data into the table: "enums.task_statuses" */
  insert_enums_task_statuses?: Maybe<EnumsTaskStatusesMutationResponse>;
  /** insert a single row into the table: "enums.task_statuses" */
  insert_enums_task_statuses_one?: Maybe<EnumsTaskStatuses>;
  /** insert data into the table: "enums.task_types" */
  insert_enums_task_types?: Maybe<EnumsTaskTypesMutationResponse>;
  /** insert a single row into the table: "enums.task_types" */
  insert_enums_task_types_one?: Maybe<EnumsTaskTypes>;
  /** insert data into the table: "logs.order_logs" */
  insert_logs_order_logs?: Maybe<LogsOrderLogsMutationResponse>;
  /** insert a single row into the table: "logs.order_logs" */
  insert_logs_order_logs_one?: Maybe<LogsOrderLogs>;
  /** insert data into the table: "sales.item_configurations" */
  insert_sales_item_configurations?: Maybe<SalesItemConfigurationsMutationResponse>;
  /** insert a single row into the table: "sales.item_configurations" */
  insert_sales_item_configurations_one?: Maybe<SalesItemConfigurations>;
  /** insert data into the table: "sales.items" */
  insert_sales_items?: Maybe<SalesItemsMutationResponse>;
  /** insert a single row into the table: "sales.items" */
  insert_sales_items_one?: Maybe<SalesItems>;
  /** insert data into the table: "sales.orders" */
  insert_sales_orders?: Maybe<SalesOrdersMutationResponse>;
  /** insert a single row into the table: "sales.orders" */
  insert_sales_orders_one?: Maybe<SalesOrders>;
  /** insert data into the table: "sales.tasks" */
  insert_sales_tasks?: Maybe<SalesTasksMutationResponse>;
  /** insert a single row into the table: "sales.tasks" */
  insert_sales_tasks_one?: Maybe<SalesTasks>;
  /** insert data into the table: "support.conversation_threads" */
  insert_support_conversation_threads?: Maybe<SupportConversationThreadsMutationResponse>;
  /** insert a single row into the table: "support.conversation_threads" */
  insert_support_conversation_threads_one?: Maybe<SupportConversationThreads>;
  /** insert data into the table: "users.customers" */
  insert_users_customers?: Maybe<UsersCustomersMutationResponse>;
  /** insert a single row into the table: "users.customers" */
  insert_users_customers_one?: Maybe<UsersCustomers>;
  /** insert data into the table: "users.staff" */
  insert_users_staff?: Maybe<UsersStaffMutationResponse>;
  /** insert a single row into the table: "users.staff" */
  insert_users_staff_one?: Maybe<UsersStaff>;
  /** insert data into the table: "users.users" */
  insert_users_users?: Maybe<UsersUsersMutationResponse>;
  /** insert a single row into the table: "users.users" */
  insert_users_users_one?: Maybe<UsersUsers>;
  /** update data of the table: "catalog.attributes" */
  update_catalog_attributes?: Maybe<CatalogAttributesMutationResponse>;
  /** update single row of the table: "catalog.attributes" */
  update_catalog_attributes_by_pk?: Maybe<CatalogAttributes>;
  /** update multiples rows of table: "catalog.attributes" */
  update_catalog_attributes_many?: Maybe<Array<Maybe<CatalogAttributesMutationResponse>>>;
  /** update data of the table: "catalog.avatar_countries" */
  update_catalog_avatar_countries?: Maybe<CatalogAvatarCountriesMutationResponse>;
  /** update single row of the table: "catalog.avatar_countries" */
  update_catalog_avatar_countries_by_pk?: Maybe<CatalogAvatarCountries>;
  /** update multiples rows of table: "catalog.avatar_countries" */
  update_catalog_avatar_countries_many?: Maybe<Array<Maybe<CatalogAvatarCountriesMutationResponse>>>;
  /** update data of the table: "catalog.avatars" */
  update_catalog_avatars?: Maybe<CatalogAvatarsMutationResponse>;
  /** update single row of the table: "catalog.avatars" */
  update_catalog_avatars_by_pk?: Maybe<CatalogAvatars>;
  /** update multiples rows of table: "catalog.avatars" */
  update_catalog_avatars_many?: Maybe<Array<Maybe<CatalogAvatarsMutationResponse>>>;
  /** update data of the table: "catalog.background_countries" */
  update_catalog_background_countries?: Maybe<CatalogBackgroundCountriesMutationResponse>;
  /** update single row of the table: "catalog.background_countries" */
  update_catalog_background_countries_by_pk?: Maybe<CatalogBackgroundCountries>;
  /** update multiples rows of table: "catalog.background_countries" */
  update_catalog_background_countries_many?: Maybe<Array<Maybe<CatalogBackgroundCountriesMutationResponse>>>;
  /** update data of the table: "catalog.backgrounds" */
  update_catalog_backgrounds?: Maybe<CatalogBackgroundsMutationResponse>;
  /** update single row of the table: "catalog.backgrounds" */
  update_catalog_backgrounds_by_pk?: Maybe<CatalogBackgrounds>;
  /** update multiples rows of table: "catalog.backgrounds" */
  update_catalog_backgrounds_many?: Maybe<Array<Maybe<CatalogBackgroundsMutationResponse>>>;
  /** update data of the table: "catalog.categories" */
  update_catalog_categories?: Maybe<CatalogCategoriesMutationResponse>;
  /** update single row of the table: "catalog.categories" */
  update_catalog_categories_by_pk?: Maybe<CatalogCategories>;
  /** update multiples rows of table: "catalog.categories" */
  update_catalog_categories_many?: Maybe<Array<Maybe<CatalogCategoriesMutationResponse>>>;
  /** update data of the table: "catalog.images" */
  update_catalog_images?: Maybe<CatalogImagesMutationResponse>;
  /** update single row of the table: "catalog.images" */
  update_catalog_images_by_pk?: Maybe<CatalogImages>;
  /** update multiples rows of table: "catalog.images" */
  update_catalog_images_many?: Maybe<Array<Maybe<CatalogImagesMutationResponse>>>;
  /** update data of the table: "catalog.prices" */
  update_catalog_prices?: Maybe<CatalogPricesMutationResponse>;
  /** update single row of the table: "catalog.prices" */
  update_catalog_prices_by_pk?: Maybe<CatalogPrices>;
  /** update multiples rows of table: "catalog.prices" */
  update_catalog_prices_many?: Maybe<Array<Maybe<CatalogPricesMutationResponse>>>;
  /** update data of the table: "catalog.product_attributes" */
  update_catalog_product_attributes?: Maybe<CatalogProductAttributesMutationResponse>;
  /** update single row of the table: "catalog.product_attributes" */
  update_catalog_product_attributes_by_pk?: Maybe<CatalogProductAttributes>;
  /** update multiples rows of table: "catalog.product_attributes" */
  update_catalog_product_attributes_many?: Maybe<Array<Maybe<CatalogProductAttributesMutationResponse>>>;
  /** update data of the table: "catalog.products" */
  update_catalog_products?: Maybe<CatalogProductsMutationResponse>;
  /** update single row of the table: "catalog.products" */
  update_catalog_products_by_pk?: Maybe<CatalogProducts>;
  /** update multiples rows of table: "catalog.products" */
  update_catalog_products_many?: Maybe<Array<Maybe<CatalogProductsMutationResponse>>>;
  /** update data of the table: "catalog.sizes" */
  update_catalog_sizes?: Maybe<CatalogSizesMutationResponse>;
  /** update single row of the table: "catalog.sizes" */
  update_catalog_sizes_by_pk?: Maybe<CatalogSizes>;
  /** update multiples rows of table: "catalog.sizes" */
  update_catalog_sizes_many?: Maybe<Array<Maybe<CatalogSizesMutationResponse>>>;
  /** update data of the table: "catalog.slugs" */
  update_catalog_slugs?: Maybe<CatalogSlugsMutationResponse>;
  /** update single row of the table: "catalog.slugs" */
  update_catalog_slugs_by_pk?: Maybe<CatalogSlugs>;
  /** update multiples rows of table: "catalog.slugs" */
  update_catalog_slugs_many?: Maybe<Array<Maybe<CatalogSlugsMutationResponse>>>;
  /** update data of the table: "catalog.testimonials" */
  update_catalog_testimonials?: Maybe<CatalogTestimonialsMutationResponse>;
  /** update single row of the table: "catalog.testimonials" */
  update_catalog_testimonials_by_pk?: Maybe<CatalogTestimonials>;
  /** update multiples rows of table: "catalog.testimonials" */
  update_catalog_testimonials_many?: Maybe<Array<Maybe<CatalogTestimonialsMutationResponse>>>;
  /** update data of the table: "common.addresses" */
  update_common_addresses?: Maybe<CommonAddressesMutationResponse>;
  /** update single row of the table: "common.addresses" */
  update_common_addresses_by_pk?: Maybe<CommonAddresses>;
  /** update multiples rows of table: "common.addresses" */
  update_common_addresses_many?: Maybe<Array<Maybe<CommonAddressesMutationResponse>>>;
  /** update data of the table: "common.countries" */
  update_common_countries?: Maybe<CommonCountriesMutationResponse>;
  /** update single row of the table: "common.countries" */
  update_common_countries_by_pk?: Maybe<CommonCountries>;
  /** update multiples rows of table: "common.countries" */
  update_common_countries_many?: Maybe<Array<Maybe<CommonCountriesMutationResponse>>>;
  /** update data of the table: "common.email" */
  update_common_email?: Maybe<CommonEmailMutationResponse>;
  /** update single row of the table: "common.email" */
  update_common_email_by_pk?: Maybe<CommonEmail>;
  /** update multiples rows of table: "common.email" */
  update_common_email_many?: Maybe<Array<Maybe<CommonEmailMutationResponse>>>;
  /** update data of the table: "enums.order_statuses" */
  update_enums_order_statuses?: Maybe<EnumsOrderStatusesMutationResponse>;
  /** update single row of the table: "enums.order_statuses" */
  update_enums_order_statuses_by_pk?: Maybe<EnumsOrderStatuses>;
  /** update multiples rows of table: "enums.order_statuses" */
  update_enums_order_statuses_many?: Maybe<Array<Maybe<EnumsOrderStatusesMutationResponse>>>;
  /** update data of the table: "enums.task_statuses" */
  update_enums_task_statuses?: Maybe<EnumsTaskStatusesMutationResponse>;
  /** update single row of the table: "enums.task_statuses" */
  update_enums_task_statuses_by_pk?: Maybe<EnumsTaskStatuses>;
  /** update multiples rows of table: "enums.task_statuses" */
  update_enums_task_statuses_many?: Maybe<Array<Maybe<EnumsTaskStatusesMutationResponse>>>;
  /** update data of the table: "enums.task_types" */
  update_enums_task_types?: Maybe<EnumsTaskTypesMutationResponse>;
  /** update single row of the table: "enums.task_types" */
  update_enums_task_types_by_pk?: Maybe<EnumsTaskTypes>;
  /** update multiples rows of table: "enums.task_types" */
  update_enums_task_types_many?: Maybe<Array<Maybe<EnumsTaskTypesMutationResponse>>>;
  /** update data of the table: "logs.order_logs" */
  update_logs_order_logs?: Maybe<LogsOrderLogsMutationResponse>;
  /** update single row of the table: "logs.order_logs" */
  update_logs_order_logs_by_pk?: Maybe<LogsOrderLogs>;
  /** update multiples rows of table: "logs.order_logs" */
  update_logs_order_logs_many?: Maybe<Array<Maybe<LogsOrderLogsMutationResponse>>>;
  /** update data of the table: "sales.item_configurations" */
  update_sales_item_configurations?: Maybe<SalesItemConfigurationsMutationResponse>;
  /** update single row of the table: "sales.item_configurations" */
  update_sales_item_configurations_by_pk?: Maybe<SalesItemConfigurations>;
  /** update multiples rows of table: "sales.item_configurations" */
  update_sales_item_configurations_many?: Maybe<Array<Maybe<SalesItemConfigurationsMutationResponse>>>;
  /** update data of the table: "sales.items" */
  update_sales_items?: Maybe<SalesItemsMutationResponse>;
  /** update single row of the table: "sales.items" */
  update_sales_items_by_pk?: Maybe<SalesItems>;
  /** update multiples rows of table: "sales.items" */
  update_sales_items_many?: Maybe<Array<Maybe<SalesItemsMutationResponse>>>;
  /** update data of the table: "sales.orders" */
  update_sales_orders?: Maybe<SalesOrdersMutationResponse>;
  /** update single row of the table: "sales.orders" */
  update_sales_orders_by_pk?: Maybe<SalesOrders>;
  /** update multiples rows of table: "sales.orders" */
  update_sales_orders_many?: Maybe<Array<Maybe<SalesOrdersMutationResponse>>>;
  /** update data of the table: "sales.tasks" */
  update_sales_tasks?: Maybe<SalesTasksMutationResponse>;
  /** update single row of the table: "sales.tasks" */
  update_sales_tasks_by_pk?: Maybe<SalesTasks>;
  /** update multiples rows of table: "sales.tasks" */
  update_sales_tasks_many?: Maybe<Array<Maybe<SalesTasksMutationResponse>>>;
  /** update data of the table: "support.conversation_threads" */
  update_support_conversation_threads?: Maybe<SupportConversationThreadsMutationResponse>;
  /** update single row of the table: "support.conversation_threads" */
  update_support_conversation_threads_by_pk?: Maybe<SupportConversationThreads>;
  /** update multiples rows of table: "support.conversation_threads" */
  update_support_conversation_threads_many?: Maybe<Array<Maybe<SupportConversationThreadsMutationResponse>>>;
  /** update data of the table: "users.customers" */
  update_users_customers?: Maybe<UsersCustomersMutationResponse>;
  /** update single row of the table: "users.customers" */
  update_users_customers_by_pk?: Maybe<UsersCustomers>;
  /** update multiples rows of table: "users.customers" */
  update_users_customers_many?: Maybe<Array<Maybe<UsersCustomersMutationResponse>>>;
  /** update data of the table: "users.staff" */
  update_users_staff?: Maybe<UsersStaffMutationResponse>;
  /** update single row of the table: "users.staff" */
  update_users_staff_by_pk?: Maybe<UsersStaff>;
  /** update multiples rows of table: "users.staff" */
  update_users_staff_many?: Maybe<Array<Maybe<UsersStaffMutationResponse>>>;
  /** update data of the table: "users.users" */
  update_users_users?: Maybe<UsersUsersMutationResponse>;
  /** update single row of the table: "users.users" */
  update_users_users_by_pk?: Maybe<UsersUsers>;
  /** update multiples rows of table: "users.users" */
  update_users_users_many?: Maybe<Array<Maybe<UsersUsersMutationResponse>>>;
};


/** mutation root */
export type MutationRootDeleteCatalogAttributesArgs = {
  where: CatalogAttributesBoolExp;
};


/** mutation root */
export type MutationRootDeleteCatalogAttributesByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCatalogAvatarCountriesArgs = {
  where: CatalogAvatarCountriesBoolExp;
};


/** mutation root */
export type MutationRootDeleteCatalogAvatarCountriesByPkArgs = {
  country_id: Scalars['Int']['input'];
  product_avatar_id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCatalogAvatarsArgs = {
  where: CatalogAvatarsBoolExp;
};


/** mutation root */
export type MutationRootDeleteCatalogAvatarsByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCatalogBackgroundCountriesArgs = {
  where: CatalogBackgroundCountriesBoolExp;
};


/** mutation root */
export type MutationRootDeleteCatalogBackgroundCountriesByPkArgs = {
  background_id: Scalars['Int']['input'];
  country_id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCatalogBackgroundsArgs = {
  where: CatalogBackgroundsBoolExp;
};


/** mutation root */
export type MutationRootDeleteCatalogBackgroundsByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCatalogCategoriesArgs = {
  where: CatalogCategoriesBoolExp;
};


/** mutation root */
export type MutationRootDeleteCatalogCategoriesByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCatalogImagesArgs = {
  where: CatalogImagesBoolExp;
};


/** mutation root */
export type MutationRootDeleteCatalogImagesByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCatalogPricesArgs = {
  where: CatalogPricesBoolExp;
};


/** mutation root */
export type MutationRootDeleteCatalogPricesByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCatalogProductAttributesArgs = {
  where: CatalogProductAttributesBoolExp;
};


/** mutation root */
export type MutationRootDeleteCatalogProductAttributesByPkArgs = {
  attribute_id: Scalars['Int']['input'];
  product_id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCatalogProductsArgs = {
  where: CatalogProductsBoolExp;
};


/** mutation root */
export type MutationRootDeleteCatalogProductsByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCatalogSizesArgs = {
  where: CatalogSizesBoolExp;
};


/** mutation root */
export type MutationRootDeleteCatalogSizesByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCatalogSlugsArgs = {
  where: CatalogSlugsBoolExp;
};


/** mutation root */
export type MutationRootDeleteCatalogSlugsByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCatalogTestimonialsArgs = {
  where: CatalogTestimonialsBoolExp;
};


/** mutation root */
export type MutationRootDeleteCatalogTestimonialsByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCommonAddressesArgs = {
  where: CommonAddressesBoolExp;
};


/** mutation root */
export type MutationRootDeleteCommonAddressesByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCommonCountriesArgs = {
  where: CommonCountriesBoolExp;
};


/** mutation root */
export type MutationRootDeleteCommonCountriesByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteCommonEmailArgs = {
  where: CommonEmailBoolExp;
};


/** mutation root */
export type MutationRootDeleteCommonEmailByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteEnumsOrderStatusesArgs = {
  where: EnumsOrderStatusesBoolExp;
};


/** mutation root */
export type MutationRootDeleteEnumsOrderStatusesByPkArgs = {
  status: Scalars['String']['input'];
};


/** mutation root */
export type MutationRootDeleteEnumsTaskStatusesArgs = {
  where: EnumsTaskStatusesBoolExp;
};


/** mutation root */
export type MutationRootDeleteEnumsTaskStatusesByPkArgs = {
  status: Scalars['String']['input'];
};


/** mutation root */
export type MutationRootDeleteEnumsTaskTypesArgs = {
  where: EnumsTaskTypesBoolExp;
};


/** mutation root */
export type MutationRootDeleteEnumsTaskTypesByPkArgs = {
  type: Scalars['String']['input'];
};


/** mutation root */
export type MutationRootDeleteLogsOrderLogsArgs = {
  where: LogsOrderLogsBoolExp;
};


/** mutation root */
export type MutationRootDeleteLogsOrderLogsByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteSalesItemConfigurationsArgs = {
  where: SalesItemConfigurationsBoolExp;
};


/** mutation root */
export type MutationRootDeleteSalesItemConfigurationsByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteSalesItemsArgs = {
  where: SalesItemsBoolExp;
};


/** mutation root */
export type MutationRootDeleteSalesItemsByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteSalesOrdersArgs = {
  where: SalesOrdersBoolExp;
};


/** mutation root */
export type MutationRootDeleteSalesOrdersByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteSalesTasksArgs = {
  where: SalesTasksBoolExp;
};


/** mutation root */
export type MutationRootDeleteSalesTasksByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteSupportConversationThreadsArgs = {
  where: SupportConversationThreadsBoolExp;
};


/** mutation root */
export type MutationRootDeleteSupportConversationThreadsByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteUsersCustomersArgs = {
  where: UsersCustomersBoolExp;
};


/** mutation root */
export type MutationRootDeleteUsersCustomersByPkArgs = {
  id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteUsersStaffArgs = {
  where: UsersStaffBoolExp;
};


/** mutation root */
export type MutationRootDeleteUsersStaffByPkArgs = {
  staff_detail_id: Scalars['Int']['input'];
};


/** mutation root */
export type MutationRootDeleteUsersUsersArgs = {
  where: UsersUsersBoolExp;
};


/** mutation root */
export type MutationRootDeleteUsersUsersByPkArgs = {
  id: Scalars['String']['input'];
};


/** mutation root */
export type MutationRootInsertCatalogAttributesArgs = {
  objects: Array<CatalogAttributesInsertInput>;
  on_conflict?: InputMaybe<CatalogAttributesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogAttributesOneArgs = {
  object: CatalogAttributesInsertInput;
  on_conflict?: InputMaybe<CatalogAttributesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogAvatarCountriesArgs = {
  objects: Array<CatalogAvatarCountriesInsertInput>;
  on_conflict?: InputMaybe<CatalogAvatarCountriesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogAvatarCountriesOneArgs = {
  object: CatalogAvatarCountriesInsertInput;
  on_conflict?: InputMaybe<CatalogAvatarCountriesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogAvatarsArgs = {
  objects: Array<CatalogAvatarsInsertInput>;
  on_conflict?: InputMaybe<CatalogAvatarsOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogAvatarsOneArgs = {
  object: CatalogAvatarsInsertInput;
  on_conflict?: InputMaybe<CatalogAvatarsOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogBackgroundCountriesArgs = {
  objects: Array<CatalogBackgroundCountriesInsertInput>;
  on_conflict?: InputMaybe<CatalogBackgroundCountriesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogBackgroundCountriesOneArgs = {
  object: CatalogBackgroundCountriesInsertInput;
  on_conflict?: InputMaybe<CatalogBackgroundCountriesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogBackgroundsArgs = {
  objects: Array<CatalogBackgroundsInsertInput>;
  on_conflict?: InputMaybe<CatalogBackgroundsOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogBackgroundsOneArgs = {
  object: CatalogBackgroundsInsertInput;
  on_conflict?: InputMaybe<CatalogBackgroundsOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogCategoriesArgs = {
  objects: Array<CatalogCategoriesInsertInput>;
  on_conflict?: InputMaybe<CatalogCategoriesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogCategoriesOneArgs = {
  object: CatalogCategoriesInsertInput;
  on_conflict?: InputMaybe<CatalogCategoriesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogImagesArgs = {
  objects: Array<CatalogImagesInsertInput>;
  on_conflict?: InputMaybe<CatalogImagesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogImagesOneArgs = {
  object: CatalogImagesInsertInput;
  on_conflict?: InputMaybe<CatalogImagesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogPricesArgs = {
  objects: Array<CatalogPricesInsertInput>;
  on_conflict?: InputMaybe<CatalogPricesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogPricesOneArgs = {
  object: CatalogPricesInsertInput;
  on_conflict?: InputMaybe<CatalogPricesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogProductAttributesArgs = {
  objects: Array<CatalogProductAttributesInsertInput>;
  on_conflict?: InputMaybe<CatalogProductAttributesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogProductAttributesOneArgs = {
  object: CatalogProductAttributesInsertInput;
  on_conflict?: InputMaybe<CatalogProductAttributesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogProductsArgs = {
  objects: Array<CatalogProductsInsertInput>;
  on_conflict?: InputMaybe<CatalogProductsOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogProductsOneArgs = {
  object: CatalogProductsInsertInput;
  on_conflict?: InputMaybe<CatalogProductsOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogSizesArgs = {
  objects: Array<CatalogSizesInsertInput>;
  on_conflict?: InputMaybe<CatalogSizesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogSizesOneArgs = {
  object: CatalogSizesInsertInput;
  on_conflict?: InputMaybe<CatalogSizesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogSlugsArgs = {
  objects: Array<CatalogSlugsInsertInput>;
  on_conflict?: InputMaybe<CatalogSlugsOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogSlugsOneArgs = {
  object: CatalogSlugsInsertInput;
  on_conflict?: InputMaybe<CatalogSlugsOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogTestimonialsArgs = {
  objects: Array<CatalogTestimonialsInsertInput>;
  on_conflict?: InputMaybe<CatalogTestimonialsOnConflict>;
};


/** mutation root */
export type MutationRootInsertCatalogTestimonialsOneArgs = {
  object: CatalogTestimonialsInsertInput;
  on_conflict?: InputMaybe<CatalogTestimonialsOnConflict>;
};


/** mutation root */
export type MutationRootInsertCommonAddressesArgs = {
  objects: Array<CommonAddressesInsertInput>;
  on_conflict?: InputMaybe<CommonAddressesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCommonAddressesOneArgs = {
  object: CommonAddressesInsertInput;
  on_conflict?: InputMaybe<CommonAddressesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCommonCountriesArgs = {
  objects: Array<CommonCountriesInsertInput>;
  on_conflict?: InputMaybe<CommonCountriesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCommonCountriesOneArgs = {
  object: CommonCountriesInsertInput;
  on_conflict?: InputMaybe<CommonCountriesOnConflict>;
};


/** mutation root */
export type MutationRootInsertCommonEmailArgs = {
  objects: Array<CommonEmailInsertInput>;
  on_conflict?: InputMaybe<CommonEmailOnConflict>;
};


/** mutation root */
export type MutationRootInsertCommonEmailOneArgs = {
  object: CommonEmailInsertInput;
  on_conflict?: InputMaybe<CommonEmailOnConflict>;
};


/** mutation root */
export type MutationRootInsertEnumsOrderStatusesArgs = {
  objects: Array<EnumsOrderStatusesInsertInput>;
  on_conflict?: InputMaybe<EnumsOrderStatusesOnConflict>;
};


/** mutation root */
export type MutationRootInsertEnumsOrderStatusesOneArgs = {
  object: EnumsOrderStatusesInsertInput;
  on_conflict?: InputMaybe<EnumsOrderStatusesOnConflict>;
};


/** mutation root */
export type MutationRootInsertEnumsTaskStatusesArgs = {
  objects: Array<EnumsTaskStatusesInsertInput>;
  on_conflict?: InputMaybe<EnumsTaskStatusesOnConflict>;
};


/** mutation root */
export type MutationRootInsertEnumsTaskStatusesOneArgs = {
  object: EnumsTaskStatusesInsertInput;
  on_conflict?: InputMaybe<EnumsTaskStatusesOnConflict>;
};


/** mutation root */
export type MutationRootInsertEnumsTaskTypesArgs = {
  objects: Array<EnumsTaskTypesInsertInput>;
  on_conflict?: InputMaybe<EnumsTaskTypesOnConflict>;
};


/** mutation root */
export type MutationRootInsertEnumsTaskTypesOneArgs = {
  object: EnumsTaskTypesInsertInput;
  on_conflict?: InputMaybe<EnumsTaskTypesOnConflict>;
};


/** mutation root */
export type MutationRootInsertLogsOrderLogsArgs = {
  objects: Array<LogsOrderLogsInsertInput>;
  on_conflict?: InputMaybe<LogsOrderLogsOnConflict>;
};


/** mutation root */
export type MutationRootInsertLogsOrderLogsOneArgs = {
  object: LogsOrderLogsInsertInput;
  on_conflict?: InputMaybe<LogsOrderLogsOnConflict>;
};


/** mutation root */
export type MutationRootInsertSalesItemConfigurationsArgs = {
  objects: Array<SalesItemConfigurationsInsertInput>;
  on_conflict?: InputMaybe<SalesItemConfigurationsOnConflict>;
};


/** mutation root */
export type MutationRootInsertSalesItemConfigurationsOneArgs = {
  object: SalesItemConfigurationsInsertInput;
  on_conflict?: InputMaybe<SalesItemConfigurationsOnConflict>;
};


/** mutation root */
export type MutationRootInsertSalesItemsArgs = {
  objects: Array<SalesItemsInsertInput>;
  on_conflict?: InputMaybe<SalesItemsOnConflict>;
};


/** mutation root */
export type MutationRootInsertSalesItemsOneArgs = {
  object: SalesItemsInsertInput;
  on_conflict?: InputMaybe<SalesItemsOnConflict>;
};


/** mutation root */
export type MutationRootInsertSalesOrdersArgs = {
  objects: Array<SalesOrdersInsertInput>;
  on_conflict?: InputMaybe<SalesOrdersOnConflict>;
};


/** mutation root */
export type MutationRootInsertSalesOrdersOneArgs = {
  object: SalesOrdersInsertInput;
  on_conflict?: InputMaybe<SalesOrdersOnConflict>;
};


/** mutation root */
export type MutationRootInsertSalesTasksArgs = {
  objects: Array<SalesTasksInsertInput>;
  on_conflict?: InputMaybe<SalesTasksOnConflict>;
};


/** mutation root */
export type MutationRootInsertSalesTasksOneArgs = {
  object: SalesTasksInsertInput;
  on_conflict?: InputMaybe<SalesTasksOnConflict>;
};


/** mutation root */
export type MutationRootInsertSupportConversationThreadsArgs = {
  objects: Array<SupportConversationThreadsInsertInput>;
  on_conflict?: InputMaybe<SupportConversationThreadsOnConflict>;
};


/** mutation root */
export type MutationRootInsertSupportConversationThreadsOneArgs = {
  object: SupportConversationThreadsInsertInput;
  on_conflict?: InputMaybe<SupportConversationThreadsOnConflict>;
};


/** mutation root */
export type MutationRootInsertUsersCustomersArgs = {
  objects: Array<UsersCustomersInsertInput>;
  on_conflict?: InputMaybe<UsersCustomersOnConflict>;
};


/** mutation root */
export type MutationRootInsertUsersCustomersOneArgs = {
  object: UsersCustomersInsertInput;
  on_conflict?: InputMaybe<UsersCustomersOnConflict>;
};


/** mutation root */
export type MutationRootInsertUsersStaffArgs = {
  objects: Array<UsersStaffInsertInput>;
  on_conflict?: InputMaybe<UsersStaffOnConflict>;
};


/** mutation root */
export type MutationRootInsertUsersStaffOneArgs = {
  object: UsersStaffInsertInput;
  on_conflict?: InputMaybe<UsersStaffOnConflict>;
};


/** mutation root */
export type MutationRootInsertUsersUsersArgs = {
  objects: Array<UsersUsersInsertInput>;
  on_conflict?: InputMaybe<UsersUsersOnConflict>;
};


/** mutation root */
export type MutationRootInsertUsersUsersOneArgs = {
  object: UsersUsersInsertInput;
  on_conflict?: InputMaybe<UsersUsersOnConflict>;
};


/** mutation root */
export type MutationRootUpdateCatalogAttributesArgs = {
  _inc?: InputMaybe<CatalogAttributesIncInput>;
  _set?: InputMaybe<CatalogAttributesSetInput>;
  where: CatalogAttributesBoolExp;
};


/** mutation root */
export type MutationRootUpdateCatalogAttributesByPkArgs = {
  _inc?: InputMaybe<CatalogAttributesIncInput>;
  _set?: InputMaybe<CatalogAttributesSetInput>;
  pk_columns: CatalogAttributesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCatalogAttributesManyArgs = {
  updates: Array<CatalogAttributesUpdates>;
};


/** mutation root */
export type MutationRootUpdateCatalogAvatarCountriesArgs = {
  _inc?: InputMaybe<CatalogAvatarCountriesIncInput>;
  _set?: InputMaybe<CatalogAvatarCountriesSetInput>;
  where: CatalogAvatarCountriesBoolExp;
};


/** mutation root */
export type MutationRootUpdateCatalogAvatarCountriesByPkArgs = {
  _inc?: InputMaybe<CatalogAvatarCountriesIncInput>;
  _set?: InputMaybe<CatalogAvatarCountriesSetInput>;
  pk_columns: CatalogAvatarCountriesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCatalogAvatarCountriesManyArgs = {
  updates: Array<CatalogAvatarCountriesUpdates>;
};


/** mutation root */
export type MutationRootUpdateCatalogAvatarsArgs = {
  _inc?: InputMaybe<CatalogAvatarsIncInput>;
  _set?: InputMaybe<CatalogAvatarsSetInput>;
  where: CatalogAvatarsBoolExp;
};


/** mutation root */
export type MutationRootUpdateCatalogAvatarsByPkArgs = {
  _inc?: InputMaybe<CatalogAvatarsIncInput>;
  _set?: InputMaybe<CatalogAvatarsSetInput>;
  pk_columns: CatalogAvatarsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCatalogAvatarsManyArgs = {
  updates: Array<CatalogAvatarsUpdates>;
};


/** mutation root */
export type MutationRootUpdateCatalogBackgroundCountriesArgs = {
  _inc?: InputMaybe<CatalogBackgroundCountriesIncInput>;
  _set?: InputMaybe<CatalogBackgroundCountriesSetInput>;
  where: CatalogBackgroundCountriesBoolExp;
};


/** mutation root */
export type MutationRootUpdateCatalogBackgroundCountriesByPkArgs = {
  _inc?: InputMaybe<CatalogBackgroundCountriesIncInput>;
  _set?: InputMaybe<CatalogBackgroundCountriesSetInput>;
  pk_columns: CatalogBackgroundCountriesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCatalogBackgroundCountriesManyArgs = {
  updates: Array<CatalogBackgroundCountriesUpdates>;
};


/** mutation root */
export type MutationRootUpdateCatalogBackgroundsArgs = {
  _inc?: InputMaybe<CatalogBackgroundsIncInput>;
  _set?: InputMaybe<CatalogBackgroundsSetInput>;
  where: CatalogBackgroundsBoolExp;
};


/** mutation root */
export type MutationRootUpdateCatalogBackgroundsByPkArgs = {
  _inc?: InputMaybe<CatalogBackgroundsIncInput>;
  _set?: InputMaybe<CatalogBackgroundsSetInput>;
  pk_columns: CatalogBackgroundsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCatalogBackgroundsManyArgs = {
  updates: Array<CatalogBackgroundsUpdates>;
};


/** mutation root */
export type MutationRootUpdateCatalogCategoriesArgs = {
  _inc?: InputMaybe<CatalogCategoriesIncInput>;
  _set?: InputMaybe<CatalogCategoriesSetInput>;
  where: CatalogCategoriesBoolExp;
};


/** mutation root */
export type MutationRootUpdateCatalogCategoriesByPkArgs = {
  _inc?: InputMaybe<CatalogCategoriesIncInput>;
  _set?: InputMaybe<CatalogCategoriesSetInput>;
  pk_columns: CatalogCategoriesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCatalogCategoriesManyArgs = {
  updates: Array<CatalogCategoriesUpdates>;
};


/** mutation root */
export type MutationRootUpdateCatalogImagesArgs = {
  _inc?: InputMaybe<CatalogImagesIncInput>;
  _set?: InputMaybe<CatalogImagesSetInput>;
  where: CatalogImagesBoolExp;
};


/** mutation root */
export type MutationRootUpdateCatalogImagesByPkArgs = {
  _inc?: InputMaybe<CatalogImagesIncInput>;
  _set?: InputMaybe<CatalogImagesSetInput>;
  pk_columns: CatalogImagesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCatalogImagesManyArgs = {
  updates: Array<CatalogImagesUpdates>;
};


/** mutation root */
export type MutationRootUpdateCatalogPricesArgs = {
  _inc?: InputMaybe<CatalogPricesIncInput>;
  _set?: InputMaybe<CatalogPricesSetInput>;
  where: CatalogPricesBoolExp;
};


/** mutation root */
export type MutationRootUpdateCatalogPricesByPkArgs = {
  _inc?: InputMaybe<CatalogPricesIncInput>;
  _set?: InputMaybe<CatalogPricesSetInput>;
  pk_columns: CatalogPricesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCatalogPricesManyArgs = {
  updates: Array<CatalogPricesUpdates>;
};


/** mutation root */
export type MutationRootUpdateCatalogProductAttributesArgs = {
  _inc?: InputMaybe<CatalogProductAttributesIncInput>;
  _set?: InputMaybe<CatalogProductAttributesSetInput>;
  where: CatalogProductAttributesBoolExp;
};


/** mutation root */
export type MutationRootUpdateCatalogProductAttributesByPkArgs = {
  _inc?: InputMaybe<CatalogProductAttributesIncInput>;
  _set?: InputMaybe<CatalogProductAttributesSetInput>;
  pk_columns: CatalogProductAttributesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCatalogProductAttributesManyArgs = {
  updates: Array<CatalogProductAttributesUpdates>;
};


/** mutation root */
export type MutationRootUpdateCatalogProductsArgs = {
  _inc?: InputMaybe<CatalogProductsIncInput>;
  _set?: InputMaybe<CatalogProductsSetInput>;
  where: CatalogProductsBoolExp;
};


/** mutation root */
export type MutationRootUpdateCatalogProductsByPkArgs = {
  _inc?: InputMaybe<CatalogProductsIncInput>;
  _set?: InputMaybe<CatalogProductsSetInput>;
  pk_columns: CatalogProductsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCatalogProductsManyArgs = {
  updates: Array<CatalogProductsUpdates>;
};


/** mutation root */
export type MutationRootUpdateCatalogSizesArgs = {
  _inc?: InputMaybe<CatalogSizesIncInput>;
  _set?: InputMaybe<CatalogSizesSetInput>;
  where: CatalogSizesBoolExp;
};


/** mutation root */
export type MutationRootUpdateCatalogSizesByPkArgs = {
  _inc?: InputMaybe<CatalogSizesIncInput>;
  _set?: InputMaybe<CatalogSizesSetInput>;
  pk_columns: CatalogSizesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCatalogSizesManyArgs = {
  updates: Array<CatalogSizesUpdates>;
};


/** mutation root */
export type MutationRootUpdateCatalogSlugsArgs = {
  _inc?: InputMaybe<CatalogSlugsIncInput>;
  _set?: InputMaybe<CatalogSlugsSetInput>;
  where: CatalogSlugsBoolExp;
};


/** mutation root */
export type MutationRootUpdateCatalogSlugsByPkArgs = {
  _inc?: InputMaybe<CatalogSlugsIncInput>;
  _set?: InputMaybe<CatalogSlugsSetInput>;
  pk_columns: CatalogSlugsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCatalogSlugsManyArgs = {
  updates: Array<CatalogSlugsUpdates>;
};


/** mutation root */
export type MutationRootUpdateCatalogTestimonialsArgs = {
  _inc?: InputMaybe<CatalogTestimonialsIncInput>;
  _set?: InputMaybe<CatalogTestimonialsSetInput>;
  where: CatalogTestimonialsBoolExp;
};


/** mutation root */
export type MutationRootUpdateCatalogTestimonialsByPkArgs = {
  _inc?: InputMaybe<CatalogTestimonialsIncInput>;
  _set?: InputMaybe<CatalogTestimonialsSetInput>;
  pk_columns: CatalogTestimonialsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCatalogTestimonialsManyArgs = {
  updates: Array<CatalogTestimonialsUpdates>;
};


/** mutation root */
export type MutationRootUpdateCommonAddressesArgs = {
  _inc?: InputMaybe<CommonAddressesIncInput>;
  _set?: InputMaybe<CommonAddressesSetInput>;
  where: CommonAddressesBoolExp;
};


/** mutation root */
export type MutationRootUpdateCommonAddressesByPkArgs = {
  _inc?: InputMaybe<CommonAddressesIncInput>;
  _set?: InputMaybe<CommonAddressesSetInput>;
  pk_columns: CommonAddressesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCommonAddressesManyArgs = {
  updates: Array<CommonAddressesUpdates>;
};


/** mutation root */
export type MutationRootUpdateCommonCountriesArgs = {
  _inc?: InputMaybe<CommonCountriesIncInput>;
  _set?: InputMaybe<CommonCountriesSetInput>;
  where: CommonCountriesBoolExp;
};


/** mutation root */
export type MutationRootUpdateCommonCountriesByPkArgs = {
  _inc?: InputMaybe<CommonCountriesIncInput>;
  _set?: InputMaybe<CommonCountriesSetInput>;
  pk_columns: CommonCountriesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCommonCountriesManyArgs = {
  updates: Array<CommonCountriesUpdates>;
};


/** mutation root */
export type MutationRootUpdateCommonEmailArgs = {
  _inc?: InputMaybe<CommonEmailIncInput>;
  _set?: InputMaybe<CommonEmailSetInput>;
  where: CommonEmailBoolExp;
};


/** mutation root */
export type MutationRootUpdateCommonEmailByPkArgs = {
  _inc?: InputMaybe<CommonEmailIncInput>;
  _set?: InputMaybe<CommonEmailSetInput>;
  pk_columns: CommonEmailPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateCommonEmailManyArgs = {
  updates: Array<CommonEmailUpdates>;
};


/** mutation root */
export type MutationRootUpdateEnumsOrderStatusesArgs = {
  _set?: InputMaybe<EnumsOrderStatusesSetInput>;
  where: EnumsOrderStatusesBoolExp;
};


/** mutation root */
export type MutationRootUpdateEnumsOrderStatusesByPkArgs = {
  _set?: InputMaybe<EnumsOrderStatusesSetInput>;
  pk_columns: EnumsOrderStatusesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateEnumsOrderStatusesManyArgs = {
  updates: Array<EnumsOrderStatusesUpdates>;
};


/** mutation root */
export type MutationRootUpdateEnumsTaskStatusesArgs = {
  _set?: InputMaybe<EnumsTaskStatusesSetInput>;
  where: EnumsTaskStatusesBoolExp;
};


/** mutation root */
export type MutationRootUpdateEnumsTaskStatusesByPkArgs = {
  _set?: InputMaybe<EnumsTaskStatusesSetInput>;
  pk_columns: EnumsTaskStatusesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateEnumsTaskStatusesManyArgs = {
  updates: Array<EnumsTaskStatusesUpdates>;
};


/** mutation root */
export type MutationRootUpdateEnumsTaskTypesArgs = {
  _set?: InputMaybe<EnumsTaskTypesSetInput>;
  where: EnumsTaskTypesBoolExp;
};


/** mutation root */
export type MutationRootUpdateEnumsTaskTypesByPkArgs = {
  _set?: InputMaybe<EnumsTaskTypesSetInput>;
  pk_columns: EnumsTaskTypesPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateEnumsTaskTypesManyArgs = {
  updates: Array<EnumsTaskTypesUpdates>;
};


/** mutation root */
export type MutationRootUpdateLogsOrderLogsArgs = {
  _append?: InputMaybe<LogsOrderLogsAppendInput>;
  _delete_at_path?: InputMaybe<LogsOrderLogsDeleteAtPathInput>;
  _delete_elem?: InputMaybe<LogsOrderLogsDeleteElemInput>;
  _delete_key?: InputMaybe<LogsOrderLogsDeleteKeyInput>;
  _inc?: InputMaybe<LogsOrderLogsIncInput>;
  _prepend?: InputMaybe<LogsOrderLogsPrependInput>;
  _set?: InputMaybe<LogsOrderLogsSetInput>;
  where: LogsOrderLogsBoolExp;
};


/** mutation root */
export type MutationRootUpdateLogsOrderLogsByPkArgs = {
  _append?: InputMaybe<LogsOrderLogsAppendInput>;
  _delete_at_path?: InputMaybe<LogsOrderLogsDeleteAtPathInput>;
  _delete_elem?: InputMaybe<LogsOrderLogsDeleteElemInput>;
  _delete_key?: InputMaybe<LogsOrderLogsDeleteKeyInput>;
  _inc?: InputMaybe<LogsOrderLogsIncInput>;
  _prepend?: InputMaybe<LogsOrderLogsPrependInput>;
  _set?: InputMaybe<LogsOrderLogsSetInput>;
  pk_columns: LogsOrderLogsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateLogsOrderLogsManyArgs = {
  updates: Array<LogsOrderLogsUpdates>;
};


/** mutation root */
export type MutationRootUpdateSalesItemConfigurationsArgs = {
  _inc?: InputMaybe<SalesItemConfigurationsIncInput>;
  _set?: InputMaybe<SalesItemConfigurationsSetInput>;
  where: SalesItemConfigurationsBoolExp;
};


/** mutation root */
export type MutationRootUpdateSalesItemConfigurationsByPkArgs = {
  _inc?: InputMaybe<SalesItemConfigurationsIncInput>;
  _set?: InputMaybe<SalesItemConfigurationsSetInput>;
  pk_columns: SalesItemConfigurationsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateSalesItemConfigurationsManyArgs = {
  updates: Array<SalesItemConfigurationsUpdates>;
};


/** mutation root */
export type MutationRootUpdateSalesItemsArgs = {
  _inc?: InputMaybe<SalesItemsIncInput>;
  _set?: InputMaybe<SalesItemsSetInput>;
  where: SalesItemsBoolExp;
};


/** mutation root */
export type MutationRootUpdateSalesItemsByPkArgs = {
  _inc?: InputMaybe<SalesItemsIncInput>;
  _set?: InputMaybe<SalesItemsSetInput>;
  pk_columns: SalesItemsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateSalesItemsManyArgs = {
  updates: Array<SalesItemsUpdates>;
};


/** mutation root */
export type MutationRootUpdateSalesOrdersArgs = {
  _append?: InputMaybe<SalesOrdersAppendInput>;
  _delete_at_path?: InputMaybe<SalesOrdersDeleteAtPathInput>;
  _delete_elem?: InputMaybe<SalesOrdersDeleteElemInput>;
  _delete_key?: InputMaybe<SalesOrdersDeleteKeyInput>;
  _inc?: InputMaybe<SalesOrdersIncInput>;
  _prepend?: InputMaybe<SalesOrdersPrependInput>;
  _set?: InputMaybe<SalesOrdersSetInput>;
  where: SalesOrdersBoolExp;
};


/** mutation root */
export type MutationRootUpdateSalesOrdersByPkArgs = {
  _append?: InputMaybe<SalesOrdersAppendInput>;
  _delete_at_path?: InputMaybe<SalesOrdersDeleteAtPathInput>;
  _delete_elem?: InputMaybe<SalesOrdersDeleteElemInput>;
  _delete_key?: InputMaybe<SalesOrdersDeleteKeyInput>;
  _inc?: InputMaybe<SalesOrdersIncInput>;
  _prepend?: InputMaybe<SalesOrdersPrependInput>;
  _set?: InputMaybe<SalesOrdersSetInput>;
  pk_columns: SalesOrdersPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateSalesOrdersManyArgs = {
  updates: Array<SalesOrdersUpdates>;
};


/** mutation root */
export type MutationRootUpdateSalesTasksArgs = {
  _inc?: InputMaybe<SalesTasksIncInput>;
  _set?: InputMaybe<SalesTasksSetInput>;
  where: SalesTasksBoolExp;
};


/** mutation root */
export type MutationRootUpdateSalesTasksByPkArgs = {
  _inc?: InputMaybe<SalesTasksIncInput>;
  _set?: InputMaybe<SalesTasksSetInput>;
  pk_columns: SalesTasksPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateSalesTasksManyArgs = {
  updates: Array<SalesTasksUpdates>;
};


/** mutation root */
export type MutationRootUpdateSupportConversationThreadsArgs = {
  _inc?: InputMaybe<SupportConversationThreadsIncInput>;
  _set?: InputMaybe<SupportConversationThreadsSetInput>;
  where: SupportConversationThreadsBoolExp;
};


/** mutation root */
export type MutationRootUpdateSupportConversationThreadsByPkArgs = {
  _inc?: InputMaybe<SupportConversationThreadsIncInput>;
  _set?: InputMaybe<SupportConversationThreadsSetInput>;
  pk_columns: SupportConversationThreadsPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateSupportConversationThreadsManyArgs = {
  updates: Array<SupportConversationThreadsUpdates>;
};


/** mutation root */
export type MutationRootUpdateUsersCustomersArgs = {
  _inc?: InputMaybe<UsersCustomersIncInput>;
  _set?: InputMaybe<UsersCustomersSetInput>;
  where: UsersCustomersBoolExp;
};


/** mutation root */
export type MutationRootUpdateUsersCustomersByPkArgs = {
  _inc?: InputMaybe<UsersCustomersIncInput>;
  _set?: InputMaybe<UsersCustomersSetInput>;
  pk_columns: UsersCustomersPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateUsersCustomersManyArgs = {
  updates: Array<UsersCustomersUpdates>;
};


/** mutation root */
export type MutationRootUpdateUsersStaffArgs = {
  _inc?: InputMaybe<UsersStaffIncInput>;
  _set?: InputMaybe<UsersStaffSetInput>;
  where: UsersStaffBoolExp;
};


/** mutation root */
export type MutationRootUpdateUsersStaffByPkArgs = {
  _inc?: InputMaybe<UsersStaffIncInput>;
  _set?: InputMaybe<UsersStaffSetInput>;
  pk_columns: UsersStaffPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateUsersStaffManyArgs = {
  updates: Array<UsersStaffUpdates>;
};


/** mutation root */
export type MutationRootUpdateUsersUsersArgs = {
  _set?: InputMaybe<UsersUsersSetInput>;
  where: UsersUsersBoolExp;
};


/** mutation root */
export type MutationRootUpdateUsersUsersByPkArgs = {
  _set?: InputMaybe<UsersUsersSetInput>;
  pk_columns: UsersUsersPkColumnsInput;
};


/** mutation root */
export type MutationRootUpdateUsersUsersManyArgs = {
  updates: Array<UsersUsersUpdates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type NumericComparisonExp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type QueryRoot = {
  __typename?: 'query_root';
  /** fetch data from the table: "catalog.attributes" */
  catalog_attributes: Array<CatalogAttributes>;
  /** fetch aggregated fields from the table: "catalog.attributes" */
  catalog_attributes_aggregate: CatalogAttributesAggregate;
  /** fetch data from the table: "catalog.attributes" using primary key columns */
  catalog_attributes_by_pk?: Maybe<CatalogAttributes>;
  /** fetch data from the table: "catalog.avatar_countries" */
  catalog_avatar_countries: Array<CatalogAvatarCountries>;
  /** fetch aggregated fields from the table: "catalog.avatar_countries" */
  catalog_avatar_countries_aggregate: CatalogAvatarCountriesAggregate;
  /** fetch data from the table: "catalog.avatar_countries" using primary key columns */
  catalog_avatar_countries_by_pk?: Maybe<CatalogAvatarCountries>;
  /** fetch data from the table: "catalog.avatars" */
  catalog_avatars: Array<CatalogAvatars>;
  /** fetch aggregated fields from the table: "catalog.avatars" */
  catalog_avatars_aggregate: CatalogAvatarsAggregate;
  /** fetch data from the table: "catalog.avatars" using primary key columns */
  catalog_avatars_by_pk?: Maybe<CatalogAvatars>;
  /** fetch data from the table: "catalog.background_countries" */
  catalog_background_countries: Array<CatalogBackgroundCountries>;
  /** fetch aggregated fields from the table: "catalog.background_countries" */
  catalog_background_countries_aggregate: CatalogBackgroundCountriesAggregate;
  /** fetch data from the table: "catalog.background_countries" using primary key columns */
  catalog_background_countries_by_pk?: Maybe<CatalogBackgroundCountries>;
  /** fetch data from the table: "catalog.backgrounds" */
  catalog_backgrounds: Array<CatalogBackgrounds>;
  /** fetch aggregated fields from the table: "catalog.backgrounds" */
  catalog_backgrounds_aggregate: CatalogBackgroundsAggregate;
  /** fetch data from the table: "catalog.backgrounds" using primary key columns */
  catalog_backgrounds_by_pk?: Maybe<CatalogBackgrounds>;
  /** fetch data from the table: "catalog.categories" */
  catalog_categories: Array<CatalogCategories>;
  /** fetch aggregated fields from the table: "catalog.categories" */
  catalog_categories_aggregate: CatalogCategoriesAggregate;
  /** fetch data from the table: "catalog.categories" using primary key columns */
  catalog_categories_by_pk?: Maybe<CatalogCategories>;
  /** fetch data from the table: "catalog.images" */
  catalog_images: Array<CatalogImages>;
  /** fetch aggregated fields from the table: "catalog.images" */
  catalog_images_aggregate: CatalogImagesAggregate;
  /** fetch data from the table: "catalog.images" using primary key columns */
  catalog_images_by_pk?: Maybe<CatalogImages>;
  /** fetch data from the table: "catalog.prices" */
  catalog_prices: Array<CatalogPrices>;
  /** fetch aggregated fields from the table: "catalog.prices" */
  catalog_prices_aggregate: CatalogPricesAggregate;
  /** fetch data from the table: "catalog.prices" using primary key columns */
  catalog_prices_by_pk?: Maybe<CatalogPrices>;
  /** fetch data from the table: "catalog.product_attributes" */
  catalog_product_attributes: Array<CatalogProductAttributes>;
  /** fetch aggregated fields from the table: "catalog.product_attributes" */
  catalog_product_attributes_aggregate: CatalogProductAttributesAggregate;
  /** fetch data from the table: "catalog.product_attributes" using primary key columns */
  catalog_product_attributes_by_pk?: Maybe<CatalogProductAttributes>;
  /** fetch data from the table: "catalog.products" */
  catalog_products: Array<CatalogProducts>;
  /** fetch aggregated fields from the table: "catalog.products" */
  catalog_products_aggregate: CatalogProductsAggregate;
  /** fetch data from the table: "catalog.products" using primary key columns */
  catalog_products_by_pk?: Maybe<CatalogProducts>;
  /** fetch data from the table: "catalog.sizes" */
  catalog_sizes: Array<CatalogSizes>;
  /** fetch aggregated fields from the table: "catalog.sizes" */
  catalog_sizes_aggregate: CatalogSizesAggregate;
  /** fetch data from the table: "catalog.sizes" using primary key columns */
  catalog_sizes_by_pk?: Maybe<CatalogSizes>;
  /** fetch data from the table: "catalog.slugs" */
  catalog_slugs: Array<CatalogSlugs>;
  /** fetch aggregated fields from the table: "catalog.slugs" */
  catalog_slugs_aggregate: CatalogSlugsAggregate;
  /** fetch data from the table: "catalog.slugs" using primary key columns */
  catalog_slugs_by_pk?: Maybe<CatalogSlugs>;
  /** fetch data from the table: "catalog.testimonials" */
  catalog_testimonials: Array<CatalogTestimonials>;
  /** fetch aggregated fields from the table: "catalog.testimonials" */
  catalog_testimonials_aggregate: CatalogTestimonialsAggregate;
  /** fetch data from the table: "catalog.testimonials" using primary key columns */
  catalog_testimonials_by_pk?: Maybe<CatalogTestimonials>;
  /** fetch data from the table: "common.addresses" */
  common_addresses: Array<CommonAddresses>;
  /** fetch aggregated fields from the table: "common.addresses" */
  common_addresses_aggregate: CommonAddressesAggregate;
  /** fetch data from the table: "common.addresses" using primary key columns */
  common_addresses_by_pk?: Maybe<CommonAddresses>;
  /** fetch data from the table: "common.countries" */
  common_countries: Array<CommonCountries>;
  /** fetch aggregated fields from the table: "common.countries" */
  common_countries_aggregate: CommonCountriesAggregate;
  /** fetch data from the table: "common.countries" using primary key columns */
  common_countries_by_pk?: Maybe<CommonCountries>;
  /** fetch data from the table: "common.email" */
  common_email: Array<CommonEmail>;
  /** fetch aggregated fields from the table: "common.email" */
  common_email_aggregate: CommonEmailAggregate;
  /** fetch data from the table: "common.email" using primary key columns */
  common_email_by_pk?: Maybe<CommonEmail>;
  /** fetch data from the table: "enums.order_statuses" */
  enums_order_statuses: Array<EnumsOrderStatuses>;
  /** fetch aggregated fields from the table: "enums.order_statuses" */
  enums_order_statuses_aggregate: EnumsOrderStatusesAggregate;
  /** fetch data from the table: "enums.order_statuses" using primary key columns */
  enums_order_statuses_by_pk?: Maybe<EnumsOrderStatuses>;
  /** fetch data from the table: "enums.task_statuses" */
  enums_task_statuses: Array<EnumsTaskStatuses>;
  /** fetch aggregated fields from the table: "enums.task_statuses" */
  enums_task_statuses_aggregate: EnumsTaskStatusesAggregate;
  /** fetch data from the table: "enums.task_statuses" using primary key columns */
  enums_task_statuses_by_pk?: Maybe<EnumsTaskStatuses>;
  /** fetch data from the table: "enums.task_types" */
  enums_task_types: Array<EnumsTaskTypes>;
  /** fetch aggregated fields from the table: "enums.task_types" */
  enums_task_types_aggregate: EnumsTaskTypesAggregate;
  /** fetch data from the table: "enums.task_types" using primary key columns */
  enums_task_types_by_pk?: Maybe<EnumsTaskTypes>;
  /** fetch data from the table: "logs.order_logs" */
  logs_order_logs: Array<LogsOrderLogs>;
  /** fetch aggregated fields from the table: "logs.order_logs" */
  logs_order_logs_aggregate: LogsOrderLogsAggregate;
  /** fetch data from the table: "logs.order_logs" using primary key columns */
  logs_order_logs_by_pk?: Maybe<LogsOrderLogs>;
  /** fetch data from the table: "sales.item_configurations" */
  sales_item_configurations: Array<SalesItemConfigurations>;
  /** fetch aggregated fields from the table: "sales.item_configurations" */
  sales_item_configurations_aggregate: SalesItemConfigurationsAggregate;
  /** fetch data from the table: "sales.item_configurations" using primary key columns */
  sales_item_configurations_by_pk?: Maybe<SalesItemConfigurations>;
  /** fetch data from the table: "sales.items" */
  sales_items: Array<SalesItems>;
  /** fetch aggregated fields from the table: "sales.items" */
  sales_items_aggregate: SalesItemsAggregate;
  /** fetch data from the table: "sales.items" using primary key columns */
  sales_items_by_pk?: Maybe<SalesItems>;
  /** fetch data from the table: "sales.orders" */
  sales_orders: Array<SalesOrders>;
  /** fetch aggregated fields from the table: "sales.orders" */
  sales_orders_aggregate: SalesOrdersAggregate;
  /** fetch data from the table: "sales.orders" using primary key columns */
  sales_orders_by_pk?: Maybe<SalesOrders>;
  /** fetch data from the table: "sales.tasks" */
  sales_tasks: Array<SalesTasks>;
  /** fetch aggregated fields from the table: "sales.tasks" */
  sales_tasks_aggregate: SalesTasksAggregate;
  /** fetch data from the table: "sales.tasks" using primary key columns */
  sales_tasks_by_pk?: Maybe<SalesTasks>;
  /** fetch data from the table: "support.conversation_threads" */
  support_conversation_threads: Array<SupportConversationThreads>;
  /** fetch aggregated fields from the table: "support.conversation_threads" */
  support_conversation_threads_aggregate: SupportConversationThreadsAggregate;
  /** fetch data from the table: "support.conversation_threads" using primary key columns */
  support_conversation_threads_by_pk?: Maybe<SupportConversationThreads>;
  /** fetch data from the table: "users.customers" */
  users_customers: Array<UsersCustomers>;
  /** fetch aggregated fields from the table: "users.customers" */
  users_customers_aggregate: UsersCustomersAggregate;
  /** fetch data from the table: "users.customers" using primary key columns */
  users_customers_by_pk?: Maybe<UsersCustomers>;
  /** fetch data from the table: "users.staff" */
  users_staff: Array<UsersStaff>;
  /** fetch aggregated fields from the table: "users.staff" */
  users_staff_aggregate: UsersStaffAggregate;
  /** fetch data from the table: "users.staff" using primary key columns */
  users_staff_by_pk?: Maybe<UsersStaff>;
  /** fetch data from the table: "users.users" */
  users_users: Array<UsersUsers>;
  /** fetch aggregated fields from the table: "users.users" */
  users_users_aggregate: UsersUsersAggregate;
  /** fetch data from the table: "users.users" using primary key columns */
  users_users_by_pk?: Maybe<UsersUsers>;
};


export type QueryRootCatalogAttributesArgs = {
  distinct_on?: InputMaybe<Array<CatalogAttributesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAttributesOrderBy>>;
  where?: InputMaybe<CatalogAttributesBoolExp>;
};


export type QueryRootCatalogAttributesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogAttributesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAttributesOrderBy>>;
  where?: InputMaybe<CatalogAttributesBoolExp>;
};


export type QueryRootCatalogAttributesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootCatalogAvatarCountriesArgs = {
  distinct_on?: InputMaybe<Array<CatalogAvatarCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAvatarCountriesOrderBy>>;
  where?: InputMaybe<CatalogAvatarCountriesBoolExp>;
};


export type QueryRootCatalogAvatarCountriesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogAvatarCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAvatarCountriesOrderBy>>;
  where?: InputMaybe<CatalogAvatarCountriesBoolExp>;
};


export type QueryRootCatalogAvatarCountriesByPkArgs = {
  country_id: Scalars['Int']['input'];
  product_avatar_id: Scalars['Int']['input'];
};


export type QueryRootCatalogAvatarsArgs = {
  distinct_on?: InputMaybe<Array<CatalogAvatarsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAvatarsOrderBy>>;
  where?: InputMaybe<CatalogAvatarsBoolExp>;
};


export type QueryRootCatalogAvatarsAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogAvatarsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAvatarsOrderBy>>;
  where?: InputMaybe<CatalogAvatarsBoolExp>;
};


export type QueryRootCatalogAvatarsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootCatalogBackgroundCountriesArgs = {
  distinct_on?: InputMaybe<Array<CatalogBackgroundCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogBackgroundCountriesOrderBy>>;
  where?: InputMaybe<CatalogBackgroundCountriesBoolExp>;
};


export type QueryRootCatalogBackgroundCountriesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogBackgroundCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogBackgroundCountriesOrderBy>>;
  where?: InputMaybe<CatalogBackgroundCountriesBoolExp>;
};


export type QueryRootCatalogBackgroundCountriesByPkArgs = {
  background_id: Scalars['Int']['input'];
  country_id: Scalars['Int']['input'];
};


export type QueryRootCatalogBackgroundsArgs = {
  distinct_on?: InputMaybe<Array<CatalogBackgroundsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogBackgroundsOrderBy>>;
  where?: InputMaybe<CatalogBackgroundsBoolExp>;
};


export type QueryRootCatalogBackgroundsAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogBackgroundsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogBackgroundsOrderBy>>;
  where?: InputMaybe<CatalogBackgroundsBoolExp>;
};


export type QueryRootCatalogBackgroundsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootCatalogCategoriesArgs = {
  distinct_on?: InputMaybe<Array<CatalogCategoriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogCategoriesOrderBy>>;
  where?: InputMaybe<CatalogCategoriesBoolExp>;
};


export type QueryRootCatalogCategoriesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogCategoriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogCategoriesOrderBy>>;
  where?: InputMaybe<CatalogCategoriesBoolExp>;
};


export type QueryRootCatalogCategoriesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootCatalogImagesArgs = {
  distinct_on?: InputMaybe<Array<CatalogImagesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogImagesOrderBy>>;
  where?: InputMaybe<CatalogImagesBoolExp>;
};


export type QueryRootCatalogImagesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogImagesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogImagesOrderBy>>;
  where?: InputMaybe<CatalogImagesBoolExp>;
};


export type QueryRootCatalogImagesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootCatalogPricesArgs = {
  distinct_on?: InputMaybe<Array<CatalogPricesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogPricesOrderBy>>;
  where?: InputMaybe<CatalogPricesBoolExp>;
};


export type QueryRootCatalogPricesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogPricesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogPricesOrderBy>>;
  where?: InputMaybe<CatalogPricesBoolExp>;
};


export type QueryRootCatalogPricesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootCatalogProductAttributesArgs = {
  distinct_on?: InputMaybe<Array<CatalogProductAttributesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogProductAttributesOrderBy>>;
  where?: InputMaybe<CatalogProductAttributesBoolExp>;
};


export type QueryRootCatalogProductAttributesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogProductAttributesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogProductAttributesOrderBy>>;
  where?: InputMaybe<CatalogProductAttributesBoolExp>;
};


export type QueryRootCatalogProductAttributesByPkArgs = {
  attribute_id: Scalars['Int']['input'];
  product_id: Scalars['Int']['input'];
};


export type QueryRootCatalogProductsArgs = {
  distinct_on?: InputMaybe<Array<CatalogProductsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogProductsOrderBy>>;
  where?: InputMaybe<CatalogProductsBoolExp>;
};


export type QueryRootCatalogProductsAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogProductsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogProductsOrderBy>>;
  where?: InputMaybe<CatalogProductsBoolExp>;
};


export type QueryRootCatalogProductsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootCatalogSizesArgs = {
  distinct_on?: InputMaybe<Array<CatalogSizesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogSizesOrderBy>>;
  where?: InputMaybe<CatalogSizesBoolExp>;
};


export type QueryRootCatalogSizesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogSizesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogSizesOrderBy>>;
  where?: InputMaybe<CatalogSizesBoolExp>;
};


export type QueryRootCatalogSizesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootCatalogSlugsArgs = {
  distinct_on?: InputMaybe<Array<CatalogSlugsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogSlugsOrderBy>>;
  where?: InputMaybe<CatalogSlugsBoolExp>;
};


export type QueryRootCatalogSlugsAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogSlugsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogSlugsOrderBy>>;
  where?: InputMaybe<CatalogSlugsBoolExp>;
};


export type QueryRootCatalogSlugsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootCatalogTestimonialsArgs = {
  distinct_on?: InputMaybe<Array<CatalogTestimonialsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogTestimonialsOrderBy>>;
  where?: InputMaybe<CatalogTestimonialsBoolExp>;
};


export type QueryRootCatalogTestimonialsAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogTestimonialsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogTestimonialsOrderBy>>;
  where?: InputMaybe<CatalogTestimonialsBoolExp>;
};


export type QueryRootCatalogTestimonialsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootCommonAddressesArgs = {
  distinct_on?: InputMaybe<Array<CommonAddressesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CommonAddressesOrderBy>>;
  where?: InputMaybe<CommonAddressesBoolExp>;
};


export type QueryRootCommonAddressesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CommonAddressesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CommonAddressesOrderBy>>;
  where?: InputMaybe<CommonAddressesBoolExp>;
};


export type QueryRootCommonAddressesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootCommonCountriesArgs = {
  distinct_on?: InputMaybe<Array<CommonCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CommonCountriesOrderBy>>;
  where?: InputMaybe<CommonCountriesBoolExp>;
};


export type QueryRootCommonCountriesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CommonCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CommonCountriesOrderBy>>;
  where?: InputMaybe<CommonCountriesBoolExp>;
};


export type QueryRootCommonCountriesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootCommonEmailArgs = {
  distinct_on?: InputMaybe<Array<CommonEmailSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CommonEmailOrderBy>>;
  where?: InputMaybe<CommonEmailBoolExp>;
};


export type QueryRootCommonEmailAggregateArgs = {
  distinct_on?: InputMaybe<Array<CommonEmailSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CommonEmailOrderBy>>;
  where?: InputMaybe<CommonEmailBoolExp>;
};


export type QueryRootCommonEmailByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootEnumsOrderStatusesArgs = {
  distinct_on?: InputMaybe<Array<EnumsOrderStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EnumsOrderStatusesOrderBy>>;
  where?: InputMaybe<EnumsOrderStatusesBoolExp>;
};


export type QueryRootEnumsOrderStatusesAggregateArgs = {
  distinct_on?: InputMaybe<Array<EnumsOrderStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EnumsOrderStatusesOrderBy>>;
  where?: InputMaybe<EnumsOrderStatusesBoolExp>;
};


export type QueryRootEnumsOrderStatusesByPkArgs = {
  status: Scalars['String']['input'];
};


export type QueryRootEnumsTaskStatusesArgs = {
  distinct_on?: InputMaybe<Array<EnumsTaskStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EnumsTaskStatusesOrderBy>>;
  where?: InputMaybe<EnumsTaskStatusesBoolExp>;
};


export type QueryRootEnumsTaskStatusesAggregateArgs = {
  distinct_on?: InputMaybe<Array<EnumsTaskStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EnumsTaskStatusesOrderBy>>;
  where?: InputMaybe<EnumsTaskStatusesBoolExp>;
};


export type QueryRootEnumsTaskStatusesByPkArgs = {
  status: Scalars['String']['input'];
};


export type QueryRootEnumsTaskTypesArgs = {
  distinct_on?: InputMaybe<Array<EnumsTaskTypesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EnumsTaskTypesOrderBy>>;
  where?: InputMaybe<EnumsTaskTypesBoolExp>;
};


export type QueryRootEnumsTaskTypesAggregateArgs = {
  distinct_on?: InputMaybe<Array<EnumsTaskTypesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EnumsTaskTypesOrderBy>>;
  where?: InputMaybe<EnumsTaskTypesBoolExp>;
};


export type QueryRootEnumsTaskTypesByPkArgs = {
  type: Scalars['String']['input'];
};


export type QueryRootLogsOrderLogsArgs = {
  distinct_on?: InputMaybe<Array<LogsOrderLogsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<LogsOrderLogsOrderBy>>;
  where?: InputMaybe<LogsOrderLogsBoolExp>;
};


export type QueryRootLogsOrderLogsAggregateArgs = {
  distinct_on?: InputMaybe<Array<LogsOrderLogsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<LogsOrderLogsOrderBy>>;
  where?: InputMaybe<LogsOrderLogsBoolExp>;
};


export type QueryRootLogsOrderLogsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootSalesItemConfigurationsArgs = {
  distinct_on?: InputMaybe<Array<SalesItemConfigurationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesItemConfigurationsOrderBy>>;
  where?: InputMaybe<SalesItemConfigurationsBoolExp>;
};


export type QueryRootSalesItemConfigurationsAggregateArgs = {
  distinct_on?: InputMaybe<Array<SalesItemConfigurationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesItemConfigurationsOrderBy>>;
  where?: InputMaybe<SalesItemConfigurationsBoolExp>;
};


export type QueryRootSalesItemConfigurationsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootSalesItemsArgs = {
  distinct_on?: InputMaybe<Array<SalesItemsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesItemsOrderBy>>;
  where?: InputMaybe<SalesItemsBoolExp>;
};


export type QueryRootSalesItemsAggregateArgs = {
  distinct_on?: InputMaybe<Array<SalesItemsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesItemsOrderBy>>;
  where?: InputMaybe<SalesItemsBoolExp>;
};


export type QueryRootSalesItemsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootSalesOrdersArgs = {
  distinct_on?: InputMaybe<Array<SalesOrdersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesOrdersOrderBy>>;
  where?: InputMaybe<SalesOrdersBoolExp>;
};


export type QueryRootSalesOrdersAggregateArgs = {
  distinct_on?: InputMaybe<Array<SalesOrdersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesOrdersOrderBy>>;
  where?: InputMaybe<SalesOrdersBoolExp>;
};


export type QueryRootSalesOrdersByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootSalesTasksArgs = {
  distinct_on?: InputMaybe<Array<SalesTasksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesTasksOrderBy>>;
  where?: InputMaybe<SalesTasksBoolExp>;
};


export type QueryRootSalesTasksAggregateArgs = {
  distinct_on?: InputMaybe<Array<SalesTasksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesTasksOrderBy>>;
  where?: InputMaybe<SalesTasksBoolExp>;
};


export type QueryRootSalesTasksByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootSupportConversationThreadsArgs = {
  distinct_on?: InputMaybe<Array<SupportConversationThreadsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SupportConversationThreadsOrderBy>>;
  where?: InputMaybe<SupportConversationThreadsBoolExp>;
};


export type QueryRootSupportConversationThreadsAggregateArgs = {
  distinct_on?: InputMaybe<Array<SupportConversationThreadsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SupportConversationThreadsOrderBy>>;
  where?: InputMaybe<SupportConversationThreadsBoolExp>;
};


export type QueryRootSupportConversationThreadsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootUsersCustomersArgs = {
  distinct_on?: InputMaybe<Array<UsersCustomersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersCustomersOrderBy>>;
  where?: InputMaybe<UsersCustomersBoolExp>;
};


export type QueryRootUsersCustomersAggregateArgs = {
  distinct_on?: InputMaybe<Array<UsersCustomersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersCustomersOrderBy>>;
  where?: InputMaybe<UsersCustomersBoolExp>;
};


export type QueryRootUsersCustomersByPkArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRootUsersStaffArgs = {
  distinct_on?: InputMaybe<Array<UsersStaffSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersStaffOrderBy>>;
  where?: InputMaybe<UsersStaffBoolExp>;
};


export type QueryRootUsersStaffAggregateArgs = {
  distinct_on?: InputMaybe<Array<UsersStaffSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersStaffOrderBy>>;
  where?: InputMaybe<UsersStaffBoolExp>;
};


export type QueryRootUsersStaffByPkArgs = {
  staff_detail_id: Scalars['Int']['input'];
};


export type QueryRootUsersUsersArgs = {
  distinct_on?: InputMaybe<Array<UsersUsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersUsersOrderBy>>;
  where?: InputMaybe<UsersUsersBoolExp>;
};


export type QueryRootUsersUsersAggregateArgs = {
  distinct_on?: InputMaybe<Array<UsersUsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersUsersOrderBy>>;
  where?: InputMaybe<UsersUsersBoolExp>;
};


export type QueryRootUsersUsersByPkArgs = {
  id: Scalars['String']['input'];
};

/** columns and relationships of "sales.item_configurations" */
export type SalesItemConfigurations = {
  __typename?: 'sales_item_configurations';
  background_styles_filter?: Maybe<Scalars['String']['output']>;
  background_styles_transform?: Maybe<Scalars['String']['output']>;
  background_url?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Scalars['Int']['output'];
  main_styles_filter?: Maybe<Scalars['String']['output']>;
  main_styles_transform?: Maybe<Scalars['String']['output']>;
  main_url?: Maybe<Scalars['String']['output']>;
  orientation?: Maybe<Scalars['String']['output']>;
  preview?: Maybe<Scalars['String']['output']>;
  remove_background?: Maybe<Scalars['String']['output']>;
  restore?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "sales.item_configurations" */
export type SalesItemConfigurationsAggregate = {
  __typename?: 'sales_item_configurations_aggregate';
  aggregate?: Maybe<SalesItemConfigurationsAggregateFields>;
  nodes: Array<SalesItemConfigurations>;
};

/** aggregate fields of "sales.item_configurations" */
export type SalesItemConfigurationsAggregateFields = {
  __typename?: 'sales_item_configurations_aggregate_fields';
  avg?: Maybe<SalesItemConfigurationsAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<SalesItemConfigurationsMaxFields>;
  min?: Maybe<SalesItemConfigurationsMinFields>;
  stddev?: Maybe<SalesItemConfigurationsStddevFields>;
  stddev_pop?: Maybe<SalesItemConfigurationsStddevPopFields>;
  stddev_samp?: Maybe<SalesItemConfigurationsStddevSampFields>;
  sum?: Maybe<SalesItemConfigurationsSumFields>;
  var_pop?: Maybe<SalesItemConfigurationsVarPopFields>;
  var_samp?: Maybe<SalesItemConfigurationsVarSampFields>;
  variance?: Maybe<SalesItemConfigurationsVarianceFields>;
};


/** aggregate fields of "sales.item_configurations" */
export type SalesItemConfigurationsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<SalesItemConfigurationsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type SalesItemConfigurationsAvgFields = {
  __typename?: 'sales_item_configurations_avg_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "sales.item_configurations". All fields are combined with a logical 'AND'. */
export type SalesItemConfigurationsBoolExp = {
  _and?: InputMaybe<Array<SalesItemConfigurationsBoolExp>>;
  _not?: InputMaybe<SalesItemConfigurationsBoolExp>;
  _or?: InputMaybe<Array<SalesItemConfigurationsBoolExp>>;
  background_styles_filter?: InputMaybe<StringComparisonExp>;
  background_styles_transform?: InputMaybe<StringComparisonExp>;
  background_url?: InputMaybe<StringComparisonExp>;
  details?: InputMaybe<StringComparisonExp>;
  height?: InputMaybe<IntComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  main_styles_filter?: InputMaybe<StringComparisonExp>;
  main_styles_transform?: InputMaybe<StringComparisonExp>;
  main_url?: InputMaybe<StringComparisonExp>;
  orientation?: InputMaybe<StringComparisonExp>;
  preview?: InputMaybe<StringComparisonExp>;
  remove_background?: InputMaybe<StringComparisonExp>;
  restore?: InputMaybe<StringComparisonExp>;
  unit?: InputMaybe<StringComparisonExp>;
  width?: InputMaybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "sales.item_configurations" */
export enum SalesItemConfigurationsConstraint {
  /** unique or primary key constraint on columns "id" */
  ItemConfigurationsPkey = 'item_configurations_pkey'
}

/** input type for incrementing numeric columns in table "sales.item_configurations" */
export type SalesItemConfigurationsIncInput = {
  height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "sales.item_configurations" */
export type SalesItemConfigurationsInsertInput = {
  background_styles_filter?: InputMaybe<Scalars['String']['input']>;
  background_styles_transform?: InputMaybe<Scalars['String']['input']>;
  background_url?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  main_styles_filter?: InputMaybe<Scalars['String']['input']>;
  main_styles_transform?: InputMaybe<Scalars['String']['input']>;
  main_url?: InputMaybe<Scalars['String']['input']>;
  orientation?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['String']['input']>;
  remove_background?: InputMaybe<Scalars['String']['input']>;
  restore?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type SalesItemConfigurationsMaxFields = {
  __typename?: 'sales_item_configurations_max_fields';
  background_styles_filter?: Maybe<Scalars['String']['output']>;
  background_styles_transform?: Maybe<Scalars['String']['output']>;
  background_url?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  main_styles_filter?: Maybe<Scalars['String']['output']>;
  main_styles_transform?: Maybe<Scalars['String']['output']>;
  main_url?: Maybe<Scalars['String']['output']>;
  orientation?: Maybe<Scalars['String']['output']>;
  preview?: Maybe<Scalars['String']['output']>;
  remove_background?: Maybe<Scalars['String']['output']>;
  restore?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type SalesItemConfigurationsMinFields = {
  __typename?: 'sales_item_configurations_min_fields';
  background_styles_filter?: Maybe<Scalars['String']['output']>;
  background_styles_transform?: Maybe<Scalars['String']['output']>;
  background_url?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  main_styles_filter?: Maybe<Scalars['String']['output']>;
  main_styles_transform?: Maybe<Scalars['String']['output']>;
  main_url?: Maybe<Scalars['String']['output']>;
  orientation?: Maybe<Scalars['String']['output']>;
  preview?: Maybe<Scalars['String']['output']>;
  remove_background?: Maybe<Scalars['String']['output']>;
  restore?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

/** response of any mutation on the table "sales.item_configurations" */
export type SalesItemConfigurationsMutationResponse = {
  __typename?: 'sales_item_configurations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<SalesItemConfigurations>;
};

/** input type for inserting object relation for remote table "sales.item_configurations" */
export type SalesItemConfigurationsObjRelInsertInput = {
  data: SalesItemConfigurationsInsertInput;
  /** upsert condition */
  on_conflict?: InputMaybe<SalesItemConfigurationsOnConflict>;
};

/** on_conflict condition type for table "sales.item_configurations" */
export type SalesItemConfigurationsOnConflict = {
  constraint: SalesItemConfigurationsConstraint;
  update_columns?: Array<SalesItemConfigurationsUpdateColumn>;
  where?: InputMaybe<SalesItemConfigurationsBoolExp>;
};

/** Ordering options when selecting data from "sales.item_configurations". */
export type SalesItemConfigurationsOrderBy = {
  background_styles_filter?: InputMaybe<OrderBy>;
  background_styles_transform?: InputMaybe<OrderBy>;
  background_url?: InputMaybe<OrderBy>;
  details?: InputMaybe<OrderBy>;
  height?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  main_styles_filter?: InputMaybe<OrderBy>;
  main_styles_transform?: InputMaybe<OrderBy>;
  main_url?: InputMaybe<OrderBy>;
  orientation?: InputMaybe<OrderBy>;
  preview?: InputMaybe<OrderBy>;
  remove_background?: InputMaybe<OrderBy>;
  restore?: InputMaybe<OrderBy>;
  unit?: InputMaybe<OrderBy>;
  width?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: sales.item_configurations */
export type SalesItemConfigurationsPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "sales.item_configurations" */
export enum SalesItemConfigurationsSelectColumn {
  /** column name */
  BackgroundStylesFilter = 'background_styles_filter',
  /** column name */
  BackgroundStylesTransform = 'background_styles_transform',
  /** column name */
  BackgroundUrl = 'background_url',
  /** column name */
  Details = 'details',
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  MainStylesFilter = 'main_styles_filter',
  /** column name */
  MainStylesTransform = 'main_styles_transform',
  /** column name */
  MainUrl = 'main_url',
  /** column name */
  Orientation = 'orientation',
  /** column name */
  Preview = 'preview',
  /** column name */
  RemoveBackground = 'remove_background',
  /** column name */
  Restore = 'restore',
  /** column name */
  Unit = 'unit',
  /** column name */
  Width = 'width'
}

/** input type for updating data in table "sales.item_configurations" */
export type SalesItemConfigurationsSetInput = {
  background_styles_filter?: InputMaybe<Scalars['String']['input']>;
  background_styles_transform?: InputMaybe<Scalars['String']['input']>;
  background_url?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  main_styles_filter?: InputMaybe<Scalars['String']['input']>;
  main_styles_transform?: InputMaybe<Scalars['String']['input']>;
  main_url?: InputMaybe<Scalars['String']['input']>;
  orientation?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['String']['input']>;
  remove_background?: InputMaybe<Scalars['String']['input']>;
  restore?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type SalesItemConfigurationsStddevFields = {
  __typename?: 'sales_item_configurations_stddev_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type SalesItemConfigurationsStddevPopFields = {
  __typename?: 'sales_item_configurations_stddev_pop_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type SalesItemConfigurationsStddevSampFields = {
  __typename?: 'sales_item_configurations_stddev_samp_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "sales_item_configurations" */
export type SalesItemConfigurationsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SalesItemConfigurationsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SalesItemConfigurationsStreamCursorValueInput = {
  background_styles_filter?: InputMaybe<Scalars['String']['input']>;
  background_styles_transform?: InputMaybe<Scalars['String']['input']>;
  background_url?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  main_styles_filter?: InputMaybe<Scalars['String']['input']>;
  main_styles_transform?: InputMaybe<Scalars['String']['input']>;
  main_url?: InputMaybe<Scalars['String']['input']>;
  orientation?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['String']['input']>;
  remove_background?: InputMaybe<Scalars['String']['input']>;
  restore?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type SalesItemConfigurationsSumFields = {
  __typename?: 'sales_item_configurations_sum_fields';
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "sales.item_configurations" */
export enum SalesItemConfigurationsUpdateColumn {
  /** column name */
  BackgroundStylesFilter = 'background_styles_filter',
  /** column name */
  BackgroundStylesTransform = 'background_styles_transform',
  /** column name */
  BackgroundUrl = 'background_url',
  /** column name */
  Details = 'details',
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  MainStylesFilter = 'main_styles_filter',
  /** column name */
  MainStylesTransform = 'main_styles_transform',
  /** column name */
  MainUrl = 'main_url',
  /** column name */
  Orientation = 'orientation',
  /** column name */
  Preview = 'preview',
  /** column name */
  RemoveBackground = 'remove_background',
  /** column name */
  Restore = 'restore',
  /** column name */
  Unit = 'unit',
  /** column name */
  Width = 'width'
}

export type SalesItemConfigurationsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<SalesItemConfigurationsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SalesItemConfigurationsSetInput>;
  /** filter the rows which have to be updated */
  where: SalesItemConfigurationsBoolExp;
};

/** aggregate var_pop on columns */
export type SalesItemConfigurationsVarPopFields = {
  __typename?: 'sales_item_configurations_var_pop_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type SalesItemConfigurationsVarSampFields = {
  __typename?: 'sales_item_configurations_var_samp_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type SalesItemConfigurationsVarianceFields = {
  __typename?: 'sales_item_configurations_variance_fields';
  height?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "sales.items" */
export type SalesItems = {
  __typename?: 'sales_items';
  amount_discount?: Maybe<Scalars['Int']['output']>;
  amount_subtotal?: Maybe<Scalars['Int']['output']>;
  amount_tax?: Maybe<Scalars['Int']['output']>;
  amount_total?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  configuration?: Maybe<SalesItemConfigurations>;
  configuration_id?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['bpchar']['output']>;
  id?: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  order?: Maybe<SalesOrders>;
  order_id?: Maybe<Scalars['Int']['output']>;
  product_code: Scalars['String']['output'];
  quantity?: Maybe<Scalars['Int']['output']>;
  stripe_price_id?: Maybe<Scalars['String']['output']>;
  stripe_product_id?: Maybe<Scalars['String']['output']>;
  tasks?: Array<SalesTasks>;
  };


/** columns and relationships of "sales.items" */
export type SalesItemsTasksArgs = {
  distinct_on?: InputMaybe<Array<SalesTasksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesTasksOrderBy>>;
  where?: InputMaybe<SalesTasksBoolExp>;
};


/** columns and relationships of "sales.items" */
export type SalesItemsTasksAggregateArgs = {
  distinct_on?: InputMaybe<Array<SalesTasksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesTasksOrderBy>>;
  where?: InputMaybe<SalesTasksBoolExp>;
};

/** aggregated selection of "sales.items" */
export type SalesItemsAggregate = {
  __typename?: 'sales_items_aggregate';
  aggregate?: Maybe<SalesItemsAggregateFields>;
  nodes: Array<SalesItems>;
};

export type SalesItemsAggregateBoolExp = {
  count?: InputMaybe<SalesItemsAggregateBoolExpCount>;
};

export type SalesItemsAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<SalesItemsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SalesItemsBoolExp>;
  predicate: IntComparisonExp;
};

/** aggregate fields of "sales.items" */
export type SalesItemsAggregateFields = {
  __typename?: 'sales_items_aggregate_fields';
  avg?: Maybe<SalesItemsAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<SalesItemsMaxFields>;
  min?: Maybe<SalesItemsMinFields>;
  stddev?: Maybe<SalesItemsStddevFields>;
  stddev_pop?: Maybe<SalesItemsStddevPopFields>;
  stddev_samp?: Maybe<SalesItemsStddevSampFields>;
  sum?: Maybe<SalesItemsSumFields>;
  var_pop?: Maybe<SalesItemsVarPopFields>;
  var_samp?: Maybe<SalesItemsVarSampFields>;
  variance?: Maybe<SalesItemsVarianceFields>;
};


/** aggregate fields of "sales.items" */
export type SalesItemsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<SalesItemsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "sales.items" */
export type SalesItemsAggregateOrderBy = {
  avg?: InputMaybe<SalesItemsAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SalesItemsMaxOrderBy>;
  min?: InputMaybe<SalesItemsMinOrderBy>;
  stddev?: InputMaybe<SalesItemsStddevOrderBy>;
  stddev_pop?: InputMaybe<SalesItemsStddevPopOrderBy>;
  stddev_samp?: InputMaybe<SalesItemsStddevSampOrderBy>;
  sum?: InputMaybe<SalesItemsSumOrderBy>;
  var_pop?: InputMaybe<SalesItemsVarPopOrderBy>;
  var_samp?: InputMaybe<SalesItemsVarSampOrderBy>;
  variance?: InputMaybe<SalesItemsVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "sales.items" */
export type SalesItemsArrRelInsertInput = {
  data: Array<SalesItemsInsertInput>;
  /** upsert condition */
  on_conflict?: InputMaybe<SalesItemsOnConflict>;
};

/** aggregate avg on columns */
export type SalesItemsAvgFields = {
  __typename?: 'sales_items_avg_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  configuration_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "sales.items" */
export type SalesItemsAvgOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  configuration_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "sales.items". All fields are combined with a logical 'AND'. */
export type SalesItemsBoolExp = {
  _and?: InputMaybe<Array<SalesItemsBoolExp>>;
  _not?: InputMaybe<SalesItemsBoolExp>;
  _or?: InputMaybe<Array<SalesItemsBoolExp>>;
  amount_discount?: InputMaybe<IntComparisonExp>;
  amount_subtotal?: InputMaybe<IntComparisonExp>;
  amount_tax?: InputMaybe<IntComparisonExp>;
  amount_total?: InputMaybe<IntComparisonExp>;
  configuration?: InputMaybe<SalesItemConfigurationsBoolExp>;
  configuration_id?: InputMaybe<IntComparisonExp>;
  currency?: InputMaybe<BpcharComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  order?: InputMaybe<SalesOrdersBoolExp>;
  order_id?: InputMaybe<IntComparisonExp>;
  product_code?: InputMaybe<StringComparisonExp>;
  quantity?: InputMaybe<IntComparisonExp>;
  stripe_price_id?: InputMaybe<StringComparisonExp>;
  stripe_product_id?: InputMaybe<StringComparisonExp>;
  tasks?: InputMaybe<SalesTasksBoolExp>;
  tasks_aggregate?: InputMaybe<SalesTasksAggregateBoolExp>;
};

/** unique or primary key constraints on table "sales.items" */
export enum SalesItemsConstraint {
  /** unique or primary key constraint on columns "id" */
  OrderItemsPkey = 'order_items_pkey'
}

/** input type for incrementing numeric columns in table "sales.items" */
export type SalesItemsIncInput = {
  amount_discount?: InputMaybe<Scalars['Int']['input']>;
  amount_subtotal?: InputMaybe<Scalars['Int']['input']>;
  amount_tax?: InputMaybe<Scalars['Int']['input']>;
  amount_total?: InputMaybe<Scalars['Int']['input']>;
  configuration_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  order_id?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "sales.items" */
export type SalesItemsInsertInput = {
  amount_discount?: InputMaybe<Scalars['Int']['input']>;
  amount_subtotal?: InputMaybe<Scalars['Int']['input']>;
  amount_tax?: InputMaybe<Scalars['Int']['input']>;
  amount_total?: InputMaybe<Scalars['Int']['input']>;
  configuration?: InputMaybe<SalesItemConfigurationsObjRelInsertInput>;
  configuration_id?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Scalars['bpchar']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<SalesOrdersObjRelInsertInput>;
  order_id?: InputMaybe<Scalars['Int']['input']>;
  product_code?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stripe_price_id?: InputMaybe<Scalars['String']['input']>;
  stripe_product_id?: InputMaybe<Scalars['String']['input']>;
  tasks?: InputMaybe<SalesTasksArrRelInsertInput>;
};

/** aggregate max on columns */
export type SalesItemsMaxFields = {
  __typename?: 'sales_items_max_fields';
  amount_discount?: Maybe<Scalars['Int']['output']>;
  amount_subtotal?: Maybe<Scalars['Int']['output']>;
  amount_tax?: Maybe<Scalars['Int']['output']>;
  amount_total?: Maybe<Scalars['Int']['output']>;
  configuration_id?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['bpchar']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order_id?: Maybe<Scalars['Int']['output']>;
  product_code?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  stripe_price_id?: Maybe<Scalars['String']['output']>;
  stripe_product_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "sales.items" */
export type SalesItemsMaxOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  configuration_id?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  product_code?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
  stripe_price_id?: InputMaybe<OrderBy>;
  stripe_product_id?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type SalesItemsMinFields = {
  __typename?: 'sales_items_min_fields';
  amount_discount?: Maybe<Scalars['Int']['output']>;
  amount_subtotal?: Maybe<Scalars['Int']['output']>;
  amount_tax?: Maybe<Scalars['Int']['output']>;
  amount_total?: Maybe<Scalars['Int']['output']>;
  configuration_id?: Maybe<Scalars['Int']['output']>;
  currency?: Maybe<Scalars['bpchar']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order_id?: Maybe<Scalars['Int']['output']>;
  product_code?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  stripe_price_id?: Maybe<Scalars['String']['output']>;
  stripe_product_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "sales.items" */
export type SalesItemsMinOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  configuration_id?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  product_code?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
  stripe_price_id?: InputMaybe<OrderBy>;
  stripe_product_id?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "sales.items" */
export type SalesItemsMutationResponse = {
  __typename?: 'sales_items_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<SalesItems>;
};

/** on_conflict condition type for table "sales.items" */
export type SalesItemsOnConflict = {
  constraint: SalesItemsConstraint;
  update_columns?: Array<SalesItemsUpdateColumn>;
  where?: InputMaybe<SalesItemsBoolExp>;
};

/** Ordering options when selecting data from "sales.items". */
export type SalesItemsOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  configuration?: InputMaybe<SalesItemConfigurationsOrderBy>;
  configuration_id?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  order?: InputMaybe<SalesOrdersOrderBy>;
  order_id?: InputMaybe<OrderBy>;
  product_code?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
  stripe_price_id?: InputMaybe<OrderBy>;
  stripe_product_id?: InputMaybe<OrderBy>;
  tasks_aggregate?: InputMaybe<SalesTasksAggregateOrderBy>;
};

/** primary key columns input for table: sales.items */
export type SalesItemsPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "sales.items" */
export enum SalesItemsSelectColumn {
  /** column name */
  AmountDiscount = 'amount_discount',
  /** column name */
  AmountSubtotal = 'amount_subtotal',
  /** column name */
  AmountTax = 'amount_tax',
  /** column name */
  AmountTotal = 'amount_total',
  /** column name */
  ConfigurationId = 'configuration_id',
  /** column name */
  Currency = 'currency',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  ProductCode = 'product_code',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  StripePriceId = 'stripe_price_id',
  /** column name */
  StripeProductId = 'stripe_product_id'
}

/** input type for updating data in table "sales.items" */
export type SalesItemsSetInput = {
  amount_discount?: InputMaybe<Scalars['Int']['input']>;
  amount_subtotal?: InputMaybe<Scalars['Int']['input']>;
  amount_tax?: InputMaybe<Scalars['Int']['input']>;
  amount_total?: InputMaybe<Scalars['Int']['input']>;
  configuration_id?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Scalars['bpchar']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order_id?: InputMaybe<Scalars['Int']['input']>;
  product_code?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stripe_price_id?: InputMaybe<Scalars['String']['input']>;
  stripe_product_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type SalesItemsStddevFields = {
  __typename?: 'sales_items_stddev_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  configuration_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "sales.items" */
export type SalesItemsStddevOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  configuration_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type SalesItemsStddevPopFields = {
  __typename?: 'sales_items_stddev_pop_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  configuration_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "sales.items" */
export type SalesItemsStddevPopOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  configuration_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type SalesItemsStddevSampFields = {
  __typename?: 'sales_items_stddev_samp_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  configuration_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "sales.items" */
export type SalesItemsStddevSampOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  configuration_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "sales_items" */
export type SalesItemsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SalesItemsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SalesItemsStreamCursorValueInput = {
  amount_discount?: InputMaybe<Scalars['Int']['input']>;
  amount_subtotal?: InputMaybe<Scalars['Int']['input']>;
  amount_tax?: InputMaybe<Scalars['Int']['input']>;
  amount_total?: InputMaybe<Scalars['Int']['input']>;
  configuration_id?: InputMaybe<Scalars['Int']['input']>;
  currency?: InputMaybe<Scalars['bpchar']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order_id?: InputMaybe<Scalars['Int']['input']>;
  product_code?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  stripe_price_id?: InputMaybe<Scalars['String']['input']>;
  stripe_product_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type SalesItemsSumFields = {
  __typename?: 'sales_items_sum_fields';
  amount_discount?: Maybe<Scalars['Int']['output']>;
  amount_subtotal?: Maybe<Scalars['Int']['output']>;
  amount_tax?: Maybe<Scalars['Int']['output']>;
  amount_total?: Maybe<Scalars['Int']['output']>;
  configuration_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  order_id?: Maybe<Scalars['Int']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "sales.items" */
export type SalesItemsSumOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  configuration_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
};

/** update columns of table "sales.items" */
export enum SalesItemsUpdateColumn {
  /** column name */
  AmountDiscount = 'amount_discount',
  /** column name */
  AmountSubtotal = 'amount_subtotal',
  /** column name */
  AmountTax = 'amount_tax',
  /** column name */
  AmountTotal = 'amount_total',
  /** column name */
  ConfigurationId = 'configuration_id',
  /** column name */
  Currency = 'currency',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  ProductCode = 'product_code',
  /** column name */
  Quantity = 'quantity',
  /** column name */
  StripePriceId = 'stripe_price_id',
  /** column name */
  StripeProductId = 'stripe_product_id'
}

export type SalesItemsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<SalesItemsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SalesItemsSetInput>;
  /** filter the rows which have to be updated */
  where: SalesItemsBoolExp;
};

/** aggregate var_pop on columns */
export type SalesItemsVarPopFields = {
  __typename?: 'sales_items_var_pop_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  configuration_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "sales.items" */
export type SalesItemsVarPopOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  configuration_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type SalesItemsVarSampFields = {
  __typename?: 'sales_items_var_samp_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  configuration_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "sales.items" */
export type SalesItemsVarSampOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  configuration_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type SalesItemsVarianceFields = {
  __typename?: 'sales_items_variance_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  configuration_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "sales.items" */
export type SalesItemsVarianceOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  configuration_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  quantity?: InputMaybe<OrderBy>;
};

/** columns and relationships of "sales.orders" */
export type SalesOrders = {
  __typename?: 'sales_orders';
  amount_discount?: Maybe<Scalars['Int']['output']>;
  amount_refunded?: Maybe<Scalars['Int']['output']>;
  amount_shipping?: Maybe<Scalars['Int']['output']>;
  amount_subtotal?: Maybe<Scalars['Int']['output']>;
  amount_tax?: Maybe<Scalars['Int']['output']>;
  amount_total?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  billing_address?: Maybe<CommonAddresses>;
  billing_address_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  currency?: Maybe<Scalars['bpchar']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Scalars['Int']['output'];
  invoice_url?: Maybe<Scalars['String']['output']>;
  items?: Array<SalesItems>;
    name?: Maybe<Scalars['String']['output']>;
  payment_details?: Maybe<Scalars['jsonb']['output']>;
  payment_status: Scalars['String']['output'];
  phone_number?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  shipping_address?: Maybe<CommonAddresses>;
  shipping_address_id?: Maybe<Scalars['Int']['output']>;
  status: EnumsOrderStatusesEnum;
  status_updated?: Maybe<Scalars['timestamptz']['output']>;
  stripe_checkout_session_id?: Maybe<Scalars['String']['output']>;
  stripe_customer_id?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user?: Maybe<UsersUsers>;
  user_id?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "sales.orders" */
export type SalesOrdersItemsArgs = {
  distinct_on?: InputMaybe<Array<SalesItemsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesItemsOrderBy>>;
  where?: InputMaybe<SalesItemsBoolExp>;
};


/** columns and relationships of "sales.orders" */
export type SalesOrdersItemsAggregateArgs = {
  distinct_on?: InputMaybe<Array<SalesItemsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesItemsOrderBy>>;
  where?: InputMaybe<SalesItemsBoolExp>;
};


/** columns and relationships of "sales.orders" */
export type SalesOrdersPaymentDetailsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "sales.orders" */
export type SalesOrdersAggregate = {
  __typename?: 'sales_orders_aggregate';
  aggregate?: Maybe<SalesOrdersAggregateFields>;
  nodes: Array<SalesOrders>;
};

export type SalesOrdersAggregateBoolExp = {
  count?: InputMaybe<SalesOrdersAggregateBoolExpCount>;
};

export type SalesOrdersAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<SalesOrdersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SalesOrdersBoolExp>;
  predicate: IntComparisonExp;
};

/** aggregate fields of "sales.orders" */
export type SalesOrdersAggregateFields = {
  __typename?: 'sales_orders_aggregate_fields';
  avg?: Maybe<SalesOrdersAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<SalesOrdersMaxFields>;
  min?: Maybe<SalesOrdersMinFields>;
  stddev?: Maybe<SalesOrdersStddevFields>;
  stddev_pop?: Maybe<SalesOrdersStddevPopFields>;
  stddev_samp?: Maybe<SalesOrdersStddevSampFields>;
  sum?: Maybe<SalesOrdersSumFields>;
  var_pop?: Maybe<SalesOrdersVarPopFields>;
  var_samp?: Maybe<SalesOrdersVarSampFields>;
  variance?: Maybe<SalesOrdersVarianceFields>;
};


/** aggregate fields of "sales.orders" */
export type SalesOrdersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<SalesOrdersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "sales.orders" */
export type SalesOrdersAggregateOrderBy = {
  avg?: InputMaybe<SalesOrdersAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SalesOrdersMaxOrderBy>;
  min?: InputMaybe<SalesOrdersMinOrderBy>;
  stddev?: InputMaybe<SalesOrdersStddevOrderBy>;
  stddev_pop?: InputMaybe<SalesOrdersStddevPopOrderBy>;
  stddev_samp?: InputMaybe<SalesOrdersStddevSampOrderBy>;
  sum?: InputMaybe<SalesOrdersSumOrderBy>;
  var_pop?: InputMaybe<SalesOrdersVarPopOrderBy>;
  var_samp?: InputMaybe<SalesOrdersVarSampOrderBy>;
  variance?: InputMaybe<SalesOrdersVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type SalesOrdersAppendInput = {
  payment_details?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "sales.orders" */
export type SalesOrdersArrRelInsertInput = {
  data: Array<SalesOrdersInsertInput>;
  /** upsert condition */
  on_conflict?: InputMaybe<SalesOrdersOnConflict>;
};

/** aggregate avg on columns */
export type SalesOrdersAvgFields = {
  __typename?: 'sales_orders_avg_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_refunded?: Maybe<Scalars['Float']['output']>;
  amount_shipping?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "sales.orders" */
export type SalesOrdersAvgOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_refunded?: InputMaybe<OrderBy>;
  amount_shipping?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  billing_address_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  shipping_address_id?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "sales.orders". All fields are combined with a logical 'AND'. */
export type SalesOrdersBoolExp = {
  _and?: InputMaybe<Array<SalesOrdersBoolExp>>;
  _not?: InputMaybe<SalesOrdersBoolExp>;
  _or?: InputMaybe<Array<SalesOrdersBoolExp>>;
  amount_discount?: InputMaybe<IntComparisonExp>;
  amount_refunded?: InputMaybe<IntComparisonExp>;
  amount_shipping?: InputMaybe<IntComparisonExp>;
  amount_subtotal?: InputMaybe<IntComparisonExp>;
  amount_tax?: InputMaybe<IntComparisonExp>;
  amount_total?: InputMaybe<IntComparisonExp>;
  billing_address?: InputMaybe<CommonAddressesBoolExp>;
  billing_address_id?: InputMaybe<IntComparisonExp>;
  created_at?: InputMaybe<TimestamptzComparisonExp>;
  currency?: InputMaybe<BpcharComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  invoice_url?: InputMaybe<StringComparisonExp>;
  items?: InputMaybe<SalesItemsBoolExp>;
  items_aggregate?: InputMaybe<SalesItemsAggregateBoolExp>;
  name?: InputMaybe<StringComparisonExp>;
  payment_details?: InputMaybe<JsonbComparisonExp>;
  payment_status?: InputMaybe<StringComparisonExp>;
  phone_number?: InputMaybe<StringComparisonExp>;
  shipping_address?: InputMaybe<CommonAddressesBoolExp>;
  shipping_address_id?: InputMaybe<IntComparisonExp>;
  status?: InputMaybe<EnumsOrderStatusesEnumComparisonExp>;
  status_updated?: InputMaybe<TimestamptzComparisonExp>;
  stripe_checkout_session_id?: InputMaybe<StringComparisonExp>;
  stripe_customer_id?: InputMaybe<StringComparisonExp>;
  token?: InputMaybe<StringComparisonExp>;
  user?: InputMaybe<UsersUsersBoolExp>;
  user_id?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "sales.orders" */
export enum SalesOrdersConstraint {
  /** unique or primary key constraint on columns "id" */
  OrdersPkey = 'orders_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type SalesOrdersDeleteAtPathInput = {
  payment_details?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type SalesOrdersDeleteElemInput = {
  payment_details?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type SalesOrdersDeleteKeyInput = {
  payment_details?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "sales.orders" */
export type SalesOrdersIncInput = {
  amount_discount?: InputMaybe<Scalars['Int']['input']>;
  amount_refunded?: InputMaybe<Scalars['Int']['input']>;
  amount_shipping?: InputMaybe<Scalars['Int']['input']>;
  amount_subtotal?: InputMaybe<Scalars['Int']['input']>;
  amount_tax?: InputMaybe<Scalars['Int']['input']>;
  amount_total?: InputMaybe<Scalars['Int']['input']>;
  billing_address_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  shipping_address_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "sales.orders" */
export type SalesOrdersInsertInput = {
  amount_discount?: InputMaybe<Scalars['Int']['input']>;
  amount_refunded?: InputMaybe<Scalars['Int']['input']>;
  amount_shipping?: InputMaybe<Scalars['Int']['input']>;
  amount_subtotal?: InputMaybe<Scalars['Int']['input']>;
  amount_tax?: InputMaybe<Scalars['Int']['input']>;
  amount_total?: InputMaybe<Scalars['Int']['input']>;
  billing_address?: InputMaybe<CommonAddressesObjRelInsertInput>;
  billing_address_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  currency?: InputMaybe<Scalars['bpchar']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  invoice_url?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<SalesItemsArrRelInsertInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  payment_details?: InputMaybe<Scalars['jsonb']['input']>;
  payment_status?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  shipping_address?: InputMaybe<CommonAddressesObjRelInsertInput>;
  shipping_address_id?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<EnumsOrderStatusesEnum>;
  status_updated?: InputMaybe<Scalars['timestamptz']['input']>;
  stripe_checkout_session_id?: InputMaybe<Scalars['String']['input']>;
  stripe_customer_id?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UsersUsersObjRelInsertInput>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type SalesOrdersMaxFields = {
  __typename?: 'sales_orders_max_fields';
  amount_discount?: Maybe<Scalars['Int']['output']>;
  amount_refunded?: Maybe<Scalars['Int']['output']>;
  amount_shipping?: Maybe<Scalars['Int']['output']>;
  amount_subtotal?: Maybe<Scalars['Int']['output']>;
  amount_tax?: Maybe<Scalars['Int']['output']>;
  amount_total?: Maybe<Scalars['Int']['output']>;
  billing_address_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  currency?: Maybe<Scalars['bpchar']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  invoice_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  payment_status?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  shipping_address_id?: Maybe<Scalars['Int']['output']>;
  status_updated?: Maybe<Scalars['timestamptz']['output']>;
  stripe_checkout_session_id?: Maybe<Scalars['String']['output']>;
  stripe_customer_id?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "sales.orders" */
export type SalesOrdersMaxOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_refunded?: InputMaybe<OrderBy>;
  amount_shipping?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  billing_address_id?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  invoice_url?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  payment_status?: InputMaybe<OrderBy>;
  phone_number?: InputMaybe<OrderBy>;
  shipping_address_id?: InputMaybe<OrderBy>;
  status_updated?: InputMaybe<OrderBy>;
  stripe_checkout_session_id?: InputMaybe<OrderBy>;
  stripe_customer_id?: InputMaybe<OrderBy>;
  token?: InputMaybe<OrderBy>;
  user_id?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type SalesOrdersMinFields = {
  __typename?: 'sales_orders_min_fields';
  amount_discount?: Maybe<Scalars['Int']['output']>;
  amount_refunded?: Maybe<Scalars['Int']['output']>;
  amount_shipping?: Maybe<Scalars['Int']['output']>;
  amount_subtotal?: Maybe<Scalars['Int']['output']>;
  amount_tax?: Maybe<Scalars['Int']['output']>;
  amount_total?: Maybe<Scalars['Int']['output']>;
  billing_address_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  currency?: Maybe<Scalars['bpchar']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  invoice_url?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  payment_status?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  shipping_address_id?: Maybe<Scalars['Int']['output']>;
  status_updated?: Maybe<Scalars['timestamptz']['output']>;
  stripe_checkout_session_id?: Maybe<Scalars['String']['output']>;
  stripe_customer_id?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "sales.orders" */
export type SalesOrdersMinOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_refunded?: InputMaybe<OrderBy>;
  amount_shipping?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  billing_address_id?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  invoice_url?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  payment_status?: InputMaybe<OrderBy>;
  phone_number?: InputMaybe<OrderBy>;
  shipping_address_id?: InputMaybe<OrderBy>;
  status_updated?: InputMaybe<OrderBy>;
  stripe_checkout_session_id?: InputMaybe<OrderBy>;
  stripe_customer_id?: InputMaybe<OrderBy>;
  token?: InputMaybe<OrderBy>;
  user_id?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "sales.orders" */
export type SalesOrdersMutationResponse = {
  __typename?: 'sales_orders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<SalesOrders>;
};

/** input type for inserting object relation for remote table "sales.orders" */
export type SalesOrdersObjRelInsertInput = {
  data: SalesOrdersInsertInput;
  /** upsert condition */
  on_conflict?: InputMaybe<SalesOrdersOnConflict>;
};

/** on_conflict condition type for table "sales.orders" */
export type SalesOrdersOnConflict = {
  constraint: SalesOrdersConstraint;
  update_columns?: Array<SalesOrdersUpdateColumn>;
  where?: InputMaybe<SalesOrdersBoolExp>;
};

/** Ordering options when selecting data from "sales.orders". */
export type SalesOrdersOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_refunded?: InputMaybe<OrderBy>;
  amount_shipping?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  billing_address?: InputMaybe<CommonAddressesOrderBy>;
  billing_address_id?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  currency?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  invoice_url?: InputMaybe<OrderBy>;
  items_aggregate?: InputMaybe<SalesItemsAggregateOrderBy>;
  name?: InputMaybe<OrderBy>;
  payment_details?: InputMaybe<OrderBy>;
  payment_status?: InputMaybe<OrderBy>;
  phone_number?: InputMaybe<OrderBy>;
  shipping_address?: InputMaybe<CommonAddressesOrderBy>;
  shipping_address_id?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  status_updated?: InputMaybe<OrderBy>;
  stripe_checkout_session_id?: InputMaybe<OrderBy>;
  stripe_customer_id?: InputMaybe<OrderBy>;
  token?: InputMaybe<OrderBy>;
  user?: InputMaybe<UsersUsersOrderBy>;
  user_id?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: sales.orders */
export type SalesOrdersPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type SalesOrdersPrependInput = {
  payment_details?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "sales.orders" */
export enum SalesOrdersSelectColumn {
  /** column name */
  AmountDiscount = 'amount_discount',
  /** column name */
  AmountRefunded = 'amount_refunded',
  /** column name */
  AmountShipping = 'amount_shipping',
  /** column name */
  AmountSubtotal = 'amount_subtotal',
  /** column name */
  AmountTax = 'amount_tax',
  /** column name */
  AmountTotal = 'amount_total',
  /** column name */
  BillingAddressId = 'billing_address_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Currency = 'currency',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  InvoiceUrl = 'invoice_url',
  /** column name */
  Name = 'name',
  /** column name */
  PaymentDetails = 'payment_details',
  /** column name */
  PaymentStatus = 'payment_status',
  /** column name */
  PhoneNumber = 'phone_number',
  /** column name */
  ShippingAddressId = 'shipping_address_id',
  /** column name */
  Status = 'status',
  /** column name */
  StatusUpdated = 'status_updated',
  /** column name */
  StripeCheckoutSessionId = 'stripe_checkout_session_id',
  /** column name */
  StripeCustomerId = 'stripe_customer_id',
  /** column name */
  Token = 'token',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "sales.orders" */
export type SalesOrdersSetInput = {
  amount_discount?: InputMaybe<Scalars['Int']['input']>;
  amount_refunded?: InputMaybe<Scalars['Int']['input']>;
  amount_shipping?: InputMaybe<Scalars['Int']['input']>;
  amount_subtotal?: InputMaybe<Scalars['Int']['input']>;
  amount_tax?: InputMaybe<Scalars['Int']['input']>;
  amount_total?: InputMaybe<Scalars['Int']['input']>;
  billing_address_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  currency?: InputMaybe<Scalars['bpchar']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  invoice_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  payment_details?: InputMaybe<Scalars['jsonb']['input']>;
  payment_status?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  shipping_address_id?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<EnumsOrderStatusesEnum>;
  status_updated?: InputMaybe<Scalars['timestamptz']['input']>;
  stripe_checkout_session_id?: InputMaybe<Scalars['String']['input']>;
  stripe_customer_id?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type SalesOrdersStddevFields = {
  __typename?: 'sales_orders_stddev_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_refunded?: Maybe<Scalars['Float']['output']>;
  amount_shipping?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "sales.orders" */
export type SalesOrdersStddevOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_refunded?: InputMaybe<OrderBy>;
  amount_shipping?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  billing_address_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  shipping_address_id?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type SalesOrdersStddevPopFields = {
  __typename?: 'sales_orders_stddev_pop_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_refunded?: Maybe<Scalars['Float']['output']>;
  amount_shipping?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "sales.orders" */
export type SalesOrdersStddevPopOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_refunded?: InputMaybe<OrderBy>;
  amount_shipping?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  billing_address_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  shipping_address_id?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type SalesOrdersStddevSampFields = {
  __typename?: 'sales_orders_stddev_samp_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_refunded?: Maybe<Scalars['Float']['output']>;
  amount_shipping?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "sales.orders" */
export type SalesOrdersStddevSampOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_refunded?: InputMaybe<OrderBy>;
  amount_shipping?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  billing_address_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  shipping_address_id?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "sales_orders" */
export type SalesOrdersStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SalesOrdersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SalesOrdersStreamCursorValueInput = {
  amount_discount?: InputMaybe<Scalars['Int']['input']>;
  amount_refunded?: InputMaybe<Scalars['Int']['input']>;
  amount_shipping?: InputMaybe<Scalars['Int']['input']>;
  amount_subtotal?: InputMaybe<Scalars['Int']['input']>;
  amount_tax?: InputMaybe<Scalars['Int']['input']>;
  amount_total?: InputMaybe<Scalars['Int']['input']>;
  billing_address_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  currency?: InputMaybe<Scalars['bpchar']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  invoice_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  payment_details?: InputMaybe<Scalars['jsonb']['input']>;
  payment_status?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  shipping_address_id?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<EnumsOrderStatusesEnum>;
  status_updated?: InputMaybe<Scalars['timestamptz']['input']>;
  stripe_checkout_session_id?: InputMaybe<Scalars['String']['input']>;
  stripe_customer_id?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type SalesOrdersSumFields = {
  __typename?: 'sales_orders_sum_fields';
  amount_discount?: Maybe<Scalars['Int']['output']>;
  amount_refunded?: Maybe<Scalars['Int']['output']>;
  amount_shipping?: Maybe<Scalars['Int']['output']>;
  amount_subtotal?: Maybe<Scalars['Int']['output']>;
  amount_tax?: Maybe<Scalars['Int']['output']>;
  amount_total?: Maybe<Scalars['Int']['output']>;
  billing_address_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  shipping_address_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "sales.orders" */
export type SalesOrdersSumOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_refunded?: InputMaybe<OrderBy>;
  amount_shipping?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  billing_address_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  shipping_address_id?: InputMaybe<OrderBy>;
};

/** update columns of table "sales.orders" */
export enum SalesOrdersUpdateColumn {
  /** column name */
  AmountDiscount = 'amount_discount',
  /** column name */
  AmountRefunded = 'amount_refunded',
  /** column name */
  AmountShipping = 'amount_shipping',
  /** column name */
  AmountSubtotal = 'amount_subtotal',
  /** column name */
  AmountTax = 'amount_tax',
  /** column name */
  AmountTotal = 'amount_total',
  /** column name */
  BillingAddressId = 'billing_address_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Currency = 'currency',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  InvoiceUrl = 'invoice_url',
  /** column name */
  Name = 'name',
  /** column name */
  PaymentDetails = 'payment_details',
  /** column name */
  PaymentStatus = 'payment_status',
  /** column name */
  PhoneNumber = 'phone_number',
  /** column name */
  ShippingAddressId = 'shipping_address_id',
  /** column name */
  Status = 'status',
  /** column name */
  StatusUpdated = 'status_updated',
  /** column name */
  StripeCheckoutSessionId = 'stripe_checkout_session_id',
  /** column name */
  StripeCustomerId = 'stripe_customer_id',
  /** column name */
  Token = 'token',
  /** column name */
  UserId = 'user_id'
}

export type SalesOrdersUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<SalesOrdersAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<SalesOrdersDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<SalesOrdersDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<SalesOrdersDeleteKeyInput>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<SalesOrdersIncInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<SalesOrdersPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SalesOrdersSetInput>;
  /** filter the rows which have to be updated */
  where: SalesOrdersBoolExp;
};

/** aggregate var_pop on columns */
export type SalesOrdersVarPopFields = {
  __typename?: 'sales_orders_var_pop_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_refunded?: Maybe<Scalars['Float']['output']>;
  amount_shipping?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "sales.orders" */
export type SalesOrdersVarPopOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_refunded?: InputMaybe<OrderBy>;
  amount_shipping?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  billing_address_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  shipping_address_id?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type SalesOrdersVarSampFields = {
  __typename?: 'sales_orders_var_samp_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_refunded?: Maybe<Scalars['Float']['output']>;
  amount_shipping?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "sales.orders" */
export type SalesOrdersVarSampOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_refunded?: InputMaybe<OrderBy>;
  amount_shipping?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  billing_address_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  shipping_address_id?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type SalesOrdersVarianceFields = {
  __typename?: 'sales_orders_variance_fields';
  amount_discount?: Maybe<Scalars['Float']['output']>;
  amount_refunded?: Maybe<Scalars['Float']['output']>;
  amount_shipping?: Maybe<Scalars['Float']['output']>;
  amount_subtotal?: Maybe<Scalars['Float']['output']>;
  amount_tax?: Maybe<Scalars['Float']['output']>;
  amount_total?: Maybe<Scalars['Float']['output']>;
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "sales.orders" */
export type SalesOrdersVarianceOrderBy = {
  amount_discount?: InputMaybe<OrderBy>;
  amount_refunded?: InputMaybe<OrderBy>;
  amount_shipping?: InputMaybe<OrderBy>;
  amount_subtotal?: InputMaybe<OrderBy>;
  amount_tax?: InputMaybe<OrderBy>;
  amount_total?: InputMaybe<OrderBy>;
  billing_address_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  shipping_address_id?: InputMaybe<OrderBy>;
};

/** columns and relationships of "sales.tasks" */
export type SalesTasks = {
  __typename?: 'sales_tasks';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Scalars['Int']['output'];
  item_id?: Maybe<Scalars['Int']['output']>;
  order_id?: Maybe<Scalars['Int']['output']>;
  /** Possible values: pending, in progress, finished */
  status: EnumsTaskStatusesEnum;
  /** enum: EDIT | */
  type: EnumsTaskTypesEnum;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "sales.tasks" */
export type SalesTasksAggregate = {
  __typename?: 'sales_tasks_aggregate';
  aggregate?: Maybe<SalesTasksAggregateFields>;
  nodes: Array<SalesTasks>;
};

export type SalesTasksAggregateBoolExp = {
  count?: InputMaybe<SalesTasksAggregateBoolExpCount>;
};

export type SalesTasksAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<SalesTasksSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<SalesTasksBoolExp>;
  predicate: IntComparisonExp;
};

/** aggregate fields of "sales.tasks" */
export type SalesTasksAggregateFields = {
  __typename?: 'sales_tasks_aggregate_fields';
  avg?: Maybe<SalesTasksAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<SalesTasksMaxFields>;
  min?: Maybe<SalesTasksMinFields>;
  stddev?: Maybe<SalesTasksStddevFields>;
  stddev_pop?: Maybe<SalesTasksStddevPopFields>;
  stddev_samp?: Maybe<SalesTasksStddevSampFields>;
  sum?: Maybe<SalesTasksSumFields>;
  var_pop?: Maybe<SalesTasksVarPopFields>;
  var_samp?: Maybe<SalesTasksVarSampFields>;
  variance?: Maybe<SalesTasksVarianceFields>;
};


/** aggregate fields of "sales.tasks" */
export type SalesTasksAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<SalesTasksSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "sales.tasks" */
export type SalesTasksAggregateOrderBy = {
  avg?: InputMaybe<SalesTasksAvgOrderBy>;
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<SalesTasksMaxOrderBy>;
  min?: InputMaybe<SalesTasksMinOrderBy>;
  stddev?: InputMaybe<SalesTasksStddevOrderBy>;
  stddev_pop?: InputMaybe<SalesTasksStddevPopOrderBy>;
  stddev_samp?: InputMaybe<SalesTasksStddevSampOrderBy>;
  sum?: InputMaybe<SalesTasksSumOrderBy>;
  var_pop?: InputMaybe<SalesTasksVarPopOrderBy>;
  var_samp?: InputMaybe<SalesTasksVarSampOrderBy>;
  variance?: InputMaybe<SalesTasksVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "sales.tasks" */
export type SalesTasksArrRelInsertInput = {
  data: Array<SalesTasksInsertInput>;
  /** upsert condition */
  on_conflict?: InputMaybe<SalesTasksOnConflict>;
};

/** aggregate avg on columns */
export type SalesTasksAvgFields = {
  __typename?: 'sales_tasks_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  item_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "sales.tasks" */
export type SalesTasksAvgOrderBy = {
  id?: InputMaybe<OrderBy>;
  item_id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "sales.tasks". All fields are combined with a logical 'AND'. */
export type SalesTasksBoolExp = {
  _and?: InputMaybe<Array<SalesTasksBoolExp>>;
  _not?: InputMaybe<SalesTasksBoolExp>;
  _or?: InputMaybe<Array<SalesTasksBoolExp>>;
  created_at?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  item_id?: InputMaybe<IntComparisonExp>;
  order_id?: InputMaybe<IntComparisonExp>;
  status?: InputMaybe<EnumsTaskStatusesEnumComparisonExp>;
  type?: InputMaybe<EnumsTaskTypesEnumComparisonExp>;
  updated_at?: InputMaybe<TimestamptzComparisonExp>;
  user_id?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "sales.tasks" */
export enum SalesTasksConstraint {
  /** unique or primary key constraint on columns "id" */
  TasksPkey = 'tasks_pkey'
}

/** input type for incrementing numeric columns in table "sales.tasks" */
export type SalesTasksIncInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  item_id?: InputMaybe<Scalars['Int']['input']>;
  order_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "sales.tasks" */
export type SalesTasksInsertInput = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  item_id?: InputMaybe<Scalars['Int']['input']>;
  order_id?: InputMaybe<Scalars['Int']['input']>;
  /** Possible values: pending, in progress, finished */
  status?: InputMaybe<EnumsTaskStatusesEnum>;
  /** enum: EDIT | */
  type?: InputMaybe<EnumsTaskTypesEnum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type SalesTasksMaxFields = {
  __typename?: 'sales_tasks_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  item_id?: Maybe<Scalars['Int']['output']>;
  order_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "sales.tasks" */
export type SalesTasksMaxOrderBy = {
  created_at?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  item_id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
  user_id?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type SalesTasksMinFields = {
  __typename?: 'sales_tasks_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  item_id?: Maybe<Scalars['Int']['output']>;
  order_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "sales.tasks" */
export type SalesTasksMinOrderBy = {
  created_at?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  item_id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
  user_id?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "sales.tasks" */
export type SalesTasksMutationResponse = {
  __typename?: 'sales_tasks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<SalesTasks>;
};

/** on_conflict condition type for table "sales.tasks" */
export type SalesTasksOnConflict = {
  constraint: SalesTasksConstraint;
  update_columns?: Array<SalesTasksUpdateColumn>;
  where?: InputMaybe<SalesTasksBoolExp>;
};

/** Ordering options when selecting data from "sales.tasks". */
export type SalesTasksOrderBy = {
  created_at?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  item_id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
  type?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
  user_id?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: sales.tasks */
export type SalesTasksPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "sales.tasks" */
export enum SalesTasksSelectColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ItemId = 'item_id',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  Status = 'status',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "sales.tasks" */
export type SalesTasksSetInput = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  item_id?: InputMaybe<Scalars['Int']['input']>;
  order_id?: InputMaybe<Scalars['Int']['input']>;
  /** Possible values: pending, in progress, finished */
  status?: InputMaybe<EnumsTaskStatusesEnum>;
  /** enum: EDIT | */
  type?: InputMaybe<EnumsTaskTypesEnum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type SalesTasksStddevFields = {
  __typename?: 'sales_tasks_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  item_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "sales.tasks" */
export type SalesTasksStddevOrderBy = {
  id?: InputMaybe<OrderBy>;
  item_id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type SalesTasksStddevPopFields = {
  __typename?: 'sales_tasks_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  item_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "sales.tasks" */
export type SalesTasksStddevPopOrderBy = {
  id?: InputMaybe<OrderBy>;
  item_id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type SalesTasksStddevSampFields = {
  __typename?: 'sales_tasks_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  item_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "sales.tasks" */
export type SalesTasksStddevSampOrderBy = {
  id?: InputMaybe<OrderBy>;
  item_id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "sales_tasks" */
export type SalesTasksStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SalesTasksStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SalesTasksStreamCursorValueInput = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  item_id?: InputMaybe<Scalars['Int']['input']>;
  order_id?: InputMaybe<Scalars['Int']['input']>;
  /** Possible values: pending, in progress, finished */
  status?: InputMaybe<EnumsTaskStatusesEnum>;
  /** enum: EDIT | */
  type?: InputMaybe<EnumsTaskTypesEnum>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type SalesTasksSumFields = {
  __typename?: 'sales_tasks_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  item_id?: Maybe<Scalars['Int']['output']>;
  order_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "sales.tasks" */
export type SalesTasksSumOrderBy = {
  id?: InputMaybe<OrderBy>;
  item_id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
};

/** update columns of table "sales.tasks" */
export enum SalesTasksUpdateColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ItemId = 'item_id',
  /** column name */
  OrderId = 'order_id',
  /** column name */
  Status = 'status',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type SalesTasksUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<SalesTasksIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SalesTasksSetInput>;
  /** filter the rows which have to be updated */
  where: SalesTasksBoolExp;
};

/** aggregate var_pop on columns */
export type SalesTasksVarPopFields = {
  __typename?: 'sales_tasks_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  item_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "sales.tasks" */
export type SalesTasksVarPopOrderBy = {
  id?: InputMaybe<OrderBy>;
  item_id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type SalesTasksVarSampFields = {
  __typename?: 'sales_tasks_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  item_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "sales.tasks" */
export type SalesTasksVarSampOrderBy = {
  id?: InputMaybe<OrderBy>;
  item_id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
};

/** aggregate variance on columns */
export type SalesTasksVarianceFields = {
  __typename?: 'sales_tasks_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  item_id?: Maybe<Scalars['Float']['output']>;
  order_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "sales.tasks" */
export type SalesTasksVarianceOrderBy = {
  id?: InputMaybe<OrderBy>;
  item_id?: InputMaybe<OrderBy>;
  order_id?: InputMaybe<OrderBy>;
};

export type SubscriptionRoot = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "catalog.attributes" */
  catalog_attributes: Array<CatalogAttributes>;
  /** fetch aggregated fields from the table: "catalog.attributes" */
  catalog_attributes_aggregate: CatalogAttributesAggregate;
  /** fetch data from the table: "catalog.attributes" using primary key columns */
  catalog_attributes_by_pk?: Maybe<CatalogAttributes>;
  /** fetch data from the table in a streaming manner: "catalog.attributes" */
  catalog_attributes_stream: Array<CatalogAttributes>;
  /** fetch data from the table: "catalog.avatar_countries" */
  catalog_avatar_countries: Array<CatalogAvatarCountries>;
  /** fetch aggregated fields from the table: "catalog.avatar_countries" */
  catalog_avatar_countries_aggregate: CatalogAvatarCountriesAggregate;
  /** fetch data from the table: "catalog.avatar_countries" using primary key columns */
  catalog_avatar_countries_by_pk?: Maybe<CatalogAvatarCountries>;
  /** fetch data from the table in a streaming manner: "catalog.avatar_countries" */
  catalog_avatar_countries_stream: Array<CatalogAvatarCountries>;
  /** fetch data from the table: "catalog.avatars" */
  catalog_avatars: Array<CatalogAvatars>;
  /** fetch aggregated fields from the table: "catalog.avatars" */
  catalog_avatars_aggregate: CatalogAvatarsAggregate;
  /** fetch data from the table: "catalog.avatars" using primary key columns */
  catalog_avatars_by_pk?: Maybe<CatalogAvatars>;
  /** fetch data from the table in a streaming manner: "catalog.avatars" */
  catalog_avatars_stream: Array<CatalogAvatars>;
  /** fetch data from the table: "catalog.background_countries" */
  catalog_background_countries: Array<CatalogBackgroundCountries>;
  /** fetch aggregated fields from the table: "catalog.background_countries" */
  catalog_background_countries_aggregate: CatalogBackgroundCountriesAggregate;
  /** fetch data from the table: "catalog.background_countries" using primary key columns */
  catalog_background_countries_by_pk?: Maybe<CatalogBackgroundCountries>;
  /** fetch data from the table in a streaming manner: "catalog.background_countries" */
  catalog_background_countries_stream: Array<CatalogBackgroundCountries>;
  /** fetch data from the table: "catalog.backgrounds" */
  catalog_backgrounds: Array<CatalogBackgrounds>;
  /** fetch aggregated fields from the table: "catalog.backgrounds" */
  catalog_backgrounds_aggregate: CatalogBackgroundsAggregate;
  /** fetch data from the table: "catalog.backgrounds" using primary key columns */
  catalog_backgrounds_by_pk?: Maybe<CatalogBackgrounds>;
  /** fetch data from the table in a streaming manner: "catalog.backgrounds" */
  catalog_backgrounds_stream: Array<CatalogBackgrounds>;
  /** fetch data from the table: "catalog.categories" */
  catalog_categories: Array<CatalogCategories>;
  /** fetch aggregated fields from the table: "catalog.categories" */
  catalog_categories_aggregate: CatalogCategoriesAggregate;
  /** fetch data from the table: "catalog.categories" using primary key columns */
  catalog_categories_by_pk?: Maybe<CatalogCategories>;
  /** fetch data from the table in a streaming manner: "catalog.categories" */
  catalog_categories_stream: Array<CatalogCategories>;
  /** fetch data from the table: "catalog.images" */
  catalog_images: Array<CatalogImages>;
  /** fetch aggregated fields from the table: "catalog.images" */
  catalog_images_aggregate: CatalogImagesAggregate;
  /** fetch data from the table: "catalog.images" using primary key columns */
  catalog_images_by_pk?: Maybe<CatalogImages>;
  /** fetch data from the table in a streaming manner: "catalog.images" */
  catalog_images_stream: Array<CatalogImages>;
  /** fetch data from the table: "catalog.prices" */
  catalog_prices: Array<CatalogPrices>;
  /** fetch aggregated fields from the table: "catalog.prices" */
  catalog_prices_aggregate: CatalogPricesAggregate;
  /** fetch data from the table: "catalog.prices" using primary key columns */
  catalog_prices_by_pk?: Maybe<CatalogPrices>;
  /** fetch data from the table in a streaming manner: "catalog.prices" */
  catalog_prices_stream: Array<CatalogPrices>;
  /** fetch data from the table: "catalog.product_attributes" */
  catalog_product_attributes: Array<CatalogProductAttributes>;
  /** fetch aggregated fields from the table: "catalog.product_attributes" */
  catalog_product_attributes_aggregate: CatalogProductAttributesAggregate;
  /** fetch data from the table: "catalog.product_attributes" using primary key columns */
  catalog_product_attributes_by_pk?: Maybe<CatalogProductAttributes>;
  /** fetch data from the table in a streaming manner: "catalog.product_attributes" */
  catalog_product_attributes_stream: Array<CatalogProductAttributes>;
  /** fetch data from the table: "catalog.products" */
  catalog_products: Array<CatalogProducts>;
  /** fetch aggregated fields from the table: "catalog.products" */
  catalog_products_aggregate: CatalogProductsAggregate;
  /** fetch data from the table: "catalog.products" using primary key columns */
  catalog_products_by_pk?: Maybe<CatalogProducts>;
  /** fetch data from the table in a streaming manner: "catalog.products" */
  catalog_products_stream: Array<CatalogProducts>;
  /** fetch data from the table: "catalog.sizes" */
  catalog_sizes: Array<CatalogSizes>;
  /** fetch aggregated fields from the table: "catalog.sizes" */
  catalog_sizes_aggregate: CatalogSizesAggregate;
  /** fetch data from the table: "catalog.sizes" using primary key columns */
  catalog_sizes_by_pk?: Maybe<CatalogSizes>;
  /** fetch data from the table in a streaming manner: "catalog.sizes" */
  catalog_sizes_stream: Array<CatalogSizes>;
  /** fetch data from the table: "catalog.slugs" */
  catalog_slugs: Array<CatalogSlugs>;
  /** fetch aggregated fields from the table: "catalog.slugs" */
  catalog_slugs_aggregate: CatalogSlugsAggregate;
  /** fetch data from the table: "catalog.slugs" using primary key columns */
  catalog_slugs_by_pk?: Maybe<CatalogSlugs>;
  /** fetch data from the table in a streaming manner: "catalog.slugs" */
  catalog_slugs_stream: Array<CatalogSlugs>;
  /** fetch data from the table: "catalog.testimonials" */
  catalog_testimonials: Array<CatalogTestimonials>;
  /** fetch aggregated fields from the table: "catalog.testimonials" */
  catalog_testimonials_aggregate: CatalogTestimonialsAggregate;
  /** fetch data from the table: "catalog.testimonials" using primary key columns */
  catalog_testimonials_by_pk?: Maybe<CatalogTestimonials>;
  /** fetch data from the table in a streaming manner: "catalog.testimonials" */
  catalog_testimonials_stream: Array<CatalogTestimonials>;
  /** fetch data from the table: "common.addresses" */
  common_addresses: Array<CommonAddresses>;
  /** fetch aggregated fields from the table: "common.addresses" */
  common_addresses_aggregate: CommonAddressesAggregate;
  /** fetch data from the table: "common.addresses" using primary key columns */
  common_addresses_by_pk?: Maybe<CommonAddresses>;
  /** fetch data from the table in a streaming manner: "common.addresses" */
  common_addresses_stream: Array<CommonAddresses>;
  /** fetch data from the table: "common.countries" */
  common_countries: Array<CommonCountries>;
  /** fetch aggregated fields from the table: "common.countries" */
  common_countries_aggregate: CommonCountriesAggregate;
  /** fetch data from the table: "common.countries" using primary key columns */
  common_countries_by_pk?: Maybe<CommonCountries>;
  /** fetch data from the table in a streaming manner: "common.countries" */
  common_countries_stream: Array<CommonCountries>;
  /** fetch data from the table: "common.email" */
  common_email: Array<CommonEmail>;
  /** fetch aggregated fields from the table: "common.email" */
  common_email_aggregate: CommonEmailAggregate;
  /** fetch data from the table: "common.email" using primary key columns */
  common_email_by_pk?: Maybe<CommonEmail>;
  /** fetch data from the table in a streaming manner: "common.email" */
  common_email_stream: Array<CommonEmail>;
  /** fetch data from the table: "enums.order_statuses" */
  enums_order_statuses: Array<EnumsOrderStatuses>;
  /** fetch aggregated fields from the table: "enums.order_statuses" */
  enums_order_statuses_aggregate: EnumsOrderStatusesAggregate;
  /** fetch data from the table: "enums.order_statuses" using primary key columns */
  enums_order_statuses_by_pk?: Maybe<EnumsOrderStatuses>;
  /** fetch data from the table in a streaming manner: "enums.order_statuses" */
  enums_order_statuses_stream: Array<EnumsOrderStatuses>;
  /** fetch data from the table: "enums.task_statuses" */
  enums_task_statuses: Array<EnumsTaskStatuses>;
  /** fetch aggregated fields from the table: "enums.task_statuses" */
  enums_task_statuses_aggregate: EnumsTaskStatusesAggregate;
  /** fetch data from the table: "enums.task_statuses" using primary key columns */
  enums_task_statuses_by_pk?: Maybe<EnumsTaskStatuses>;
  /** fetch data from the table in a streaming manner: "enums.task_statuses" */
  enums_task_statuses_stream: Array<EnumsTaskStatuses>;
  /** fetch data from the table: "enums.task_types" */
  enums_task_types: Array<EnumsTaskTypes>;
  /** fetch aggregated fields from the table: "enums.task_types" */
  enums_task_types_aggregate: EnumsTaskTypesAggregate;
  /** fetch data from the table: "enums.task_types" using primary key columns */
  enums_task_types_by_pk?: Maybe<EnumsTaskTypes>;
  /** fetch data from the table in a streaming manner: "enums.task_types" */
  enums_task_types_stream: Array<EnumsTaskTypes>;
  /** fetch data from the table: "logs.order_logs" */
  logs_order_logs: Array<LogsOrderLogs>;
  /** fetch aggregated fields from the table: "logs.order_logs" */
  logs_order_logs_aggregate: LogsOrderLogsAggregate;
  /** fetch data from the table: "logs.order_logs" using primary key columns */
  logs_order_logs_by_pk?: Maybe<LogsOrderLogs>;
  /** fetch data from the table in a streaming manner: "logs.order_logs" */
  logs_order_logs_stream: Array<LogsOrderLogs>;
  /** fetch data from the table: "sales.item_configurations" */
  sales_item_configurations: Array<SalesItemConfigurations>;
  /** fetch aggregated fields from the table: "sales.item_configurations" */
  sales_item_configurations_aggregate: SalesItemConfigurationsAggregate;
  /** fetch data from the table: "sales.item_configurations" using primary key columns */
  sales_item_configurations_by_pk?: Maybe<SalesItemConfigurations>;
  /** fetch data from the table in a streaming manner: "sales.item_configurations" */
  sales_item_configurations_stream: Array<SalesItemConfigurations>;
  /** fetch data from the table: "sales.items" */
  sales_items: Array<SalesItems>;
  /** fetch aggregated fields from the table: "sales.items" */
  sales_items_aggregate: SalesItemsAggregate;
  /** fetch data from the table: "sales.items" using primary key columns */
  sales_items_by_pk?: Maybe<SalesItems>;
  /** fetch data from the table in a streaming manner: "sales.items" */
  sales_items_stream: Array<SalesItems>;
  /** fetch data from the table: "sales.orders" */
  sales_orders: Array<SalesOrders>;
  /** fetch aggregated fields from the table: "sales.orders" */
  sales_orders_aggregate: SalesOrdersAggregate;
  /** fetch data from the table: "sales.orders" using primary key columns */
  sales_orders_by_pk?: Maybe<SalesOrders>;
  /** fetch data from the table in a streaming manner: "sales.orders" */
  sales_orders_stream: Array<SalesOrders>;
  /** fetch data from the table: "sales.tasks" */
  sales_tasks: Array<SalesTasks>;
  /** fetch aggregated fields from the table: "sales.tasks" */
  sales_tasks_aggregate: SalesTasksAggregate;
  /** fetch data from the table: "sales.tasks" using primary key columns */
  sales_tasks_by_pk?: Maybe<SalesTasks>;
  /** fetch data from the table in a streaming manner: "sales.tasks" */
  sales_tasks_stream: Array<SalesTasks>;
  /** fetch data from the table: "support.conversation_threads" */
  support_conversation_threads: Array<SupportConversationThreads>;
  /** fetch aggregated fields from the table: "support.conversation_threads" */
  support_conversation_threads_aggregate: SupportConversationThreadsAggregate;
  /** fetch data from the table: "support.conversation_threads" using primary key columns */
  support_conversation_threads_by_pk?: Maybe<SupportConversationThreads>;
  /** fetch data from the table in a streaming manner: "support.conversation_threads" */
  support_conversation_threads_stream: Array<SupportConversationThreads>;
  /** fetch data from the table: "users.customers" */
  users_customers: Array<UsersCustomers>;
  /** fetch aggregated fields from the table: "users.customers" */
  users_customers_aggregate: UsersCustomersAggregate;
  /** fetch data from the table: "users.customers" using primary key columns */
  users_customers_by_pk?: Maybe<UsersCustomers>;
  /** fetch data from the table in a streaming manner: "users.customers" */
  users_customers_stream: Array<UsersCustomers>;
  /** fetch data from the table: "users.staff" */
  users_staff: Array<UsersStaff>;
  /** fetch aggregated fields from the table: "users.staff" */
  users_staff_aggregate: UsersStaffAggregate;
  /** fetch data from the table: "users.staff" using primary key columns */
  users_staff_by_pk?: Maybe<UsersStaff>;
  /** fetch data from the table in a streaming manner: "users.staff" */
  users_staff_stream: Array<UsersStaff>;
  /** fetch data from the table: "users.users" */
  users_users: Array<UsersUsers>;
  /** fetch aggregated fields from the table: "users.users" */
  users_users_aggregate: UsersUsersAggregate;
  /** fetch data from the table: "users.users" using primary key columns */
  users_users_by_pk?: Maybe<UsersUsers>;
  /** fetch data from the table in a streaming manner: "users.users" */
  users_users_stream: Array<UsersUsers>;
};


export type SubscriptionRootCatalogAttributesArgs = {
  distinct_on?: InputMaybe<Array<CatalogAttributesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAttributesOrderBy>>;
  where?: InputMaybe<CatalogAttributesBoolExp>;
};


export type SubscriptionRootCatalogAttributesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogAttributesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAttributesOrderBy>>;
  where?: InputMaybe<CatalogAttributesBoolExp>;
};


export type SubscriptionRootCatalogAttributesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootCatalogAttributesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CatalogAttributesStreamCursorInput>>;
  where?: InputMaybe<CatalogAttributesBoolExp>;
};


export type SubscriptionRootCatalogAvatarCountriesArgs = {
  distinct_on?: InputMaybe<Array<CatalogAvatarCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAvatarCountriesOrderBy>>;
  where?: InputMaybe<CatalogAvatarCountriesBoolExp>;
};


export type SubscriptionRootCatalogAvatarCountriesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogAvatarCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAvatarCountriesOrderBy>>;
  where?: InputMaybe<CatalogAvatarCountriesBoolExp>;
};


export type SubscriptionRootCatalogAvatarCountriesByPkArgs = {
  country_id: Scalars['Int']['input'];
  product_avatar_id: Scalars['Int']['input'];
};


export type SubscriptionRootCatalogAvatarCountriesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CatalogAvatarCountriesStreamCursorInput>>;
  where?: InputMaybe<CatalogAvatarCountriesBoolExp>;
};


export type SubscriptionRootCatalogAvatarsArgs = {
  distinct_on?: InputMaybe<Array<CatalogAvatarsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAvatarsOrderBy>>;
  where?: InputMaybe<CatalogAvatarsBoolExp>;
};


export type SubscriptionRootCatalogAvatarsAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogAvatarsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogAvatarsOrderBy>>;
  where?: InputMaybe<CatalogAvatarsBoolExp>;
};


export type SubscriptionRootCatalogAvatarsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootCatalogAvatarsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CatalogAvatarsStreamCursorInput>>;
  where?: InputMaybe<CatalogAvatarsBoolExp>;
};


export type SubscriptionRootCatalogBackgroundCountriesArgs = {
  distinct_on?: InputMaybe<Array<CatalogBackgroundCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogBackgroundCountriesOrderBy>>;
  where?: InputMaybe<CatalogBackgroundCountriesBoolExp>;
};


export type SubscriptionRootCatalogBackgroundCountriesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogBackgroundCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogBackgroundCountriesOrderBy>>;
  where?: InputMaybe<CatalogBackgroundCountriesBoolExp>;
};


export type SubscriptionRootCatalogBackgroundCountriesByPkArgs = {
  background_id: Scalars['Int']['input'];
  country_id: Scalars['Int']['input'];
};


export type SubscriptionRootCatalogBackgroundCountriesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CatalogBackgroundCountriesStreamCursorInput>>;
  where?: InputMaybe<CatalogBackgroundCountriesBoolExp>;
};


export type SubscriptionRootCatalogBackgroundsArgs = {
  distinct_on?: InputMaybe<Array<CatalogBackgroundsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogBackgroundsOrderBy>>;
  where?: InputMaybe<CatalogBackgroundsBoolExp>;
};


export type SubscriptionRootCatalogBackgroundsAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogBackgroundsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogBackgroundsOrderBy>>;
  where?: InputMaybe<CatalogBackgroundsBoolExp>;
};


export type SubscriptionRootCatalogBackgroundsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootCatalogBackgroundsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CatalogBackgroundsStreamCursorInput>>;
  where?: InputMaybe<CatalogBackgroundsBoolExp>;
};


export type SubscriptionRootCatalogCategoriesArgs = {
  distinct_on?: InputMaybe<Array<CatalogCategoriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogCategoriesOrderBy>>;
  where?: InputMaybe<CatalogCategoriesBoolExp>;
};


export type SubscriptionRootCatalogCategoriesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogCategoriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogCategoriesOrderBy>>;
  where?: InputMaybe<CatalogCategoriesBoolExp>;
};


export type SubscriptionRootCatalogCategoriesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootCatalogCategoriesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CatalogCategoriesStreamCursorInput>>;
  where?: InputMaybe<CatalogCategoriesBoolExp>;
};


export type SubscriptionRootCatalogImagesArgs = {
  distinct_on?: InputMaybe<Array<CatalogImagesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogImagesOrderBy>>;
  where?: InputMaybe<CatalogImagesBoolExp>;
};


export type SubscriptionRootCatalogImagesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogImagesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogImagesOrderBy>>;
  where?: InputMaybe<CatalogImagesBoolExp>;
};


export type SubscriptionRootCatalogImagesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootCatalogImagesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CatalogImagesStreamCursorInput>>;
  where?: InputMaybe<CatalogImagesBoolExp>;
};


export type SubscriptionRootCatalogPricesArgs = {
  distinct_on?: InputMaybe<Array<CatalogPricesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogPricesOrderBy>>;
  where?: InputMaybe<CatalogPricesBoolExp>;
};


export type SubscriptionRootCatalogPricesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogPricesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogPricesOrderBy>>;
  where?: InputMaybe<CatalogPricesBoolExp>;
};


export type SubscriptionRootCatalogPricesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootCatalogPricesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CatalogPricesStreamCursorInput>>;
  where?: InputMaybe<CatalogPricesBoolExp>;
};


export type SubscriptionRootCatalogProductAttributesArgs = {
  distinct_on?: InputMaybe<Array<CatalogProductAttributesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogProductAttributesOrderBy>>;
  where?: InputMaybe<CatalogProductAttributesBoolExp>;
};


export type SubscriptionRootCatalogProductAttributesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogProductAttributesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogProductAttributesOrderBy>>;
  where?: InputMaybe<CatalogProductAttributesBoolExp>;
};


export type SubscriptionRootCatalogProductAttributesByPkArgs = {
  attribute_id: Scalars['Int']['input'];
  product_id: Scalars['Int']['input'];
};


export type SubscriptionRootCatalogProductAttributesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CatalogProductAttributesStreamCursorInput>>;
  where?: InputMaybe<CatalogProductAttributesBoolExp>;
};


export type SubscriptionRootCatalogProductsArgs = {
  distinct_on?: InputMaybe<Array<CatalogProductsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogProductsOrderBy>>;
  where?: InputMaybe<CatalogProductsBoolExp>;
};


export type SubscriptionRootCatalogProductsAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogProductsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogProductsOrderBy>>;
  where?: InputMaybe<CatalogProductsBoolExp>;
};


export type SubscriptionRootCatalogProductsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootCatalogProductsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CatalogProductsStreamCursorInput>>;
  where?: InputMaybe<CatalogProductsBoolExp>;
};


export type SubscriptionRootCatalogSizesArgs = {
  distinct_on?: InputMaybe<Array<CatalogSizesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogSizesOrderBy>>;
  where?: InputMaybe<CatalogSizesBoolExp>;
};


export type SubscriptionRootCatalogSizesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogSizesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogSizesOrderBy>>;
  where?: InputMaybe<CatalogSizesBoolExp>;
};


export type SubscriptionRootCatalogSizesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootCatalogSizesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CatalogSizesStreamCursorInput>>;
  where?: InputMaybe<CatalogSizesBoolExp>;
};


export type SubscriptionRootCatalogSlugsArgs = {
  distinct_on?: InputMaybe<Array<CatalogSlugsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogSlugsOrderBy>>;
  where?: InputMaybe<CatalogSlugsBoolExp>;
};


export type SubscriptionRootCatalogSlugsAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogSlugsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogSlugsOrderBy>>;
  where?: InputMaybe<CatalogSlugsBoolExp>;
};


export type SubscriptionRootCatalogSlugsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootCatalogSlugsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CatalogSlugsStreamCursorInput>>;
  where?: InputMaybe<CatalogSlugsBoolExp>;
};


export type SubscriptionRootCatalogTestimonialsArgs = {
  distinct_on?: InputMaybe<Array<CatalogTestimonialsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogTestimonialsOrderBy>>;
  where?: InputMaybe<CatalogTestimonialsBoolExp>;
};


export type SubscriptionRootCatalogTestimonialsAggregateArgs = {
  distinct_on?: InputMaybe<Array<CatalogTestimonialsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CatalogTestimonialsOrderBy>>;
  where?: InputMaybe<CatalogTestimonialsBoolExp>;
};


export type SubscriptionRootCatalogTestimonialsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootCatalogTestimonialsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CatalogTestimonialsStreamCursorInput>>;
  where?: InputMaybe<CatalogTestimonialsBoolExp>;
};


export type SubscriptionRootCommonAddressesArgs = {
  distinct_on?: InputMaybe<Array<CommonAddressesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CommonAddressesOrderBy>>;
  where?: InputMaybe<CommonAddressesBoolExp>;
};


export type SubscriptionRootCommonAddressesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CommonAddressesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CommonAddressesOrderBy>>;
  where?: InputMaybe<CommonAddressesBoolExp>;
};


export type SubscriptionRootCommonAddressesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootCommonAddressesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CommonAddressesStreamCursorInput>>;
  where?: InputMaybe<CommonAddressesBoolExp>;
};


export type SubscriptionRootCommonCountriesArgs = {
  distinct_on?: InputMaybe<Array<CommonCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CommonCountriesOrderBy>>;
  where?: InputMaybe<CommonCountriesBoolExp>;
};


export type SubscriptionRootCommonCountriesAggregateArgs = {
  distinct_on?: InputMaybe<Array<CommonCountriesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CommonCountriesOrderBy>>;
  where?: InputMaybe<CommonCountriesBoolExp>;
};


export type SubscriptionRootCommonCountriesByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootCommonCountriesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CommonCountriesStreamCursorInput>>;
  where?: InputMaybe<CommonCountriesBoolExp>;
};


export type SubscriptionRootCommonEmailArgs = {
  distinct_on?: InputMaybe<Array<CommonEmailSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CommonEmailOrderBy>>;
  where?: InputMaybe<CommonEmailBoolExp>;
};


export type SubscriptionRootCommonEmailAggregateArgs = {
  distinct_on?: InputMaybe<Array<CommonEmailSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<CommonEmailOrderBy>>;
  where?: InputMaybe<CommonEmailBoolExp>;
};


export type SubscriptionRootCommonEmailByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootCommonEmailStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<CommonEmailStreamCursorInput>>;
  where?: InputMaybe<CommonEmailBoolExp>;
};


export type SubscriptionRootEnumsOrderStatusesArgs = {
  distinct_on?: InputMaybe<Array<EnumsOrderStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EnumsOrderStatusesOrderBy>>;
  where?: InputMaybe<EnumsOrderStatusesBoolExp>;
};


export type SubscriptionRootEnumsOrderStatusesAggregateArgs = {
  distinct_on?: InputMaybe<Array<EnumsOrderStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EnumsOrderStatusesOrderBy>>;
  where?: InputMaybe<EnumsOrderStatusesBoolExp>;
};


export type SubscriptionRootEnumsOrderStatusesByPkArgs = {
  status: Scalars['String']['input'];
};


export type SubscriptionRootEnumsOrderStatusesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<EnumsOrderStatusesStreamCursorInput>>;
  where?: InputMaybe<EnumsOrderStatusesBoolExp>;
};


export type SubscriptionRootEnumsTaskStatusesArgs = {
  distinct_on?: InputMaybe<Array<EnumsTaskStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EnumsTaskStatusesOrderBy>>;
  where?: InputMaybe<EnumsTaskStatusesBoolExp>;
};


export type SubscriptionRootEnumsTaskStatusesAggregateArgs = {
  distinct_on?: InputMaybe<Array<EnumsTaskStatusesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EnumsTaskStatusesOrderBy>>;
  where?: InputMaybe<EnumsTaskStatusesBoolExp>;
};


export type SubscriptionRootEnumsTaskStatusesByPkArgs = {
  status: Scalars['String']['input'];
};


export type SubscriptionRootEnumsTaskStatusesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<EnumsTaskStatusesStreamCursorInput>>;
  where?: InputMaybe<EnumsTaskStatusesBoolExp>;
};


export type SubscriptionRootEnumsTaskTypesArgs = {
  distinct_on?: InputMaybe<Array<EnumsTaskTypesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EnumsTaskTypesOrderBy>>;
  where?: InputMaybe<EnumsTaskTypesBoolExp>;
};


export type SubscriptionRootEnumsTaskTypesAggregateArgs = {
  distinct_on?: InputMaybe<Array<EnumsTaskTypesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<EnumsTaskTypesOrderBy>>;
  where?: InputMaybe<EnumsTaskTypesBoolExp>;
};


export type SubscriptionRootEnumsTaskTypesByPkArgs = {
  type: Scalars['String']['input'];
};


export type SubscriptionRootEnumsTaskTypesStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<EnumsTaskTypesStreamCursorInput>>;
  where?: InputMaybe<EnumsTaskTypesBoolExp>;
};


export type SubscriptionRootLogsOrderLogsArgs = {
  distinct_on?: InputMaybe<Array<LogsOrderLogsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<LogsOrderLogsOrderBy>>;
  where?: InputMaybe<LogsOrderLogsBoolExp>;
};


export type SubscriptionRootLogsOrderLogsAggregateArgs = {
  distinct_on?: InputMaybe<Array<LogsOrderLogsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<LogsOrderLogsOrderBy>>;
  where?: InputMaybe<LogsOrderLogsBoolExp>;
};


export type SubscriptionRootLogsOrderLogsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootLogsOrderLogsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<LogsOrderLogsStreamCursorInput>>;
  where?: InputMaybe<LogsOrderLogsBoolExp>;
};


export type SubscriptionRootSalesItemConfigurationsArgs = {
  distinct_on?: InputMaybe<Array<SalesItemConfigurationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesItemConfigurationsOrderBy>>;
  where?: InputMaybe<SalesItemConfigurationsBoolExp>;
};


export type SubscriptionRootSalesItemConfigurationsAggregateArgs = {
  distinct_on?: InputMaybe<Array<SalesItemConfigurationsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesItemConfigurationsOrderBy>>;
  where?: InputMaybe<SalesItemConfigurationsBoolExp>;
};


export type SubscriptionRootSalesItemConfigurationsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootSalesItemConfigurationsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SalesItemConfigurationsStreamCursorInput>>;
  where?: InputMaybe<SalesItemConfigurationsBoolExp>;
};


export type SubscriptionRootSalesItemsArgs = {
  distinct_on?: InputMaybe<Array<SalesItemsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesItemsOrderBy>>;
  where?: InputMaybe<SalesItemsBoolExp>;
};


export type SubscriptionRootSalesItemsAggregateArgs = {
  distinct_on?: InputMaybe<Array<SalesItemsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesItemsOrderBy>>;
  where?: InputMaybe<SalesItemsBoolExp>;
};


export type SubscriptionRootSalesItemsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootSalesItemsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SalesItemsStreamCursorInput>>;
  where?: InputMaybe<SalesItemsBoolExp>;
};


export type SubscriptionRootSalesOrdersArgs = {
  distinct_on?: InputMaybe<Array<SalesOrdersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesOrdersOrderBy>>;
  where?: InputMaybe<SalesOrdersBoolExp>;
};


export type SubscriptionRootSalesOrdersAggregateArgs = {
  distinct_on?: InputMaybe<Array<SalesOrdersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesOrdersOrderBy>>;
  where?: InputMaybe<SalesOrdersBoolExp>;
};


export type SubscriptionRootSalesOrdersByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootSalesOrdersStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SalesOrdersStreamCursorInput>>;
  where?: InputMaybe<SalesOrdersBoolExp>;
};


export type SubscriptionRootSalesTasksArgs = {
  distinct_on?: InputMaybe<Array<SalesTasksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesTasksOrderBy>>;
  where?: InputMaybe<SalesTasksBoolExp>;
};


export type SubscriptionRootSalesTasksAggregateArgs = {
  distinct_on?: InputMaybe<Array<SalesTasksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesTasksOrderBy>>;
  where?: InputMaybe<SalesTasksBoolExp>;
};


export type SubscriptionRootSalesTasksByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootSalesTasksStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SalesTasksStreamCursorInput>>;
  where?: InputMaybe<SalesTasksBoolExp>;
};


export type SubscriptionRootSupportConversationThreadsArgs = {
  distinct_on?: InputMaybe<Array<SupportConversationThreadsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SupportConversationThreadsOrderBy>>;
  where?: InputMaybe<SupportConversationThreadsBoolExp>;
};


export type SubscriptionRootSupportConversationThreadsAggregateArgs = {
  distinct_on?: InputMaybe<Array<SupportConversationThreadsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SupportConversationThreadsOrderBy>>;
  where?: InputMaybe<SupportConversationThreadsBoolExp>;
};


export type SubscriptionRootSupportConversationThreadsByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootSupportConversationThreadsStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SupportConversationThreadsStreamCursorInput>>;
  where?: InputMaybe<SupportConversationThreadsBoolExp>;
};


export type SubscriptionRootUsersCustomersArgs = {
  distinct_on?: InputMaybe<Array<UsersCustomersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersCustomersOrderBy>>;
  where?: InputMaybe<UsersCustomersBoolExp>;
};


export type SubscriptionRootUsersCustomersAggregateArgs = {
  distinct_on?: InputMaybe<Array<UsersCustomersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersCustomersOrderBy>>;
  where?: InputMaybe<UsersCustomersBoolExp>;
};


export type SubscriptionRootUsersCustomersByPkArgs = {
  id: Scalars['Int']['input'];
};


export type SubscriptionRootUsersCustomersStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UsersCustomersStreamCursorInput>>;
  where?: InputMaybe<UsersCustomersBoolExp>;
};


export type SubscriptionRootUsersStaffArgs = {
  distinct_on?: InputMaybe<Array<UsersStaffSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersStaffOrderBy>>;
  where?: InputMaybe<UsersStaffBoolExp>;
};


export type SubscriptionRootUsersStaffAggregateArgs = {
  distinct_on?: InputMaybe<Array<UsersStaffSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersStaffOrderBy>>;
  where?: InputMaybe<UsersStaffBoolExp>;
};


export type SubscriptionRootUsersStaffByPkArgs = {
  staff_detail_id: Scalars['Int']['input'];
};


export type SubscriptionRootUsersStaffStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UsersStaffStreamCursorInput>>;
  where?: InputMaybe<UsersStaffBoolExp>;
};


export type SubscriptionRootUsersUsersArgs = {
  distinct_on?: InputMaybe<Array<UsersUsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersUsersOrderBy>>;
  where?: InputMaybe<UsersUsersBoolExp>;
};


export type SubscriptionRootUsersUsersAggregateArgs = {
  distinct_on?: InputMaybe<Array<UsersUsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<UsersUsersOrderBy>>;
  where?: InputMaybe<UsersUsersBoolExp>;
};


export type SubscriptionRootUsersUsersByPkArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionRootUsersUsersStreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UsersUsersStreamCursorInput>>;
  where?: InputMaybe<UsersUsersBoolExp>;
};

/** columns and relationships of "support.conversation_threads" */
export type SupportConversationThreads = {
  __typename?: 'support_conversation_threads';
  conversation_id: Scalars['String']['output'];
  id?: Scalars['Int']['output'];
  thread_id: Scalars['String']['output'];
};

/** aggregated selection of "support.conversation_threads" */
export type SupportConversationThreadsAggregate = {
  __typename?: 'support_conversation_threads_aggregate';
  aggregate?: Maybe<SupportConversationThreadsAggregateFields>;
  nodes: Array<SupportConversationThreads>;
};

/** aggregate fields of "support.conversation_threads" */
export type SupportConversationThreadsAggregateFields = {
  __typename?: 'support_conversation_threads_aggregate_fields';
  avg?: Maybe<SupportConversationThreadsAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<SupportConversationThreadsMaxFields>;
  min?: Maybe<SupportConversationThreadsMinFields>;
  stddev?: Maybe<SupportConversationThreadsStddevFields>;
  stddev_pop?: Maybe<SupportConversationThreadsStddevPopFields>;
  stddev_samp?: Maybe<SupportConversationThreadsStddevSampFields>;
  sum?: Maybe<SupportConversationThreadsSumFields>;
  var_pop?: Maybe<SupportConversationThreadsVarPopFields>;
  var_samp?: Maybe<SupportConversationThreadsVarSampFields>;
  variance?: Maybe<SupportConversationThreadsVarianceFields>;
};


/** aggregate fields of "support.conversation_threads" */
export type SupportConversationThreadsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<SupportConversationThreadsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type SupportConversationThreadsAvgFields = {
  __typename?: 'support_conversation_threads_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "support.conversation_threads". All fields are combined with a logical 'AND'. */
export type SupportConversationThreadsBoolExp = {
  _and?: InputMaybe<Array<SupportConversationThreadsBoolExp>>;
  _not?: InputMaybe<SupportConversationThreadsBoolExp>;
  _or?: InputMaybe<Array<SupportConversationThreadsBoolExp>>;
  conversation_id?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  thread_id?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "support.conversation_threads" */
export enum SupportConversationThreadsConstraint {
  /** unique or primary key constraint on columns "id" */
  ConversationThreadsPkey = 'conversation_threads_pkey'
}

/** input type for incrementing numeric columns in table "support.conversation_threads" */
export type SupportConversationThreadsIncInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "support.conversation_threads" */
export type SupportConversationThreadsInsertInput = {
  conversation_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  thread_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type SupportConversationThreadsMaxFields = {
  __typename?: 'support_conversation_threads_max_fields';
  conversation_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  thread_id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type SupportConversationThreadsMinFields = {
  __typename?: 'support_conversation_threads_min_fields';
  conversation_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  thread_id?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "support.conversation_threads" */
export type SupportConversationThreadsMutationResponse = {
  __typename?: 'support_conversation_threads_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<SupportConversationThreads>;
};

/** on_conflict condition type for table "support.conversation_threads" */
export type SupportConversationThreadsOnConflict = {
  constraint: SupportConversationThreadsConstraint;
  update_columns?: Array<SupportConversationThreadsUpdateColumn>;
  where?: InputMaybe<SupportConversationThreadsBoolExp>;
};

/** Ordering options when selecting data from "support.conversation_threads". */
export type SupportConversationThreadsOrderBy = {
  conversation_id?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  thread_id?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: support.conversation_threads */
export type SupportConversationThreadsPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "support.conversation_threads" */
export enum SupportConversationThreadsSelectColumn {
  /** column name */
  ConversationId = 'conversation_id',
  /** column name */
  Id = 'id',
  /** column name */
  ThreadId = 'thread_id'
}

/** input type for updating data in table "support.conversation_threads" */
export type SupportConversationThreadsSetInput = {
  conversation_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  thread_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type SupportConversationThreadsStddevFields = {
  __typename?: 'support_conversation_threads_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type SupportConversationThreadsStddevPopFields = {
  __typename?: 'support_conversation_threads_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type SupportConversationThreadsStddevSampFields = {
  __typename?: 'support_conversation_threads_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "support_conversation_threads" */
export type SupportConversationThreadsStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: SupportConversationThreadsStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SupportConversationThreadsStreamCursorValueInput = {
  conversation_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  thread_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type SupportConversationThreadsSumFields = {
  __typename?: 'support_conversation_threads_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "support.conversation_threads" */
export enum SupportConversationThreadsUpdateColumn {
  /** column name */
  ConversationId = 'conversation_id',
  /** column name */
  Id = 'id',
  /** column name */
  ThreadId = 'thread_id'
}

export type SupportConversationThreadsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<SupportConversationThreadsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SupportConversationThreadsSetInput>;
  /** filter the rows which have to be updated */
  where: SupportConversationThreadsBoolExp;
};

/** aggregate var_pop on columns */
export type SupportConversationThreadsVarPopFields = {
  __typename?: 'support_conversation_threads_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type SupportConversationThreadsVarSampFields = {
  __typename?: 'support_conversation_threads_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type SupportConversationThreadsVarianceFields = {
  __typename?: 'support_conversation_threads_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type TimestampComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "users.customers" */
export type UsersCustomers = {
  __typename?: 'users_customers';
  /** An object relationship */
  billing_address?: Maybe<CommonAddresses>;
  billing_address_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Scalars['Int']['output'];
  phone_number: Scalars['String']['output'];
  /** An object relationship */
  shipping_address?: Maybe<CommonAddresses>;
  shipping_address_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id: Scalars['String']['output'];
};

/** aggregated selection of "users.customers" */
export type UsersCustomersAggregate = {
  __typename?: 'users_customers_aggregate';
  aggregate?: Maybe<UsersCustomersAggregateFields>;
  nodes: Array<UsersCustomers>;
};

/** aggregate fields of "users.customers" */
export type UsersCustomersAggregateFields = {
  __typename?: 'users_customers_aggregate_fields';
  avg?: Maybe<UsersCustomersAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<UsersCustomersMaxFields>;
  min?: Maybe<UsersCustomersMinFields>;
  stddev?: Maybe<UsersCustomersStddevFields>;
  stddev_pop?: Maybe<UsersCustomersStddevPopFields>;
  stddev_samp?: Maybe<UsersCustomersStddevSampFields>;
  sum?: Maybe<UsersCustomersSumFields>;
  var_pop?: Maybe<UsersCustomersVarPopFields>;
  var_samp?: Maybe<UsersCustomersVarSampFields>;
  variance?: Maybe<UsersCustomersVarianceFields>;
};


/** aggregate fields of "users.customers" */
export type UsersCustomersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UsersCustomersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type UsersCustomersAvgFields = {
  __typename?: 'users_customers_avg_fields';
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "users.customers". All fields are combined with a logical 'AND'. */
export type UsersCustomersBoolExp = {
  _and?: InputMaybe<Array<UsersCustomersBoolExp>>;
  _not?: InputMaybe<UsersCustomersBoolExp>;
  _or?: InputMaybe<Array<UsersCustomersBoolExp>>;
  billing_address?: InputMaybe<CommonAddressesBoolExp>;
  billing_address_id?: InputMaybe<IntComparisonExp>;
  created_at?: InputMaybe<TimestampComparisonExp>;
  id?: InputMaybe<IntComparisonExp>;
  phone_number?: InputMaybe<StringComparisonExp>;
  shipping_address?: InputMaybe<CommonAddressesBoolExp>;
  shipping_address_id?: InputMaybe<IntComparisonExp>;
  updated_at?: InputMaybe<TimestampComparisonExp>;
  user_id?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "users.customers" */
export enum UsersCustomersConstraint {
  /** unique or primary key constraint on columns "id" */
  CustomerProfilesPkey = 'customer_profiles_pkey'
}

/** input type for incrementing numeric columns in table "users.customers" */
export type UsersCustomersIncInput = {
  billing_address_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  shipping_address_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "users.customers" */
export type UsersCustomersInsertInput = {
  billing_address?: InputMaybe<CommonAddressesObjRelInsertInput>;
  billing_address_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  shipping_address?: InputMaybe<CommonAddressesObjRelInsertInput>;
  shipping_address_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type UsersCustomersMaxFields = {
  __typename?: 'users_customers_max_fields';
  billing_address_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  shipping_address_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type UsersCustomersMinFields = {
  __typename?: 'users_customers_min_fields';
  billing_address_id?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  shipping_address_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "users.customers" */
export type UsersCustomersMutationResponse = {
  __typename?: 'users_customers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<UsersCustomers>;
};

/** on_conflict condition type for table "users.customers" */
export type UsersCustomersOnConflict = {
  constraint: UsersCustomersConstraint;
  update_columns?: Array<UsersCustomersUpdateColumn>;
  where?: InputMaybe<UsersCustomersBoolExp>;
};

/** Ordering options when selecting data from "users.customers". */
export type UsersCustomersOrderBy = {
  billing_address?: InputMaybe<CommonAddressesOrderBy>;
  billing_address_id?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  phone_number?: InputMaybe<OrderBy>;
  shipping_address?: InputMaybe<CommonAddressesOrderBy>;
  shipping_address_id?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
  user_id?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: users.customers */
export type UsersCustomersPkColumnsInput = {
  id: Scalars['Int']['input'];
};

/** select columns of table "users.customers" */
export enum UsersCustomersSelectColumn {
  /** column name */
  BillingAddressId = 'billing_address_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  PhoneNumber = 'phone_number',
  /** column name */
  ShippingAddressId = 'shipping_address_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "users.customers" */
export type UsersCustomersSetInput = {
  billing_address_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  shipping_address_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type UsersCustomersStddevFields = {
  __typename?: 'users_customers_stddev_fields';
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type UsersCustomersStddevPopFields = {
  __typename?: 'users_customers_stddev_pop_fields';
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type UsersCustomersStddevSampFields = {
  __typename?: 'users_customers_stddev_samp_fields';
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "users_customers" */
export type UsersCustomersStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: UsersCustomersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UsersCustomersStreamCursorValueInput = {
  billing_address_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  shipping_address_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type UsersCustomersSumFields = {
  __typename?: 'users_customers_sum_fields';
  billing_address_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  shipping_address_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "users.customers" */
export enum UsersCustomersUpdateColumn {
  /** column name */
  BillingAddressId = 'billing_address_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  PhoneNumber = 'phone_number',
  /** column name */
  ShippingAddressId = 'shipping_address_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type UsersCustomersUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<UsersCustomersIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersCustomersSetInput>;
  /** filter the rows which have to be updated */
  where: UsersCustomersBoolExp;
};

/** aggregate var_pop on columns */
export type UsersCustomersVarPopFields = {
  __typename?: 'users_customers_var_pop_fields';
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type UsersCustomersVarSampFields = {
  __typename?: 'users_customers_var_samp_fields';
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type UsersCustomersVarianceFields = {
  __typename?: 'users_customers_variance_fields';
  billing_address_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  shipping_address_id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "users.staff" */
export type UsersStaff = {
  __typename?: 'users_staff';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  hire_date?: Maybe<Scalars['date']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  staff_detail_id: Scalars['Int']['output'];
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id: Scalars['String']['output'];
};

/** aggregated selection of "users.staff" */
export type UsersStaffAggregate = {
  __typename?: 'users_staff_aggregate';
  aggregate?: Maybe<UsersStaffAggregateFields>;
  nodes: Array<UsersStaff>;
};

/** aggregate fields of "users.staff" */
export type UsersStaffAggregateFields = {
  __typename?: 'users_staff_aggregate_fields';
  avg?: Maybe<UsersStaffAvgFields>;
  count: Scalars['Int']['output'];
  max?: Maybe<UsersStaffMaxFields>;
  min?: Maybe<UsersStaffMinFields>;
  stddev?: Maybe<UsersStaffStddevFields>;
  stddev_pop?: Maybe<UsersStaffStddevPopFields>;
  stddev_samp?: Maybe<UsersStaffStddevSampFields>;
  sum?: Maybe<UsersStaffSumFields>;
  var_pop?: Maybe<UsersStaffVarPopFields>;
  var_samp?: Maybe<UsersStaffVarSampFields>;
  variance?: Maybe<UsersStaffVarianceFields>;
};


/** aggregate fields of "users.staff" */
export type UsersStaffAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UsersStaffSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type UsersStaffAvgFields = {
  __typename?: 'users_staff_avg_fields';
  staff_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "users.staff". All fields are combined with a logical 'AND'. */
export type UsersStaffBoolExp = {
  _and?: InputMaybe<Array<UsersStaffBoolExp>>;
  _not?: InputMaybe<UsersStaffBoolExp>;
  _or?: InputMaybe<Array<UsersStaffBoolExp>>;
  created_at?: InputMaybe<TimestampComparisonExp>;
  department?: InputMaybe<StringComparisonExp>;
  hire_date?: InputMaybe<DateComparisonExp>;
  position?: InputMaybe<StringComparisonExp>;
  staff_detail_id?: InputMaybe<IntComparisonExp>;
  updated_at?: InputMaybe<TimestampComparisonExp>;
  user_id?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "users.staff" */
export enum UsersStaffConstraint {
  /** unique or primary key constraint on columns "staff_detail_id" */
  StaffDetailsPkey = 'staff_details_pkey'
}

/** input type for incrementing numeric columns in table "users.staff" */
export type UsersStaffIncInput = {
  staff_detail_id?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "users.staff" */
export type UsersStaffInsertInput = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  hire_date?: InputMaybe<Scalars['date']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  staff_detail_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type UsersStaffMaxFields = {
  __typename?: 'users_staff_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  hire_date?: Maybe<Scalars['date']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  staff_detail_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type UsersStaffMinFields = {
  __typename?: 'users_staff_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  department?: Maybe<Scalars['String']['output']>;
  hire_date?: Maybe<Scalars['date']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  staff_detail_id?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "users.staff" */
export type UsersStaffMutationResponse = {
  __typename?: 'users_staff_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<UsersStaff>;
};

/** on_conflict condition type for table "users.staff" */
export type UsersStaffOnConflict = {
  constraint: UsersStaffConstraint;
  update_columns?: Array<UsersStaffUpdateColumn>;
  where?: InputMaybe<UsersStaffBoolExp>;
};

/** Ordering options when selecting data from "users.staff". */
export type UsersStaffOrderBy = {
  created_at?: InputMaybe<OrderBy>;
  department?: InputMaybe<OrderBy>;
  hire_date?: InputMaybe<OrderBy>;
  position?: InputMaybe<OrderBy>;
  staff_detail_id?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
  user_id?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: users.staff */
export type UsersStaffPkColumnsInput = {
  staff_detail_id: Scalars['Int']['input'];
};

/** select columns of table "users.staff" */
export enum UsersStaffSelectColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Department = 'department',
  /** column name */
  HireDate = 'hire_date',
  /** column name */
  Position = 'position',
  /** column name */
  StaffDetailId = 'staff_detail_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "users.staff" */
export type UsersStaffSetInput = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  hire_date?: InputMaybe<Scalars['date']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  staff_detail_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type UsersStaffStddevFields = {
  __typename?: 'users_staff_stddev_fields';
  staff_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type UsersStaffStddevPopFields = {
  __typename?: 'users_staff_stddev_pop_fields';
  staff_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type UsersStaffStddevSampFields = {
  __typename?: 'users_staff_stddev_samp_fields';
  staff_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "users_staff" */
export type UsersStaffStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: UsersStaffStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UsersStaffStreamCursorValueInput = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  department?: InputMaybe<Scalars['String']['input']>;
  hire_date?: InputMaybe<Scalars['date']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  staff_detail_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type UsersStaffSumFields = {
  __typename?: 'users_staff_sum_fields';
  staff_detail_id?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "users.staff" */
export enum UsersStaffUpdateColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Department = 'department',
  /** column name */
  HireDate = 'hire_date',
  /** column name */
  Position = 'position',
  /** column name */
  StaffDetailId = 'staff_detail_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type UsersStaffUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<UsersStaffIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersStaffSetInput>;
  /** filter the rows which have to be updated */
  where: UsersStaffBoolExp;
};

/** aggregate var_pop on columns */
export type UsersStaffVarPopFields = {
  __typename?: 'users_staff_var_pop_fields';
  staff_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type UsersStaffVarSampFields = {
  __typename?: 'users_staff_var_samp_fields';
  staff_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type UsersStaffVarianceFields = {
  __typename?: 'users_staff_variance_fields';
  staff_detail_id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "users.users" */
export type UsersUsers = {
  __typename?: 'users_users';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email: Scalars['String']['output'];
  /** auth0 user id */
  id?: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  orders?: Array<SalesOrders>;
    stripe_customer_id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};


/** columns and relationships of "users.users" */
export type UsersUsersOrdersArgs = {
  distinct_on?: InputMaybe<Array<SalesOrdersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesOrdersOrderBy>>;
  where?: InputMaybe<SalesOrdersBoolExp>;
};


/** columns and relationships of "users.users" */
export type UsersUsersOrdersAggregateArgs = {
  distinct_on?: InputMaybe<Array<SalesOrdersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<SalesOrdersOrderBy>>;
  where?: InputMaybe<SalesOrdersBoolExp>;
};

/** aggregated selection of "users.users" */
export type UsersUsersAggregate = {
  __typename?: 'users_users_aggregate';
  aggregate?: Maybe<UsersUsersAggregateFields>;
  nodes: Array<UsersUsers>;
};

/** aggregate fields of "users.users" */
export type UsersUsersAggregateFields = {
  __typename?: 'users_users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<UsersUsersMaxFields>;
  min?: Maybe<UsersUsersMinFields>;
};


/** aggregate fields of "users.users" */
export type UsersUsersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UsersUsersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users.users". All fields are combined with a logical 'AND'. */
export type UsersUsersBoolExp = {
  _and?: InputMaybe<Array<UsersUsersBoolExp>>;
  _not?: InputMaybe<UsersUsersBoolExp>;
  _or?: InputMaybe<Array<UsersUsersBoolExp>>;
  created_at?: InputMaybe<TimestampComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  orders?: InputMaybe<SalesOrdersBoolExp>;
  orders_aggregate?: InputMaybe<SalesOrdersAggregateBoolExp>;
  stripe_customer_id?: InputMaybe<StringComparisonExp>;
  updated_at?: InputMaybe<TimestampComparisonExp>;
};

/** unique or primary key constraints on table "users.users" */
export enum UsersUsersConstraint {
  /** unique or primary key constraint on columns "id" */
  UsersAuth0UserIdKey = 'users_auth0_user_id_key',
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users.users" */
export type UsersUsersInsertInput = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  /** auth0 user id */
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<SalesOrdersArrRelInsertInput>;
  stripe_customer_id?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type UsersUsersMaxFields = {
  __typename?: 'users_users_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  /** auth0 user id */
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  stripe_customer_id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type UsersUsersMinFields = {
  __typename?: 'users_users_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  /** auth0 user id */
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  stripe_customer_id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "users.users" */
export type UsersUsersMutationResponse = {
  __typename?: 'users_users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<UsersUsers>;
};

/** input type for inserting object relation for remote table "users.users" */
export type UsersUsersObjRelInsertInput = {
  data: UsersUsersInsertInput;
  /** upsert condition */
  on_conflict?: InputMaybe<UsersUsersOnConflict>;
};

/** on_conflict condition type for table "users.users" */
export type UsersUsersOnConflict = {
  constraint: UsersUsersConstraint;
  update_columns?: Array<UsersUsersUpdateColumn>;
  where?: InputMaybe<UsersUsersBoolExp>;
};

/** Ordering options when selecting data from "users.users". */
export type UsersUsersOrderBy = {
  created_at?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  orders_aggregate?: InputMaybe<SalesOrdersAggregateOrderBy>;
  stripe_customer_id?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: users.users */
export type UsersUsersPkColumnsInput = {
  /** auth0 user id */
  id: Scalars['String']['input'];
};

/** select columns of table "users.users" */
export enum UsersUsersSelectColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  StripeCustomerId = 'stripe_customer_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "users.users" */
export type UsersUsersSetInput = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  /** auth0 user id */
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  stripe_customer_id?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** Streaming cursor of the table "users_users" */
export type UsersUsersStreamCursorInput = {
  /** Stream column input with initial value */
  initial_value: UsersUsersStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UsersUsersStreamCursorValueInput = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  /** auth0 user id */
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  stripe_customer_id?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** update columns of table "users.users" */
export enum UsersUsersUpdateColumn {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  StripeCustomerId = 'stripe_customer_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type UsersUsersUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersUsersSetInput>;
  /** filter the rows which have to be updated */
  where: UsersUsersBoolExp;
};

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'query_root', sales_orders: Array<{ __typename?: 'sales_orders', amount_discount?: number | null, amount_refunded?: number | null, amount_shipping?: number | null, amount_total?: number | null, amount_tax?: number | null, amount_subtotal?: number | null, created_at?: any | null, currency?: any | null, email?: string | null, id: number, name?: string | null, phone_number?: string | null, payment_status: string, payment_details?: any | null, status: EnumsOrderStatusesEnum, status_updated?: any | null, stripe_checkout_session_id?: string | null, stripe_customer_id?: string | null, shipping_address_id?: number | null, billing_address?: { __typename?: 'common_addresses', created_at?: any | null, country?: string | null, city: string, line1: string, line2?: string | null, postal_code: string, state?: string | null, updated_at?: any | null } | null, items: Array<{ __typename?: 'sales_items', amount_discount?: number | null, amount_subtotal?: number | null, amount_tax?: number | null, amount_total?: number | null, id: number, name: string, currency?: any | null, order_id?: number | null, product_code: string, quantity?: number | null, stripe_price_id?: string | null, stripe_product_id?: string | null }>, shipping_address?: { __typename?: 'common_addresses', city: string, country?: string | null, created_at?: any | null, line2?: string | null, line1: string, id: number, postal_code: string, state?: string | null, updated_at?: any | null } | null, user?: { __typename?: 'users_users', email: string, name?: string | null } | null }> };

export type GetItemsByItemIdQueryVariables = Exact<{
  item_id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetItemsByItemIdQuery = { __typename?: 'query_root', sales_items: Array<{ __typename?: 'sales_items', currency?: any | null, name: string, product_code: string, stripe_price_id?: string | null, stripe_product_id?: string | null, amount_discount?: number | null, amount_subtotal?: number | null, amount_tax?: number | null, amount_total?: number | null, id: number, order_id?: number | null, quantity?: number | null, configuration?: { __typename?: 'sales_item_configurations', background_styles_filter?: string | null, background_styles_transform?: string | null, background_url?: string | null, details?: string | null, height?: number | null, main_styles_filter?: string | null, main_styles_transform?: string | null, main_url?: string | null, preview?: string | null, remove_background?: string | null, orientation?: string | null, restore?: string | null, unit?: string | null, width?: number | null } | null }> };

export type GetTasksSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type GetTasksSubscription = { __typename?: 'subscription_root', sales_tasks: Array<{ __typename?: 'sales_tasks', user_id?: string | null, id: number, item_id?: number | null, order_id?: number | null, created_at?: any | null, updated_at?: any | null, type: EnumsTaskTypesEnum, status: EnumsTaskStatusesEnum }> };


export const GetOrdersDocument = gql`
    query GetOrders {
  sales_orders {
    amount_discount
    amount_refunded
    amount_shipping
    amount_total
    amount_tax
    amount_subtotal
    created_at
    currency
    email
    id
    name
    phone_number
    payment_status
    payment_details
    status
    status_updated
    stripe_checkout_session_id
    stripe_customer_id
    shipping_address_id
    billing_address {
      created_at
      country
      city
      line1
      line2
      postal_code
      state
      updated_at
    }
    items {
      amount_discount
      amount_subtotal
      amount_tax
      amount_total
      id
      name
      currency
      order_id
      product_code
      quantity
      stripe_price_id
      stripe_product_id
    }
    shipping_address {
      city
      country
      created_at
      line2
      line1
      id
      postal_code
      state
      updated_at
    }
    user {
      email
      name
    }
  }
}
    `;

/**
 * __useGetOrdersQuery__
 *
 * To run a query within a React component, call `useGetOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrdersQuery(baseOptions?: Apollo.QueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
      }
export function useGetOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export function useGetOrdersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOrdersQuery, GetOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOrdersQuery, GetOrdersQueryVariables>(GetOrdersDocument, options);
        }
export type GetOrdersQueryHookResult = ReturnType<typeof useGetOrdersQuery>;
export type GetOrdersLazyQueryHookResult = ReturnType<typeof useGetOrdersLazyQuery>;
export type GetOrdersSuspenseQueryHookResult = ReturnType<typeof useGetOrdersSuspenseQuery>;
export type GetOrdersQueryResult = Apollo.QueryResult<GetOrdersQuery, GetOrdersQueryVariables>;
export const GetItemsByItemIdDocument = gql`
    query GetItemsByItemId($item_id: Int) {
  sales_items(where: {id: {_eq: $item_id}}) {
    currency
    name
    product_code
    stripe_price_id
    stripe_product_id
    amount_discount
    amount_subtotal
    amount_tax
    amount_total
    id
    order_id
    quantity
    configuration {
      background_styles_filter
      background_styles_transform
      background_url
      details
      height
      main_styles_filter
      main_styles_transform
      main_url
      preview
      remove_background
      orientation
      restore
      unit
      width
    }
  }
}
    `;

/**
 * __useGetItemsByItemIdQuery__
 *
 * To run a query within a React component, call `useGetItemsByItemIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemsByItemIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemsByItemIdQuery({
 *   variables: {
 *      item_id: // value for 'item_id'
 *   },
 * });
 */
export function useGetItemsByItemIdQuery(baseOptions?: Apollo.QueryHookOptions<GetItemsByItemIdQuery, GetItemsByItemIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemsByItemIdQuery, GetItemsByItemIdQueryVariables>(GetItemsByItemIdDocument, options);
      }
export function useGetItemsByItemIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemsByItemIdQuery, GetItemsByItemIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemsByItemIdQuery, GetItemsByItemIdQueryVariables>(GetItemsByItemIdDocument, options);
        }
export function useGetItemsByItemIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetItemsByItemIdQuery, GetItemsByItemIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetItemsByItemIdQuery, GetItemsByItemIdQueryVariables>(GetItemsByItemIdDocument, options);
        }
export type GetItemsByItemIdQueryHookResult = ReturnType<typeof useGetItemsByItemIdQuery>;
export type GetItemsByItemIdLazyQueryHookResult = ReturnType<typeof useGetItemsByItemIdLazyQuery>;
export type GetItemsByItemIdSuspenseQueryHookResult = ReturnType<typeof useGetItemsByItemIdSuspenseQuery>;
export type GetItemsByItemIdQueryResult = Apollo.QueryResult<GetItemsByItemIdQuery, GetItemsByItemIdQueryVariables>;
export const GetTasksDocument = gql`
    subscription GetTasks {
  sales_tasks {
    user_id
    id
    item_id
    order_id
    created_at
    updated_at
    type
    status
  }
}
    `;

/**
 * __useGetTasksSubscription__
 *
 * To run a query within a React component, call `useGetTasksSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGetTasksSubscription(baseOptions?: Apollo.SubscriptionHookOptions<GetTasksSubscription, GetTasksSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetTasksSubscription, GetTasksSubscriptionVariables>(GetTasksDocument, options);
      }
export type GetTasksSubscriptionHookResult = ReturnType<typeof useGetTasksSubscription>;
export type GetTasksSubscriptionResult = Apollo.SubscriptionResult<GetTasksSubscription>;