import React from 'react';
import styled from 'styled-components';
import { InputGroup, Input, InputGroupAddon } from 'reactstrap';
import SearchIcon from 'react-icons/lib/fa/search';

const Filter = ({ onFilterChange }) => (
  <InputGroup>
    <Input onChange={(e) => onFilterChange(e.target.value)} placeholder="search for..." />
    <InputGroupAddon><SearchIcon /></InputGroupAddon>
  </InputGroup>
);

export default Filter;
