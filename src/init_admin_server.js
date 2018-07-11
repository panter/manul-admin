// @flow

import { keyBy, mapValues } from 'lodash';
import IsAllowed from './is_allowed';
import initMethods from './initMethods';
import publicationUtils from './utils/publication_utils';

import type { ServerContextT, AdminConfigT } from './types';

/**
update: we no longer publish list, because we use a method call for that
*/

export default (
  { Meteor, ValidatedMethod }: ServerContextT,
  config: AdminConfigT
) => {
  const isAllowed = IsAllowed(config);
  const { collections } = config;
  const createTextIndex = name => {
    const { collection, textIndex } = collections[name];
    if (textIndex) {
      const indexDef = mapValues(keyBy(textIndex), () => 'text');

      try {
        collection._ensureIndex(indexDef, {
          background: true,
          name: `manul-admin-text_${name}`
        });
      } catch (e) {
        console.error("can't set index", e);
      }
    }
  };
  const initTextIndex = () => {
    Object.keys(collections).forEach(createTextIndex);
  };
  initTextIndex();
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
  initMethods({ Meteor, ValidatedMethod, config });
};
