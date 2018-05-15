import {
  identity,
  omitBy,
  map,
  isObject,
  mapValues,
  keyBy,
  isEmpty,
  flow,
  trim
} from "lodash/fp";

const removeEmptyObjects = omitBy(o => isObject(o) && isEmpty(o));

const queryListFromTerm = term =>
  flow(
    map(field => ({
      [field]: {
        $regex: term,
        $options: "i"
      }
    }))
  );
// using case-insensitive regex makes it slow, so we do a little hack
const queryForTerm = term => fields => ({
  $or: queryListFromTerm(term, identity)(fields)
});
const termToTermList = term => term.split(" ").map(trim);

const createSearchQuery = (fields, terms, useTextIndex) =>
  /*
  two strategies: text search (if availble) or regex search
  - in text search, if multiple terms are separated with space, every one should occure
  */
  ({
    $or: [
      // text search
      ...(useTextIndex
        ? [
            {
              $text: {
                // quote terms, so that its an AND search
                // see https://stackoverflow.com/a/16906099/1463534
                $search: terms.map(t => `"${t}"`).join(" ")
              }
            }
          ]
        : []),
      // regex search
      // every
      {
        $and: map(term => queryForTerm(term)(fields))(terms)
      }
    ]
  });
/* eslint import/prefer-default-export: 0 */
export const filterToQuery = (
  filter,
  search,
  transformFilter = f => f,
  useTextIndex
) => {
  // console.log("got filter", filter);
  // console.log("got search", search);
  // console.log("usingtext :", useTextIndex ? "yes" : "no");
  // remove empty objects on filter
  const query = {
    ...(!isEmpty(filter) && removeEmptyObjects(transformFilter(filter))),
    ...(!isEmpty(search) &&
      !isEmpty(search.searchFields) &&
      !isEmpty(search.searchTerm) &&
      createSearchQuery(
        search.searchFields,
        termToTermList(search.searchTerm),
        useTextIndex
      ))
  };
  return query;
};

export const sortPropsToMongoSort = flow(
  keyBy("id"),
  mapValues(({ sortAscending }) => (sortAscending ? 1 : -1))
);

const pagePropertiesToLimitAndSkip = (
  { currentPage, pageSize } = { currentPage: 1, pageSize: 50 }
) => ({
  limit: pageSize,
  skip: (currentPage - 1) * pageSize
});

export const gridOptionsToQueryOptions = ({
  sortProperties,
  pageProperties = null
}) => {
  // console.log('got sortProperties', sortProperties);
  const sort = sortPropsToMongoSort(sortProperties);
  // console.log('mongo sort', sort);

  const limitAndSkip = pageProperties
    ? pagePropertiesToLimitAndSkip(pageProperties)
    : null;
  return {
    sort,
    ...limitAndSkip
  };
};
