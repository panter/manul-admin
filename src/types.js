// @flow
export type CollectionNameT = string;
export type MeteorCollectionT = *;
export type CollectionConfigT = {
  collection: MeteorCollectionT,
  allowInsertWithId?: boolean,
  searchFields?: Array<string> | (any => Array<string>),
  transformFilter?: any => any,
  textIndex?: Array<String>
};

export type ListArgumentsT = {
  filter: *,
  searchTerm?: string,
  sortProperties: *,
  pageProperties: *
};
export type AdminConfigT = {
  collections: { [CollectionNameT]: CollectionConfigT }
};

export type MethodsContextT = {
  config: AdminConfigT,
  ValidatedMethod: *,
  Meteor: *
};

export type ServerContextT = {
  ValidatedMethod: *,
  Meteor: *
};
export type ContextT = MethodsContextT & {
  LocalState: *,
  components: *,
  adminRoutes: *,
  gotoRoute: string => any
};

export type ComponentTypeT = *;
