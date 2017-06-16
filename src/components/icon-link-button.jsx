import * as React from 'react';
import styled from 'styled-components';
import LinkButton from '../containers/link_button';

const StyledButton = styled(LinkButton) `
  line-height: 1;
  padding: 5px;
`;

const IconLinkButton = ({ iconPath, icon, ...props }) => {
  if (!iconPath && !icon) throw new Error('iconPath or Icon prop is required.');
  const IconComp = icon || require(`react-icons/lib/${iconPath}`);

  return (
    <StyledButton {...props}>
      <IconComp />
    </StyledButton>
  );
};

export default IconLinkButton;
