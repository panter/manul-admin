import styled from 'styled-components';
import React from 'react';
import DbIcon from 'react-icons/lib/fa/database';
import fromContext from '../hocs/component_from_context_or';
import {
  Nav,
  NavItem,
} from 'reactstrap';
import NavLink from '../containers/nav_link';

const getCollectionLinks = navItems =>
  navItems.map((navItem, index) => (
    <NavItem key={index}>
      <NavLink routeName={navItem.routeName}>
        <DbIcon /><span>{navItem.title}</span>
      </NavLink>
    </NavItem>
  ));

const SideNavComp = ({ navItems, className }) => (
  <Nav vertical className={className}>
    {getCollectionLinks(navItems)}
  </Nav>
);

const SideNav = styled(SideNavComp) `
  background-color: #222d32;
  min-height: 100%;
  height: 100%;
`;

export default fromContext('layout.SideNav', SideNav);
