import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { setComposerStub } from 'react-komposer';
import AdminHome from '../admin_home';


storiesOf('admin.AdminHome', module)
  .addWithDoc('default view', AdminHome,
  'This is the default view',
  () => {
    return (
      <AdminHome />
    );
  })
