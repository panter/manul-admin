import publicationUtils from './utils/publication_utils';
import createMethods from './create_methods';
import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import IsAllowed from './is_allowed';

export default (config) => {
  const isAllowed = IsAllowed(config);
  const { collections } = config;

  const createPublication = (name) => {
    const { list, edit, counts } = publicationUtils.getPublications(name);
    const { collection } = collections[name];

    Meteor.publish(list, function (query, options) {
      if (isAllowed(name, this.userId)) {
        // can't reuse "users" cursor
        Counts.publish(this, counts, collection.find(query, options));
        return collection.find(query, options);
      }
    });
    Meteor.publish(edit, function (_id) {
      if (isAllowed(name, this.userId)) {
        return collection.find(_id);
      }
    });
  };
  const createPublications = () => {
    for (const name of Object.keys(collections)) {
      createPublication(name);
    }
  };
  createPublications();
  createMethods(config);
};
