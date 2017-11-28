import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import DocumentPreview from '../document_preview';


storiesOf('admin.DocumentPreview', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <DocumentPreview />
    );
  })
