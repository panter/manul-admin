// @flow
type ObjOrFunc<T, A> = A => T | T;

export type CollectionNameT = string;
export type MeteorCollectionT = *;

export type SearchTermT = string;
export type SearchFieldsT = ObjOrFunc<Array<String>, SearchTermT>;
export type SortPropertiesT = *;
export type PagePropertiesT = *;
export type FilterT = *;

export type ListTypeT = 'ui' | 'export';
export type ColumnValueFormatT = ({
  value: *,
  key: string
}) => any;
export type ColumnDefT =
  | string
  | {
      id: string,
      include?: { [ListTypeT]: boolean },
      title: string,
      format?: ColumnValueFormatT | { [ListTypeT]: ColumnValueFormatT }
    };

export type ColumnsT = Array<ColumnDefT>;

export type ListOptionsT = {|
  sortProperties: SortPropertiesT,
  pageProperties: PagePropertiesT,
  filter?: FilterT,
  searchTerm?: SearchTermT,
  listType: ListTypeT
|};

export type AggregationStagesT = Array<any>;
export type AggregationArgsT = {|
  collectionConfig: *,
  listOptions: ListOptionsT,
  countOnly?: boolean,
  filter?: FilterT,
  searchTerm?: SearchTermT
|};
export type CollectionAggregationT = {|
  stages: AggregationStagesT, // additional stages after base query
  postSort?: boolean // whether to sort after aggregation stages (is slower, but sorting is wrong when sorted by computed properties unless this flag is set)
  // filterToPostQuery ?: any => any, // create another match stage after the aggregation stages
|};

export type CollectionConfigT = {|
  collection: MeteorCollectionT,
  allowInsertWithId?: boolean,
  searchFields?: SearchFieldsT,
  filterToBaseQuery?: any => any,
  textIndex?: Array<String>,
  aggregation?: ObjOrFunc<CollectionAggregationT, AggregationArgsT>,
  columns: ColumnsT,
  columnsI18n?: string
|};

export type ListArgumentsT = {|
  filter: *,
  searchTerm?: string,
  sortProperties: *,
  pageProperties: *
|};
export type AdminConfigT = {
  collections: { [CollectionNameT]: CollectionConfigT }
};

export type MethodsContextT = {|
  config: AdminConfigT,
  ValidatedMethod: *,
  Meteor: *
|};

export type ServerContextT = {|
  ValidatedMethod: *,
  Meteor: *
|};
export type ContextT = MethodsContextT & {|
  LocalState: *,
  components: *,
  adminRoutes: *,
  gotoRoute: string => any
|};

export type ComponentTypeT = *;

export type CreateQueryArgsT = {|
  filter?: FilterT,
  searchTerm?: SearchTermT,
  searchFields?: SearchFieldsT,
  filterToBaseQuery?: any => any,
  useTextIndex?: boolean
|};
