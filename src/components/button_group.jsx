
import { T } from '@panter/manul-i18n';
import styled from 'styled-components';

const ButtonGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > * {
    /* for iphone < 6 */
    @media (max-width: 374px) {
      flex: 1 1 auto;
    }
  }

`;

ButtonGroup.propTypes = {
};

ButtonGroup.defaultProps = {
};

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
