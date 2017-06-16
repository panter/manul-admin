import React from 'react';
import { NavLink as BsNavLink } from 'reactstrap';
import styled from 'styled-components';

const NavLinkComp = ({ href, children, className, onClick }) => (
  <BsNavLink
    href={href}
    className={className}
    onClick={onClick}
  >
    {children}
  </BsNavLink>
);

const NavLink = styled(NavLinkComp) `
  border-left: 3px solid transparent;
  color: ${props => props.active ? '#fff' : '#b8c7ce'};
  background-color: ${props => props.active ? '#1e282c' : 'none'};
  border-left-color: ${props => props.active ? '#3c8dbc' : 'none'};
  &:hover {
    background-color: #1e282c;
    color: #fff;
    border-left-color: #3c8dbc;
  }
`;

export default NavLink;
