import React from 'react';
import BaseTextField from 'uniforms-bootstrap4/TextField';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  width: 100%;
`;

const TextArea = connectField(({
  disabled,
  id,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  value,
  rowCount,
  ...compProps
}) => (
  <div {...filterDOMProps(compProps)}>
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}
      <StyledTextArea
        className={'form-control'}
        disabled={disabled}
        id={id}
        name={name}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        ref={inputRef}
        rows={rowCount}
        value={value}
      />
    </div>
  ));

const Text = (props) => {
  const Component = !props.rowCount ?
    BaseTextField :
    TextArea;

  return (<Component {...props} />);
};

export default Text;
