import styled from 'styled-components';
import Button from '../components/button';
import LinkButton from '../containers/link_button';
import IconLinkButton from '../components/icon-link-button';

const styleButton = component => (styled(component) `
  margin-right: 8px;
`);

export const GriddleActionLinkButton = styleButton(LinkButton);
export const GriddleActionButton = styleButton(Button);
export const GriddleActionIconLinkButton = styleButton(IconLinkButton);
