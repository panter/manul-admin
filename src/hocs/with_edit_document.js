import { composeWithTracker } from 'mantra-core';


export const composer = () => ({ context, publications, collection, collectionName, params = {}, _id }, onData) => {
  const docId = _id || params._id; // for route usage
  const { Meteor } = context();
  const docLoaded = docId && Meteor.subscribe(publications.edit, docId).ready();
  const doc = docId && collection.findOne(docId);
  onData(null, { docId, doc, docLoaded });
};


export default () => composeWithTracker(composer());
