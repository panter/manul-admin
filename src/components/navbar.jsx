import * as React from 'react';
import {
  Nav,
  NavItem,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Collapse,
} from 'reactstrap';
import NavLink from '../containers/nav_link';

const NavBar = ({
  appTitle = 'Manul Admin UI',
  navLinks = [],
  adminRootHref = '/admin',
}) => (
  <Navbar color="faded" light toggleable>
      <NavbarToggler right />
      <NavbarBrand href={adminRootHref}>{appTitle}</NavbarBrand>
      <Collapse isOpen navbar>
        <Nav className="ml-auto" navbar>
          {
            navLinks.forEach(l => (
              <NavItem>
                <NavLink href={l.href}>{l.text}</NavLink>
              </NavItem>
            ))
          }
        </Nav>
      </Collapse>
    </Navbar>
  );

export default NavBar;
