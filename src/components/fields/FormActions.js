import { T } from '@panter/manul-i18n';
import React from 'react';
import SubmitField from 'uniforms-bootstrap4/SubmitField';
import ControlGroup from './ControlGroup';

const FormActions = ({ submitLabel = 'autoform.defaults.submit', children, ...props }) => (
  <ControlGroup>
    {children}
    <T _id={submitLabel}>
      {label => <SubmitField value={label} {...props} />}
    </T>
  </ControlGroup>
);


FormActions.displayName = 'FormActions';

export default FormActions;
