import { useDeps, composeAll, composeWithTracker } from 'mantra-core';
import DocumentPreview from '../components/document_preview';

const defaultPreview = doc => doc._id;

export const composer =
  ({ context, docId, doc, docLoaded, getPreviewLabel = defaultPreview }, onData) => {
    if (doc && docLoaded) {
      const label = getPreviewLabel(doc);
      onData(null, { label });
    } else {
      onData(null, { label: docId });
    }
  };


export const depsMapper = context => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper),
)(DocumentPreview);
