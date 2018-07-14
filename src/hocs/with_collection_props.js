import composeWithTracker from '../utils/composeWithTracker';
import _ from 'lodash';
import { isString } from 'util';

const filterColumns = (columns, type) =>
  columns.filter(
    column => isString(column) || !column.include || column.include[type]
  );
export const composer = type => (
  { context, collectionName, ...props },
  onData
) => {
  const {
    adminContext: {
      SimpleSchema: SimpleSchema1,
      getComponent,
      publicationUtils,
      config
    }
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
    onData(
      new Error('please provide SimpleSchema by npm or in context (version 1)')
    );
  } else {
    const searchSchema = new SimpleSchema({
      searchTerm: {
        type: String,
        optional: true
      }
    });

    const { collections } = config;
    const publications = publicationUtils.getPublications(collectionName);
    const { collection, schema, columns, ...colConfig } = collections[
      collectionName
    ];
    const Component = getComponent({ collectionName, type });
    onData(null, {
      Component,
      collection,
      schema: schema || _.result(collection, 'simpleSchema'),
      searchSchema,
      publications,
      columns: filterColumns(columns, 'ui'),
      ...colConfig,
      ...props // allow override
    });
  }
};

export default type => composeWithTracker(composer(type));
