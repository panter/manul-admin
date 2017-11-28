import BaseField from 'uniforms/BaseField';
import React from 'react';
import filterDOMProps from 'uniforms/filterDOMProps';

import Button from '../button';

const SubmitField = ({
  inputRef,
  children,
  label,
  ...props
}, { uniforms: { error, state: { disabled } } }) =>
  <Button
    disabled={!!(error || disabled)}
    primary
    ref={inputRef}
    type="submit"
    {...filterDOMProps(props)}
  >{children || label}</Button>
;

SubmitField.contextTypes = BaseField.contextTypes;

export default SubmitField;
