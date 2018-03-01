const getEditPublicationName = name => `admin.${name}.edit`;

const getPublications = name => ({
  edit: getEditPublicationName(name)
});

export default {
  getPublications
};
