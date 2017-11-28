import React from 'react';
import styled from 'styled-components';
import connectField from 'uniforms/connectField';
import filterDOMProps from 'uniforms/filterDOMProps';
import injectName from 'uniforms/injectName';
import joinName from 'uniforms/joinName';
import { Row } from 'reactstrap';
import AutoField from './AutoField';

const NestContainer = styled.div`
  border: 1px solid #eee;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
`;

const FloatingLabel = styled.label`
  position: relative;
  top: -25px;
  background: #fff;
  padding: 0 5px;
`;

const MarginRow = styled(Row) `
  margin-top: -20px;
`;

const Nest = ({
    children,
  fields,
  label,
  name,
  ...props
}) => (
  <NestContainer {...filterDOMProps(props)}>
      {label && (
        <FloatingLabel htmlFor={props.id}>
          {label}
        </FloatingLabel>
      )}
      <MarginRow>
        {children ? (
          injectName(name, children)
        ) : (
            fields.map(key =>
              <AutoField key={key} name={joinName(name, key)} />,
            )
          )}
      </MarginRow>
    </NestContainer>
  );

export default connectField(Nest, { includeInChain: false });
