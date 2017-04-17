
import publicationUtils from './utils/publication_utils';
import createMethods from './create_methods';
import IsAllowed from './is_allowed';
import { filterToQuery } from './utils/query_utils';

// SimpleSchema needs only to be passed, if its not in npm (version 2)
export default ({ Meteor, ValidatedMethod, Counts, SimpleSchema = null }, config) => {
  const isAllowed = IsAllowed(config);
  const { collections } = config;

  const createPublication = (name) => {
    const { list, edit, counts } = publicationUtils.getPublications(name);
    const { collection, searchFields, transformFilter } = collections[name];

    /* eslint meteor/audit-argument-checks: 0*/
    Meteor.publish(list, function publishList(filter, searchTerm = null) {
      if (isAllowed(name, this.userId)) {
        const query = filterToQuery(
          filter, searchTerm && { searchFields, searchTerm }, transformFilter,
        );
        // counts is always without limiting
        Counts.publish(this, counts, collection.find(query));
        return collection.find(query);
      }
    });
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
