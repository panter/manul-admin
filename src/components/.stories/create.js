import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import Create from '../create';


storiesOf('admin.Create', module)
  .addWithInfo('default view', 'This is the default view', () => {
    return (
      <Create />
    );
  })
