import React from 'react';
import styled from 'styled-components';

const Layout = ({ Table, Pagination, Filter, className }) => (
  <div className={className}><Table /><Pagination /><Filter /></div>
);

export default styled(Layout)`
  background-color: #fff;
`;
