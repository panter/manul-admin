import QuickForm from 'uniforms-bootstrap4/QuickForm';
import React from 'react';
import { T } from '@panter/manul-i18n';
import { Row } from 'reactstrap';
import BaseForm from './BaseForm';
import AutoField from '../fields/AutoField';
import FormActions from '../fields/FormActions';
import fieldColumn from '../fields/fieldColumn';

const Quick = parent => class extends QuickForm.Quick(parent) {
  static Quick = Quick;
  /* eslint class-methods-use-this: 0*/
  getAutoField() {
    return AutoField;
  }

  getErrorsField() {
    return () => null;
  }

  getSubmitField() {
    if (this.props.hideSubmitButton || this.props.hideSubmitField) {
      return () => null;
    }
    return fieldColumn(props => (
      <FormActions {...props} submitLabel={this.props.submitLabel}>
        {this.props.additionalActions}
      </FormActions>
    ));
  }

  render() {
    const nativeFormProps = this.getNativeFormProps();
    if (nativeFormProps.children) {
      return (
        <Row>
          {super.render()}
        </Row>
      );
    }

    const AutoFields = this.props.autoField || this.getAutoField();
    const ErrorsField = this.props.errorsField || this.getErrorsField();
    const SubmitField = this.props.submitField || this.getSubmitField();

    return (
      <form {...nativeFormProps}>
        <Row>
          {this.getChildContextSchema().getSubfields().map(key =>
            <AutoFields key={key} name={key} />,
          )}

          <ErrorsField />
          <SubmitField />
        </Row>
      </form>
    );
  }
};

export default Quick(BaseForm);
