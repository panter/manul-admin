const getEditPublicationName = name =>
   `admin.${name}.edit`
;
const getListPublicationName = name =>
   `admin.${name}.list`
;

const getMatchingResultsCountName = name =>
   `admin.${name}.counts`
;


const getPublications = name => ({
  list: getListPublicationName(name),
  edit: getEditPublicationName(name),
  counts: getMatchingResultsCountName(name),
});

export default {
  getPublications, getEditPublicationName, getListPublicationName, getMatchingResultsCountName,
};
