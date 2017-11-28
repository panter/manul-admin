import { createElement } from 'react';
import BaseAutoField from 'uniforms-bootstrap4/AutoField';
import fieldColumn from './fieldColumn';
import NestField from './NestField';
import ListField from './ListField';
import TextField from './TextField';

// Component overwrites
export const componentOverwrites = new Map([
  [Object, fieldColumn(NestField)],
  [Array, fieldColumn(ListField)],
  [String, fieldColumn(TextField)],
]);

const ColumnedBaseAutoField = fieldColumn(BaseAutoField);

export default class AutoField extends BaseAutoField {
  static displayName = 'AutoField';

  render() {
    // this.getFieldProps also returns props from context, such as uniforms props:
    const props = this.getFieldProps(undefined, { ensureValue: false });
    const component =
      props.component ||
      componentOverwrites.get(props.fieldType) ||
      ColumnedBaseAutoField;
    return createElement(component, { ...props });
  }
}
