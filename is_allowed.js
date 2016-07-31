import _ from 'lodash';

export default (adminConfig) => {
  const {collections, allowRules: globalAllowRules = []} = adminConfig;
  return (collectionName, userId) => {

    const {allowRules = []} = collections[collectionName];
    const rules = globalAllowRules.concat(allowRules);
    return _.some(rules, allowed => allowed(userId));
  };
};
