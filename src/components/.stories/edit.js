import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Edit from '../edit';


storiesOf('admin.Edit', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <Edit />
    );
  })
