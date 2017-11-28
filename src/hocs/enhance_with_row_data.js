import { connect } from 'react-redux';
import { plugins } from 'griddle-react';

const { rowDataSelector } = plugins.LocalPlugin.selectors;

export default connect((state, props) => ({
  rowData: rowDataSelector(state, props),
}));
