
import { composeWithTracker } from 'mantra-core';
import _ from 'lodash';


export const composer = () => ({ context, collectionName, ...props }, onData) => {
  const {
    adminContext: {
      SimpleSchema: SimpleSchema1, publicationUtils, config,
    },
  } = context();
  let SimpleSchema;
  try {
    /* eslint global-require: 0 */
    SimpleSchema = require('simpl-schema').default;
  } catch (error) {
    // try to get from context
    SimpleSchema = SimpleSchema1;
  }
  if (!SimpleSchema) {
    onData(new Error('please provide SimpleSchema by npm or in context (version 1)'));
  } else {
    const searchSchema = new SimpleSchema({
      searchTerm: {
        type: String,
        optional: true,
      },
    });

    const { collections } = config;
    const publications = publicationUtils.getPublications(collectionName);
    const { collection, schema, ...colConfig } = collections[collectionName];
    onData(null, {
      collection,
      schema: schema || _.result(collection, 'simpleSchema'),
      searchSchema,
      publications,
      ...colConfig,
      ...props, // allow override
    });
  }
};


export default type => composeWithTracker(composer(type));
