import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ControlGroup = ({ children }) => (
  <Group>
    {children}
  </Group>
);

ControlGroup.displayName = 'ControlGroup';

export default ControlGroup;
