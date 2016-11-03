import { composeWithTracker } from 'mantra-core';
import publicationUtils from '../utils/publication_utils';

export const composer = () => ({ context, publications, collection, collectionName }, onData) => {
  const { Meteor } = context();
  // currently not implemented, use MeteorGriddle
  onData(null, { });
};


export default () => composeWithTracker(composer());
