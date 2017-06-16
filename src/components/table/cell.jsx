import styled from 'styled-components';
import Cell from 'griddle-react/dist/module/components/Cell';

export const styleCell = CellComponent =>
  styled(CellComponent)`
    text-align: left;
    padding: 8px;
  `;

export default styleCell(Cell);
