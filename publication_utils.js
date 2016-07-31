const getEditPublicationName = (name) => {
  return `admin.${name}.edit`;
}
const getListPublicationName = (name) => {
  return `admin.${name}.list`;
}

const getMatchingResultsCountName = (name) => {
  return `admin.${name}.counts`;
}


const getPublications = (name) => ({
  list: getListPublicationName(name),
  edit: getEditPublicationName(name),
  counts: getMatchingResultsCountName(name)
});

export default {getPublications, getEditPublicationName, getListPublicationName, getMatchingResultsCountName}
