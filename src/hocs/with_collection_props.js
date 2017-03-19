
import { composeWithTracker } from 'mantra-core';
import _ from 'lodash';
import SimpleSchema from 'simpl-schema';

const searchSchema = new SimpleSchema({
  searchTerm: {
    type: String,
    optional: true,
  },
});
export const composer = type => ({ context, collectionName, ...props }, onData) => {
  const {
    adminContext: {
      getComponent, publicationUtils, config,
    },
  } = context();
  const { collections } = config;
  const publications = publicationUtils.getPublications(collectionName);
  const { collection, schema, ...colConfig } = collections[collectionName];
  const Component = getComponent({ collectionName, type });
  onData(null, {
    Component,
    collection,
    schema: schema || _.result(collection, 'simpleSchema'),
    searchSchema,
    publications,
    ...colConfig,
    ...props, // allow override
  });
};


export default type => composeWithTracker(composer(type));
