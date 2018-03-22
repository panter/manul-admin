import IsAllowed from './is_allowed';
import createMethods from './create_methods';
import publicationUtils from './utils/publication_utils';

// SimpleSchema needs only to be passed, if its not in npm (version 2)

/**
update: we no longer publish list, because we use a method call for that
*/
export default ({ Meteor, ValidatedMethod, SimpleSchema = null }, config) => {
  const isAllowed = IsAllowed(config);
  const { collections } = config;

  const createPublication = name => {
    const { edit } = publicationUtils.getPublications(name);
    const { collection } = collections[name];

    /* eslint meteor/audit-argument-checks: 0*/
    Meteor.publish(edit, function publishEdit(_id) {
      if (isAllowed(name, this.userId)) {
        return collection.find(_id);
      }
    });
  };
  const createPublications = () => {
    Object.keys(collections).forEach(createPublication);
  };
  createPublications();
  createMethods({ Meteor, ValidatedMethod, SimpleSchema }, config);
};
