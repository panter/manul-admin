
import publicationUtils from './utils/publication_utils';
import createMethods from './create_methods';
import IsAllowed from './is_allowed';
import { filterToQuery, gridOptionsToQueryOptions } from './utils/query_utils';

// SimpleSchema needs only to be passed, if its not in npm (version 2)
export default ({ Meteor, ValidatedMethod, Counts, SimpleSchema = null }, config) => {
  const isAllowed = IsAllowed(config);
  const { collections } = config;

  const createPublication = (name) => {
    const { list, edit, counts } = publicationUtils.getPublications(name);
    const { collection } = collections[name];

    /* eslint meteor/audit-argument-checks: 0*/
    Meteor.publish(list, function publishList(filter, gridOptions) {
      if (isAllowed(name, this.userId)) {
        const query = filterToQuery(filter);
        const options = gridOptionsToQueryOptions(gridOptions);
          // can't reuse "users" cursor
        Counts.publish(this, counts, collection.find(query, options));
        return collection.find(query, options);
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
