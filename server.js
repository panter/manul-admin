import _ from 'lodash';
import publicationUtils from './publication_utils';
import Methods from './methods';
import {Meteor} from 'meteor/meteor';
import {Counts} from 'meteor/tmeasday:publish-counts';

export default (adminConfig) => {
  const {collections, allowRules: globalAllowRules = []} = adminConfig;
  const initMethods = () => {
    Methods(adminConfig);
  }
  const initPublication = (name) => {
    const {list, edit, counts} = publicationUtils.getPublications(name);
    const {collection, allowRules = []} = collections[name];

    Meteor.publish(list, function (query, options) {

      const rules = globalAllowRules.concat(allowRules);
      if (_.some(rules, allowed => allowed(this.userId))) {
        // can't reuse "users" cursor
        Counts.publish(this, counts, collection.find(query, options));
        return collection.find(query, options);
      }
    });
    Meteor.publish(edit, function (_id) {
      const rules = globalAllowRules.concat(allowRules);
      if (_.some(rules, allowed => allowed(this.userId))) {
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
