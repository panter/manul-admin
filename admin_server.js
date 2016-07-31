
import publicationUtils from './publication_utils';
import Methods from './methods';
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

import IsAllowed from './is_allowed';

export default (adminConfig) => {
  const isAllowed = IsAllowed(adminConfig);
  const {collections} = adminConfig;
  const initMethods = () => {
    Methods(adminConfig);
  }
  const initPublication = (name) => {
    const {list, edit, counts} = publicationUtils.getPublications(name);
    const {collection} = collections[name];

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
  }
  const initPublications = () => {
    for (const name of Object.keys(collections)) {
      initPublication(name);
    }
  }
  initPublications();
  initMethods();
}
