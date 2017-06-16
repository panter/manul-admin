import styled from 'styled-components';
import HeaderCell from 'griddle-react/dist/module/components/TableHeadingCell';
import { styleCell } from './cell';

const BaseHeaderCell = styleCell(HeaderCell);
export default styled(BaseHeaderCell)`
  cursor: pointer;
  font-weight: bold;
`;
