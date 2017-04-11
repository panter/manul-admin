import _ from 'lodash';
import publicationUtils from './utils/publication_utils';
import createMethods from './create_methods';
import IsAllowed from './is_allowed';


export default ({ Meteor, SimpleSchema, ValidatedMethod, Counts }, config) => {
  const isAllowed = IsAllowed(config);
  const { collections } = config;

  const createPublication = (name) => {
    const { list, edit, counts } = publicationUtils.getPublications(name);
    const { collection, columns } = collections[name];

    /* eslint meteor/audit-argument-checks: 0*/
    Meteor.publish(list, function publishList(query, options) {
      if (isAllowed(name, this.userId)) {
        // only restrict to first, because emails.0.address does not work
        const fields = _.chain(columns).map(
          c => _.first(c.split('.')),
        ).keyBy().mapValues(() => 1)
        .value();
        const findOptions = {
          ...options,
          fields,
        };
        Counts.publish(this, counts, collection.find(query, options));
        return collection.find(query, findOptions);
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
  createMethods({ Meteor, SimpleSchema, ValidatedMethod }, config);
};
